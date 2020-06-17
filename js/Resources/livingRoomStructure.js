function createLivingRoom(gridSize) {
    var size = gridSize;

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

    const textureWallL = new THREE.TextureLoader().load('../../images/livingRoom.jpg');
    textureWallL.wrapS = THREE.RepeatWrapping;
    textureWallL.wrapT = THREE.RepeatWrapping;
    textureWallL.repeat.set(0.5, 0.5);

    const materialWallL = new THREE.MeshPhongMaterial({
        map: textureWallL,
        side: THREE.BackSide,
    });

    const textureWallR = new THREE.TextureLoader().load('../../images/roof.jpg');
    textureWallR.wrapS = THREE.RepeatWrapping;
    textureWallR.wrapT = THREE.RepeatWrapping;
    textureWallR.repeat.set(0.1, 0.1);

    const materialWallR = new THREE.MeshPhongMaterial({
        map: textureWallR,
    });

    const materialRoof = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });

    var livingRoom = new THREE.Group();

    var floor = createPlane(size * 3 / 4, size, new THREE.Vector3(-size * 0.8745, 0.0, size / 4), new THREE.Vector3(-90, 0, 0), [materialFloor]);
    livingRoom.add(floor);

    var wall2Window = createHole(16.0, 15.0, 22.0, 0.0);
    var wall2 = createShape(0.0, size / 4, size * 3 / 4, new THREE.Vector3(-size * 1.25, 0.0, 0.75 * size), undefined, [materialWallL, materialWallB], [wall2Window]);
    livingRoom.add(wall2);

    var wall3Door = createHole(12.0, 15.0, 34.0, 0.0);
    var wall3 = createShape(0.0, size / 4, size, new THREE.Vector3(-size * 1.25, 0.0, -0.25 * size), new THREE.Vector3(0, -90, 0), [materialWallL, materialWallB], [wall3Door]);
    livingRoom.add(wall3);

    var wall4 = createShape(0.0, size / 4, size * 3 / 4, new THREE.Vector3(-size / 2, 0.0, -0.25 * size), new THREE.Vector3(0, 180, 0), [materialWallL, materialWallB], []);
    livingRoom.add(wall4);

    var roof = createShape(0.0, size, size * 3 / 4, new THREE.Vector3(-size * 1.25, size / 4, 0.75 * size), new THREE.Vector3(-90, 0, 0), [materialRoof, materialWallR], []);
    livingRoom.add(roof);

    scene.add(livingRoom);
    recursiveChild(livingRoom, collidableObjects);

    var mtlLoaderLamp = new THREE.MTLLoader();
    mtlLoaderLamp.setPath("../../model3D/LivingRoom/Lamp/");
    mtlLoaderLamp.load('ZAHA LIGHT white chandelier.mtl', function (materialsLamp) {

        materialsLamp.preload();

        var objLoaderLamp = new THREE.OBJLoader();
        objLoaderLamp.setMaterials(materialsLamp);
        objLoaderLamp.setPath("../../model3D/LivingRoom/Lamp/");
        objLoaderLamp.load('ZAHA LIGHT white chandelier.obj', function (objectLamp) {
            objectLamp.position.x = -80.0;
            objectLamp.position.y = 1.9;
            objectLamp.position.z = 20.0;
            objectLamp.scale.set(0.006, 0.006, 0.006);
            objectLamp.rotateY(degToRad(90));
            scene.add(objectLamp);

        });
    });

    const gltfLoaderSofa = new THREE.GLTFLoader();
    gltfLoaderSofa.load("../../model3D/LivingRoom/Sofa/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -62.0;
        root.position.y = -0.5;
        root.position.z = 0.0;
        root.scale.set(0.09, 0.09, 0.09);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
        // console.log(dumpObject(root).join('\n'));
    });

    const gltfLoaderTable = new THREE.GLTFLoader();
    gltfLoaderTable.load("../../model3D/LivingRoom/Table/source/19_12_172.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -60.0;
        root.position.y = 0.0;
        root.position.z = 0.0;
        root.scale.set(4.0, 4.0, 4.0);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
        // console.log(dumpObject(root).join('\n'));
    });

    const gltfLoaderBookcase = new THREE.GLTFLoader();
    gltfLoaderBookcase.load("../../model3D/LivingRoom/Bookcase/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -99.0;
        root.position.y = 0.0;
        root.position.z = -5.0;
        root.scale.set(0.4, 0.45, 0.2);
        root.rotateY(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderFurniture = new THREE.GLTFLoader();
    gltfLoaderFurniture.load("../../model3D/LivingRoom/Furniture/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -50.0;
        root.position.y = 0.0;
        root.position.z = 35.0;
        root.scale.set(8.0, 10.0, 8.0);
        root.rotateY(degToRad(-90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderMirror = new THREE.GLTFLoader();
    gltfLoaderMirror.load("../../model3D/LivingRoom/Mirror/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -99.0;
        root.position.y = 7.0;
        root.position.z = 40.0;
        root.scale.set(8.0, 4.0, 1.0);
        root.rotateY(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });
}