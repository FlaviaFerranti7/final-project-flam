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

// var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 5, 0);
// controls.update();

var controls;
var controlsEnabled = false;
var blocker = document.getElementById('blocker');
getPointerLock();
controls = new THREE.PointerLockControls(camera, container);
scene.add(controls.getObject());

/* ----------------------- PLAYER MOVEMENT ----------------------- */
// Flags to determine which direction the player is moving
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

// Velocity vector for the player
var playerVelocity = new THREE.Vector3();

// How fast the player will move
var PLAYERSPEED = 400.0;
var PLAYERCOLLISIONDISTANCE = 20;
var collidableObjects = [];

var clock = new THREE.Clock();

/* ----------------------- AMBIENT LIGHTS ----------------------- */
const colorAmbient = 0x101010;
const intensityAmbient = 1;
const lightAmbient = new THREE.AmbientLight(colorAmbient, intensityAmbient);

scene.add(lightAmbient);

/* ----------------------- SPOTLIGHT SETTINGS ----------------------- */

const colorSpotlight = 0xF5D033;
const intensitySpotlight = 0.8;
const penumbra = 0.6;

/* ------------------------- FIRST ROOM ------------------------- */

createRoom1(40);

/* ------------------------- SPOTLIGHT FIRST ROOM ------------------------- */

const spotlightR1 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightR1.position.set(0.0, 20.0, 0.0);
spotlightR1.target = new THREE.Object3D();
spotlightR1.target.position.set(0, -4000, 0);
spotlightR1.angle = Math.PI / 2.5;
spotlightR1.distance = 200;
spotlightR1.penumbra = penumbra;
spotlightR1.castShadow = true;

const sourceSpotlightR1 = createReverseSpotLight(spotlightR1, new THREE.Vector3(0.0, 15.0, 0.0));

spotlightR1.decay = 5;

scene.add(spotlightR1);
scene.add(spotlightR1.target);

scene.add(sourceSpotlightR1);
scene.add(sourceSpotlightR1.target);

/* ------------------------- SECOND ROOM ------------------------- */

createRoom2(40);

/* ------------------------- SPOTLIGHT SECOND ROOM ------------------------- */

const spotlightR2 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightR2.position.set(0.0, 20.0, 42.0);
spotlightR2.target = new THREE.Object3D();;
spotlightR2.target.position.set(0, -4000, 0);
spotlightR2.angle = Math.PI / 2.5;
spotlightR2.distance = 200;
spotlightR2.penumbra = penumbra;
spotlightR2.castShadow = true;

const sourceSpotlightR2 = createReverseSpotLight(spotlightR2, new THREE.Vector3(0.0, 15.0, 42.0));

spotlightR2.decay = 5;

scene.add(spotlightR2);
scene.add(spotlightR2.target);

scene.add(sourceSpotlightR2);
scene.add(sourceSpotlightR2.target);

/* --------------------------- HALLWAY --------------------------- */

createHallway(80);

/* --------------------------- SPOTLIGHT HALLWAY --------------------------- */

const spotlightL1 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightL1.position.set(-30, 20.0, 0.0);
spotlightL1.target = new THREE.Object3D();
spotlightL1.target.position.set(0, -4000, 0);
spotlightL1.angle = Math.PI / 2.5;
spotlightL1.distance = 200;
spotlightL1.penumbra = penumbra;
spotlightL1.castShadow = true;

const sourceSpotlightL1 = createReverseSpotLight(spotlightL1, new THREE.Vector3(-32.0, 15.0, 0.0));

spotlightL1.decay = 5;

scene.add(spotlightL1);
scene.add(spotlightL1.target);

scene.add(sourceSpotlightL1);
scene.add(sourceSpotlightL1.target);

const spotlightL2 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightL2.position.set(-30.0, 20.0, 42.0);
spotlightL2.target = new THREE.Object3D();;
spotlightL2.target.position.set(0, -4000, 0);
spotlightL2.angle = Math.PI / 2.5;
spotlightL2.distance = 200;
spotlightL2.penumbra = penumbra;
spotlightL2.castShadow = true;

const sourceSpotlightL2 = createReverseSpotLight(spotlightL2, new THREE.Vector3(-32.0, 15.0, 42.0));

spotlightL2.decay = 5;

scene.add(spotlightL2);
scene.add(spotlightL2.target);

scene.add(sourceSpotlightL2);
scene.add(sourceSpotlightL2.target);

/* ------------------------- LISTENER -------------------------- */

listenForPlayerMovement();
window.addEventListener('resize', onWindowResize, false);

var animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  var delta = clock.getDelta();
  animatePlayer(delta);

};

animate();