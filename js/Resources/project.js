var scene = new THREE.Scene();
var container = document.getElementById('container');

var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement); //renderer.domElement is the canvas

camera.position.set(1, 10, 55);


var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

/* --------------------------- LIGHTS --------------------------- */
const color = 0x404040;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);

/*const gui = new dat.GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);*/

/* ------------------------- FIRST ROOM ------------------------- */

createRoom1(40);

/* ------------------------- SECOND ROOM ------------------------- */

createRoom2(40);

/* --------------------------- HALLWAY --------------------------- */

createHallway(80);

scene.add(light);


var animate = function () {
  requestAnimationFrame(animate);


  renderer.render(scene, camera);
};

animate();