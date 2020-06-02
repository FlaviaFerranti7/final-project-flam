var scene = new THREE.Scene();
var container = document.getElementById('container');

var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement); //renderer.domElement is the canvas

camera.position.z = 5;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

/* ------------------------- FIRST ROOM ------------------------- */

// GRID
var size = 20;
var divisions = 20;
var gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// MATERIALS
const loader = new THREE.TextureLoader();
const materialFloor = new THREE.MeshBasicMaterial({
  map: loader.load('../../images/parquet.jpg'),
});
const materialWall1 = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const materialWall2 = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
const materialWall3 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const materialWall4 = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
const materialRoof = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide });

// parquet
var floor = createPlane(size, size, undefined, new THREE.Vector3(-90, 0, 0), materialFloor);
scene.add(floor);

// yellow
var door = createHole(5.0, 10.0, 7.5, 0.0);
var wall1 = createShape(0.0, 20.0, new THREE.Vector3(-10.0, 0.0, 10.0), undefined, materialWall1, [door]);
scene.add(wall1);

// blue
var wall2 = createPlane(size, size, new THREE.Vector3(0.0, 10.0, -10.0), undefined, materialWall2);
scene.add(wall2);

// red
var wall3 = createPlane(size, size, new THREE.Vector3(-10.0, 10.0, 0.0),new THREE.Vector3(0, 90, 0), materialWall3);
scene.add(wall3);

// cyan
var wall4Window = createHole(5.0, 5.0, 7.5, 7.5);
var wall4 = createShape(0.0, size, new THREE.Vector3(10.0, 0.0, 10.0), new THREE.Vector3(0, 90, 0), materialWall4, [wall4Window]);
scene.add(wall4);

// purple
var roof = createPlane(size, size, new THREE.Vector3(0.0, 20.0, 0.0), new THREE.Vector3(90, 0, 0), materialRoof);
scene.add(roof);


/* ------------------------- SECOND ROOM ------------------------- */

// GRID
var gridHelper2 = new THREE.GridHelper(size, divisions);
gridHelper2.position.z = 20;
scene.add(gridHelper2);


var animate = function () {
  requestAnimationFrame(animate);


  renderer.render(scene, camera);
};

animate();