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

    const materialFloor = new THREE.MeshPhysicalMaterial({
        map: textureFloor,
        side: THREE.DoubleSide,
    });

    const textureWallH = new THREE.TextureLoader().load('../../images/hallway.jpg');
    textureWallH.wrapS = THREE.RepeatWrapping;
    textureWallH.wrapT = THREE.RepeatWrapping;
    textureWallH.repeat.set(4, 4);

    const materialWallH = new THREE.MeshPhysicalMaterial({
        map: textureWallH,
        side: THREE.BackSide,
    });

    const textureWallL = new THREE.TextureLoader().load('../../images/livingRoom.jpg');
    textureWallL.wrapS = THREE.RepeatWrapping;
    textureWallL.wrapT = THREE.RepeatWrapping;
    textureWallL.repeat.set(0.5, 0.5);

    const materialWallL = new THREE.MeshPhysicalMaterial({
        map: textureWallL,
    });

    var hallway = new THREE.Group();

    var floor = createPlane(size / 4, size, new THREE.Vector3(-size / 2.67, 0.0, size / 4), new THREE.Vector3(-90, 0, 0), [materialFloor]);
    hallway.add(floor);

    var wall3Door = createHole(8.0, 15.5, 25.0, 0.0);
    var wall3 = createShape(0.0, size / 4, size, new THREE.Vector3(-size / 2.0, 0.0, -0.25 * size), new THREE.Vector3(0, -90, 0), [materialWallH, materialWallL], [wall3Door]);
    wallHL = wall3;
    recursiveChild(wall3, collidableObjects);
    scene.add(wall3);

    /* SPOTLIGHT HALLWAY */

    const spotlightL1 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

    spotlightL1.position.set(-30, 20.0, 0.0);
    spotlightL1.target = new THREE.Object3D();
    spotlightL1.target.position.set(0, -4000, 0);
    spotlightL1.angle = Math.PI / 2.5;
    spotlightL1.distance = 200;
    spotlightL1.penumbra = penumbra;
    spotlightL1.castShadow = true;

    const sourceSpotlightL1 = createReverseSpotLight(spotlightL1, new THREE.Vector3(-32.0, 15.0, 0.0));

    spotlightL1.decay = 5;

    hallway.add(spotlightL1);
    hallway.add(spotlightL1.target);

    hallway.add(sourceSpotlightL1);
    hallway.add(sourceSpotlightL1.target);

    const spotlightL2 = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

    spotlightL2.position.set(-30.0, 20.0, 42.0);
    spotlightL2.target = new THREE.Object3D();;
    spotlightL2.target.position.set(0, -4000, 0);
    spotlightL2.angle = Math.PI / 2.5;
    spotlightL2.distance = 200;
    spotlightL2.penumbra = penumbra;
    spotlightL2.castShadow = true;

    const sourceSpotlightL2 = createReverseSpotLight(spotlightL2, new THREE.Vector3(-32.0, 15.0, 42.0));

    spotlightL2.decay = 5;

    hallway.add(spotlightL2);
    hallway.add(spotlightL2.target);

    hallway.add(sourceSpotlightL2);
    hallway.add(sourceSpotlightL2.target);

    recursiveChild(hallway, collidableObjects);

    /* MODEL 3D */

    var mtlLoaderDoor = new THREE.MTLLoader();
    mtlLoaderDoor.setPath("../../model3D/Room1/Door/");
    mtlLoaderDoor.load('10057_wooden_door_v3_iterations-2.mtl', function (materialsDoor) {

        materialsDoor.preload();

        var objLoaderDoor = new THREE.OBJLoader();
        objLoaderDoor.setMaterials(materialsDoor);
        objLoaderDoor.setPath("../../model3D/Room1/Door/");
        objLoaderDoor.load('10057_wooden_door_v3_iterations-2.obj', function (objectDoor) {
            objectDoor.position.x = -40;
            objectDoor.position.y = 0.0;
            objectDoor.position.z = 9;
            objectDoor.scale.set(0.09, 0.1, 0.075);
            objectDoor.rotateX(degToRad(-90));
            objectDoor.rotateZ(degToRad(90));
            objectDoor.name = "DOOR_HALLWAY";
            objectDoor.traverse((child) => child.castShadow = true);
            recursiveChild(objectDoor, collidableObjects);
            var t1 = 0;
            var t2 = 0;
            var t3 = 0;
            var animation = (t, move) => {
                if (camera.position.x == objectDoor.position.x - 10) return false;
                if (move) {
                    if(t == 0) {
                        openDoor.play();
                    } 
                    if (t >= 0 && t < 15) {
                        objectDoor.children[0].rotation.z = interpolation(0, degToRad(90), 0, 15, t);
                        objectDoor.children[0].position.x = interpolation(0, -5, 0, 3, t);
                        objectDoor.children[0].position.y = interpolation(0, 25, 0, 6, t);

                        camera.position.x = interpolation(cameraPos.x, -32, 0, 3, t);
                        camera.position.z = interpolation(cameraPos.z, 8, 0, 3, t);
                        camera.rotation.y = interpolation(cameraRot.y, 1.57, 0, 3, t);
                        camera.rotation.x = 0;
                        camera.rotation.z = 0;
                    }
                    if (t == 3) {
                        objectDoor.children[0].position.x = -5;
                    }
                    else if (t > 3) {
                        objectDoor.children[0].position.x = interpolation(-5, -18, 0, 6, t2);
                        t2 += 0.1;
                    }
                    if (t2 == 6) {
                        objectDoor.children[0].position.x = -18;
                    }
                    else if (t2 > 6) {
                        objectDoor.children[0].position.x = interpolation(-18, -40, 0, 6, t3);
                        t3 += 0.1;
                    }
                    if (t == 6) {
                        objectDoor.children[0].position.y = 25;
                    }
                    else if (t > 6) {
                        objectDoor.children[0].position.y = interpolation(25, 40, 0, 9, t1);
                        t1 += 0.1;
                    }
                    if (t >= 15) {
                        camera.position.x = interpolation(-32, objectDoor.position.x - 10, 15, 22, t);
                    }
                    if (t >= 22) {
                        closeDoor.play();
                        objectDoor.children[0].rotation.z = 0;
                        objectDoor.children[0].position.x = 0;
                        objectDoor.children[0].position.y = 0;
                        t1 = 0;
                        t2 = 0;
                        t3 = 0;
                        return false;
                    }
                    return true;
                }
                return false;
            };
            var obj = new Thing(objectDoor, animation, null, false, false, null, null);
            steps.push(obj);
            objectsAnimated.push(obj);
            objectsRaycaster.push(obj.getObject());
            doorHL = objectDoor;
            scene.add(objectDoor);
        });
    });

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
            hallway.add(objectLampL1);
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
            hallway.add(objectLampL2);
        });
    });

    const gltfLoaderConsole = new THREE.GLTFLoader();
    gltfLoaderConsole.load("../../model3D/Hallway/Console/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -23.25;
        root.position.y = 3.0;
        root.position.z = 30.0;
        root.scale.set(5, 5, 5);
        root.rotateY(degToRad(-90));
        root.name = 'CONSOLE';
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var animation = (t, move) => {
            if (gun.position.x == -25.5 && root.getObjectByName('stoli001_szuflada').position.z == 0.5) return false;
            if (move) {
                if(t == 0) drawer.play();
                gun.position.x = interpolation(-23.5, -25.5, 0, 5, t);
                root.getObjectByName('stoli001_szuflada').position.z = interpolation(0.0, 0.5, 0, 5, t);
                return true;
            }
            return false;
        };
        var reverseAnimation = (t, move) => {
            if (root.getObjectByName('stoli001_szuflada').position.z == 0.0) return false;
            if (move) {
                if(t == 0) drawer.play();
                gun.position.x = interpolation(-25.5, -23.5, 0, 5, t);
                root.getObjectByName('stoli001_szuflada').position.z = interpolation(0.5, 0.0, 0, 5, t);
                return true;
            }
            return false;
        };
        var obj = new Thing(root, animation, reverseAnimation, false, false, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        hallway.add(root);
    });

    /* OBJECT 3D */

    const gltfLoaderGun = new THREE.GLTFLoader();
    gltfLoaderGun.load("../../model3D/Hallway/Gun/scene.gltf", (gltf) => {
        const root = gltf.scene;
        gun = root;
        root.position.x = -23.5;
        root.position.y = 5.5;
        root.position.z = 30;
        root.scale.set(0.01, 0.01, 0.01);
        root.rotateY(degToRad(180));
        root.rotateZ(degToRad(90));
        root.name = 'GUN';
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var animation = () => {
            gunSound.play();
            return false;
        }
        var obj = new Thing(root, animation, null, false, true, null, "BULLET", true);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    return hallway;
}