const mongoose = require('mongoose');

module.exports = async function connectDB() {
	try {
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('Se ha establecido la conexión con la base de datos');
	} catch (err) {
		console.log('Error al conectar con la BD:', err);
	}
};
