function createGarden(gridSize) {
    var size = gridSize;

    // MATERIALS
    const textureFloor = new THREE.TextureLoader().load('../../images/garden.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set(4, 4);

    const materialFloor = new THREE.MeshPhongMaterial({
        map: textureFloor,
        side: THREE.DoubleSide,
    });

    const textureFence = new THREE.TextureLoader().load('../../images/fence.jpg');
    textureFence.wrapS = THREE.RepeatWrapping;
    textureFence.wrapT = THREE.RepeatWrapping;
    textureFence.repeat.set(0.0646, 0.065);

    const materialFence = new THREE.MeshPhongMaterial({
        map: textureFence,
        side: THREE.DoubleSide,
    });


    var garden= new THREE.Group();

    var floor = createPlane(size , size, new THREE.Vector3(-50.0, -0.01, 20.0), new THREE.Vector3(-90, 0, 0), [materialFloor]);
    garden.add(floor);

    var wall1 = createShape(0.0, size / 25, size * 0.8, new THREE.Vector3(-size * 0.43, 0.0, 0.552* size), undefined, [materialFence],[]);
    garden.add(wall1);

    var wall2 = createShape(0.0, size / 25, size * 0.8, new THREE.Vector3(-size * 0.43, 0.0, -0.447* size), undefined, [materialFence],[]);
    garden.add(wall2);

    var wall3 = createShape(0.0, size / 25, size, new THREE.Vector3(size * 0.368, 0.0, -0.447 * size), new THREE.Vector3(0, -90, 0), [materialFence], []);
    garden.add(wall3);

    var wall4 = createShape(0.0, size / 25, size / 2.26, new THREE.Vector3(-size * 0.43, 0.0, -0.447 * size), new THREE.Vector3(0, -90, 0), [materialFence], []);
    garden.add(wall4);

    var wall5 = createShape(0.0, size / 25, size / 2.26, new THREE.Vector3(-size * 0.43, 0.0, 0.1105 * size), new THREE.Vector3(0, -90, 0), [materialFence], []);
    garden.add(wall5);


    scene.add(garden);
    recursiveChild(garden, collidableObjects);
    
    const gltfLoaderGateway = new THREE.GLTFLoader();
    gltfLoaderGateway.load("../../model3D/Garden/Gateway/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -172.0;
        root.position.y = 0.0;
        root.position.z = 20.0;
        root.scale.set(8.0, 8.0, 8.0);
        root.rotateY(degToRad(90));
        root.getObjectByName('Left_1').position.x = 2;
        root.getObjectByName('Right_0').position.x = 2;
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var animation = (t, move) => {
            if (move) {
                root.getObjectByName('Right_0').position.x = interpolation(2, -1.5, 0, 25, t);
                root.getObjectByName('Left_1').position.x = interpolation(2, 5.5, 0, 25, t);
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
        console.log(dumpObject(root).join('\n'));
    });;

    const gltfLoaderShovel = new THREE.GLTFLoader();
    gltfLoaderShovel.load("../../model3D/Garden/Showel/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -30.0;
        root.position.y = 5.5;
        root.position.z = -23.0;
        root.scale.set(0.09, 0.15, 0.09);
        root.rotateX(degToRad(30));
        root.rotateY(degToRad(180));
        root.name = 'SHOVEL';
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
        scene.add(root);
    });;

    const gltfLoaderRake = new THREE.GLTFLoader();
    gltfLoaderRake.load("../../model3D/Garden/Rake/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -100.0;
        root.position.y = 10.0;
        root.position.z = 202.0;
        root.scale.set(8, 8, 8);
        root.rotateY(degToRad(90));
        root.rotateZ(degToRad(120));
        root.name = 'RAKE';
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
        scene.add(root);
    });;

    const gltfLoaderSet = new THREE.GLTFLoader();
    gltfLoaderSet.load("../../model3D/Garden/Set/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 45.0;
        root.position.y = 0.1;
        root.position.z = -150.0;
        root.scale.set(0.3, 0.3, 0.3);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });;

    const gltfLoaderPlants = new THREE.GLTFLoader();
    gltfLoaderPlants.load("../../model3D/Garden/Plants/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -155.0;
        root.position.y = 0.0;
        root.position.z = -155.0;
        root.scale.set(0.01, 0.01, 0.01);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });;

    const gltfLoaderShears = new THREE.GLTFLoader();
    gltfLoaderShears.load("../../model3D/Garden/Shears/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -50.0;
        root.position.y = 5.2;
        root.position.z = 69.0;
        root.scale.set(0.05, 0.05, 0.05);
        root.rotateX(degToRad(90));
        root.name = 'SCISSORS';
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
        scene.add(root);
    });;

    const gltfLoaderTable = new THREE.GLTFLoader();
    gltfLoaderTable.load("../../model3D/Garden/Table/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 0.0;
        root.position.y = 0.5;
        root.position.z = -50.0;
        root.scale.set(0.2, 0.2, 0.2);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });;

    const gltfLoaderParkTable = new THREE.GLTFLoader();
    gltfLoaderParkTable.load("../../model3D/Garden/ParkTable/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -50.0;
        root.position.y = 2.0;
        root.position.z = 70.0;
        root.scale.set(5, 8, 5);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });;

    const gltfLoaderFountain = new THREE.GLTFLoader();
    gltfLoaderFountain.load("../../model3D/Garden/Fountain/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 60.0;
        root.position.y = 4.0;
        root.position.z = 150.0;
        root.scale.set(2, 2, 2);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });;

    const gltfLoaderTree = new THREE.GLTFLoader();
    gltfLoaderTree.load("../../model3D/Garden/Tree/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -90.0;
        root.position.y = 0.0;
        root.position.z = 180.0;
        root.scale.set(0.005, 0.005, 0.005);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });;

}