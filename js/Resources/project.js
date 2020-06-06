var scene = new THREE.Scene();
var container = document.getElementById('container');

var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

//Create a WebGLRenderer and turn on shadows in the renderer
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement); //renderer.domElement is the canvas

camera.position.set(1, 10, 55);


var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();

/* ----------------------- AMBIENT LIGHTS ----------------------- */
const colorAmbient = 0x303030;
const intensityAmbient = 1;
const lightAmbient = new THREE.AmbientLight(colorAmbient, intensityAmbient);

/* --------------------- DIRECTIONAL LIGHTS --------------------- */

const colorDirectional = 0xFFFFFF;
const intensityDirectional = 0.3;
const lightDirectional = new THREE.DirectionalLight(colorDirectional, intensityDirectional);
const helperDirectional = new THREE.DirectionalLightHelper(lightDirectional);
//Set up shadow properties for the light
lightDirectional.position.set(90, 90, 180);
lightDirectional.target.position.set(-50, -70, 50);
lightDirectional.castShadow = true;

scene.add(lightAmbient);
// scene.add(lightDirectional);
// scene.add(lightDirectional.target);
// scene.add(helperDirectional);

lightDirectional.shadow.mapSize.width = 1024;  // default
lightDirectional.shadow.mapSize.height = 1024; // default
lightDirectional.shadow.camera.near = 0.5;    // default
lightDirectional.shadow.camera.far = 1000;     // default
lightDirectional.shadow.camera.top = 100;
lightDirectional.shadow.camera.right = 100;

/* ------------------------- FIRST ROOM ------------------------- */

createRoom1(40);

/* ------------------------- SECOND ROOM ------------------------- */

createRoom2(40);

/* --------------------------- HALLWAY --------------------------- */

createHallway(80);

// var helper = new THREE.CameraHelper( lightDirectional.shadow.camera );
// scene.add( helper );

/* ------------------------- SPOTLIGHT -------------------------- */

const colorSpotlight = 0xFFFFFF;
const intensitySpotlight = 1;

const spotlightL1 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const helperSpotlightL1 = new THREE.SpotLightHelper(spotlightL1);
var targetSpotlightL1 = new THREE.Object3D();
var helper = new THREE.CameraHelper(spotlightL1.shadow.camera);
spotlightL1.position.set(-30, 17, 35);
spotlightL1.target = targetSpotlightL1;
spotlightL1.target.position.set(0, -4000, 0);
spotlightL1.angle = Math.PI / 4;
spotlightL1.distance = 300;
spotlightL1.penumbra = 0.6;
spotlightL1.castShadow = true;

const spotlightL2 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const helperSpotlightL2 = new THREE.SpotLightHelper(spotlightL2);
var targetSpotlightL2 = new THREE.Object3D();
var helper = new THREE.CameraHelper(spotlightL2.shadow.camera);
spotlightL2.position.set(-30, 17, 40);
spotlightL2.target = targetSpotlightL2;
spotlightL2.target.position.set(0, -4000, 0);
spotlightL2.angle = Math.PI / 4;
spotlightL2.distance = 300;
spotlightL2.penumbra = 0.6;
spotlightL2.castShadow = true;

const spotlightL3 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const helperSpotlightL3 = new THREE.SpotLightHelper(spotlightL3);
var targetSpotlightL3 = new THREE.Object3D();
var helper = new THREE.CameraHelper(spotlightL3.shadow.camera);
spotlightL3.position.set(-30, 17, 45);
spotlightL3.target = targetSpotlightL3;
spotlightL3.target.position.set(0, -4000, 0);
spotlightL3.angle = Math.PI / 4;
spotlightL3.distance = 300;
spotlightL3.penumbra = 0.6;
spotlightL3.castShadow = true;

// scene.add(helper);

scene.add(spotlightL1);
scene.add(spotlightL1.target);
//scene.add(helperSpotlightL1);

scene.add(spotlightL2);
scene.add(spotlightL2.target);
// scene.add(helperSpotlightL2);

scene.add(spotlightL3);
scene.add(spotlightL3.target);
// scene.add(helperSpotlightL3);

//room1
const spotlightR1 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const helperSpotlightR1= new THREE.SpotLightHelper(spotlightR1);
var targetSpotlightR1 = new THREE.Object3D();
var helper = new THREE.CameraHelper(spotlightR1.shadow.camera);
spotlightR1.position.set(0.0, 17.0, 0.0);
spotlightR1.target = targetSpotlightR1;
spotlightR1.target.position.set(0, -4000, 0);
spotlightR1.angle = Math.PI / 2;
spotlightR1.distance = 300;
spotlightR1.penumbra = 0.6;
spotlightR1.castShadow = true;

scene.add(helper);
scene.add(spotlightR1);
scene.add(spotlightR1.target);
scene.add(helperSpotlightR1);

var animate = function () {
  requestAnimationFrame(animate);


  renderer.render(scene, camera);
};

animate();