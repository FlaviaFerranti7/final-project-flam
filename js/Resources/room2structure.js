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

    var wall3Door = createHole(8.0, 15.5, 25.0, 0.0);
    var wall3 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, 0.5 * size), new THREE.Vector3(0, -90, 0), [materialWall, materialWallH], [wall3Door]);
    room.add(wall3);

    /* SPOTLIGHT ROOM2 */

    const spotlightR2 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

    spotlightR2.position.set(0.0, 20.0, 42.0);
    spotlightR2.target = new THREE.Object3D();;
    spotlightR2.target.position.set(0, -4000, 0);
    spotlightR2.angle = Math.PI / 2.5;
    spotlightR2.distance = 200;
    spotlightR2.penumbra = penumbra;
    spotlightR2.castShadow = true;

    const sourceSpotlightR2 = createReverseSpotLight(spotlightR2, new THREE.Vector3(0.0, 15.0, 42.0));

    spotlightR2.decay = 5;

    room.add(spotlightR2);
    room.add(spotlightR2.target);

    room.add(sourceSpotlightR2);
    room.add(sourceSpotlightR2.target);

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
            room.add(objectLamp);

        });
    });

    const gltfLoaderBed = new THREE.GLTFLoader();
    gltfLoaderBed.load("../../model3D/Room2/Bed/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 0.0;
        root.position.y = 0.0;
        root.position.z = 51.0;
        root.scale.set(0.75, 0.75, 0.75);
        root.rotateY(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        room.add(root);
    });

    const gltfLoaderNightTable = new THREE.GLTFLoader();
    gltfLoaderNightTable.load("../../model3D/Room2/NightTable/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 12.0;
        root.position.y = -1.0;
        root.position.z = 56.0;
        root.scale.set(2.0, 2.0, 2.0);
        root.rotateY(degToRad(180));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var animation = (t, move) => {
            if (root.getObjectByName('Cube001').position.y == -1.05) return false;
            if (move) {
                bullet.position.z = interpolation(54.5, 53, 0, 5, t);
                root.getObjectByName('Cube001').position.y = interpolation(0, -1.05, 0, 5, t);
                return true;
            }
            return false;
        };
        var reverseAnimation = (t, move) => {
            if (root.getObjectByName('Cube001').position.y == 0) return false;
            if (move) {
                bullet.position.z = interpolation(53, 54.5, 0, 5, t);
                root.getObjectByName('Cube001').position.y = interpolation(-1.05, 0, 0, 5, t);
                return true;
            }
            return false;
        };
        var obj = new Thing(root, animation, reverseAnimation, false, false, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        room.add(root);
        // console.log(dumpObject(root).join('\n'));
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
            if (root.getObjectByName('Cube001').rotation.z == degToRad(90)) return false;
            if (move) {
                root.getObjectByName('Cube001').rotation.z = interpolation(0, degToRad(90), 0, 5, t);
                return true;
            }
            return false;
        };

        var obj = new Thing(root, animation, null, false, false, null, null);

        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        room.add(root);
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
            objectDoor.name = "DOOR_ROOM2";
            var t1 = 0;
            var t2 = 0;
            var t3 = 0;
            var animation = (t, move) => {
                if (objectDoor.children[0].rotation.z == -degToRad(90)) return false;
                if (move) {
                    if(t == 0) {
                        openDoor.play();
                    } 
                    objectDoor.children[0].rotation.z = interpolation(0, -degToRad(90), 0, 25, t);
                    objectDoor.children[0].position.y = interpolation(0, -25, 0, 10, t);
                    objectDoor.children[0].position.x = interpolation(0, -5, 0, 5, t);
                    if (t == 5) {
                        objectDoor.children[0].position.x = -5;
                    }
                    else if (t > 5) {
                        objectDoor.children[0].position.x = interpolation(-5, -18, 0, 10, t2);
                        t2 += 0.1;
                    }
                    if (t2 == 10) {
                        objectDoor.children[0].position.x = -18;
                    }
                    else if (t2 > 10) {
                        objectDoor.children[0].position.x = interpolation(-18, -40, 0, 10, t3);
                        t3 += 0.1;
                    }
                    if (t == 10) {
                        objectDoor.children[0].position.y = -25;
                    }
                    else if (t > 10) {
                        objectDoor.children[0].position.y = interpolation(-25, -40, 0, 15, t1);
                        t1 += 0.1;
                    }
                    if (t >= 25) {
                        t1 = 0;
                        t2 = 0;
                        t3 = 0;
                    }
                    return true;
                }
                return false;
            };

            var obj = new Thing(objectDoor, animation, null, true, false, "KEY", null);

            steps.push(obj);
            objectsAnimated.push(obj);
            objectsRaycaster.push(obj.getObject());
            room.add(objectDoor);

        });
    });

    const gltfLoaderSafe = new THREE.GLTFLoader();
    gltfLoaderSafe.load("../../model3D/Room2/Safe/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 14;
        root.position.y = 3.5;
        root.position.z = 22.6;
        root.scale.set(0.087, 0.087, 0.07);
        root.name = 'SAFE';
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        root.getObjectByName('Safe1_Door').rotation.z = -degToRad(90);
        var t1 = 0;
        var animation = (t, move) => {
            if (root.getObjectByName('Safe1_Door').rotation.z == 0) return false;
            if (move) {
                if (!hideDivSafe) {
                    hideDiv();
                    insertCode();
                }
                if (openSafe) {
                    root.getObjectByName('Safe1_Door').rotation.z = interpolation(-degToRad(90), 0, 0, 5, t1);
                    t1 += 0.1;
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        };

        var obj = new Thing(root, animation, null, false, false, null, null);

        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        room.add(root);
    });

    /* OBJECT 3D */

    const gltfLoaderDiamond = new THREE.GLTFLoader();
    gltfLoaderDiamond.load("../../model3D/Room2/Diamond/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 13.5;
        root.position.y = 7;
        root.position.z = 23;
        root.scale.set(0.008, 0.008, 0.008);
        root.rotateZ(degToRad(45));
        root.name = 'DIAMOND';
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var obj = new Thing(root, null, null, false, true, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    const gltfLoaderSheetMusic = new THREE.GLTFLoader();
    gltfLoaderSheetMusic.load("../../model3D/Room2/SheetMusic/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 12.5;
        root.position.y = 5;
        root.position.z = 23;
        root.scale.set(0.75, 0.75, 0.75);
        root.name = 'SHEETMUSIC';
        root.getObjectByName('chiave_di_violino_4').visible = false;
        root.getObjectByName('pentagramma_0').visible = false;
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var obj = new Thing(root, null, null, false, true, null, "VIOLIN");
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    const gltfLoaderBullet = new THREE.GLTFLoader();
    gltfLoaderBullet.load("../../model3D/Room2/Bullet/scene.gltf", (gltf) => {
        const root = gltf.scene;
        bullet = root;
        root.position.x = 12.5;
        root.position.y = 4;
        root.position.z = 54.5;
        root.name = 'BULLET';
        root.scale.set(0.2, 0.2, 0.2);
        root.traverse((child) => child.castShadow = true);
        var obj = new Thing(root, null, null, false, true, null, "GUN");
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderBattery = new THREE.GLTFLoader();
    gltfLoaderBattery.load("../../model3D/Room2/Battery/scene.gltf", (gltf) => {
        const root = gltf.scene;
        battery = root;
        root.position.x = 12.0;
        root.position.y = 0.8;
        root.position.z = 55;
        root.scale.set(0.005, 0.006, 0.005);
        root.rotateX(degToRad(-70));
        root.name = "BATTERY";
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var obj = new Thing(root, null, null, false, true, null, "TORCH");
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    return room;

}