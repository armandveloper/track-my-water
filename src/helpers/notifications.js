const pushNotifications = require('../config/notifications');

// Notification format
// notification: {
//   title: "You have a new message",
//   body: "Hi!",
//   icon: "https://example.com/img/notification-icon.png",
//   deep_link: "https://example.com/messages?message_id=2342",
//   hide_notification_if_site_has_focus: true
// },

exports.sendNotification = (notif) => {
	pushNotifications
		.publishToInterests(['hello'], {
			web: {
				notification: {
					...notif,
				},
			},
		})
		.then((publishResponse) => {
			console.log('Just published:', publishResponse.publishId);
		})
		.catch((error) => {
			console.log('Error:', error);
		});
};
