var scene = new THREE.Scene();
var container = document.getElementById('container');

var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement); //renderer.domElement is the canvas

camera.position.z = 5;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

/* ------------------------- FIRST ROOM ------------------------- */

createRoom1(40);

/* ------------------------- SECOND ROOM ------------------------- */

// GRID
var gridHelper2 = new THREE.GridHelper(20, 20);
gridHelper2.position.z = 20;
scene.add(gridHelper2);


var animate = function () {
  requestAnimationFrame(animate);


  renderer.render(scene, camera);
};

animate();