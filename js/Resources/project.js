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

var controls = new THREE.PointerLockControls(camera);
var controlsEnabled = false;

scene.add(controls.getObject());

/* ----------------------- PLAYER MOVEMENT ----------------------- */
// Flags to determine which direction the player is moving
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var rotateUp = false;
var rotateDown = false;
var rotateLeft = false;
var rotateRight = false;

// Velocity vector for the player
var playerVelocity = new THREE.Vector3();

// How fast the player will move
var PLAYERSPEED = 400.0;

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
const sourceSpotlightR1 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightR1.position.set(0.0, 20.0, 0.0);
spotlightR1.target = new THREE.Object3D();
spotlightR1.target.position.set(0, -4000, 0);
spotlightR1.angle = Math.PI / 2.5;
spotlightR1.distance = 200;
spotlightR1.penumbra = penumbra;
spotlightR1.decay = 5;
spotlightR1.castShadow = true;

sourceSpotlightR1.position.set(0.0, 15.0, 0.0);
sourceSpotlightR1.target = new THREE.Object3D();
sourceSpotlightR1.target.position.set(0, 20.0, 0);
sourceSpotlightR1.angle = Math.PI / 2.5;
sourceSpotlightR1.distance = 5;
sourceSpotlightR1.penumbra = penumbra;
sourceSpotlightR1.castShadow = true;

scene.add(spotlightR1);
scene.add(spotlightR1.target);

scene.add(sourceSpotlightR1);
scene.add(sourceSpotlightR1.target);

/* ------------------------- SECOND ROOM ------------------------- */

createRoom2(40);

/* ------------------------- SPOTLIGHT SECOND ROOM ------------------------- */

const spotlightR2 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const sourceSpotlightR2 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightR2.position.set(0.0, 20.0, 42.0);
spotlightR2.target = new THREE.Object3D();;
spotlightR2.target.position.set(0, -4000, 0);
spotlightR2.angle = Math.PI / 2.5;
spotlightR2.distance = 200;
spotlightR2.penumbra = penumbra;
spotlightR2.decay = 5;
spotlightR2.castShadow = true;

sourceSpotlightR2.position.set(0.0, 15.0, 42.0);
sourceSpotlightR2.target = new THREE.Object3D();
sourceSpotlightR2.target.position.set(0, 20.0, 0);
sourceSpotlightR2.angle = Math.PI / 2.5;
sourceSpotlightR2.distance = 5;
sourceSpotlightR2.penumbra = penumbra;
sourceSpotlightR2.castShadow = true;

scene.add(spotlightR2);
scene.add(spotlightR2.target);

scene.add(sourceSpotlightR2);
scene.add(sourceSpotlightR2.target);

/* --------------------------- HALLWAY --------------------------- */

createHallway(80);

/* --------------------------- SPOTLIGHT HALLWAY --------------------------- */

const spotlightL1 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const sourceSpotlightL1 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightL1.position.set(-30, 16.3, 35);
spotlightL1.target = new THREE.Object3D();
spotlightL1.target.position.set(0, -4000, 0);
spotlightL1.angle = Math.PI / 4;
spotlightL1.distance = 300;
spotlightL1.penumbra = penumbra;
spotlightL1.castShadow = true;

sourceSpotlightL1.position.set(-31, 14, 37);
sourceSpotlightL1.target = new THREE.Object3D();
sourceSpotlightL1.target.position.set(0, 20.0, 0);
sourceSpotlightL1.angle = Math.PI / 2.5;
sourceSpotlightL1.distance = 5;
sourceSpotlightL1.penumbra = penumbra;
sourceSpotlightL1.castShadow = true;

const spotlightL2 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const sourceSpotlightL2 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightL2.position.set(-30, 16.3, 40);
spotlightL2.target = new THREE.Object3D();
spotlightL2.target.position.set(0, -4000, 0);
spotlightL2.angle = Math.PI / 4;
spotlightL2.distance = 300;
spotlightL2.penumbra = penumbra;
spotlightL2.castShadow = true;

sourceSpotlightL2.position.set(-31, 14, 42);
sourceSpotlightL2.target = new THREE.Object3D();
sourceSpotlightL2.target.position.set(0, 20.0, 0);
sourceSpotlightL2.angle = Math.PI / 2.5;
sourceSpotlightL2.distance = 5;
sourceSpotlightL2.penumbra = penumbra;
sourceSpotlightL2.castShadow = true;

