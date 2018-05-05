const request = require('request-promise');

module.exports = {
    // OSRMGetRoute: async (coordinates) => {
    //     const options = {
    //         method: 'GET',
    //         url: `http://router.project-osrm.org/route/v1/car/${coordinates}`
    //     };
    //     return request(options);
    // }
    GoogleGetRoute: async (originLat, originLong, destinationLat, destinationLong) => {
        const options = {
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLong}&destination=${destinationLat},${destinationLong}&key=AIzaSyCMF_f2JNNOBQUGyzQ7x5cwXELCj6GhTJI`
        };
        return request(options);
    }
};

