function createRoom2(gridSize) {

    // GRID
    var size = gridSize;
    //var divisions = 20;
    //var gridHelper = new THREE.GridHelper(size, divisions);
    //gridHelper.position.z = 40;
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

    const textureWall = new THREE.TextureLoader().load('../../images/wall.jpg');
    textureWall.wrapS = THREE.RepeatWrapping;
    textureWall.wrapT = THREE.RepeatWrapping;
    textureWall.repeat.set(4, 4);

    const materialWall = new THREE.MeshPhongMaterial({
        map: textureWall,
        side: THREE.BackSide,
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

    var floor = createPlane(size, size, new THREE.Vector3(0.0, 0.0, size), new THREE.Vector3(-90, 0, 0), [materialFloor]);
    room.add(floor);

    var wall2 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, 1.5 * size), undefined, [materialWall, materialWallB], []);
    room.add(wall2);

    var wall3Door = createHole(8.0, 15.0, 25.0, 0.0);
    var wall3 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, 0.5 * size), new THREE.Vector3(0, -90, 0), [materialWall, materialWallH], [wall3Door]);
    room.add(wall3);

    var wall4Window = createHole(10.0, 7.0, 7.5, 9.0);
    var wall4 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, 1.5 * size), new THREE.Vector3(0, 90, 0), [materialWall, materialWallB], [wall4Window]);
    room.add(wall4);

    var roof = createShape(0.0, size, size, new THREE.Vector3(-size / 2, size / 2, 1.5 * size), new THREE.Vector3(-90, 0, 0), [materialRoof, materialWallR], []);
    room.add(roof);

    scene.add(room);
    recursiveChild(room, collidableObjects);

    /* MODEL 3D */
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
            objectLamp.position.z = 40.0;
            objectLamp.scale.set(0.09, 0.02, 0.075);
            objectLamp.rotateY(degToRad(90));
            scene.add(objectLamp);

        });
    });

    const gltfLoaderBed = new THREE.GLTFLoader();
    gltfLoaderBed.load("../../model3D/Room2/Bed/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 0.0;
        root.position.y = 0.0;
        root.position.z = 51.0;
        root.scale.set(0.009, 0.009, 0.008);
        root.rotateY(degToRad(180));
        //console.log(dumpObject(root).join('\n'));
        scene.add(root);
    });

    const gltfLoaderBattery = new THREE.GLTFLoader();
    gltfLoaderBattery.load("../../model3D/Room2/Battery/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 12.0;
        root.position.y = 4.3;
        root.position.z = 57.0;
        root.scale.set(0.005, 0.006, 0.005);
        root.rotateX(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderWardrobe = new THREE.GLTFLoader();
    gltfLoaderWardrobe.load("../../model3D/Room2/Wardrobe/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 11;
        root.position.y = 0;
        root.position.z = 22.5;
        root.scale.set(0.025, 0.016, 0.02);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        root.getObjectByName('Cube003').position.z = 0;
        root.getObjectByName('Cube001').rotation.z = 0;        
        var animation = (t, move) => {
            if(root.getObjectByName('Cube001').rotation.z == -degToRad(90)) return false;
            if (move) {
                root.getObjectByName('Cube001').rotation.z = interpolation(0,degToRad(90),0,5,t);
                return true;
            }
            return false;
        };
        var obj = {
            root: root,
            animation: animation,            
            actionButton: "space",
        };
        objectsAnimated.push(obj);
        
        scene.add(root);
        console.log(dumpObject(root).join('\n'));
    });

}