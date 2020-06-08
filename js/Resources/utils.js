function degToRad(angle_degrees) {
    return angle_degrees * Math.PI / 180;
}

function createPlane(width, height, 
    pos = new THREE.Vector3(0.0, 0.0, 0.0), 
    rot = new THREE.Vector3(0.0, 0.0, 0.0), 
    materials) {
    var planeGeometry = new THREE.PlaneGeometry(width, height);
    

    var plane = null;

    if(materials.length > 1) {
        var group = new THREE.Group();

		for ( var i = 0; i < materials.length; i ++ ) {
            var elem = new THREE.Mesh( shapeGeometry, materials[i]);
            elem.castShadow = true;
            elem.receiveShadow = true;
			group.add( elem );
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

    for( var i = 0; i < holes.length; i ++) {
        shape.holes.push(holes[i]);
    }

    var shapeGeometry = new THREE.ShapeGeometry(shape);
    var plane = null;
    if(materials.length > 1) {
        var group = new THREE.Group();

		for ( var i = 0; i < materials.length; i ++ ) {
            var elem = new THREE.Mesh( shapeGeometry, materials[i]);
            elem.castShadow = true;
            elem.receiveShadow = true;
			group.add( elem );
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

function listenForPlayerMovement() {
    
    // A key has been pressed
    var onKeyDown = function(event) {

    switch (event.keyCode) {

      case 38: // up
        moveForward = true;
        break;
        
      case 40: // down
        moveBackward = true;
        break;
        
      case 37: // left
        moveLeft = true;
        break;
        
      case 39: // right
        moveRight = true;
        break;


      case 87: // w
        rotateUp = true;
        break;

      case 65: // a
        rotateLeft = true;
        break;

      case 83: // s
        rotateDown = true;
        break;

      case 68: // d
        rotateRight = true;
        break;
    }
  };

  // A key has been released
    var onKeyUp = function(event) {

    switch (event.keyCode) {

        case 38: // up
        moveForward = false;
        break;
        
      case 40: // down
        moveBackward = false;
        break;
        
      case 37: // left
        moveLeft = false;
        break;
        
      case 39: // right
        moveRight = false;
        break;


      case 87: // w
        rotateUp = false;
        break;

      case 65: // a
        rotateLeft = false;
        break;

      case 83: // s
        rotateDown = false;
        break;

      case 68: // d
        rotateRight = false;
        break;
    }
  };

  // Add event listeners for when movement keys are pressed and released
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
}

function animatePlayerUDLR(delta) {
    // Gradual slowdown
    playerVelocity.x -= playerVelocity.x * 10.0 * delta;
    playerVelocity.z -= playerVelocity.z * 10.0 * delta;
  
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
    if( !( moveForward || moveBackward || moveLeft || moveRight)) {
      // No movement key being pressed. Stop movememnt
      playerVelocity.x = 0;
      playerVelocity.z = 0;
    }
    controls.getObject().translateX(playerVelocity.x * delta);
    controls.getObject().translateZ(playerVelocity.z * delta);
}

function animatePlayerRotate() {
    /*if (rotateUp) {
        playerVelocity.x += 0.1;
      } 
    if (rotateDown) {
        playerVelocity.x -= 0.1;
      }*/

    if (rotateLeft) {
      playerVelocity.z += 0.1;
    } 
    if (rotateRight) {
      playerVelocity.z -= 0.1;
    }

    if( !(rotateLeft || rotateRight /*|| rotateUp || rotateDown*/ )) {
      // No movement key being pressed. Stop movememnt
      //playerVelocity.x = 0;
      playerVelocity.z = 0;
    }
    controls.getObject().rotateY(playerVelocity.z);
    //controls.getObject().rotateX(playerVelocity.x);
}