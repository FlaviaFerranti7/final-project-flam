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
        plane = THREE.SceneUtils.createMultiMaterialObject(planeGeometry, materials);
    } else {
        plane = new THREE.Mesh(planeGeometry, materials[0]);
    }

    plane.position.x = pos.x;
    plane.position.y = pos.y;
    plane.position.z = pos.z;

    plane.rotateX(degToRad(rot.x));
    plane.rotateY(degToRad(rot.y));
    plane.rotateZ(degToRad(rot.z));
    
    plane.receiveShadow = true;

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
        plane = THREE.SceneUtils.createMultiMaterialObject(shapeGeometry, materials);
    } else {
        plane = new THREE.Mesh(shapeGeometry, materials[0]);
    }
    plane.position.x = pos.x;
    plane.position.y = pos.y;
    plane.position.z = pos.z;

    plane.rotateX(degToRad(rot.x));
    plane.rotateY(degToRad(rot.y));
    plane.rotateZ(degToRad(rot.z));  

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