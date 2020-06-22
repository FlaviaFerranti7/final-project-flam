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

    recursiveChild(wallHL, collidableObjects);
    recursiveChild(doorHL, collidableObjects);

    /* SPOTLIGHT LIVING ROOM */

    const spotlightL = new THREE.SpotLight(colorSpotlight, intensitySpotlight);

    spotlightL.position.set(-70, 20.0, 20.0);
    spotlightL.target = new THREE.Object3D();
    spotlightL.target.position.set(0, -4000, 0);
    spotlightL.angle = Math.PI / 2.5;
    spotlightL.distance = 200;
    spotlightL.penumbra = penumbra;
    spotlightL.castShadow = true;

    const sourceSpotlightL = createReverseSpotLight(spotlightL, new THREE.Vector3(-75.0, 15.0, 16.5));

    spotlightL.decay = 2;

    livingRoom.add(spotlightL);
    livingRoom.add(spotlightL.target);

    livingRoom.add(sourceSpotlightL);
    livingRoom.add(sourceSpotlightL.target);

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
            livingRoom.add(objectLamp);
        });
    });

    var mtlLoaderSofa = new THREE.MTLLoader();
    mtlLoaderSofa.setPath("../../model3D/LivingRoom/Sofa/source/");
    mtlLoaderSofa.load('model_916761733761.mtl', function (materialsSofa) {
        materialsSofa.preload();
        var objLoaderSofa = new THREE.OBJLoader();
        objLoaderSofa.setMaterials(materialsSofa);
        objLoaderSofa.setPath("../../model3D/LivingRoom/Sofa/source/");
        objLoaderSofa.load('model_916761733761.obj', function (objectSofa) {
            objectSofa.position.x = -58.0;
            objectSofa.position.y = 5;
            objectSofa.position.z = -16.5;
            objectSofa.scale.set(17, 17, 17);
            objectSofa.traverse((child) => child.castShadow = true);
            recursiveChild(objectSofa, collidableObjects);
            livingRoom.add(objectSofa);
        });
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
        livingRoom.add(root);
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
        console.log(root.getObjectByName('Shkaf').position);
        var animation = (t, move) => {
            if (root.getObjectByName('Shkaf').position.x == 0.5) {
                var elem = document.getElementById("book-message");
                elem.style.display = "block";
                elem.childNodes[1].innerHTML = "";
                setTimeout(() => {
                    elem.style.display = "none";
                }, 7000);
                return false;
            }
            if (move) {
                root.getObjectByName('Shkaf').position.x = interpolation(0, 0.5, 0, 2, t);
                return true;
            }
            return false;
        };
        var obj = new Thing(root, animation, null, false, false, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        livingRoom.add(root);
        // console.log(dumpObject(root).join('\n'));
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
        livingRoom.add(root);
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
        var animation = (t, move) => {
            if (root.rotation.y == degToRad(-90)) {
                var elem = document.getElementById("mirror-message");
                elem.style.display = "block";
                elem.childNodes[1].innerHTML = "";
                setTimeout(() => {
                    elem.style.display = "none";
                }, 7000);
                return false;
            }
            if (move) {
                root.rotation.y = interpolation(degToRad(90), degToRad(-90), 0, 5, t);
                return true;
            }
            return false;
        };
        var obj = new Thing(root, animation, null, false, false, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        livingRoom.add(root);
    });

    /* OBJECT 3D */

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

        var animation = () => {
            if(!violin.isPlaying) violin.play();
            else violin.pause();

            return false;
        }

        var obj = new Thing(root, animation, null, false, true, null, "SHEETMUSIC", true);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
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
        root.scale.set(1.5, 1.5, 1.5);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var animation = () => {
            enableConditionedAnimation = true;
        };
        var obj = new Thing(root, animation, null, false, true, "DOOR_ENTRY", null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    // const gltfLoaderGateRemoteControl = new THREE.GLTFLoader();
    // gltfLoaderGateRemoteControl.load("../../model3D/LivingRoom/GateRemoteControl/scene.gltf", (gltf) => {
    //     const root = gltf.scene;
    //     root.position.x = -50.0;
    //     root.position.y = 7;
    //     root.position.z = 35.0;
    //     root.scale.set(0.15, 0.15, 0.15);
    //     root.name = 'REMOTE';
    //     root.traverse((child) => child.castShadow = true);
    //     var obj = new Thing(root, null, null, false, true, null, null);
    //     objectsAnimated.push(obj);
    //     objectsRaycaster.push(obj.getObject());
    //     recursiveChild(root, collidableObjects);
    //     scene.add(root);
    // });

    const gltfLoaderScissors = new THREE.GLTFLoader();
    gltfLoaderScissors.load("../../model3D/LivingRoom/Scissors/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -50.0;
        root.position.y = 7.0;
        root.position.z = 35.0;
        root.scale.set(0.008, 0.008, 0.008);
        root.rotateZ(degToRad(90));
        root.rotateY(degToRad(90));
        root.name = 'SCISSORS';
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var animation = () => {
            enableConditionedAnimation = true;
        };
        var obj = new Thing(root, animation, null, false, true, "WINDOW_DOORS", null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    return livingRoom;
}