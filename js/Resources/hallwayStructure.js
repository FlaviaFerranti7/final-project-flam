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

    const textureWallB = new THREE.TextureLoader().load('../../images/brick.jpg');
    textureWallB.wrapS = THREE.RepeatWrapping;
    textureWallB.wrapT = THREE.RepeatWrapping;
    textureWallB.repeat.set(0.1, 0.1);

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

    const textureWallL = new THREE.TextureLoader().load('../../images/livingRoom.jpg');
    textureWallL.wrapS = THREE.RepeatWrapping;
    textureWallL.wrapT = THREE.RepeatWrapping;
    textureWallL.repeat.set(0.5, 0.5);

    const materialWallL = new THREE.MeshPhongMaterial({
        map: textureWallL,
    });

    const textureWallR = new THREE.TextureLoader().load('../../images/roof.jpg');
    textureWallR.wrapS = THREE.RepeatWrapping;
    textureWallR.wrapT = THREE.RepeatWrapping;
    textureWallR.repeat.set(0.1, 0.1);

    const materialWallR = new THREE.MeshPhongMaterial({
        map: textureWallR,
    });

    const materialRoof = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });

    var hallway = new THREE.Group();

    var floor = createPlane(size / 4, size, new THREE.Vector3(-size / 2.67, 0.0, size / 4), new THREE.Vector3(-90, 0, 0), [materialFloor]);
    hallway.add(floor);

    var wall2Window = createHole(10.0, 7.0, 5.0, 9.0);
    var wall2 = createShape(0.0, size / 4, size / 4, new THREE.Vector3(-size / 2.0, 0.0, 0.75 * size), undefined, [materialWallH, materialWallB], [wall2Window]);
    hallway.add(wall2);

    var wall3Door = createHole(8.0, 15.0, 25.0, 0.0);
    var wall3 = createShape(0.0, size / 4, size, new THREE.Vector3(-size / 2.0, 0.0, -0.25 * size), new THREE.Vector3(0, -90, 0), [materialWallH, materialWallL], [wall3Door]);
    hallway.add(wall3);

    var wall4 = createShape(0.0, size / 4, size / 4, new THREE.Vector3(-size / 4.0, 0.0, -0.25 * size), new THREE.Vector3(0, 180, 0), [materialWallH, materialWallB], []);
    hallway.add(wall4);

    var roof = createShape(0.0, size, size / 4, new THREE.Vector3(-size / 2, size / 4, 0.75 * size), new THREE.Vector3(-90, 0, 0), [materialRoof, materialWallR], []);
    hallway.add(roof);

    scene.add(hallway);
    recursiveChild(hallway, collidableObjects);

    /* MODEL 3D */

    var mtlLoaderLampL1 = new THREE.MTLLoader();
    mtlLoaderLampL1.setPath("../../model3D/Common/Lamp/");
    mtlLoaderLampL1.load('lightbulbfinal.mtl', function (materialsLampL1) {

        materialsLampL1.preload();

        var objLoaderLampL1 = new THREE.OBJLoader();
        objLoaderLampL1.setMaterials(materialsLampL1);
        objLoaderLampL1.setPath("../../model3D/Common/Lamp/");
        objLoaderLampL1.load('lightbulbfinal.obj', function (objectLampL1) {
            objectLampL1.position.x = -30.0;
            objectLampL1.position.y = 16.8;
            objectLampL1.position.z = 0.0;
            objectLampL1.scale.set(0.09, 0.02, 0.075);
            objectLampL1.rotateY(degToRad(90));
            scene.add(objectLampL1);

        });
    });

    var mtlLoaderLampL2 = new THREE.MTLLoader();
    mtlLoaderLampL2.setPath("../../model3D/Common/Lamp/");
    mtlLoaderLampL2.load('lightbulbfinal.mtl', function (materialsLampL2) {

        materialsLampL2.preload();

        var objLoaderLampL2 = new THREE.OBJLoader();
        objLoaderLampL2.setMaterials(materialsLampL2);
        objLoaderLampL2.setPath("../../model3D/Common/Lamp/");
        objLoaderLampL2.load('lightbulbfinal.obj', function (objectLampL2) {
            objectLampL2.position.x = -30.0;
            objectLampL2.position.y = 16.8;
            objectLampL2.position.z = 40.0;
            objectLampL2.scale.set(0.09, 0.02, 0.075);
            objectLampL2.rotateY(degToRad(90));
            scene.add(objectLampL2);

        });
    });

    const gltfLoaderConsole = new THREE.GLTFLoader();
    gltfLoaderConsole.load("../../model3D/Hallway/Console/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -22;
        root.position.y = -0.1;
        root.position.z = 30.0;
        root.scale.set(0.1, 0.1, 0.05);
        root.rotateY(degToRad(-90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
        // console.log(dumpObject(root).join('\n'));
    });

}