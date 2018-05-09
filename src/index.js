var http = require('http');
var app = require('express')();
const httpServer = http.createServer(app);

const io = require('socket.io').listen(httpServer);
const logger = require('winston');

const missionsServices = require('./services/missionsServices');

let greenTaxiTripData;
let missions;

io.on('connection', (socket) => {
    logger.info('Connected to socket.io, Socket Id: ' + socket.id);
    socket.on('getMissions', async () => {
        missions = setInterval(() => {
            missionsServices.findStartingMissons({ socket, data: greenTaxiTripData });
            missionsServices.findFinishedMissions({ socket });
        }, 1000);
    });

    socket.on('disconnect', function () {
        clearInterval(missions);
    });
});

const server = httpServer.listen(8000);

server.on('listening', async () => {
    greenTaxiTripData = await missionsServices.parseAndSortCsvFile();
    console.log('Application started 8000')
});