function createHouse() {
    const textureWall1 = new THREE.TextureLoader().load('../../images/flowers.png');
    textureWall1.wrapS = THREE.RepeatWrapping;
    textureWall1.wrapT = THREE.RepeatWrapping;
    textureWall1.repeat.set(0.5, 0.5);

    const materialWall1 = new THREE.MeshPhongMaterial({
        map: textureWall1,
        side: THREE.BackSide,
    });

    const textureWallB = new THREE.TextureLoader().load('../../images/brick.jpg');
    textureWallB.wrapS = THREE.RepeatWrapping;
    textureWallB.wrapT = THREE.RepeatWrapping;
    textureWallB.repeat.set(0.1, 0.1);

    const materialWallB = new THREE.MeshPhongMaterial({
        map: textureWallB,
    });

    const textureWallR = new THREE.TextureLoader().load('../../images/roof.jpg');
    textureWallR.wrapS = THREE.RepeatWrapping;
    textureWallR.wrapT = THREE.RepeatWrapping;
    textureWallR.repeat.set(0.1, 0.1);

    const materialWallR = new THREE.MeshPhongMaterial({
        map: textureWallR,
    });

    const textureWall2 = new THREE.TextureLoader().load('../../images/wall.jpg');
    textureWall2.wrapS = THREE.RepeatWrapping;
    textureWall2.wrapT = THREE.RepeatWrapping;
    textureWall2.repeat.set(4, 4);

    const materialWall2 = new THREE.MeshPhongMaterial({
        map: textureWall2,
        side: THREE.BackSide,
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
        side: THREE.BackSide,
    });

    const materialRoof = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });

    var house = new THREE.Group();

    var wall12 = createShape(0.0, 40 / 2, 40, new THREE.Vector3(40 / 2.0, 0.0, -40 / 2.0), new THREE.Vector3(0, 180, 0), [materialWall1, materialWallB], []);
    house.add(wall12);

    var wall14Window = createHole(10.0, 7.0, 7.5, 9.0);
    var wall14 = createShape(0.0, 40 / 2, 40, new THREE.Vector3(40 / 2.0, 0.0, 40 / 2.0), new THREE.Vector3(0, 90, 0), [materialWall1, materialWallB], [wall14Window]);
    house.add(wall14);

    var roof1 = createShape(0.0, 40, 40, new THREE.Vector3(-40 / 2, 40 / 2, 40 / 2), new THREE.Vector3(270, 0, 0), [materialRoof, materialWallR], []);
    house.add(roof1);

    var wall22 = createShape(0.0, 40 / 2, 40, new THREE.Vector3(-40 / 2.0, 0.0, 1.5 * 40), undefined, [materialWall2, materialWallB], []);
    house.add(wall22);

    var wall24Window = createHole(10.0, 7.0, 7.5, 9.0);
    var wall24 = createShape(0.0, 40 / 2, 40, new THREE.Vector3(40 / 2.0, 0.0, 1.5 * 40), new THREE.Vector3(0, 90, 0), [materialWall2, materialWallB], [wall24Window]);
    house.add(wall24);

    var roof2 = createShape(0.0, 40, 40, new THREE.Vector3(-40 / 2, 40 / 2, 1.5 * 40), new THREE.Vector3(-90, 0, 0), [materialRoof, materialWallR], []);
    house.add(roof2);

    var wallH2Window = createHole(10.0, 7.0, 5.0, 9.0);
    var wallH2 = createShape(0.0, 80 / 4, 80 / 4, new THREE.Vector3(-80 / 2.0, 0.0, 0.75 * 80), undefined, [materialWallH, materialWallB], [wallH2Window]);
    house.add(wallH2);

    var wallH4 = createShape(0.0, 80 / 4, 80 / 4, new THREE.Vector3(-80 / 4.0, 0.0, -0.25 * 80), new THREE.Vector3(0, 180, 0), [materialWallH, materialWallB], []);
    house.add(wallH4);

    var roofH = createShape(0.0, 80, 80 / 4, new THREE.Vector3(-80 / 2, 80 / 4, 0.75 * 80), new THREE.Vector3(-90, 0, 0), [materialRoof, materialWallR], []);
    house.add(roofH);

    var wallL2Window = createHole(16.0, 15.0, 22.0, 0.0);
    var wallL2 = createShape(0.0, 80 / 4, 80 * 3 / 4, new THREE.Vector3(-80 * 1.25, 0.0, 0.75 * 80), undefined, [materialWallL, materialWallB], [wallL2Window]);
    house.add(wallL2);

    var wallL3Door = createHole(12.0, 15.0, 34.0, 0.0);
    var wallL3 = createShape(0.0, 80 / 4, 80, new THREE.Vector3(-80 * 1.25, 0.0, -0.25 * 80), new THREE.Vector3(0, -90, 0), [materialWallL, materialWallB], [wallL3Door]);
    house.add(wallL3);

    var wallL4 = createShape(0.0, 80 / 4, 80 * 3 / 4, new THREE.Vector3(-80 / 2, 0.0, -0.25 * 80), new THREE.Vector3(0, 180, 0), [materialWallL, materialWallB], []);
    house.add(wallL4);

    var roofL = createShape(0.0, 80, 80 * 3 / 4, new THREE.Vector3(-80 * 1.25, 80 / 4, 0.75 * 80), new THREE.Vector3(-90, 0, 0), [materialRoof, materialWallR], []);
    house.add(roofL);

    recursiveChild(house, collidableObjects);

    const gltfLoaderWindow1 = new THREE.GLTFLoader();
    gltfLoaderWindow1.load("../../model3D/Common/Window/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 20.0;
        root.position.y = 9;
        root.position.z = 7.5;
        root.scale.set(0.087, 0.035, 0.05);
        root.rotateY(degToRad(270));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        house.add(root);
    });

    const gltfLoaderWindow2 = new THREE.GLTFLoader();
    gltfLoaderWindow2.load("../../model3D/Common/Window/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 20.0;
        root.position.y = 9;
        root.position.z = 47.5;
        root.scale.set(0.087, 0.035, 0.05);
        root.rotateY(degToRad(270));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        house.add(root);
    });
    
    const gltfLoaderWindowH = new THREE.GLTFLoader();
    gltfLoaderWindowH.load("../../model3D/Common/Window/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -30.0;
        root.position.y = 9;
        root.position.z = 60;
        root.scale.set(0.087, 0.035, 0.05);
        root.rotateY(degToRad(180));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        house.add(root);
    });

    const gltfLoaderWindowDoors = new THREE.GLTFLoader();
    gltfLoaderWindowDoors.load("../../model3D/LivingRoom/WindowDoors/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -77.95;
        root.position.y = 0.0;
        root.position.z = 60;
        root.name = 'WINDOW_DOORS';
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
        var obj = new Thing(root, animation, null, true, false, "SCISSORS", null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        house.add(root);
    });

    const gltfLoaderEntryDoor = new THREE.GLTFLoader();
    gltfLoaderEntryDoor.load("../../model3D/LivingRoom/EntryDoor/scene.gltf", (gltf) => {
        const root = gltf.scene.getObjectByName('group_1');
        root.position.x = -99.5
        root.position.y = 0.0;
        root.position.z = 26;
        root.name = "DOOR_ENTRY";
        root.scale.set(0.17, 0.17, 0.162);
        root.rotateX(degToRad(-90));
        root.rotateZ(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var animation = (t, move) => {
            if (camera.position.x == root.position.x - 10) return false;
            if (move) {
                if (t >= 0 && t < 15) {
                    camera.position.x = interpolation(cameraPos.x, -90, 0, 5, t);
                    camera.position.z = interpolation(cameraPos.z, 19.5, 0, 5, t);
                    camera.rotation.y = interpolation(cameraRot.y, 1.57, 0, 5, t);
                    camera.rotation.x = 0;
                    camera.rotation.z = 0;

                    root.getObjectByName('group_5').rotation.z = interpolation(0.0, degToRad(-90), 0, 15, t);
                    root.getObjectByName('group_5').position.x = interpolation(15.75, 12.5, 0, 15, t);
                    root.getObjectByName('group_5').position.y = interpolation(0.03, 5, 0, 15, t);
                }
                if (t >= 15) {
                    camera.position.x = interpolation(-90, root.position.x - 10, 15, 22, t);
                    root.getObjectByName('group_5').rotation.z = interpolation(degToRad(-90), 0.0, 21, 22, t);
                    root.getObjectByName('group_5').position.x = interpolation(12.5, 15.75, 21, 22, t);
                    root.getObjectByName('group_5').position.y = interpolation(5, 0.03, 21, 22, t);
                }
                return true;
            }
            return false;
        };
        var obj = new Thing(root, animation, null, true, false, "HOURGLASS", null);
        steps.push(obj);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        house.add(root);
    });
    
    return house;
}