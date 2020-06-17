//import { Backpack } from "./Classes/Backpack.js";
//import { THREE } from "../Common/three.js";

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

//camera.position.set(10.5, 8, 0);   //(1, 10, 55);

var controls;
var controlsEnabled = false;
var blocker = document.getElementById('blocker');
getPointerLock();
controls = new THREE.PointerLockControls(camera, container);
controls.getObject().position.set(10.5, 8, 0);
// controls.getObject().position.set(10.5, 8, 50);
controls.getObject().rotation.set(0, 7.85, 0);
scene.add(controls.getObject());

/* ----------------------- GLOBAL VARIABLES ----------------------- */

var objectsAnimated = [];
var objectsRaycaster = [];
var steps = [];
var currentObject = null;
var actionPanel = document.getElementById("action");

var backpack = null;
const numElementOfBackpack = 5;
var insertElem = false;

var enableCollect = false;
var collect = false;

var functionIsRunning = false;

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
var PLAYERCOLLISIONDISTANCE = 5;
var collidableObjects = [];


var clock = new THREE.Clock();

/* ----------------------- AMBIENT LIGHTS ----------------------- */
const colorAmbient = 0x101010;
const intensityAmbient = 10;  //1
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

var room2Loader = function () {
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
}

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

/* ------------------------- LIVING-ROOM ------------------------- */

//createLivingRoom(80);

/* ------------------------- SPOTLIGHT LIVING-ROOM ------------------------- */

const spotlightL = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

spotlightL.position.set(-70, 20.0, 20.0);
spotlightL.target = new THREE.Object3D();
spotlightL.target.position.set(0, -4000, 0);
spotlightL.angle = Math.PI / 2.5;
spotlightL.distance = 200;
spotlightL.penumbra = penumbra;
spotlightL.castShadow = true;

const sourceSpotlightL = createReverseSpotLight(spotlightL, new THREE.Vector3(-75.0, 15.0, 16.5));

spotlightL.decay = 2;

scene.add(spotlightL);
scene.add(spotlightL.target);

scene.add(sourceSpotlightL);
scene.add(sourceSpotlightL.target);


/* ------------------------- GARDEN ------------------------- */

//createGarden(380);

/* ------------------------- SPOTLIGHT GARDEN------------------------- */


/* ------------------------- LISTENER -------------------------- */

var geometry = new THREE.PlaneGeometry(0.005, 0.03, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xeed000, side: THREE.DoubleSide });
var verticalCross = new THREE.Mesh(geometry, material);
var horizontalCross = new THREE.Mesh(geometry, material);
horizontalCross.rotateZ(degToRad(90));

var marker = new THREE.Group();
marker.add(verticalCross);
marker.add(horizontalCross);

camera.add(marker);
marker.position.set(0, 0, -0.5);

listenForPlayerMovement();
window.addEventListener('resize', onWindowResize, false);

var t = 0;
var move = false;

var raycaster = new THREE.Raycaster();
var INTERSECTED;
var enableSpace = false;

var animate = function () {

  setTimeout(function () {
    requestAnimationFrame(animate);
  }, 1000 / 30);

  var delta = clock.getDelta();
  animatePlayer(delta);

  raycaster.setFromCamera(marker.position, camera);
  var intersects = raycaster.intersectObjects(objectsRaycaster, true);

  if (intersects.length > 0 && intersects[0].distance >= 6 && intersects[0].distance <= 11) {
    if (INTERSECTED != intersects[0].object) {

      if (INTERSECTED && !functionIsRunning) {
        currentObject = null;
        enableSpace = false;
        enableSpace = false;
        enableCollect = false;
        move = false;
        t = 0;
      }

      INTERSECTED = intersects[0].object;
      enableSpace = true;

      for (var i = 0; i < objectsAnimated.length; i++) {
        objectsAnimated[i].root.traverse((child) => {
          if (intersects[0].object == child) {
            currentObject = objectsAnimated[i];
          }
        });
        if(objectsAnimated[i].root == intersects[0].object) currentObject = objectsAnimated[i];   
        if (currentObject != null) break;
      }
    }

  } else {

    if (INTERSECTED && !functionIsRunning) {
      currentObject = null;
      enableSpace = false;
      enableCollect = false;
      move = false;
      collect = false;
      t = 0;
    }

    if (!functionIsRunning) {
      INTERSECTED = null;
      currentObject = null;
      enableSpace = false;
      enableCollect = false;
      move = false;
      collect = false;
      t = 0;
      actionPanel.style.display = "none";
    }
  }

  if (currentObject != null) {
    if((!move && currentObject.actionButton == "space") || (!collect && currentObject.actionButton == "Q")) actionPanel.style.display = "block";
    else actionPanel.style.display = "none";
    actionPanel.childNodes[1].innerHTML = currentObject.actionButton;
    if(currentObject.animation !== null) functionIsRunning = currentObject.animation(t, move);
    else {
      if(collect) {
        if(backpack != null && backpack.getNumElem() <= numElementOfBackpack){
          scene.remove(currentObject.root);
          backpack.insert(currentObject);
          insertElem = true;
        }
        else if(currentObject.root.name == "BACKPACK") {
          scene.remove(currentObject.root);
          backpack = new Backpack(numElementOfBackpack);
          alert("Now you can collect the objects!! </ br> Press E to open backpack");
          insertElem = true;
        }
        else {
          alert("It isn't possible to collect " + currentObject.root.name);
        }
      }
    }
    
    if(move) t += 0.1;
    if((move || (collect && insertElem)) && !functionIsRunning && currentObject.reverseAnimation == null) {
      objectsAnimated.splice(objectsAnimated.indexOf(currentObject), 1);
      objectsRaycaster.splice(objectsRaycaster.indexOf(currentObject.root), 1);
      currentObject = null;
      collect = false;
      insertElem = false;
    }
  }

  if(move && functionIsRunning && steps.indexOf(currentObject) == 0) {
    alert("Step 1 passed", 7000);
    room2Loader();
    steps.splice(0, 1);
  }

  renderer.render(scene, camera);
};

animate();