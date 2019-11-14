var App = App || {};

(function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    /* Entry point of the application */
    App.start = function()
    {
        // create a new scene, pass options as dictionary
        App.scene = new Scene({container:"scene"});

        // initialize the particle system
        const particleSystem = new ParticleSystem();
        particleSystem.initialize('data/sim.data.gro');

        //add the particle system to the scene
        App.scene.addObject( particleSystem.getParticleSystems());

        // render the scene
        App.scene.render();
		console.log("hello");

    };

}) ();
const Scene = function(options) {
	const self = this;
	const width = d3.select('.particleDiv').node().clientWidth;
	const height = width * 0.85;
	
	// create the scene
	self.scene = new THREE.Scene();
	self.scene.background = new THREE.Color( "#ffffff" );
	// setup the camera
	self.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
	self.camera.position.set(0,2,20);
	self.camera.lookAt(0,0,0);
	
	// Add a directional light to show off the objects
	const light = new THREE.DirectionalLight( "#000000", 0);
	// Position the light out from the scene, pointing at the origin
	light.position.set(0,2,20);
	light.lookAt(0,0,0);
	// add the light to the camera and the camera to the scene
	self.camera.add(light);
	self.scene.add(self.camera);
	
	// create the renderer
	self.renderer = new THREE.WebGLRenderer();
	
	// set the size and append it to the document
	self.renderer.setSize( width, height );
	document.getElementById(options.container).appendChild( self.renderer.domElement );
	self.public = {
	
	    resize: function() {
	
	    },
	
	    addObject: function(obj) {
	        self.scene.add( obj );
	    },
	
	    render: function() {
	        requestAnimationFrame( self.public.render );
	        self.renderer.render( self.scene, self.camera );
	    }
	
	};
	
	return self.public;
};
const ParticleSystem = function() {
	const sceneObject = new THREE.Group();
	self.loadData = function(file){
	
	 
	           
		};
	self.public = {
	
	    // load the data and setup the system
	    initialize: function(file){
	        self.loadData(file);
	    },
	
	    // accessor for the particle system
	    getParticleSystems : function() {
	        return sceneObject;
	    }
	};
	
	return self.public;
	
};
