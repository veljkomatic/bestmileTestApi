const request = require('request-promise');

module.exports = {
    OSRMGetRoute: async (coordinates) => {
        const options = {
            method: 'GET',
            url: `http://router.project-osrm.org/route/v1/car/${coordinates}`
        };
        return request(options);
    }
};