const { request, response } = require('express');
const WaterTank = require('../models/WaterTank');

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
		res.status(201).json({ ok: true, record });
	} catch (err) {
		console.log(err);
		res.status(500).json({ ok: false, message: 'Error' });
	}
};
