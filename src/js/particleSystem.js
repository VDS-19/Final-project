"use strict";


/* Get or create the application global variable */
var App = App || {};
var time=0;
var animate = true

var colorSequence = d3.scaleSequential(d3.interpolateBlues).domain([0, 100]);

var ParticleSystem = function() {

    // setup the pointer to the scope 'this' variable
    var self = this;
	var heaton=1;
    // data container
    var data = [];

    // scene graph group for the particle system
    var sceneObject = new THREE.Group();
	var plane;
    // bounds of the data
	var bounds = {};
	
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
					W: Number(d.vz),
					// Velocity
                    AX: Number(d.ax),
                    AY: Number(d.ay),
					AZ: Number(d.az),

					phi: d.phi,
					ident: d.ident,
					
					
                });
			})
            // when done loading
            .get(function() {
               
                self.createParticleSystem();
				// console.log("your message heer");
			});
    };


    // create the containment box.
    // This cylinder is only to guide development.
    // TODO: Remove after the data has been rendered
    // self.drawContainment = function() {

    //     // get the radius and height based on the data bounds
    //     var radius = (bounds.maxX - bounds.minX)/2.0 + 1;
    //     var height = (bounds.maxY - bounds.minY) + 1;

    //     // create a cylinder to contain the particle system
    //     var geometry = new THREE.CylinderGeometry( radius, radius, height, 32 );
    //     var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
    //     var cylinder = new THREE.Mesh( geometry, material );

    //     // add the containment to the scene
    //     sceneObject.add(cylinder);
	// };
	

    // creates the particle system
    self.createParticleSystem = function() {
		// console.log(bounds.minX) // -27388.8633
		// console.log(bounds.minY) // -27388.6816
		// console.log(bounds.minZ) // -27389.4609
		// console.log(bounds.maxX) // -12436.5742
		// console.log(bounds.maxY) // 27388.9785
		// console.log(bounds.maxZ) // 27388.9785
		
		
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
		// var distances = []
		// for ( var i = 0; i < data.length; i ++ ) {
		// 	var star = new THREE.Vector3();
		// 	star.x= data[i]['X']/700+data[i]['U']*time/1000+1/2*data[i]['AX']*time*time/10000000;
		// 	star.y =  data[i]['Y']/700+data[i]['V']*time/1000+1/2*data[i]['AY']*time*time/10000000;
		// 	star.z =  data[i]['Z']/700+data[i]['W']*time/1000+1/2*data[i]['AZ']*time*time/10000000;
		// 	var distance = Math.sqrt(star.x*star.x + star.y*star.y + star.z*star.z);
		// 	distances.push(distance) // Min: 34.790 Max: 66.313
			
		// }
		// console.log(Math.max.apply(null, distances))

		for ( var i = 0; i < data.length; i ++ ) {
		// 
			var star = new THREE.Vector3();
			
			
			star.x= data[i]['X']/700+data[i]['U']*time/1000+1/2*data[i]['AX']*time*time/10000000;
			star.y =  data[i]['Y']/700+data[i]['V']*time/1000+1/2*data[i]['AY']*time*time/10000000;
			star.z =  data[i]['Z']/700+data[i]['W']*time/1000+1/2*data[i]['AZ']*time*time/10000000;
			
			starsGeometry.vertices.push( star );
			// starsGeometry.computeBoundingSphere();
			// 	// 	if(data[i]['concentration']<=1)
			var distance = Math.sqrt(star.x*star.x + star.y*star.y + star.z*star.z);
			var color = new THREE.Color();
			// console.log((data[i]['X']-bounds.minX)/(bounds.maxX-bounds.minX)*100)
			// color.set(colorSequence((data[i]['X']-bounds.minX)/(bounds.maxX-bounds.minX)*100));
			color.set(colorSequence((distance-34.790)/(66.313-34.790)*100));
			starsGeometry.colors.push(color);
			// starsGeometry.colors.push(new THREE.Color("#fcbba1"));
			// /
	
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
		if(heaton==1)
		self.create2D();
		else
		self.createHeatMap();
		// 	// console.log("hello");
		d3.select("#myRange").on("input", function(d) {
			
		      
			sceneObject.remove(starField);
			time=this.value;
			self.createParticleSystem();
			document.getElementById("range_input").value = time
			animate = false
			 
		   
			});
		// Get the input field
		var input = document.getElementById("range_input");

		// Execute a function when the user releases a key on the keyboard
		input.addEventListener("keyup", function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Cancel the default action, if needed
			event.preventDefault();
			
			sceneObject.remove(starField);
			 time=input.value;
			 self.createParticleSystem();
			 document.getElementById("myRange").value = time
			 animate = false
			
		}
		});

		document.getElementById("Goto").onclick = function () { 
			var input = document.getElementById("range_input"); 
			sceneObject.remove(starField);
			 time=input.value;
			 self.createParticleSystem();
			 document.getElementById("myRange").value = time
			 animate = false
		};		
		
	};
	
	var timeinterval = 0.5
	var inst = setInterval(change, timeinterval*1000);
	var counter = 0;

	function change() {
		if (animate == true) {
			time=counter;
			self.createParticleSystem();
			document.getElementById("myRange").value = time
			document.getElementById("range_input").value = time
			
			counter++;
			if (counter >= 100) {
				counter = 0;
			}
		}
		};


   self.create2D = function()
   {
	   heaton=1;
	   d3.select("svg").remove();
	   var points=[];
	   
	   for ( var i = 0; i < data.length; i ++ ) {
		   

		       points.push({"X": data[i]['X']/700+data[i]['U']*time/1000, "Y": data[i]['Y']/700+data[i]['V']*time/1000,"concentration":data[i]['concentration']});
		    
		   }
	   var screenx = d3.scaleLinear()
	       .range([0, 10000]);
	   
	   var screeny = d3.scaleLinear()
	       .range([10000, 0]);
	   var screensvg=d3.select("#screen")
	   				.append("svg")
	   				.attr("width",400)
	   				.attr("height", 400)
	   				.append("g")
	   				.attr("transform", "translate(5,5)");
					
	     screensvg.selectAll('circle')
	               .data(points)
	               .enter()
	               .append('circle')
	               .attr('class','point_value')
	               .attr("r", 2)
				   .attr("opacity",0.04)
	               .attr('cx', function(d) {return -screenx(d.X)/1000; })
	               .attr('cy', function(d) {return screeny(d.Y)/1000; })
	               .style('fill', function(d) { return "#ef3b2c"; });
					
				   d3.select("#dotMap").on("click", function(d) {
				   		
				   	     
				   		 self.create2D();
				   		 
				   	  
				   	    });	
				   d3.select("#heatMap").on("click", function(d) {
				   		
				   	     
				   		
				   		 self.createHeatMap();
				   		 
				   	  
				   	    });	
						
		self.createHeatMap=function()
		{
			heaton=0;
			 d3.select("svg").remove();
			 var points=[];
			 for(var i=0;i<2500;i++)
			 {
			 	 points[i]={color: Number(0), Y: Math.round(i/50)+1, X:i%50+1};
			 }
			 var screenx = d3.scaleLinear()
			     .range([0, 400]);
			 
			 var screeny = d3.scaleLinear()
			     .range([400, 0]);
			 for ( var i = 0; i < data.length; i ++ ) 
			 {
				 
			 	var x=-(data[i]['X']/700+data[i]['U']*time/1000);
			 			 
			 	var y=-(data[i]['Y']/700+data[i]['V']*time/1000);
				
				var pos=Math.round(y*50+y);
				
				if(pos<2500&&pos>0)
				{
					points[pos]['color']=Number(points[pos]['color'])+Number(1);
					// console.log(pos);
				}

					
					
			 }
			 
			 var screensvg=d3.select("#screen")
			 				.append("svg")
							.on("mouseover", handleMouseOver)
							.on("mouseout", handleMouseOut)
			 				.attr("width",400)
			 				.attr("height", 400)
			 				.append("g")
			 				.attr("transform", "translate(5,5)");
			var myGroups =[];
			var myVars =[];
			
			for(var i=1;i<=50;i++) 	
							{
								myGroups[i-1]=i;
								myVars[i-1]=i;
							}
			
				
				var x = d3.scaleBand()
				  .range([ 0, 400 ])
				  .domain(myGroups)
				  
				screensvg.append("g")
				  .attr("transform", "translate(0," + 400 + ")")
				  .call(d3.axisBottom(x))
				var y = d3.scaleBand()
				  .range([ 400, 0 ])
				  .domain(myVars)
				  
				screensvg.append("g")
				  .call(d3.axisLeft(y))
				

						 
				screensvg.selectAll()
					.data(points)
					.enter()
					.append("rect")
					.attr("x", function(d) { return x(d.X) })
					.attr("y", function(d) { return y(d.Y) })
					.attr("width", 10)
					.attr("height", 10 )
					
					.style("fill", function(d) { 
						// console.log(d.color);
						if(d.color<1)
						return "#feebe2";
						else if (d.color<10)
						return "#fbb4b9";
						else if (d.color<30)
						return "#f768a1";
						else if (d.color<40)
						return "#c51b8a";
						
						else
						return "#7a0177";
						
					} )
					d3.select("#dotMap").on("click", function(d) {
							
						     
							 self.create2D();
							 
						  
						    });	
					d3.select("#heatMap").on("click", function(d) {
							
						     
							
							 self.createHeatMap();
							 
						  
						    });	
							
					function handleMouseOver(d, i) {
						 // self.createFlot();
						}
					function handleMouseOut(d, i) {
						// console.log("byebye");
						}
					
		};
		self.createFlot=function()
		{
			
			
			
		};
		
		
		self.createPhi=function()
		{
			var screensvg=d3.select("#Phiscreen")
							.append("svg")
							.attr("width",10000)
							.attr("height", 10000)
							.append("g")
							.attr("transform", "translate(5,5)");
							
			screensvg.selectAll('circle')
			          .enter()
			          .append('circle')
			          .attr('class','point_value')
			          .attr("r", 100000)
			          .attr('cx', function(d) {return 300 })
			          .attr('cy', function(d) {return 300})
			          .style('fill', function(d) { return "#ef3b2c"; });
		};
					 
	  
   };






    

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