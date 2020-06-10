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

    const textureWallB = new THREE.TextureLoader().load('../../images/brick.png');
    textureWallB.wrapS = THREE.RepeatWrapping;
    textureWallB.wrapT = THREE.RepeatWrapping;
    textureWallB.repeat.set(0.3, 0.3);

    const materialWallB = new THREE.MeshPhongMaterial({
        map: textureWallB,
    });

    const textureWallH = new THREE.TextureLoader().load('../../images/hallway.jpg');
    textureWallH.wrapS = THREE.RepeatWrapping;
    textureWallH.wrapT = THREE.RepeatWrapping;
    textureWallH.repeat.set(4, 4);

    const materialWallH = new THREE.MeshPhongMaterial({
        map: textureWallH,
        side: THREE.BackSide,
    });

    const materialRoof = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });

    var livingRoom = new THREE.Group();

    var floor = createPlane(size * 3/4, size, new THREE.Vector3(-size* 0.875 , 0.0, size / 4), new THREE.Vector3(-90, 0, 0), [materialFloor]);
    livingRoom.add(floor);

    var wall2Window = createHole(16.0, 15.0, 22.0, 0.0);
    var wall2 = createShape(0.0, size / 4, size * 3/4, new THREE.Vector3(-size *1.25 , 0.0, 0.75 * size), undefined, [materialWallH, materialWallB], [wall2Window]);
    livingRoom.add(wall2);

    var wall3Door = createHole(12.0, 15.0, 34.0, 0.0);
    var wall3 = createShape(0.0, size / 4, size, new THREE.Vector3(-size * 1.25, 0.0, -0.25 * size), new THREE.Vector3(0, -90, 0), [materialWallH, materialWallB], [wall3Door]);
    livingRoom.add(wall3);

    var wall4 = createShape(0.0,  size / 4, size * 3/4, new THREE.Vector3(-size / 2, 0.0, -0.25 * size), new THREE.Vector3(0, 180, 0), [materialWallH, materialWallB], []);
    livingRoom.add(wall4);

    var roof = createShape(0.0, size, size * 3/4, new THREE.Vector3(-size * 1.25, size / 4, 0.75 * size), new THREE.Vector3(-90, 0, 0), [materialRoof, materialWallB], []);
    livingRoom.add(roof);

    scene.add(livingRoom);
}