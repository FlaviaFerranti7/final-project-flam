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

    const gltfLoaderEntryDoor = new THREE.GLTFLoader();
    gltfLoaderEntryDoor.load("../../model3D/LivingRoom/EntryDoor/scene.gltf", (gltf) => {
        const root = gltf.scene.getObjectByName('group_1');
        root.position.x = -99.5
        root.position.y = 0.0;
        root.position.z = 26;
        root.scale.set(0.17, 0.17, 0.162);
        root.rotateX(degToRad(-90));
        root.rotateZ(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);

        var animation = (t, move) => {
            if (root.getObjectByName('group_5').rotation.z == degToRad(-90)) return false;

            if (move) {
                root.getObjectByName('group_5').rotation.z = interpolation(0.0, degToRad(-90), 0, 15, t);
                root.getObjectByName('group_5').position.x = interpolation(15.75, 12.5, 0, 15, t);
                root.getObjectByName('group_5').position.y = interpolation(0.03, 5, 0, 15, t);
                return true;
            }
            return false;
        };
        var obj = {
            root: root,
            animation: animation,
            actionEnded: false,
            reverseAnimation: null,
            associatedAnimation: null,
            actionButton: "space",
        };
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.root);
        scene.add(root);
    });

    const gltfLoaderWindowDoors = new THREE.GLTFLoader();
    gltfLoaderWindowDoors.load("../../model3D/LivingRoom/WindowDoors/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -77.95;
        root.position.y = 0.0;
        root.position.z = 60;
        root.getObjectByName('Frame001_2').rotateY(degToRad(-9.5));
        root.getObjectByName('Strips001_3').rotateY(degToRad(-9.5));
        root.scale.set(2.015, 1.24, 1.5);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var animation = (t, move) => {
            if (root.getObjectByName('Strips_1').rotation.y == degToRad(-145)) return false;

            if (move) {
                // right door
                root.getObjectByName('Frame_0').rotation.y = interpolation(0, degToRad(-145), 0, 15, t);
                root.getObjectByName('Strips_1').rotation.y = interpolation(0, degToRad(-145), 0, 15, t);
                // left door
                root.getObjectByName('Frame001_2').rotation.y = interpolation(0.0, degToRad(145), 0, 15, t);
                root.getObjectByName('Strips001_3').rotation.y = interpolation(0.0, degToRad(145), 0, 15, t);
                return true;
            }
            return false;
        };
        var obj = {
            root: root,
            animation: animation,
            actionEnded: false,
            reverseAnimation: null,
            associatedAnimation: null,
            actionButton: "space",
        };
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.root);
        scene.add(root);
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
    });

    const gltfLoaderBookcase = new THREE.GLTFLoader();
    gltfLoaderBookcase.load("../../model3D/LivingRoom/Bookcase/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -99.0;
        root.position.y = 0.0;
        root.position.z = -5.0;
        root.scale.set(0.4, 0.24, 0.2);
        root.rotateY(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderFurniture = new THREE.GLTFLoader();
    gltfLoaderFurniture.load("../../model3D/LivingRoom/Furniture/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -50.0;
        root.position.y = 1.5;
        root.position.z = 35.0;
        root.scale.set(7.0, 7.0, 7.0);
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

    const gltfLoaderViolin = new THREE.GLTFLoader();
    gltfLoaderViolin.load("../../model3D/LivingRoom/Violin/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -90.0;
        root.position.y = 3.1;
        root.position.z = 58.0;
        root.scale.set(0.6, 0.6, 0.6);
        root.rotateY(degToRad(-90));
        root.name = 'VIOLIN';
        root.traverse((child) => child.castShadow = true);
        var obj = {
            root: root,
            animation: null,
            actionEnded: false,
            reverseAnimation: null,
            associatedAnimation: null,
            actionButton: "Q",
        };
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.root);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderHourglass = new THREE.GLTFLoader();
    gltfLoaderHourglass.load("../../model3D/LivingRoom/Hourglass/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -56.0;
        root.position.y = 3.9;
        root.position.z = -1.0;
        root.name = 'HOURGLASS';
        root.scale.set(0.25, 0.2, 0.25);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var obj = {
            root: root,
            animation: null,
            actionEnded: false,
            reverseAnimation: null,
            associatedAnimation: null,
            actionButton: "Q",
        };
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.root);
        root.getObjectByName('table_4').visible = false;
        scene.add(root);
    });

    const gltfLoaderGateRemoteControl = new THREE.GLTFLoader();
    gltfLoaderGateRemoteControl.load("../../model3D/LivingRoom/GateRemoteControl/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -70.0;
        root.position.y = 3.65;
        root.position.z = -7.0;
        root.scale.set(0.007, 0.005, 0.007);
        root.name = 'REMOTE';
        root.rotateX(degToRad(-90));
        root.traverse((child) => child.castShadow = true);
        var obj = {
            root: root,
            animation: null,
            actionEnded: false,
            reverseAnimation: null,
            associatedAnimation: null,
            actionButton: "Q",
        };
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.root);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });
}