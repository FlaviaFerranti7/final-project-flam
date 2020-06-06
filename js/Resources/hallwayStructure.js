function createHallway(gridSize) {

    // GRID
    var size = gridSize;
    /*var divisions = 20;
    var gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.x = -40;
    gridHelper.position.z = 20;
    scene.add(gridHelper);
    */

    // MATERIALS
    const textureFloor = new THREE.TextureLoader().load('../../images/parquet.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set(4, 4);

    const materialFloor = new THREE.MeshPhongMaterial({
        map: textureFloor,
        side: THREE.DoubleSide,
    });

    const textureWallB = new THREE.TextureLoader().load('../../images/brick.png');
    textureWallB.wrapS = THREE.RepeatWrapping;
    textureWallB.wrapT = THREE.RepeatWrapping;
    textureWallB.repeat.set(0.3, 0.3);

    const materialWallB = new THREE.MeshPhongMaterial({
        map: textureWallB,
    });

    const textureWallH = new THREE.TextureLoader().load('../../images/hallway.jpg');
    textureWallH.wrapS = THREE.RepeatWrapping;
    textureWallH.wrapT = THREE.RepeatWrapping;
    textureWallH.repeat.set(4, 4);

    const materialWallH = new THREE.MeshPhongMaterial({
        map: textureWallH,
        side: THREE.BackSide,
    });


    const materialRoof = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });

    var hallway = new THREE.Group();

    var floor = createPlane(size / 4, size, new THREE.Vector3(-size / 2.67, 0.0, size / 4), new THREE.Vector3(-90, 0, 0), [materialFloor]);
    hallway.add(floor);

    var wall2Window = createHole(10.0, 7.0, 5.0, 9.0);
    var wall2 = createShape(0.0, size / 4, size / 4, new THREE.Vector3(-size / 2.0, 0.0, 0.75 * size), undefined, [materialWallH, materialWallB], [wall2Window]);
    hallway.add(wall2);

    var wall3Door = createHole(8.0, 15.0, 25.0, 0.0);
    var wall3 = createShape(0.0, size / 4, size, new THREE.Vector3(-size / 2.0, 0.0, -0.25 * size), new THREE.Vector3(0, -90, 0), [materialWallH, materialWallB], [wall3Door]);
    hallway.add(wall3);

    var wall4 = createShape(0.0, size / 4, size / 4, new THREE.Vector3(-size / 4.0, 0.0, -0.25 * size), new THREE.Vector3(0, 180, 0), [materialWallH, materialWallB], []);
    hallway.add(wall4);

    var roof = createShape(0.0, size, size / 4, new THREE.Vector3(-size / 2, size / 4, 0.75 * size), new THREE.Vector3(-90, 0, 0), [materialRoof, materialWallB], []);
    hallway.add(roof);

    scene.add(hallway);

    /* MODEL 3D */

    var mtlLoaderLamp = new THREE.MTLLoader();
    mtlLoaderLamp.setPath("../../model3D/Hallway/Lamp/");
    mtlLoaderLamp.load('Pinch_125_wishnya.mtl', function (materialsLamp) {

        materialsLamp.preload();

        var objLoaderLamp = new THREE.OBJLoader();
        objLoaderLamp.setMaterials(materialsLamp);
        objLoaderLamp.setPath("../../model3D/Hallway/Lamp/");
        objLoaderLamp.load('Pinch_125_wishnya.obj', function (objectLamp) {
            objectLamp.position.x = -30;
            objectLamp.position.y = 17.25;
            objectLamp.position.z = 40;
            objectLamp.scale.set(0.01, 0.01, 0.01);
            scene.add(objectLamp);

        });
    });
}