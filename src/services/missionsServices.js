const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const uniqid = require('uniqid');

const externalServices = require('./externalServices');
const mapper = require('./mappers/mapGoogleRoute');
const validation = require('./validation/validator');

const date = new Date('01/01/2016 06:00:00 AM');

let activeMissions = [];

module.exports = {
    parseAndSortCsvFile: () => {
        return new Promise((resolve, reject) => {
            const greenTaxiTripData = [];
            const stream = fs.createReadStream(path.join(__dirname, '/2016_Green_Taxi_Trip_Data.csv'));
            const csvStream = csv
            .parse({ headers: true })
            .on('data', function(data){
                greenTaxiTripData.push(data);
            })
            .on('end', function(){
                greenTaxiTripData.sort((missionA, missionB) => {
                    const pickupDateMissionA = new Date(missionA.lpep_pickup_datetime);
                    const pickupDateMissionB = new Date(missionB.lpep_pickup_datetime);
                    return pickupDateMissionA - pickupDateMissionB;
                });
                resolve(greenTaxiTripData);
            });
            stream.pipe(csvStream);
        });
    },
    findFinishedMissions: (ctx) => {
        activeMissions = activeMissions.filter((el) => {
            const dropoffDate = new Date(el.Lpep_dropoff_datetime);
            if(dropoffDate < date.getTime()) {
                ctx.client.emit('finishedMission', el);
            }
            return dropoffDate >= date.getTime();
        });
    },
    findStartingMissons: (ctx) => {
        date.setSeconds(date.getSeconds() + 1);
        ctx.data = ctx.data.filter(async (el) => {
            const pickupDate = new Date(el.lpep_pickup_datetime);
            if((pickupDate.getTime() === date.getTime()) && validation.validateMission(el)) {
                const response = await externalServices.GoogleGetRoute(el.Pickup_latitude, el.Pickup_longitude, el.Dropoff_latitude, el.Dropoff_longitude);
                const googleRoute = mapper.mapGoogleRoute(response);
                const startingMission = Object.assign(
                    {}, 
                    el, 
                    {
                        id: uniqid(),
                        computeRoutes: googleRoute
                    }
                );
                ctx.client.emit('newStartingMission', startingMission);
                activeMissions.push(startingMission);
            }
            return pickupDate.getTime() >= date.getTime()
        });
    }
}