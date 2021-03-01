const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
// Crear servidor
const app = express();
const server = require('http').createServer(app);
const SocketService = require('./services/socket.service');
const passport = require('./config/passport');

// Servicio de socket.io para emitir eventos
app.set('socketService', new SocketService(server));

// Middlewares
// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Procesar datos de formularios y json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
		}),
	})
);
app.use(flash());
// Inicializa Passport y middleware de sesiones
app.use(passport.initialize());
app.use(passport.session());
// Rutas de la app
app.use(require('./routes/index.route'));
// Endpoints (Rutas) de la API
app.use('/api', require('./routes/api.route'));

module.exports = server;
