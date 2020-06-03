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

/* ----------------------- AMBIENT LIGHTS ----------------------- */
const colorAmbient = 0x404040;
const intensityAmbient = 1;
const lightAmbient = new THREE.AmbientLight(colorAmbient, intensityAmbient);

/*const gui = new dat.GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);*/

/* --------------------- DIRECTIONAL LIGHTS --------------------- */

const colorDirectional = 0xFFFFFF;
const intensityDirectional = 0.3;
const lightDirectional = new THREE.DirectionalLight(colorDirectional, intensityDirectional);
const helperDirectional = new THREE.DirectionalLightHelper(lightDirectional);
lightDirectional.position.set(90, 60, 50);
lightDirectional.target.position.set(-5, 0, 0);


/*const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);
gui.add(light.target.position, 'x', -10, 10);
gui.add(light.target.position, 'z', -10, 10);
gui.add(light.target.position, 'y', 0, 10);*/


/* ------------------------- SPOTLIGHT -------------------------- */

const colorSpotlight = 0xFFFFFF;
const intensitySpotlight = 1;
const spotlight = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const helperSpotlight = new THREE.SpotLightHelper(spotlight);
spotlight.position.set(0, 20, 40);
spotlight.target.position.set(0, 0, 0);


/* ------------------------- FIRST ROOM ------------------------- */

createRoom1(40);

/* ------------------------- SECOND ROOM ------------------------- */

createRoom2(40);

/* --------------------------- HALLWAY --------------------------- */

createHallway(80);

scene.add(lightAmbient);
scene.add(lightDirectional);
scene.add(lightDirectional.target);
scene.add(helperDirectional);
scene.add(spotlight);
scene.add(spotlight.target);
scene.add(helperSpotlight);


var animate = function () {
  requestAnimationFrame(animate);


  renderer.render(scene, camera);
};

animate();