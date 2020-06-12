function createRoom1(gridSize) {
    // GRID
    var size = gridSize;
    //var divisions = 20;
    //var gridHelper = new THREE.GridHelper(size, divisions);
    //scene.add(gridHelper);

    // MATERIALS
    const textureFloor = new THREE.TextureLoader().load('../../images/parquet.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set(4, 4);

    const materialFloor = new THREE.MeshPhongMaterial({
        map: textureFloor,
        side: THREE.DoubleSide,
    });

    const textureWall = new THREE.TextureLoader().load('../../images/flowers.png');
    textureWall.wrapS = THREE.RepeatWrapping;
    textureWall.wrapT = THREE.RepeatWrapping;
    textureWall.repeat.set(0.5, 0.5);

    const materialWall = new THREE.MeshPhongMaterial({
        map: textureWall,
        side: THREE.BackSide,
    });

    const textureWallP = new THREE.TextureLoader().load('../../images/wall.jpg');
    textureWallP.wrapS = THREE.RepeatWrapping;
    textureWallP.wrapT = THREE.RepeatWrapping;
    textureWallP.repeat.set(4, 4);

    const materialWallP = new THREE.MeshPhongMaterial({
        map: textureWallP,
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
    });

    const textureWallR = new THREE.TextureLoader().load('../../images/roof.jpg');
    textureWallR.wrapS = THREE.RepeatWrapping;
    textureWallR.wrapT = THREE.RepeatWrapping;
    textureWallR.repeat.set(0.1, 0.1);

    const materialWallR = new THREE.MeshPhongMaterial({
        map: textureWallR,
    });

    const materialRoof = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });

    var room = new THREE.Group();

    var floor = createPlane(size, size, undefined, new THREE.Vector3(-90, 0, 0), [materialFloor]);
    room.add(floor);

    var door = createHole(8.0, 15.0, 7.5, 0.0);
    var wall1 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, size / 2.0), undefined, [materialWall, materialWallP], [door]);
    room.add(wall1);

    var wall2 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, -size / 2.0), new THREE.Vector3(0, 180, 0), [materialWall, materialWallB], []);
    room.add(wall2);

    var wall3Door = createHole(8.0, 15.0, 7.5, 0.0);
    var wall3 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, -size / 2.0), new THREE.Vector3(0, -90, 0), [materialWall, materialWallH], [wall3Door]);
    room.add(wall3);

    var wall4Window = createHole(10.0, 7.0, 7.5, 9.0);
    var wall4 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, size / 2.0), new THREE.Vector3(0, 90, 0), [materialWall, materialWallB], [wall4Window]);
    room.add(wall4);

    var roof = createShape(0.0, size, size, new THREE.Vector3(-size / 2, size / 2, size / 2), new THREE.Vector3(270, 0, 0), [materialRoof, materialWallR], []);
    room.add(roof);

    scene.add(room);
    recursiveChild(room, collidableObjects);

    /* MODEL 3D */

    var mtlLoaderDoor = new THREE.MTLLoader();
    mtlLoaderDoor.setPath("../../model3D/Room1/Door/");
    mtlLoaderDoor.load('10057_wooden_door_v3_iterations-2.mtl', function (materialsDoor) {

        materialsDoor.preload();

        var objLoaderDoor = new THREE.OBJLoader();
        objLoaderDoor.setMaterials(materialsDoor);
        objLoaderDoor.setPath("../../model3D/Room1/Door/");
        objLoaderDoor.load('10057_wooden_door_v3_iterations-2.obj', function (objectDoor) {
            objectDoor.position.x = -20;
            objectDoor.position.y = 0.0;
            objectDoor.position.z = -8.5;
            objectDoor.scale.set(0.09, 0.1, 0.075);
            objectDoor.rotateX(degToRad(-90));
            objectDoor.rotateZ(degToRad(90));
            objectDoor.traverse((child) => child.castShadow = true);
            objectDoor.children[0].rotateZ(0.5);
            objectDoor.children[0].position.y = 15;
            objectDoor.children[0].position.x = -6;
            objectDoor.children[0].position.z = 1;
            scene.add(objectDoor);

        });
    });

    var mtlLoaderWardrobe = new THREE.MTLLoader();
    mtlLoaderWardrobe.setPath("../../model3D/Room1/Wardrobe/");
    mtlLoaderWardrobe.load('Traditional_Armoire_Honey_V1.mtl', function (materialsWardrobe) {

        materialsWardrobe.preload();

        var objLoaderWardrobe = new THREE.OBJLoader();
        objLoaderWardrobe.setMaterials(materialsWardrobe);
        objLoaderWardrobe.setPath("../../model3D/Room1/Wardrobe/");
        objLoaderWardrobe.load('Traditional_Armoire_Honey_V1.obj', function (objectWardrobe) {
            objectWardrobe.position.x = -9.0;
            objectWardrobe.position.y = 7.4;
            objectWardrobe.position.z = 17.5;
            objectWardrobe.scale.set(0.15, 0.1, 0.13);
            objectWardrobe.rotateX(degToRad(-90));
            objectWardrobe.rotateZ(degToRad(180));
            objectWardrobe.traverse((child) => child.castShadow = true);
            scene.add(objectWardrobe);

        });
    });

    var mtlLoaderLamp = new THREE.MTLLoader();
    mtlLoaderLamp.setPath("../../model3D/Common/Lamp/");
    mtlLoaderLamp.load('lightbulbfinal.mtl', function (materialsLamp) {

        materialsLamp.preload();

        var objLoaderLamp = new THREE.OBJLoader();
        objLoaderLamp.setMaterials(materialsLamp);
        objLoaderLamp.setPath("../../model3D/Common/Lamp/");
        objLoaderLamp.load('lightbulbfinal.obj', function (objectLamp) {
            objectLamp.position.x = 0.0;
            objectLamp.position.y = 16.8;
            objectLamp.position.z = 0.0;
            objectLamp.scale.set(0.09, 0.02, 0.075);
            objectLamp.rotateY(degToRad(90));
            scene.add(objectLamp);

        });
    });

    const gltfLoaderDoor = new THREE.GLTFLoader();
    gltfLoaderDoor.load("../../model3D/Room1/Bed/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 18;
        root.position.y = 0;
        root.position.z = -14;
        root.scale.set(0.1, 0.09, 0.08);
        root.rotateY(degToRad(-90));
        // bed = root.getObjectByName('Collada_visual_scene_group');
        // blanket = root.getObjectByName('Blanket');
        scene.add(root);
        //console.log(dumpObject(root).join('\n'));
    });

}