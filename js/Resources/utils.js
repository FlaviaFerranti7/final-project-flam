function degToRad(angle_degrees) {
  return angle_degrees * Math.PI / 180;
}

function createPlane(width, height,
  pos = new THREE.Vector3(0.0, 0.0, 0.0),
  rot = new THREE.Vector3(0.0, 0.0, 0.0),
  materials) {
  var planeGeometry = new THREE.PlaneGeometry(width, height);
  var plane = null;

  if (materials.length > 1) {
    var group = new THREE.Group();

    for (var i = 0; i < materials.length; i++) {
      var elem = new THREE.Mesh(shapeGeometry, materials[i]);
      elem.castShadow = true;
      elem.receiveShadow = true;
      group.add(elem);
    }
    plane = group;
  } else {
    plane = new THREE.Mesh(planeGeometry, materials[0]);
    //plane.castShadow = true;
    plane.receiveShadow = true;
  }

  plane.position.x = pos.x;
  plane.position.y = pos.y;
  plane.position.z = pos.z;

  plane.rotateX(degToRad(rot.x));
  plane.rotateY(degToRad(rot.y));
  plane.rotateZ(degToRad(rot.z));

  return plane;
}

function createShape(initialPoint, heightY, heightX,
  pos = new THREE.Vector3(0.0, 0.0, 0.0),
  rot = new THREE.Vector3(0.0, 0.0, 0.0),
  materials,
  holes) {

  var shape = new THREE.Shape();
  shape.moveTo(initialPoint, initialPoint);
  shape.lineTo(heightX, initialPoint);
  shape.lineTo(heightX, heightY);
  shape.lineTo(initialPoint, heightY);

  for (var i = 0; i < holes.length; i++) {
    shape.holes.push(holes[i]);
  }

  var shapeGeometry = new THREE.ShapeGeometry(shape);
  var plane = null;
  if (materials.length > 1) {
    var group = new THREE.Group();

    for (var i = 0; i < materials.length; i++) {
      var elem = new THREE.Mesh(shapeGeometry, materials[i]);
      elem.castShadow = true;
      elem.receiveShadow = true;
      group.add(elem);
    }

    plane = group;
  } else {
    plane = new THREE.Mesh(shapeGeometry, materials[0]);
    plane.castShadow = true;
    plane.receiveShadow = true;
  }
  plane.position.x = pos.x;
  plane.position.y = pos.y;
  plane.position.z = pos.z;

  plane.rotateX(degToRad(rot.x));
  plane.rotateY(degToRad(rot.y));
  plane.rotateZ(degToRad(rot.z));

  plane.castShadow = true;
  plane.receiveShadow = true;

  return plane;
}

function createHole(width, height, initialPointX, initialPointY) {
  var hole = new THREE.Path();
  hole.moveTo(initialPointX, initialPointY);
  hole.lineTo(initialPointX + width, initialPointY);
  hole.lineTo(initialPointX + width, initialPointY + height);
  hole.lineTo(initialPointX, initialPointY + height);

  return hole;
}

function createReverseSpotLight(referenceSpotlight, position, angle) {
  const spotlight = new THREE.SpotLight().copy(referenceSpotlight);

  spotlight.position.set(position.x, position.y, position.z);
  spotlight.target.position.set(0.0, 20.0, 0.0);
  spotlight.distance = 5;
  if (angle !== undefined) spotlight.angle = angle;

  return spotlight;
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function getPointerLock() {
  document.onclick = function () {
    container.requestPointerLock();
    var deadline = new Date(Date.parse(new Date()) + 30 * 60 * 1000);
    initializeClock('clockdiv', deadline);
  }
  document.addEventListener('pointerlockchange', lockChange, false);
}

function lockChange() {
  // Turn on controls
  if (document.pointerLockElement === container) {
    blocker.style.display = "none";
    controls.enabled = true;
  } else {
    blocker.style.display = "";
    controls.enabled = false;
  }
}

function listenForPlayerMovement() {

  var onKeyDown = function (event) {
    switch (event.keyCode) {

      case 87: // w
        moveForward = true;
        if (!walk.isPlaying) walk.play();
        break;

      case 83: // s
        moveBackward = true;
        if (!walk.isPlaying) walk.play();
        break;

      case 65: // a 
        moveLeft = true;
        if (!walk.isPlaying) walk.play();
        break;

      case 68: // d
        moveRight = true;
        if (!walk.isPlaying) walk.play();
        break;

      case 32: // space
        if (enableAction) move = true;
        break;

      // Q
      case 81:
        if (enableAction) collect = true;
        break;

      case 69:
        if (backpack !== null && !backpack.getOpen()) {
          backpack.setOpen(true);
          document.getElementById("backpack").style.display = "none";
          document.getElementById("backpack-objects").style.display = "flex";
        } else if (backpack !== null && backpack.getOpen()) {
          document.getElementById("backpack").style.display = "block";
          document.getElementById("backpack-objects").style.display = "none";
          backpack.setOpen(false);
        }
        break;

      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
        if (backpack.getOpen()) backpack.useObject(event.keyCode - 48, currentObject);
        break;

      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        if (backpack.getOpen()) {
          alert("Discarding this object It will go back to its original place", 1500);
          backpack.discardObject(event.keyCode - 53, currentObject);
        }
        break;

    }
  };

  var onKeyUp = function (event) {
    switch (event.keyCode) {

      case 87: // w
        moveForward = false;
        walk.stop();
        break;

      case 83: // s
        moveBackward = false;
        walk.stop();
        break;

      case 65: // a 
        moveLeft = false;
        walk.stop();
        break;

      case 68: // d
        moveRight = false;
        walk.stop();
        break;
    }


  };

  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);

}

