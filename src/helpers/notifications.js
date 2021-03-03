const pushNotifications = require('../config/notifications');
/*
  Tipos o niveles de notificación
  1st < 50
  2nd < 25
  3rd = 0
  4th = 100
*/

let firstNotifSended = false,
	secondNotifSended = false,
	thirdNotifSended = false,
	fourthNotifSended = false;

sendNotification = (notif) => {
	pushNotifications
		.publishToInterests(['waterTank'], {
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

exports.shouldNotifSend = (waterLevel) => {
	const icon = `${process.env.SERVER_URL}/icons/icon-512x512.png`;
	if (waterLevel < 50 && waterLevel >= 25 && !firstNotifSended) {
		firstNotifSended = true;
		// Establece en false la cuarta notificación para que se notifique cuando se llene de nuevo
		fourthNotifSended = false;
		sendNotification({
			title: 'Queda menos del 50%',
			body: `A su contenedor de agua le queda ${waterLevel}% de su capacidad. Se aconseja tener cuidado en el consumo.`,
			icon,
		});
	} else if (waterLevel < 25 && waterLevel > 0 && !secondNotifSended) {
		secondNotifSended = true;
		sendNotification({
			title: 'Queda menos del 25%',
			body: `A su contenedor de agua le queda ${waterLevel}% de su capacidad. Se aconseja tener cuidado en el consumo`,
			icon,
		});
	} else if (waterLevel === 0 && !thirdNotifSended) {
		thirdNotifSended = true;
		sendNotification({
			title: 'El agua se agotó',
			body: 'El agua de su contenedor se ha agotado',
			icon,
		});
	} else if (waterLevel === 100 && !fourthNotifSended) {
		fourthNotifSended = true;
		// Reestablecer anteriores notificaciones a false para que de nuevo se envíen
		firstNotifSended = false;
		secondNotifSended = false;
		thirdNotifSended = false;
		sendNotification({
			title: 'Tanque lleno',
			body: 'Su contenedor está completamente lleno',
			icon,
		});
	}
};
