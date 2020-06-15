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
        root.position.x = -172.5;
        root.position.y = 0.0;
        root.position.z = 20.0;
        root.scale.set(8.0, 8.0, 8.0);
        root.rotateY(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
        // console.log(dumpObject(root).join('\n'));
    });;

    const gltfLoaderShovel = new THREE.GLTFLoader();
    gltfLoaderShovel.load("../../model3D/Garden/Showel/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -120.0;
        root.position.y = 5.5;
        root.position.z = 25.0;
        root.scale.set(0.09, 0.15, 0.09);
        // root.rotateY(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
        // console.log(dumpObject(root).join('\n'));
    });;

}