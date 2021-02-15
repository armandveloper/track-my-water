const { Schema, model } = require('mongoose');

const waterTankSchema = new Schema({
	waterLevel: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
});

module.exports = model('WaterTank', waterTankSchema);