function animatePlayer(delta) {
  // Gradual slowdown
  playerVelocity.x -= playerVelocity.x * 10.0 * delta;
  playerVelocity.z -= playerVelocity.z * 10.0 * delta;

  if (detectPlayerCollision() == false) {
    if (moveForward) {
      playerVelocity.z -= PLAYERSPEED * delta;
    }
    if (moveBackward) {
      playerVelocity.z += PLAYERSPEED * delta;
    }
    if (moveLeft) {
      playerVelocity.x -= PLAYERSPEED * delta;
    }
    if (moveRight) {
      playerVelocity.x += PLAYERSPEED * delta;
    }
    controls.getObject().translateX(playerVelocity.x * delta);
    controls.getObject().translateZ(playerVelocity.z * delta);
    controls.getObject().position.y = 10;
  }
  else {
    playerVelocity.x = 0;
    playerVelocity.z = 0;
  }
}


function detectPlayerCollision() {
  // The rotation matrix to apply to our direction vector
  // Undefined by default to indicate ray should coming from front
  var rotationMatrix;
  // Get direction of camera
  var cameraDirection = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();

  // Check which direction we're moving (not looking)
  // Flip matrix to that direction so that we can reposition the ray
  if (moveBackward) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(degToRad(180));
  }
  else if (moveLeft) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(degToRad(90));
  }
  else if (moveRight) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(degToRad(270));
  }

  // Player is not moving forward, apply rotation matrix needed
  if (rotationMatrix !== undefined) {
    cameraDirection.applyMatrix4(rotationMatrix);
  }

  // Apply ray to player camera
  var rayCaster = new THREE.Raycaster(controls.getObject().position, cameraDirection);

  // If our ray hit a collidable object, return true
  if (rayIntersect(rayCaster, PLAYERCOLLISIONDISTANCE)) {
    return true;
  } else {
    return false;
  }
}

function rayIntersect(ray, distance) {
  var intersects = ray.intersectObjects(collidableObjects);
  for (var i = 0; i < intersects.length; i++) {
    // Check if there's a collision
    if (intersects[i].distance < distance) {
      return true;
    }
  }
  return false;
}

function recursiveChild(group, collidableObjects) {
  if (group.children == undefined) return;
  group.traverse((child) => {
    if (group != child) {
      recursiveChild(child, collidableObjects);
      collidableObjects.push(child);
    }
  });
}

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}

function interpolation(pos0, pos1, t0, t1, t) {
  if (t < t0) {
    return pos0;
  }
  if (t >= t1) {
    return pos1;
  }
  return pos0 + ((t - t0) / (t1 - t0)) * (pos1 - pos0);
}

function alert(msg, time = 3000) {
  var elem = document.getElementById("alert");
  elem.style.display = "block";
  elem.childNodes[1].innerHTML = msg;
  setTimeout(() => {
    elem.style.display = "none";
  }, time);
}

function hideDiv() {
  var elem = document.getElementById("safe-message");
  var txtInput = document.getElementById("txtInput");
  elem.style.display = "block";
  elem.childNodes[1].innerHTML = '';

  var ev = function (event) {
    switch (event.keyCode) {
      case 46: // canc
      case 13: // enter
        elem.style.display = "none";
        txtInput.value = "";
        hideDivSafe = true;
        openSafe = false;
        break;
    }
  };
  document.addEventListener('keydown', ev, false);
  document.addEventListener('keyup', ev, false);
}

function insertCode() {
  var elem = document.getElementById("safe-message");
  var txtInput = document.getElementById("txtInput");
  txtInput.focus();

  if (txtInput.value == "7480") {
    elem.style.display = "none";
    openSafe = true;
  }
  else {
    if (txtInput.value.length == 4) {
      elem.childNodes[1].innerHTML = "Your combination failed";
    }
  }

  if (backpack !== null && backpack.getOpen()) {
    document.getElementById("backpack").style.display = "block";
    document.getElementById("backpack-objects").style.display = "none";
    backpack.setOpen(false);
  }

  // txtInput.onkeypress = function (e) {
  //   var charCode = e.which;
  //   if (charCode < 48 || charCode > 57) e.preventDefault();
  // }
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var tend = document.getElementById("clockdiv");
  var clock = document.getElementById(id);
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      tend.style.display = 'none';
      clearInterval(timeinterval);
      blocker.style.display = 'block';
      blocker.childNodes[1].innerHTML = "Game over";
      controls.enabled = false;
      document.exitPointerLock();
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

function removeRooms() {
  scene.remove(room1);
  scene.remove(room2);
  scene.remove(hallway);
  for (var i = 0; i < objectsAnimated.length; i++) {
    if (objectsAnimated[i].getObjectName() != "DOOR_HALLWAY") {
      scene.remove(objectsAnimated[i].getObject());
      objectsAnimated.splice(i, 1);
      objectsRaycaster.splice(i, 1);
    }
  }
  collidableObjects = [];
  room1 = null;
  room2 = null;
  hallway = null;
  return true;
}

function removeLeaving() {
  scene.remove(livingRoom);
  for (var i = 0; i < objectsAnimated.length; i++) {
    scene.remove(objectsAnimated[i].getObject());
    objectsAnimated.splice(i, 1);
    objectsRaycaster.splice(i, 1);
  }
  if (gun != null) {
    gun = null;
  }
  collidableObjects = [];
  livingRoom = null;
  return true;
}

