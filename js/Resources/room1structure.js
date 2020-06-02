function createRoom1(gridSize) {
    // GRID
    var size = gridSize;
    var divisions = 20;
    var gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    // MATERIALS
    const textureFloor = new THREE.TextureLoader().load('../../images/parquet.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set( 4, 4 );

    const textureWall = new THREE.TextureLoader().load('../../images/flowers.png');
    textureWall.wrapS = THREE.RepeatWrapping;
    textureWall.wrapT = THREE.RepeatWrapping;
    textureWall.repeat.set( 1.5, 1.5 );

    const textureWall2 = new THREE.TextureLoader().load('../../images/wall.jpg');
    textureWall2.wrapS = THREE.RepeatWrapping;
    textureWall2.wrapT = THREE.RepeatWrapping;
    textureWall2.repeat.set( 1, 1 );

    const materialFloor = new THREE.MeshBasicMaterial({
    map: textureFloor,
    side: THREE.DoubleSide,
    });

    const materialWall = new THREE.MeshBasicMaterial({
    map: textureWall, textureWall2,
    side: THREE.DoubleSide,
    });

    const materialRoof = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const materialWall1 = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.FrontSide });
    const materialWall2 = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.BackSide });

    // parquet

    var floor = createPlane(size, size, undefined, new THREE.Vector3(-90, 0, 0), [materialFloor]);
    scene.add(floor);

    // yellow
    var door = createHole(8.0, 15.0, 7.5, 0.0);
    var wall1 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, size / 2.0), undefined, [materialWall], [door]);
    scene.add(wall1);

    // blue
    var wall2 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, -size / 2.0), undefined, [materialWall], []);
    scene.add(wall2);

    // red
    var wall3 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, size / 2.0),new THREE.Vector3(0, 90, 0), [materialWall], []);
    scene.add(wall3);

    // cyan
    var wall4Window = createHole(10.0, 7.0, 7.5, 9.0);
    var wall4 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, size / 2.0), new THREE.Vector3(0, 90, 0), [materialWall], [wall4Window]);
    scene.add(wall4);

    // purple
    var roof = createPlane(size, size, new THREE.Vector3(0.0, size / 2, 0.0), new THREE.Vector3(90, 0, 0), [materialRoof]);
    scene.add(roof);
}