// Set up the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 15;
var numCubes = 10;
var cubes = [];

for (var i = 0; i < numCubes; i++) {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var texture = new THREE.TextureLoader().load('image.jpg');
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var cube = new THREE.Mesh(geometry, material);
  
  var posX = window.screen.availWidth / 2 * 0.002;
  var posY = window.screen.availHeight / 2 * 0.002;
  
  cube.position.x = Math.random() * (posX - -posX) + -posX;
  cube.position.y = Math.random() * (posY - -posY) + -posY;
  cube.position.z = Math.random() * 10;
  
  cube.rotation.x = Math.random() * 360;
  cube.rotation.y = Math.random() * 360;
  cube.rotation.z = Math.random() * 360;

  cubes.push(cube);
  scene.add(cube);
}

function render() {
  requestAnimationFrame(render);
  for (var i = 0; i < numCubes; i++) {
    cubes[i].rotation.x += 0.01;
    cubes[i].rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}
render();
