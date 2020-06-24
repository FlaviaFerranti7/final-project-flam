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
manageInitialPage();
controls = new THREE.PointerLockControls(camera, container);
controls.getObject().position.set(10.5, 20, 0);
controls.getObject().rotation.set(0, 1.57, 0);
scene.add(controls.getObject());

var cameraPos;
var cameraRot;

/* ----------------------- GLOBAL VARIABLES ----------------------- */

var objectsAnimated = [];
var objectsRaycaster = [];
var steps = [];
var loadingR2 = false;
var loadingH = false;
var loadingLR = false;
var loadingG = false;
var garden = false;
var choosedoor = 0;

var openSafe = false;
var hideDivSafe = false;

var currentObject = null;
var actionPanel = document.getElementById("action");
var remove = document.getElementById("remove");
var sheetMessage = document.getElementById("sheetmusic-message");

var backpack = null;
const numElementOfBackpack = 5;
var insertElem = false;

var enableCollect = false;
var collect = false;

var functionIsRunning = false;

var enableConditionedAnimation = false;

/* ----------------------- PLAYER MOVEMENT ----------------------- */
// Flags to determine which direction the player is moving
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

// Velocity vector for the player
var playerVelocity = new THREE.Vector3();

// How fast the player will move
var PLAYERSPEED = 200.0;
var PLAYERCOLLISIONDISTANCE = 5;
var collidableObjects = [];

//for the monster
var monster;
var t1 = 0;

var clock = new THREE.Clock();
var deadline = 30 * 60 * 1000;
var timeinterval;
var deltasec = 0;
var clockFlag = false;
var gameOver = false;
var openGate = false;

/* ----------------------- AMBIENT LIGHTS ----------------------- */
const colorAmbient = 0x101010;
const intensityAmbient = 2;  //1
const lightAmbient = new THREE.AmbientLight(colorAmbient, intensityAmbient);

scene.add(lightAmbient);

/* ----------------------- SPOTLIGHT SETTINGS ----------------------- */

const colorSpotlight = 0xF5D033;
const intensitySpotlight = 0.8;
const penumbra = 0.6;

/* ------------------------- HOUSE ------------------------- */
var house;
house = createHouse();
scene.add(house);

/* ------------------------- FIRST ROOM ------------------------- */
var room1;
room1 = createRoom1(40);
scene.add(room1);

/* ------------------------- SECOND ROOM ------------------------- */
var room2;
var room2Loader = function () {
  room2 = createRoom2(40);
  scene.add(room2);

  return true;
}

/* --------------------------- HALLWAY --------------------------- */
var hallway;
var wallHL;
var hallwayLoader = function () {
  hallway = createHallway(80);
  scene.add(hallway);

  return true;
}

/* ------------------------- LIVING-ROOM ------------------------- */
var windowDoor;
var livingRoom;
var livingRoomLoader = function () {
  livingRoom = createLivingRoom(80);
  scene.add(livingRoom);
  return true;
}

/* ------------------------- GARDEN ------------------------- */
var garden;
var gardenLoader = function () {
  garden = createGarden(380);
  scene.add(garden);
  return true;
}

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


/* ------------------------- TORCH SPOTLIGHT ------------------------- */

const torch = new THREE.SpotLight(0xffffff);
torch.intensity = 0;
torch.target = new THREE.Object3D();
torch.angle = Math.PI / 3.5;
torch.distance = 50;
torch.penumbra = penumbra;
torch.castShadow = true;

camera.add(torch);
camera.add(torch.target);
torch.target.position.set(0, 0, -1);
torch.position.set(0, 0, -0.9);

var t = 0;
var tA = 0;
var tL = 0;
var move = false;

var raycaster = new THREE.Raycaster();
var INTERSECTED;
var enableAction = false;
var associatedObject;

