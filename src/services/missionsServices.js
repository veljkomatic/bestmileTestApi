const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

const externalServices = require('./externalServices');
const mapper = require('./mappers/mapGoogleRoute');

const date = new Date('01/01/2016 06:00:00 AM');

let activeMissions = [];

// const findStartingMissons = (data) => {
//     const startingMissions = [];
//     data = data.filter((element) => {
//         if(new Date(element.lpep_pickup_datetime).getTime() === date.getTime()) {
//             startingMissions.push(element)
//         }
//         return new Date(element.lpep_pickup_datetime).getTime() >= date.getTime()
//     });
//     return startingMissions;
// };

// const findRouteForStartingMissions = async (startingMissions) => {
//     for(let startingMission of startingMissions) {
//         try {
//             const response = await externalServices.GoogleGetRoute(startingMission.Pickup_latitude, startingMission.Pickup_longitude, startingMission.Dropoff_latitude, startingMission.Dropoff_longitude);
//             const res = JSON.parse(response);
//             startingMission.routes = res;
//             missions.push(startingMission);
//         } catch (error) {
//             console.log('Error', error);
//         }
//     }
// }

// const getActiveMissions = () => {
//     missions = missions.filter((element) => {
//         const pickupDate = new Date(element.lpep_pickup_datetime);
//         const dropoffDate = new Date(element.Lpep_dropoff_datetime);
//         return pickupDate.getTime() <= date.getTime() && dropoffDate >= date.getTime();
//     });
// }

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
    // getMissions: async (data) => {
    //     const missionLength = missions.length;
    //     date.setSeconds(date.getSeconds() + 1);
    //     const startingMissions = findStartingMissons(data);
    //     await findRouteForStartingMissions(startingMissions);
    //     getActiveMissions();
    //     const aMissions = {
    //         missions,
    //         emit: missionLength - missions.length === 0 ? false : true
    //     }
    //     return aMissions;
    // },
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
            if(pickupDate.getTime() === date.getTime()) {
                const response = await externalServices.GoogleGetRoute(el.Pickup_latitude, el.Pickup_longitude, el.Dropoff_latitude, el.Dropoff_longitude);
                const googleRoute = mapper.mapGoogleRoute(response);
                const startingMission = Object.assign({}, el, { computeRoutes: googleRoute });
                ctx.client.emit('newStartingMission', startingMission);
                activeMissions.push(startingMission);
            }
            return pickupDate.getTime() >= date.getTime()
        });
    }
}