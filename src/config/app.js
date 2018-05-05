const io = require('socket.io');

const missionsServices = require('../services/missionsServices');

const app = io();

app.on('connection', (client) => {
    console.log('Connected to socket.io, Client Id: ' + client.id);
    client.on('getMissions', async () => {
        let greenTaxiTripData = await missionsServices.parseAndSortCsvFile();
        setInterval(() => {
            missionsServices.findStartingMissons({ client, data: greenTaxiTripData });
            missionsServices.findFinishedMissions({ client });
        }, 1000);
    });
    
});


module.exports = app;