function DrawAreaChart(){


// Our Javascript will go here.
var selectable_obj = [];
var clock = new THREE.Clock();
var scene = new THREE.Scene();
var container = document.getElementById("area_chart");
var camera = new THREE.PerspectiveCamera( 45, container.offsetWidth / container.offsetHeight, 1, 1000 );
camera.position.z = 15;

//var camera = new THREE.OrthographicCamera( -5, 5, 5, -5, 0, 10 );

//var canvas = document.getElementById("bubble_canvas");

var renderer = new THREE.WebGLRenderer({
  antialias : true,
  //canvas: canvas,
  preserveDrawingBuffer: true} );
  // var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x222222 );
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  console.log(container.offsetWidth,' ',container.offsetHeight);
  container.appendChild( renderer.domElement );

  raycaster = new THREE.Raycaster();

  renderer.domElement.addEventListener('mousemove', onMouseMove, false);

//  var controls = new THREE.TrackballControls(camera,render.domElement);
  // var controls = new THREE.FirstPersonControls(camera);
  // controls.movementSpeed = 0.1;
  // controls.lookSpeed = 0.05;
  // controls.noFly = true;
  // controls.lookVertical = false;

  //stats
  var stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.zIndex = 100;
  document.body.appendChild( stats.domElement );

  var box = new THREE.BoxGeometry( 1, 1, 1 );
  var basic_material = new THREE.MeshBasicMaterial( { color: 0xffffff,wireframe: false } );
  var cube = new THREE.Mesh( box, basic_material );

  var line_material = new THREE.LineBasicMaterial({
    color: 0xffffff
  });
  var line_material2 = new THREE.LineBasicMaterial({
    color: 0xff8888
  });

  var line_geometry1 = new THREE.Geometry();
  line_geometry1.vertices.push(
    new THREE.Vector3( -5, -5, 0 ),
    new THREE.Vector3( -5, 5, 0 )
  );
  var line1 = new THREE.Line( line_geometry1, line_material );


  var line_geometry2 = new THREE.Geometry();
  line_geometry2.vertices.push(
    new THREE.Vector3( -5, -5, 0.001 ),
    new THREE.Vector3( 5, -5, 0.001 )
  );
  var line2 = new THREE.Line( line_geometry2, line_material );


  var line_geometry3 = new THREE.Geometry();
  line_geometry3.vertices.push(
    new THREE.Vector3( -5, -5, 0.001 ),
    new THREE.Vector3( 5, 5, 0.001 )
  );
  var line3 = new THREE.Line( line_geometry3, line_material2 );


  scene.add(line1);
  scene.add(line2);
  scene.add(line3);

  //
  // var circles = [];
  // var num_circles = 200;
  // var segments = 64;
  //
  // for(var i = 0;i<num_circles;i++){
  //   var this_radius = Math.random()*0.2+0.1;
  //   circles.push(CreateCircle(this_radius,segments));
  //   circles[i].position.x = -5;
  //   circles[i].position.y = -5;
  //   circles[i].position.z = 0.5*(Math.random()-0.5);
  //
  //   circles[i].name = "AD-"+i+"-H";
  //   circles[i].rotationspeed = 0.0;
  //   circles[i].opacityfreq = 0;
  //   circles[i].bad = false;
  //   circles[i].radius = this_radius;
  //
  //   circles[i].dx = Math.random()*0.02+0.002;
  //   circles[i].slopes = Math.random()*3+7;
  //   circles[i].decay = (Math.random()/50+0.98);
  //
  //
  //   scene.add( circles[i] );
  //   selectable_obj.push(circles[i]);
  // }

  //
  // circles.forEach(function(circle){
  //
  //   var data_label_shape = THREE.FontUtils.generateShapes( circle.name, {
  //     face: "Gentilis",
  //     size: 0.2
  //   });
  //   var data_label_geom = new THREE.ShapeGeometry( data_label_shape );
  //
  //   circle.data_label = new THREE.Mesh( data_label_geom, basic_material );
  //   circle.data_label.visible = false;
  //   scene.add(circle.data_label);
  //
  // });


  // function CreateCircle(radius,segments){
  //   var circle_material = new THREE.MeshPhongMaterial( { color: 0x00cc22,wireframe: false,transparent: true, opacity: 0.4, side: THREE.DoubleSide } );
  //   var circleGeometry = new THREE.CircleGeometry( radius, segments );
  //   var circle = new THREE.Mesh( circleGeometry, circle_material );
  //   return circle;
  // }
  var num_data = 1500;

  line_data_x = Array.apply(null, {length: num_data}).map(Number.call, Number);
  var line_data_y = line_data_x.map(function(d){return Math.sin(d);});

  var rectLength = 1, rectWidth = 0.5;

  var rectShape = new THREE.Shape();
  rectShape.moveTo( 0,0 );
  rectShape.lineTo( 0, rectWidth );
  rectShape.lineTo( rectLength, rectWidth );
  rectShape.lineTo( rectLength, 0 );
  rectShape.lineTo( rectLength, -rectWidth );
  rectShape.lineTo( 2*rectLength, -rectWidth );
  rectShape.lineTo( 2*rectLength, 0 );
  rectShape.lineTo( 0, 0 );

  var rectGeom = new THREE.ShapeGeometry( rectShape );
  var rectMesh = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;

  scene.add( rectMesh );

  var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set( 0, 0, 10 );
  scene.add( directionalLight );

  var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight2.position.set( 0, 0, -10 );
  scene.add( directionalLight2 );

  // Try to add text
  // var shapes, geom, mat, mesh;
  //
  // shapes = THREE.FontUtils.generateShapes( "Hello world", {
  //   face: "helvetiker",
  //   // font: "trebuchet ms",
  //   //weight: "bold",
  //   size: 10
  // } );
  // geom = new THREE.ShapeGeometry( shapes );
  // mat = new THREE.MeshBasicMaterial();
  // mesh = new THREE.Mesh( geom, mat );
  // scene.add(mesh);
  //
  var xlabel_shapes, xlabel_geom, xlabel;

  xlabel_shapes = THREE.FontUtils.generateShapes( "Cumulative Water (STB)", {
    face: "Gentilis",
    // font: "trebuchet ms",
    //weight: "bold",
    size: 0.2
  } );
  xlabel_geom = new THREE.ShapeGeometry( xlabel_shapes );
  xlabel = new THREE.Mesh( xlabel_geom, basic_material );
  xlabel.position.x = -1.5;
  xlabel.position.y = -5.3;
  scene.add(xlabel);

  var ylabel_shapes, ylabel_geom, ylabel;

  ylabel_shapes = THREE.FontUtils.generateShapes( "Cumulative Oil (STB)", {
    face: "Gentilis",
    size: 0.2
  } );
  ylabel_geom = new THREE.ShapeGeometry( ylabel_shapes );
  ylabel = new THREE.Mesh( ylabel_geom, basic_material );
  ylabel.rotation.z = 3.1415926/2;
  ylabel.position.x = -5.2;
  ylabel.position.y = -1;
  scene.add(ylabel);


  function render() {

    var time = clock.getElapsedTime();

    // circles.forEach(function(circle){
    //
    //   if (time < 8){
    //
    //     circle.slopes *= circle.decay;
    //     var flag = circle.position.x<5 & circle.position.y<5;
    //     circle.bad = circle.position.x > circle.position.y;
    //     circle.position.x += flag?circle.dx:0;
    //     circle.position.y += flag?circle.dx*circle.slopes:0;
    //
    //     if (circle.bad) {
    //       circle.material.color.setRGB (1, 0, 0);
    //       circle.data_label.visible = true;
    //     }
    //
    //   } else {
    //     //circles[i].rotation.x+=circles[i].rotationspeed;
    //     //circles[i].rotation.y+=circles[i].rotationspeed;
    //   }
    //
	  // if(circle.opacityfreq!==0){
    //       circle.material.opacity = 0.6-0.4*Math.cos(time*circle.opacityfreq);
    //    } else {
    //       circle.material.opacity = 0.4;
    //    }
    //
    //   if(circle.data_label.visible){
    //     circle.data_label.position.x = circle.position.x;
    //     circle.data_label.position.y = circle.position.y;
    //     circle.data_label.position.z = circle.position.z + 0.01;
    //   }

    // });


    requestAnimationFrame( render );
//    controls.update();
    stats.update();
    renderer.render( scene, camera );
  }

  render();


  function onMouseMove( event )
  {
  	// uncomment the following line would stop any other event handler from firing
  	event.preventDefault();

    var mouse = new THREE.Vector2(
      (event.offsetX / renderer.domElement.clientWidth  ) * 2 - 1,
     -(event.offsetY / renderer.domElement.clientHeight ) * 2 + 1);

     //console.log(event.offsetX, event.offsetY);
     //console.log(mouse.x, mouse.y);

  	raycaster.setFromCamera( mouse, camera );

  	// find intersections with objects in a pre-defined objectList
  	var intersects = raycaster.intersectObjects( selectable_obj );

  	// if there is one (or more) intersections
  	if ( intersects.length > 0 ){
  		//console.log(intersects.length);
  		//console.log("Hit @ " + intersects[0].object.name);

      // resetbubble(selectable_obj);

      // highlightbubble(intersects[0].object);

  	} else {

  //		console.log("Hit blank");

  	}

  }
  //
  // function highlightbubble(obj){
  //   obj.rotationspeed = 0.0;
  //   obj.material.opacity = 1;
  //
  //   obj.geometry.dispose();
  //   obj.geometry = new THREE.CircleGeometry( obj.radius*1.5, segments );
  // 	obj.opacityfreq = 5;
  //
  // 	obj.data_label.visible = true;
  //
  // }
  //
  // function resetbubble(obj_list){
  //   obj_list.forEach(function(obj){
  //     obj.rotationspeed = 0.0;
  //
  //     if (obj.material.opacity>0.4){
  //
  //         obj.geometry.dispose();
  //         obj.geometry = new THREE.CircleGeometry( obj.radius, segments );
  //
  //     }
  // 		obj.opacityfreq = 0;
  //     obj.material.opacity = 0.4;
  //
  // 		if(!obj.bad) {
  // 			obj.data_label.visible = false;
  // 		}
  //
  //   });
  // }

}

DrawAreaChart();
