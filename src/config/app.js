const io = require('socket.io');

const missionsServices = require('../services/missionsServices');

const app = io();

app.on('connection', (client) => {
    console.log('Connected to socket.io, Client Id: ' + client.id);
    client.on('getMissions', async () => {
        let greenTaxiTripData = await missionsServices.parseAndSortCsvFile();
        setInterval( async () => {
            const missions = await missionsServices.getMissions(greenTaxiTripData);
            client.emit('missions', missions);
        }, 1000);
    });
    
});


module.exports = app;