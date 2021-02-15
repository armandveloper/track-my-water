const PushNotifications = require('@pusher/push-notifications-server');

module.exports = new PushNotifications({
	instanceId: process.env.PUSHER_INSTANCE_ID,
	secretKey: process.env.PUSHER_KEY,
});