const spotlightL3 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const sourceSpotlightL3 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightL3.position.set(-30, 16.3, 45);
spotlightL3.target = new THREE.Object3D();
spotlightL3.target.position.set(0, -4000, 0);
spotlightL3.angle = Math.PI / 4;
spotlightL3.distance = 300;
spotlightL3.penumbra = penumbra;
spotlightL3.castShadow = true;

sourceSpotlightL3.position.set(-31, 14, 47);
sourceSpotlightL3.target = new THREE.Object3D();
sourceSpotlightL3.target.position.set(0, 20.0, 0);
sourceSpotlightL3.angle = Math.PI / 2.5;
sourceSpotlightL3.distance = 5;
sourceSpotlightL3.penumbra = penumbra;
sourceSpotlightL3.castShadow = true;

const spotlightL4 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const sourceSpotlightL4 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightL4.position.set(-30, 16.3, -5);
spotlightL4.target = new THREE.Object3D();
spotlightL4.target.position.set(0, -4000, 0);
spotlightL4.angle = Math.PI / 4;
spotlightL4.distance = 300;
spotlightL4.penumbra = penumbra;
spotlightL4.castShadow = true;

sourceSpotlightL4.position.set(-31, 14, -4);
sourceSpotlightL4.target = new THREE.Object3D();
sourceSpotlightL4.target.position.set(0, 20.0, 0);
sourceSpotlightL4.angle = Math.PI / 2.5;
sourceSpotlightL4.distance = 5;
sourceSpotlightL4.penumbra = penumbra;
sourceSpotlightL4.castShadow = true;

const spotlightL5 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const sourceSpotlightL5 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightL5.position.set(-30, 16.3, 0);
spotlightL5.target = new THREE.Object3D();
spotlightL5.target.position.set(0, -4000, 0);
spotlightL5.angle = Math.PI / 4;
spotlightL5.distance = 300;
spotlightL5.penumbra = penumbra;
spotlightL5.castShadow = true;

sourceSpotlightL5.position.set(-31, 14, 1);
sourceSpotlightL5.target = new THREE.Object3D();
sourceSpotlightL5.target.position.set(0, 20.0, 0);
sourceSpotlightL5.angle = Math.PI / 2.5;
sourceSpotlightL5.distance = 5;
sourceSpotlightL5.penumbra = penumbra;
sourceSpotlightL5.castShadow = true;

const spotlightL6 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);
const sourceSpotlightL6 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightL6.position.set(-30, 16.3, 5);
spotlightL6.target = new THREE.Object3D();
spotlightL6.target.position.set(0, -4000, 0);
spotlightL6.angle = Math.PI / 4;
spotlightL6.distance = 300;
spotlightL6.penumbra = penumbra;
spotlightL6.castShadow = true;

sourceSpotlightL6.position.set(-31, 14, 6);
sourceSpotlightL6.target = new THREE.Object3D();
sourceSpotlightL6.target.position.set(0, 20.0, 0);
sourceSpotlightL6.angle = Math.PI / 2.5;
sourceSpotlightL6.distance = 5;
sourceSpotlightL6.penumbra = penumbra;
sourceSpotlightL6.castShadow = true;

scene.add(spotlightL1);
scene.add(spotlightL1.target);
scene.add(sourceSpotlightL1);
scene.add(sourceSpotlightL1.target);

scene.add(spotlightL2);
scene.add(spotlightL2.target);
scene.add(sourceSpotlightL2);
scene.add(sourceSpotlightL2.target);

scene.add(spotlightL3);
scene.add(spotlightL3.target);
scene.add(sourceSpotlightL3);
scene.add(sourceSpotlightL3.target);

scene.add(spotlightL4);
scene.add(spotlightL4.target);
scene.add(sourceSpotlightL4);
scene.add(sourceSpotlightL4.target);

scene.add(spotlightL5);
scene.add(spotlightL5.target);
scene.add(sourceSpotlightL5);
scene.add(sourceSpotlightL5.target);

scene.add(spotlightL6);
scene.add(spotlightL6.target);
scene.add(sourceSpotlightL6);
scene.add(sourceSpotlightL6.target);

/* ------------------------- LISTENER -------------------------- */
listenForPlayerMovement();
window.addEventListener('resize', onWindowResize, false);

var animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  var delta = clock.getDelta();
  animatePlayerUDLR(delta);
  animatePlayerRotate()
};

animate();