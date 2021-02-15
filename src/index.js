require('dotenv').config();
const app = require('./server');
const connectDB = require('./config/database');

connectDB();

app.listen(process.env.PORT, () =>
	console.log('Servidor escuchando en el puerto', process.env.PORT)
);
