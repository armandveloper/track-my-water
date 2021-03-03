const { request, response } = require('express');
const WaterTank = require('../models/WaterTank');
const { shouldNotifSend } = require('../helpers/notifications');

exports.renderHome = (req, res) => {
	res.render('index', {
		title: 'Monitoreo | Track My Water',
		pageName: 'home',
		ogTitle: 'Área de Monitoreo',
		ogDescription:
			'Track My Water es una aplicación para monitorear el nivel de agua de sus contenedores. En esta pantalla podrá ver en tiempo real cuál es el estado de éstos',
		ogUrl: `${res.locals.url}/`,
		ogImage: `${res.locals.url}/img/desktop-preview.png`,
	});
};

exports.renderRecords = (req, res) => {
	res.render('records', {
		title: 'Últimos Registros | Track My Water',
		pageName: 'records',
		ogTitle: 'Últimos Registros',
		ogDescription:
			'Mire un historial de los niveles registrados y determine cuál es su consumo de agua proemdio',
		ogUrl: `${res.locals.url}/registros`,
		ogImage: `${res.locals.url}/icons/icon-512x512.png`,
	});
};

exports.getRecords = async (req = request, res = response) => {
	try {
		const records = await WaterTank.find();
		res.json({ ok: true, records });
	} catch (err) {
		console.log(err);
		res.status(500).json({ ok: false, message: 'Error' });
	}
};

exports.getLastRecord = async (req = request, res = response) => {
	try {
		const record = await WaterTank.findOne(
			{},
			{},
			{ sort: { createdAt: -1 } }
		);
		res.json({ ok: true, record });
	} catch (err) {
		console.log(err);
		res.status(500).json({ ok: false, message: 'Error' });
	}
};

exports.recordWaterLevel = async (req = request, res = response) => {
	try {
		const { waterLevel } = req.body;
		const record = await WaterTank.create({
			waterLevel,
			createdAt: new Date(),
		});
		req.app.get('socketService').emiter('waterTank:change', record);
		shouldNotifSend(waterLevel);
		res.status(201).json({ ok: true, record });
	} catch (err) {
		console.log(err);
		res.status(500).json({ ok: false, message: 'Error' });
	}
};
