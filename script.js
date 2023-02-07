// Set up the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Create the cube
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var texture = new THREE.TextureLoader().load( './image.jpg' );
var material = new THREE.MeshBasicMaterial( { map: texture } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

// Render loop
function render() {
  requestAnimationFrame( render );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}
render();