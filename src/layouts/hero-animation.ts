export default function heroAnimation () {
  const heroAnimationContainer = document.getElementById('hero-animation');
	const profileImage = document.querySelector('.profile-image');
	if (screen.width >= 1100) {
		heroAnimationContainer?.addEventListener('mousemove', (ev) => {
			(profileImage as HTMLElement).style.transform = 'translateZ(4rem)';
			const x = (window.innerWidth - 2 * ev.pageX) / 100;
			const y = (window.innerHeight - 2 * ev.pageY) / 100;
			(heroAnimationContainer as HTMLElement).style.transform = `perspective(1100px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1, 1, 1)`;
		})
		heroAnimationContainer?.addEventListener('mouseout', () => {
			(profileImage as HTMLElement).style.transform = 'translateZ(0)';
			(heroAnimationContainer as HTMLElement).style.transform = 'perspective(1100px) scale(1) rotateX(0) rotateY(0)';
		})
	} else {
		const initDeviceOrientation = () => {
			if (window.DeviceOrientationEvent) {
				window.addEventListener('deviceorientation', (event) => {
					const { beta, gamma } = event;
					// @ts-ignore
					const x = gamma / 5; const y = beta / 5;
					(profileImage as HTMLElement).style.transform = 'translateZ(4rem)';
					(heroAnimationContainer as HTMLElement).style.transform = `perspective(1100px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1, 1, 1)`;
				});
				window.addEventListener('devicemotion', (event) => {
					const acceleration = event.acceleration;
					// @ts-ignore
					if (Math.abs(acceleration.x) < 0.1 && Math.abs(acceleration.y) < 0.1) {
						(profileImage as HTMLElement).style.transform = 'translateZ(0)';
						(heroAnimationContainer as HTMLElement).style.transform = 'perspective(1100px) scale(1) rotateX(0) rotateY(0)';
					}
				});
			} else {
				console.warn('The device does not support the DeviceOrientation event.');
			}
		}
		heroAnimationContainer?.addEventListener('click', async () => {
			if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
				try {
					const permissionState = await (DeviceOrientationEvent as any).requestPermission();
					if (permissionState === 'granted') {
						initDeviceOrientation();
					} else {
						const permissionDeniedAlert = {
							'/en/': 'Permission to access the gyroscope has been denied.',
							'/pt/': 'Permissão para acessar o giroscópio foi negada.',
							'/es/': 'Se ha denegado el permiso para acceder al giroscopio.'
						};
						const permissionDeniedAlertMessage = permissionDeniedAlert[location.pathname as '/en/' | '/pt/' | '/es/'];
						alert(permissionDeniedAlertMessage);
					}
				} catch (error) {
					console.error('Error requesting permission for DeviceOrientationEvent:', error);
				}
			} else {
				initDeviceOrientation();
			}
		})
	}
}