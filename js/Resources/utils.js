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
  }
  document.addEventListener('pointerlockchange', lockChange, false);
}

function lockChange() {
  // Turn on controls
  if (document.pointerLockElement === container) {
    // Hide blocker and instructions
    blocker.style.display = "none";
    controls.enabled = true;
    // Turn off the controls
  } else {
    // Display the blocker and instruction
    blocker.style.display = "";
    controls.enabled = false;
  }
}

function listenForPlayerMovement() {

  // A key has been pressed
  var onKeyDown = function (event) {
    switch (event.keyCode) {

      case 87: // w
        moveForward = true;
        break;

      case 83: // s
        moveBackward = true;
        break;

      case 65: // a 
        moveLeft = true;
        break;

      case 68: // d
        moveRight = true;
        break;

      case 32: // space
        if (enableSpace) move = true;
        break;
      
      // Q
      case 81:
        if(enableSpace) collect = true;
        break;
      
      case 69:
        if(backpack !== null && !backpack.getOpen()) {
          backpack.setOpen(true);
          document.getElementById("backpack").style.display = "none";
          document.getElementById("backpack-objects").style.display = "flex";
        } else if(backpack !== null && backpack.getOpen()) {
          document.getElementById("backpack").style.display = "block";
          document.getElementById("backpack-objects").style.display = "none";
          backpack.setOpen(false);
        }
    }
  };

  // A key has been released
  var onKeyUp = function (event) {

    switch (event.keyCode) {

      case 87: // w
        moveForward = false;
        break;

      case 83: // s
        moveBackward = false;
        break;

      case 65: // a 
        moveLeft = false;
        break;

      case 68: // d
        moveRight = false;
        break;
    }


  };

  // Add event listeners for when movement keys are pressed and released
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
    elem.style.display = "none"
  }, time);
}
