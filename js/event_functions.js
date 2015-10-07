//
// function onMouseMove( event )
// {
// 	// uncomment the following line would stop any other event handler from firing
// 	event.preventDefault();
//
//   var mouse = new THREE.Vector2(
//     (event.offsetX / renderer.domElement.clientWidth  ) * 2 - 1,
//    -(event.offsetY / renderer.domElement.clientHeight ) * 2 + 1);
//
//    //console.log(event.offsetX, event.offsetY);
//    //console.log(mouse.x, mouse.y);
//
// 	raycaster.setFromCamera( mouse, camera );
//
// 	// find intersections with objects in a pre-defined objectList
// 	var intersects = raycaster.intersectObjects( selectable_obj );
//
// 	// if there is one (or more) intersections
// 	if ( intersects.length > 0 ){
// 		//console.log(intersects.length);
// 		//console.log("Hit @ " + intersects[0].object.name);
//
//     resetbubble(selectable_obj);
//
//     highlightbubble(intersects[0].object);
//
// 	} else {
//
// //		console.log("Hit blank");
//
// 	}
//
// }
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
