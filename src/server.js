const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const SocketService = require('./services/socket.service');

// Servicio de socket.io para emitir eventos
app.set('socketService', new SocketService(server));

// Middlewares
app.use(express.json());
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/api', require('./routes/index.route'));

module.exports = server;
