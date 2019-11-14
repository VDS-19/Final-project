var App = App || {};
const ParticleSystem = function() {
 const self = this;

    const self = this;
	const width = d3.select('.particleDiv').node().clientWidth;
	const height = width * 0.85;
	self.scene = new THREE.Scene();
	// self.scene.background = new THREE.Color( 0x000000 );
	// setup the camera
	self.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
	self.camera.position.set(0,2,20);
	self.camera.lookAt(0,0,0);
	self.camera.add(light);
	self.scene.add(self.camera);
	
};