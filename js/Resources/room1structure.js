function createRoom1(gridSize) {
    // GRID
    var size = gridSize;
    var divisions = 20;
    var gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    // MATERIALS
    const loader = new THREE.TextureLoader();
    const materialFloor = new THREE.MeshBasicMaterial({
    map: loader.load('../../images/parquet.jpg'),
    });
    const materialWall1 = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const materialWall2 = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
    const materialWall3 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    const materialWall4 = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
    const materialRoof = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide });

    // parquet
    var floor = createPlane(size, size, undefined, new THREE.Vector3(-90, 0, 0), materialFloor);
    scene.add(floor);

    // yellow
    var door = createHole(5.0, 10.0, 7.5, 0.0);
    var wall1 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, size / 2.0), undefined, materialWall1, [door]);
    scene.add(wall1);

    // blue
    var wall2 = createPlane(size, size / 2, new THREE.Vector3(0.0, size / 4.0, -size / 2.0), undefined, materialWall2);
    scene.add(wall2);

    // red
    var wall3 = createPlane(size, size / 2, new THREE.Vector3(-size / 2.0, size / 4.0, 0.0),new THREE.Vector3(0, 90, 0), materialWall3);
    scene.add(wall3);

    // cyan
    var wall4Window = createHole(5.0, 5.0, 7.5, 7.5);
    var wall4 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, size / 2.0), new THREE.Vector3(0, 90, 0), materialWall4, [wall4Window]);
    scene.add(wall4);

    // purple
    var roof = createPlane(size, size, new THREE.Vector3(0.0, size / 2, 0.0), new THREE.Vector3(90, 0, 0), materialRoof);
    scene.add(roof);
}