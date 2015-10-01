// Our Javascript will go here.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff );
document.body.appendChild( renderer.domElement );
var box = new THREE.BoxGeometry( 1, 1, 1 );
var basic_material = new THREE.MeshBasicMaterial( { color: 0xcc8822,wireframe: true } );
var cube = new THREE.Mesh( box, basic_material );

var line_material = new THREE.LineBasicMaterial({
  color: 0x000000
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
var num_circles = 200;
var segments = 64;
var tstep = 0;

for(var i = 0;i<num_circles;i++){
radius.push(Math.random()*0.2+0.1);
dx.push(Math.random()*0.01+0.001);
slopes.push(Math.random()*2+3);
decay.push(Math.random()/100+0.99);
circles.push(CreateCircle(radius[i],segments));
circles[i].position.x = -5;
circles[i].position.y = -5;
scene.add( circles[i] );
}
scene.add(line3);
function CreateCircle(radius,segments){
var circle_material = new THREE.MeshPhongMaterial( { color: 0x00cc22,wireframe: false } );
var circleGeometry = new THREE.CircleGeometry( radius, segments );
var circle = new THREE.Mesh( circleGeometry, circle_material );
return circle;
}

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 0, 0, 10 );
scene.add( directionalLight );

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
    }
  }
}else{
    for(var i = 0;i<num_circles;i++){
      circles[i].rotation.x+=0.01;
      circles[i].rotation.y+=0.01;
    }
}


  requestAnimationFrame( render );
  renderer.render( scene, camera );
}
render();
