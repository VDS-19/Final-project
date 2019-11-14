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
        particleSystem.initialize("./data/cal.csv");

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
	const light = new THREE.DirectionalLight( "#ffffff", 1.5);
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
	self.controls = new THREE.OrbitControls( self.camera, self.renderer.domElement );
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
	const data = [];
	// setup the pointer to the scope 'this' variable
	const self = this;
	 var bounds = {};
	// data container
	// const data = [];
	self.loadData = function(file){
			
			d3.csv("./data/cal.csv")
			.row(function(d) {
			    // get the min bounds
				
			    bounds.minX = Math.min(bounds.minX || Infinity, d.X);
			    bounds.minY = Math.min(bounds.minY || Infinity, d.Y);
			    bounds.minZ = Math.min(bounds.minZ || Infinity, d.Z);
			
			    // get the max bounds
			    bounds.maxX = Math.max(bounds.maxX || -Infinity, d.X);
			    bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Y);
			    bounds.maxZ = Math.max(bounds.maxY || -Infinity, d.Z);
			
			    // add the element to the data collection
				
			    data.push({
			        // concentration density
			        // concentration: Number(d.concentration),
			        // Position
					
			        X: Number(d.X),
			        Y: Number(d.Y),
			        Z: Number(d.Z),
			        // Velocity
			        U: Number(d.Vx),
			        V: Number(d.Vy),
			        W: Number(d.Vz),
					
					type: d.Type,
					system: d.System
			    });
				
			})
			.get(function() {
			    // draw the containment cylinder
			    // TODO: Remove after the data has been rendered
			    // self.drawContainment();
			
			    // create the particle system
			    self.createParticleSystem();
				// console.log("hello");
			});
			
			
	           
		};
		self.createParticleSystem = function() {
			var starsGeometry = new THREE.Geometry();
			for ( var i = 0; i < data.length; i ++ ) 
			{
				var star = new THREE.Vector3();
				star.x= data[i]['X'];
				star.y =  data[i]['Z'];
				star.z =  data[i]['Y'];
				
				// console.log("hello");
				// star.x = THREE.Math.randFloatSpread( 2000 );
				// 	star.y = THREE.Math.randFloatSpread( 2000 );
				// 	star.z = THREE.Math.randFloatSpread( 2000 );
				starsGeometry.vertices.push( star );
				// console.log(star.y);
				
				starsGeometry.colors.push(new THREE.Color("#67000d"));
				}
				
				
				var geometry = new THREE.PlaneGeometry(14,14);
				var material = new THREE.MeshBasicMaterial( {color: "#ccebc5", side: THREE.DoubleSide} );
				plane = new THREE.Mesh( geometry, material );
				
				var starsMaterial = new THREE.PointsMaterial( {size:0.1,vertexColors: true, side:THREE.DoubleSide,
				    sizeAttenuation: true} );
					
				// var starsMaterial = new THREE.PointsMaterial( { size:0.05,color: 0x888888 } );
				var starField = new THREE.Points( starsGeometry, starsMaterial );
				sceneObject.add( starField );
				// console.log("hello");
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
