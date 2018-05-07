const request = require('request-promise');
const googleMap = require('@google/maps');
const polyline = require('polyline');

const keys = require('../config/keys');

const googleMapClient = googleMap.createClient({
    key: keys.googleApiKey,
    Promise: Promise
});

module.exports = {
    // OSRMGetRoute: async (coordinates) => {
    //     const options = {
    //         method: 'GET',
    //         url: `http://router.project-osrm.org/route/v1/car/${coordinates}`
    //     };
    //     return request(options);
    // }
    GoogleGetRoute: async (originLat, originLong, destinationLat, destinationLong) => {
        try {
            const response = await googleMapClient.directions({
                origin: `${originLat},${originLong}`,
                destination: `${destinationLat},${destinationLong}`,
                mode: 'driving',
            }).asPromise();
            return response.json;
        } catch(e) {
            console.log('ERROR ', e);
        }
    }
}; 

