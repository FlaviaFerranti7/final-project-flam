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

    var wall3Door = createHole(8.0, 15.5, 25.0, 0.0);
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

    // const gltfLoaderBed = new THREE.GLTFLoader();
    // gltfLoaderBed.load("../../model3D/Room2/Bed/scene.gltf", (gltf) => {
    //     const root = gltf.scene;
    //     root.position.x = 0.0;
    //     root.position.y = 0.0;
    //     root.position.z = 51.0;
    //     root.scale.set(0.009, 0.009, 0.008);
    //     root.rotateY(degToRad(180));
    //     root.traverse((child) => child.castShadow = true);
    //     recursiveChild(root, collidableObjects);
    //     console.log(dumpObject(root).join('\n'));
    //     scene.add(root);
    // });

    const gltfLoaderBattery = new THREE.GLTFLoader();
    gltfLoaderBattery.load("../../model3D/Room2/Battery/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 12.0;
        root.position.y = 4.3;
        root.position.z = 57.0;
        root.scale.set(0.005, 0.006, 0.005);
        root.rotateX(degToRad(270));
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
            if(root.getObjectByName('Cube001').rotation.z == degToRad(90)) return false;
            if (move) {
                root.getObjectByName('Cube001').rotation.z = interpolation(0,degToRad(90),0,5,t);
                return true;
            }
            return false;
        };
        var obj = {
            root: root,
            animation: animation,
            actionEnded: false,
            reverseAnimation: null,
            actionButton: "space",
        };
        objectsAnimated.push(obj);
        
        scene.add(root);
        //console.log(dumpObject(root).join('\n'));
    });

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
            objectDoor.position.z = 49;
            objectDoor.scale.set(0.09, 0.1, 0.075);
            objectDoor.rotateX(degToRad(-90));
            objectDoor.rotateZ(degToRad(90));
            objectDoor.traverse((child) => child.castShadow = true);
            recursiveChild(objectDoor, collidableObjects);
            var t1 = 0;
            var t2 = 0;
            var t3 = 0;
            var animation = (t, move) => {
                if(objectDoor.children[0].rotation.z == -degToRad(90)) return false;
                if (move) {
                    objectDoor.children[0].rotation.z = interpolation(0,-degToRad(90),0, 25,t);
                    objectDoor.children[0].position.y = interpolation(0, -25, 0, 10, t);
                    objectDoor.children[0].position.x = interpolation(0, -5, 0, 5, t);
                    if(t == 5){
                        objectDoor.children[0].position.x = -5;
                    }
                    else if(t> 5){
                        objectDoor.children[0].position.x = interpolation(-5, -18, 0, 10, t2);
                        t2+= 0.1;
                    }
                    if(t2 == 10){
                        objectDoor.children[0].position.x = -18;
                    }
                    else if(t2 > 10){
                        objectDoor.children[0].position.x = interpolation(-18, -40, 0, 10, t3);
                        t3 += 0.1;
                    }
                    if(t==10){
                        objectDoor.children[0].position.y = -25;
                    }
                    else if(t>10){
                        objectDoor.children[0].position.y = interpolation(-25, -40, 0, 15, t1);
                        t1 += 0.1;
                    }
                    return true;
                }
                return false;
            };
            var obj = {
                root: objectDoor,
                animation: animation,
                actionEnded: false,
                reverseAnimation: null,
                actionButton: "space",
            };
            objectsAnimated.push(obj);
            scene.add(objectDoor);

        });
    });

    const gltfLoaderWindow = new THREE.GLTFLoader();
    gltfLoaderWindow.load("../../model3D/Common/Window/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 20.0;
        root.position.y = 9;
        root.position.z = 47.5;
        root.scale.set(0.087, 0.035, 0.05);
        root.rotateY(degToRad(270));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderSafe = new THREE.GLTFLoader();
    gltfLoaderSafe.load("../../model3D/Room2/Safe/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 14;
        root.position.y = 3.5;
        root.position.z = 22.6;
        root.scale.set(0.087, 0.087, 0.07);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        root.getObjectByName('Safe1_Door').rotation.z = -degToRad(90);
        var animation = (t, move) => {
            if(root.getObjectByName('Safe1_Door').rotation.z == 0) return false;
            if (move) {
                root.getObjectByName('Safe1_Door').rotation.z = interpolation(-degToRad(90), 0, 0, 5, t);
                return true;
            }
            return false;
        };
        var obj = {
            root: root,
            animation: animation,
            actionEnded: false,
            reverseAnimation: null,
            actionButton: "space",
        };
        objectsAnimated.push(obj);
        scene.add(root);
    });

    const gltfLoaderDiamond = new THREE.GLTFLoader();
    gltfLoaderDiamond.load("../../model3D/Room2/Diamond/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 13.5;
        root.position.y = 7;
        root.position.z = 23;
        root.scale.set(0.008, 0.008, 0.008);
        root.rotateZ(degToRad(45));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderBullet = new THREE.GLTFLoader();
    gltfLoaderBullet.load("../../model3D/Room2/Bullet/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -11;
        root.position.y = 4.3;
        root.position.z = 57.0;
        root.scale.set(0.2, 0.2, 0.2);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

}