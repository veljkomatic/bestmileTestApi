const io = require('socket.io');

const missionsServices = require('../services/missionsServices');

const app = io();

app.on('connection', (client) => {
    console.log('Connected to socket.io, Client Id: ' + client.id);
    client.on('getMissions', async () => {
        let greenTaxiTripData = await missionsServices.parseAndSortCsvFile();
        setInterval( async () => {
            const activeMissions = await missionsServices.getMissions(greenTaxiTripData);
            if(activeMissions.emit) {
                client.emit('missions', activeMissions.missions);
            }
        }, 1000);
    });
    
});


module.exports = app;