const request = require('request-promise');
const googleMap = require('@google/maps');
const polyline = require('polyline');
const logger = require('winston');

const keys = require('../config/keys');

const googleMapClient = googleMap.createClient({
    key: keys.googleApiKey,
    Promise: Promise
});

module.exports = {
    GoogleGetRoute: async (originLat, originLong, destinationLat, destinationLong) => {
        try {
            const response = await googleMapClient.directions({
                origin: `${originLat},${originLong}`,
                destination: `${destinationLat},${destinationLong}`,
                mode: 'driving',
            }).asPromise();
            return response.json;
        } catch(e) {
            logger.info(`GoogleGetRoute ERROR: ${JSON.stringify(e)}`);
        }
    }
};
