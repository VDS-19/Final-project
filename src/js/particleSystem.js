"use strict";

/* Get or create the application global variable */
var App = App || {};
var time=0;

var ParticleSystem = function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    // data container
    var data = [];

    // scene graph group for the particle system
    var sceneObject = new THREE.Group();
	var plane;
    // bounds of the data
    var bounds = {};

    // create the containment box.
    // This cylinder is only to guide development.
    // TODO: Remove after the data has been rendered
    self.drawContainment = function() {

        // get the radius and height based on the data bounds
        var radius = (bounds.maxX - bounds.minX)/2.0 + 1;
        var height = (bounds.maxY - bounds.minY) + 1;

        // create a cylinder to contain the particle system
        var geometry = new THREE.CylinderGeometry( radius, radius, height, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
        var cylinder = new THREE.Mesh( geometry, material );

        // add the containment to the scene
        sceneObject.add(cylinder);
    };

    // creates the particle system
    self.createParticleSystem = function() {
		
		
		
        // use self.data to create the particle system
		// var radius = (bounds.maxX - bounds.minX)/2.0 + 1;
		// var height = (bounds.maxY - bounds.minY) + 1;
		 
		// var dotGeometry = new THREE.Geometry();
		// // console.log("wah t ");
		// for(var i=0;i<data.length;i++)
		// {
		// 	// console.log("hello");
		// 	dotGeometry.vertices.push(new THREE.Vector3( data[i]['X'], data[i]['Y'],data[i]['Z']));
		// 	var dotMaterial = new THREE.PointsMaterial( { size: 3, sizeAttenuation: false } );
		// 	var dot = new THREE.Points( dotGeometry, dotMaterial );
		// 	sceneObject.add( dot );
		// }
		// get the radius and height based on the data bounds
		// var radius = (bounds.maxX - bounds.minX)/2.0 + 1;
		// var height = (bounds.maxY - bounds.minY) + 1;
		// // console.log(bounds.maxX);
		// // console.log(height);
		// // create a cylinder to contain the particle system
		// // var geometry = new THREE.CylinderGeometry( radius, radius, height, 32 );
		// // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
		// // var cylinder = new THREE.Mesh( geometry, material );
		var starsGeometry = new THREE.Geometry();
		// 
		for ( var i = 0; i < data.length; i ++ ) {
		// 
			var star = new THREE.Vector3();
			
			
			star.x= data[i]['X']/700+data[i]['U']*time/1000;
			star.y =  data[i]['Y']/700+data[i]['V']*time/1000;
		    star.z =  data[i]['Z']/700+data[i]['W']*time/1000;
			// console.log(star.y);
		// 	// // if(Math.abs(star.x)<=radius/2&&Math.abs(star.y)<=height&&Math.abs(star.z)<=radius/2)
		// 	// {
			starsGeometry.vertices.push( star );
			// starsGeometry.computeBoundingSphere();
		// 	// 	if(data[i]['concentration']<=1)
				 starsGeometry.colors.push(new THREE.Color("#fcbba1"));
				 starsGeometry.vertices.size=0.0;
		// 	// 	else if(data[i]['concentration']<=2)
		// 	// 	 starsGeometry.colors.push(new THREE.Color("#fc9272"));
		// 	// 	else if(data[i]['concentration']<=3)
		// 	// 	 starsGeometry.colors.push(new THREE.Color("#fb6a4a"));
		// 	// 	  else if(data[i]['concentration']<=4)
		// 	// 	   starsGeometry.colors.push(new THREE.Color("#ef3b2c"));
		// 	// 	  else  if(data[i]['concentration']<=5)
		// 	// 	    starsGeometry.colors.push(new THREE.Color("#cb181d"));
		// 	// 		else if(data[i]['concentration']<=6)
		// 	// 		 starsGeometry.colors.push(new THREE.Color("#a50f15"));
		// 	// 		else
				// starsGeometry.colors.push(new THREE.Color("#67000d"));
		// 	// 		  
		// 	// }
		// 	
		// 
		}
		// var geometry = new THREE.PlaneGeometry(14,14);
		// var material = new THREE.MeshBasicMaterial( {color: "#ccebc5", side: THREE.DoubleSide} );
	 //    plane = new THREE.Mesh( geometry, material );
		// 
		var starsMaterial = new THREE.PointsMaterial( {size: 0.09,vertexColors: true, transparent: true, side:THREE.DoubleSide,
		            sizeAttenuation: true,opacity: 1} );
		var starField = new THREE.Points( starsGeometry, starsMaterial );
		// var light = new THREE.AmbientLight( 0x4040 ); // soft white light
		// sceneObject.add( light );
		sceneObject.add( starField );
		// console.log("hello");
		// plane.position.set(0, 5, z);
		// sceneObject.add(plane);
		self.create2D();
		// 	// console.log("hello");
		d3.select("#myRange").on("input", function(d) {
			
		      // z = this.value / 100.0;
		      // console.log(z);
		      // plane.position.set(0, 5, z);
		      // zBounds[0] = ;
		      // zBounds[1] = ;
		      // console.log(z - 0.01 + "-" + z + 0.01);
			  sceneObject.remove(starField);
			 time=this.value;
			 self.createParticleSystem();
			 
		   //    for(var i=0;i<starsGeometry.vertices.length;i++)
			  // {
				 //  starsGeometry.vertices[i].x=data[i]['X']/700+data[i]['U']*this.value;
				 //  starsGeometry.vertices[i].y=100;
				 //  starsGeometry.vertices[i].x=100;
				 // 
				 //  // console.log(data[i]['U']*this.value);
			  // }
			  // 
			  //  starField.starsGeometry= starsGeometry;
			  // // console.log("done");
			  // sceneObject.add(starField);
			  // starsGeometry = new THREE.Geometry();
			  // for ( var i = 0; i < data.length; i ++ ) {
				 //  star.x= data[i]['X']/700;
				 //  star.y =  data[i]['Y']/700;
				 //  star.z =  data[i]['Z']/700;
				 //  starsGeometry.vertices.push( star );
				 //  console.log(star.x);
				 //  // 	// 	if(data[i]['concentration']<=1)
				 //  		 starsGeometry.colors.push(new THREE.Color("#fcbba1"));
				 //  }
				 //  starsMaterial = new THREE.PointsMaterial( {size:0.07,vertexColors: true, transparent: true, side:THREE.DoubleSide,
				 //              sizeAttenuation: true,opacity: 1} );
					// starField = new THREE.Points( starsGeometry, starsMaterial );
					// 		  
				 //  sceneObject.add( starField );
				 //  return sceneObject;
			  // self.createParticleSystem();
		    });
			
			
			
		
    };
	

   self.create2D = function()
   {
	   d3.select("svg").remove();
	   var points=[];
	   
	   for ( var i = 0; i < data.length; i ++ ) {
		   
		 
			   // console.log(z);
			   // console.log(data[i]['X']/700+data[i]['U']*time/1000);
			   
		       points.push({"X": data[i]['X']/700+data[i]['U']*time/1000, "Y": data[i]['Y']/700+data[i]['V']*time/1000,"concentration":data[i]['concentration']});
		    
		   }
	   var screenx = d3.scaleLinear()
	       .range([0, 10000]);
	   
	   var screeny = d3.scaleLinear()
	       .range([10000, 0]);
	   var screensvg=d3.select("#screen")
	   				.append("svg")
	   				.attr("width",500)
	   				.attr("height", 500)
					
	   				.append("g")
	   				.attr("transform", "translate(5,5)");
					
					// .attr("background","blue")
	   	// screenx.domain([bounds.minX, -bounds.maxX]);
	   	// screeny.domain([bounds.minY, -bounds.maxY]);
	   // console.log(bounds.maxX);
	     screensvg.selectAll('circle')
	               .data(points)
	               .enter()
	               .append('circle')
	               .attr('class','point_value')
	               .attr("r", 2)
				   .attr("opacity",0.3)
	               .attr('cx', function(d) { return -screenx(d.X)/1000; })
	               .attr('cy', function(d) { return screeny(d.Y)/1000; })
	               .style('fill', function(d) { return "#ef3b2c"; });
					
				   
					
					 
	  
   };






    // data loading function
    self.loadData = function(file){

        // read the csv file
        d3.csv(file)
        // iterate over the rows of the csv file
            .row(function(d) {

                // get the min bounds
                bounds.minX = Math.min(bounds.minX || Infinity, d.x);
                bounds.minY = Math.min(bounds.minY || Infinity, d.y);
                bounds.minZ = Math.min(bounds.minZ || Infinity, d.z);

                // get the max bounds
                bounds.maxX = Math.max(bounds.maxX || -Infinity, d.x);
                bounds.maxY = Math.max(bounds.maxY || -Infinity, d.y);
                bounds.maxZ = Math.max(bounds.maxY || -Infinity, d.z);

                // add the element to the data collection
                data.push({
                    // concentration density
                    //concentration: Number(d.concentration),
                    // Position
                    X: Number(d.x),
                    Y: Number(d.y),
                    Z: Number(d.z),
                    // Velocity
                    U: Number(d.vx),
                    V: Number(d.vy),
                    W: Number(d.vz)
                });
            })
            // when done loading
            .get(function() {
                // draw the containment cylinder
                // TODO: Remove after the data has been rendered
                // self.drawContainment();

                // create the particle system
                self.createParticleSystem();
				// console.log("your message heer");
            });
    };

    // publicly available functions
    var publiclyAvailable = {

        // load the data and setup the system
        initialize: function(file){
            self.loadData(file);
        },

        // accessor for the particle system
        getParticleSystems : function() {
            return sceneObject;
        }
    };

    return publiclyAvailable;


};