var scene = new THREE.Scene();
var container = document.getElementById('container');

var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement); //renderer.domElement is the canvas

camera.position.x = -1;
camera.position.y = 10;
camera.position.z = 55; 


var controls = new THREE.OrbitControls(camera, renderer.domElement);

/* ------------------------- FIRST ROOM ------------------------- */

createRoom1(40);

/* ------------------------- SECOND ROOM ------------------------- */

createRoom2(40);

/* --------------------------- HALLWAY --------------------------- */

createHallway(80);

var animate = function () {
  requestAnimationFrame(animate);


  renderer.render(scene, camera);
};

animate();