var animate = function () {

  requestAnimationFrame(animate);

  var delta = clock.getDelta();
  animatePlayer(delta);

  if (monster != undefined) {
    animateMonster();
  }

  raycaster.setFromCamera(marker.position, camera);
  var intersects = raycaster.intersectObjects(objectsRaycaster, true);

  if (intersects.length > 0 && intersects[0].distance >= 4 && intersects[0].distance <= 11) {
    if (INTERSECTED != intersects[0].object) {

      if (INTERSECTED && !functionIsRunning) {
        currentObject = null;
        enableAction = false;
        move = false;
        enableConditionedAnimation = false;
        t = 0;
      }

      INTERSECTED = intersects[0].object;
      for (var i = 0; i < objectsAnimated.length; i++) {
        objectsAnimated[i].getObject().traverse((child) => {
          if (intersects[0].object == child) {
            currentObject = objectsAnimated[i];
          }
        });
        if (objectsAnimated[i].getObject() == intersects[0].object) currentObject = objectsAnimated[i];
        if (currentObject != null) break;

      }
    }

  } else {

    if (INTERSECTED && !functionIsRunning) {
      currentObject = null;
      enableAction = false;
      move = false;
      collect = false;
      enableConditionedAnimation = false;
      t = 0;
    }

    if (!functionIsRunning) {
      INTERSECTED = null;
      currentObject = null;
      enableAction = false;
      move = false;
      collect = false;
      enableConditionedAnimation = false;
      t = 0;
      actionPanel.style.display = "none";
      remove.style.display = "none";
    }
  }
  // console.log(intersects);
  if (currentObject != null) {
    if ((!move && currentObject.getActionButton() == "SPACE") || (!collect && currentObject.getActionButton() == "Q")) {
      actionPanel.style.display = "block";
      enableAction = true;
      if (currentObject.getObjectName() == "DOOR_HALLWAY" || currentObject.getObjectName() == "DOOR_ENTRY") {
        remove.style.display = "block";
      }
      if (currentObject.getObjectName() == "SHEETMUSIC") {
        sheetMessage.style.display = "block";
        sheetMessage.childNodes[1].innerHTML = "";
        setTimeout(() => {
          sheetMessage.style.display = "none";
        }, 5000);
      }
    }
    else {
      actionPanel.style.display = "none";
      remove.style.display = "none";
      sheetMessage.style.display = "none";

    }
    actionPanel.childNodes[1].innerHTML = currentObject.getActionButton();
    remove.childNodes[1].innerHTML = "Watch out! If you go in you can't come back here";
    if (currentObject.getAnimation() !== null && !currentObject.getIsElemOfBackpack() && !currentObject.getConditionedAnimated()) {
      if (currentObject.getObjectName() == "DOOR_HALLWAY" || currentObject.getObjectName() == "DOOR_ENTRY" || currentObject.getObjectName() == "WINDOW_DOORS") {
        cameraPos = camera.position;
        cameraRot = camera.rotation;
      }
      functionIsRunning = currentObject.executeAnimation(t, move);
    }
    else if (currentObject.getConditionedAnimated() && !enableConditionedAnimation) {
      actionPanel.style.display = "block";
      actionPanel.childNodes[1].innerHTML = "To interact with this object you need something"; //+ currentObject.getSubjectAction();
    }
    else if (currentObject.getConditionedAnimated() && enableConditionedAnimation) {
      move = true;
      functionIsRunning = currentObject.executeAnimation(t, move);
    }
    else {
      if (collect) {
        if (backpack != null && backpack.getNumElem() <= numElementOfBackpack) {
          currentObject.executeAnimation();
          takeObject.play();
          backpack.insert(currentObject);
          insertElem = true;
        }
        else if (currentObject.getObjectName() == "BACKPACK") {
          currentObject.executeAnimation();
          takeObject.play();
          backpack = new Backpack(numElementOfBackpack);
          alert("Now you can collect the objects!! </ br> Press E to open backpack");
          insertElem = true;
        }
        else {
          alert("It isn't possible to collect " + currentObject.getObjectName());
        }
      }
    }
    if (move) t += 0.1;
    if (currentObject.getIsElemOfBackpack() && insertElem) {
      objectsAnimated.splice(objectsAnimated.indexOf(currentObject), 1);
      objectsRaycaster.splice(objectsRaycaster.indexOf(currentObject.getObject()), 1);
      collect = false;
      insertElem = false;
    }
    if ((move || (collect && insertElem)) && !functionIsRunning && currentObject.getReverseAnimation() == null) {
      if (currentObject.getObjectName() == "SAFE") {
        collect = false;
        insertElem = false;
        if (openSafe == true) {
          objectsAnimated.splice(objectsAnimated.indexOf(currentObject), 1);
          objectsRaycaster.splice(objectsRaycaster.indexOf(currentObject.getObject()), 1);
          currentObject = null;
        }
      } else {
        objectsAnimated.splice(objectsAnimated.indexOf(currentObject), 1);
        objectsRaycaster.splice(objectsRaycaster.indexOf(currentObject.getObject()), 1);
        currentObject = null;
        collect = false;
        insertElem = false;
      }
    }
    else if ((move || (collect && insertElem)) && !functionIsRunning && currentObject.getReverseAnimation() != null) {
      if (currentObject.getFlagDoubleAction()) currentObject.setFlagDoubleAction(false);
      else currentObject.setFlagDoubleAction(true);
      currentObject = null;

    }
    if (!move) {
      hideDivSafe = false;
    }
  }
  if (choosedoor == 2) {
    for (var i = 0; i < objectsAnimated.length; i++) {
      if (objectsAnimated[i].getObjectName() == "WINDOW_DOORS") steps.push(objectsAnimated[i]);
    }
  }
  if (choosedoor == 1) {
    for (var i = 0; i < objectsAnimated.length; i++) {
      if (objectsAnimated[i].getObjectName() == "DOOR_ENTRY") steps.push(objectsAnimated[i]);
    }
  }

  //SEQUENTIAL ROOM LOADING
  if (move && functionIsRunning && steps.indexOf(currentObject) == 0 && loadingR2 == false) {
    alert("Level 1 passed. Look around!", 7000);
    loadingR2 = room2Loader();
    steps.splice(0, 1);
  }
  if (move && functionIsRunning && steps.indexOf(currentObject) == 0 && loadingH == false) {
    alert("Level 2 passed", 7000);
    loadingH = hallwayLoader();
    steps.splice(0, 1);
  }
  if (move && functionIsRunning && steps.indexOf(currentObject) == 0 && loadingLR == false) {
    var elem = document.getElementById("LR-message");
    elem.style.display = "block";
    elem.childNodes[1].innerHTML = "";
    setTimeout(() => {
      elem.style.display = "none";
    }, 7000);
    if (removeRooms()) {
      loadingLR = livingRoomLoader();
      steps.splice(0, 1);
      garden = true;
    }
  }
  if (move && functionIsRunning && steps.indexOf(currentObject) == 0 && garden && loadingG == false) {
    alert("You're almost there! One step left to pass", 7000);
    if (removeLeaving()) {
      loadingG = gardenLoader();
      scene.remove(wallHL);
      wallHL = null;
      scene.remove(doorHL);
      doorHL = null;
      steps.splice(0, 1);
      gardenSounds.play();
    }
  }
  renderer.render(scene, camera);
};

animate();