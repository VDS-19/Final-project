"use strict";

/* Get or create the application global variable */
var App = App || {};
var z=0;

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
			// star.x = THREE.Math.randFloatSpread( data[i]['x'] );
			// star.y = THREE.Math.randFloatSpread( data[i]['Y']);
			// star.z = THREE.Math.randFloatSpread( data[i]['Z'] );
			// star.x = THREE.Math.randFloatSpread( 2000 );
			// 	star.y = THREE.Math.randFloatSpread( 2000 );
			// 	star.z = THREE.Math.randFloatSpread( 2000 );
			// 	console.log(star.x);
			
			star.x= data[i]['X']/1000;
			star.y =  data[i]['Y']/1000;
		    star.z =  data[i]['Z']/1000;
			// console.log(star.y);
		// 	// // if(Math.abs(star.x)<=radius/2&&Math.abs(star.y)<=height&&Math.abs(star.z)<=radius/2)
		// 	// {
			starsGeometry.vertices.push( star );
		// 	// 	if(data[i]['concentration']<=1)
				 starsGeometry.colors.push(new THREE.Color("#fcbba1"));
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
		var starsMaterial = new THREE.PointsMaterial( {size:0.07,vertexColors: true, side:THREE.DoubleSide,
		            sizeAttenuation: true} );
		var starField = new THREE.Points( starsGeometry, starsMaterial );
		sceneObject.add( starField );
		// console.log("hello");
		// plane.position.set(0, 5, z);
		// sceneObject.add(plane);
		// self.create2D();
		// 	// console.log("hello");
		// d3.select("#myRange").on("input", function(d) {
		// 	
		//       z = this.value / 100.0;
		//       // console.log(z);
		//       plane.position.set(0, 5, z);
		//       // zBounds[0] = ;
		//       // zBounds[1] = ;
		//       // console.log(z - 0.01 + "-" + z + 0.01);
		//       
		// 	  
		// 	  sceneObject.remove(plane);
		// 	  self.createParticleSystem();
		//     });
			
		
    };
	

//    self.create2D = function()
//    {
// 	   d3.select("svg").remove();
// 	   var points=[];
// 	   // plane.position.set(0, 5, z);
// 	   sceneObject.add(plane);
// 	   // console.log(z);
// 	   for ( var i = 0; i < data.length; i ++ ) {
// 		   
// 		   if((data[i]['Y'] >= z-0.05) && (data[i]['Y'] < z+0.05))
// 		   {
// 			   // console.log(z);
// 			   // console.log(data[i]['Z']);
// 		       points.push({"X": data[i]['X'], "Y": data[i]['Z'],"concentration":data[i]['concentration']});
// 		   }  
// 		   }
// 	   var screenx = d3.scaleLinear()
// 	       .range([0, 500]);
// 	   
// 	   var screeny = d3.scaleLinear()
// 	       .range([500, 0]);
// 	   var screensvg=d3.select("#screen")
// 	   				.append("svg")
// 	   				.attr("width",500)
// 	   				.attr("height", 500)
// 	   				.append("g")
// 	   				.attr("transform", "translate(5,5)");   
// 	   	screenx.domain([bounds.minX, bounds.maxX]);
// 	   	screeny.domain([bounds.minY, bounds.maxY]);
// 	   
// 	     screensvg.selectAll('circle')
// 	               .data(points)
// 	               .enter()
// 	               .append('circle')
// 	               .attr('class','point_value')
// 	               .attr("r", 3)
// 	               .attr('cx', function(d) { return screenx(d.X); })
// 	               .attr('cy', function(d) { return screeny(d.Y); })
// 	               .style('fill', function(d) { return "#ef3b2c"; });    
// 	   
// 	     // d3.select("#myRange").on("input", function(d) {
// 	     // 	
// 	     //       z = this.value / 100.0;
// 	     //       // console.log(z);
// 	     //       // plane.position.set(0, 5, z);
// 	     //       // zBounds[0] = ;
// 	     //       // zBounds[1] = ;
// 	     //       // console.log(z - 0.01 + "-" + z + 0.01);
// 	     //       self.create2D();
// 	     // 	  
// 	     //     });
//    };
// 





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