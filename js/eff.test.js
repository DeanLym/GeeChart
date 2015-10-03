// Our Javascript will go here.
var selectable_obj = [];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var canvas = document.getElementById("bubble_canvas");
var renderer = new THREE.WebGLRenderer({
  antialia: true,
  canvas: canvas,
  preserveDrawingBuffer: true} );
// var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x222222 );
document.body.appendChild( renderer.domElement );

raycaster = new THREE.Raycaster();

renderer.domElement.addEventListener('mousemove', onMouseMove, false);

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

var circles = [];
var radius = [];
var slopes = [];
var decay = [];
var dx = [];
var num_circles = 50;
var segments = 64;
var tstep = 0;

for(var i = 0;i<num_circles;i++){
  radius.push(Math.random()*0.2+0.1);
  dx.push(Math.random()*0.01+0.001);
  slopes.push(Math.random()*2+8);
  decay.push(Math.random()/100+0.99);
  circles.push(CreateCircle(radius[i],segments));
  circles[i].position.x = -5;
  circles[i].position.y = -5;
  circles[i].name = 'bubble ' + i;
  circles[i].rotationspeed = 0;
  circles[i].radius = radius[i];
  scene.add( circles[i] );
  selectable_obj.push(circles[i]);
}
scene.add(line3);

function CreateCircle(radius,segments){
  var circle_material = new THREE.MeshPhongMaterial( { color: 0x00cc22,wireframe: false,transparent: true, opacity: 0.4, side: THREE.DoubleSide } );
  var circleGeometry = new THREE.CircleGeometry( radius, segments );
  var circle = new THREE.Mesh( circleGeometry, circle_material );
  return circle;
}

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, 0, 10 );
scene.add( directionalLight );


// Try to add text
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

var data_labels = [], data_label_shape,data_label_geom, data_label;
for(var i = 0; i<num_circles;i++){
  data_label_shape = THREE.FontUtils.generateShapes( "AD-"+i+"H", {
    face: "Gentilis",
    size: 0.2
  } );
  data_label_geom = new THREE.ShapeGeometry( data_label_shape );
  data_label = new THREE.Mesh( data_label_geom, basic_material );
  data_label.position.z = 100;
  data_labels.push(data_label);
  scene.add(data_labels[i]);
}

camera.position.z = 7;
function render() {
  tstep ++;
  if (tstep < 1000){
    for(var i = 0;i<num_circles;i++){
      slopes[i] *= decay[i];
      var flag = circles[i].position.x<5 & circles[i].position.y<5;
      var bad = circles[i].position.x > circles[i].position.y;
      circles[i].position.x += flag?dx[i]:0;
      circles[i].position.y += flag?dx[i]*slopes[i]:0;
      if(bad){
        circles[i].material.color.setRGB (1, 0, 0);
        data_labels[i].position.x = circles[i].position.x;
        data_labels[i].position.y = circles[i].position.y;
        data_labels[i].position.z = circles[i].position.z + 0.01;
      }
    }
  }else{
    for(var i = 0;i<num_circles;i++){
      circles[i].rotation.x+=circles[i].rotationspeed;
      circles[i].rotation.y+=circles[i].rotationspeed;
    }
  }


  requestAnimationFrame( render );
  renderer.render( scene, camera );
}
render();
