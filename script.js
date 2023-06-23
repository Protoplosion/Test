let time = 0

// Set up the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 10;

var light = new THREE.HemisphereLight(0xffffff, 0x404040, 1);
scene.add(light);

var numCubes = 2000;
var cubes = [];

const texture = new THREE.TextureLoader().load("woof.gif");
const texture2 = new THREE.TextureLoader().load("image.jpg");

for (var i = 0; i < numCubes; i++) {
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshStandardMaterial({map: texture, emissive: 0x111111, specular: 0xffffff, roughness: 0.55});
  var cube = new THREE.Mesh(geometry, material);
  
  var posX = window.screen.availWidth / 2 * (0.005 + 0.1);
  var posY = window.screen.availHeight / 2 * (0.005 + 0.1);
  
  cube.position.x = Math.random() * (posX - -posX) + -posX;
  cube.position.y = Math.random() * (posY - -posY) + -posY;
  cube.position.z = Math.random() * -100;
  
  cube.rotation.x = Math.random() * 360;
  cube.rotation.y = Math.random() * 360;
  cube.rotation.z = Math.random() * 360;

  cubes.push(cube);
  scene.add(cube);
}

// Controls
var speed = 0.001;
document.addEventListener( "mousewheel", (event) => {
	speed += event.deltaY / 20000
  camera.position.z += event.deltaY / 100;
});

function onPointerMove( event ) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

// Render
function render() {
  requestAnimationFrame(render);

  raycaster.setFromCamera(pointer, camera);
	const intersects = raycaster.intersectObjects(scene.children);
	for (let i = 0; i < intersects.length; i++) {
		intersects[i].object.material.map = texture2;
	}
  
  for (var i = 0; i < numCubes; i++) {
    cubes[i].rotation.x += speed;
    cubes[i].rotation.y += speed;
  }
  time++
  camera.position.z += Math.cos(time);
  renderer.render(scene, camera);
}
window.addEventListener("pointermove", onPointerMove);
window.requestAnimationFrame(render);
