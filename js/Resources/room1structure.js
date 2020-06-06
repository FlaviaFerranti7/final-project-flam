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
    textureFloor.repeat.set(4, 4);

    const materialFloor = new THREE.MeshPhongMaterial({
        map: textureFloor,
        side: THREE.DoubleSide,
    });

    const textureWall = new THREE.TextureLoader().load('../../images/flowers.png');
    textureWall.wrapS = THREE.RepeatWrapping;
    textureWall.wrapT = THREE.RepeatWrapping;
    textureWall.repeat.set(0.5, 0.5);

    const materialWall = new THREE.MeshPhongMaterial({
        map: textureWall,
        side: THREE.BackSide,
    });

    const textureWallP = new THREE.TextureLoader().load('../../images/wall.jpg');
    textureWallP.wrapS = THREE.RepeatWrapping;
    textureWallP.wrapT = THREE.RepeatWrapping;
    textureWallP.repeat.set(4, 4);

    const materialWallP = new THREE.MeshPhongMaterial({
        map: textureWallP,
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
    });

    const materialRoof = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });

    var floor = createPlane(size, size, undefined, new THREE.Vector3(-90, 0, 0), [materialFloor]);
    scene.add(floor);

    var door = createHole(8.0, 15.0, 7.5, 0.0);
    var wall1 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, size / 2.0), undefined, [materialWall, materialWallP], [door]);
    scene.add(wall1);

    var wall2 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, -size / 2.0), new THREE.Vector3(0, 180, 0), [materialWall, materialWallB], []);
    scene.add(wall2);

    var wall3Door = createHole(8.0, 15.0, 7.5, 0.0);
    var wall3 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, -size / 2.0), new THREE.Vector3(0, -90, 0), [materialWall, materialWallH], [wall3Door]);
    scene.add(wall3);

    var wall4Window = createHole(10.0, 7.0, 7.5, 9.0);
    var wall4 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, size / 2.0), new THREE.Vector3(0, 90, 0), [materialWall, materialWallB], [wall4Window]);
    wall4.castShadow = true;
    scene.add(wall4);

    var roof = createShape(0.0, size, size, new THREE.Vector3(-size / 2, size / 2, size / 2), new THREE.Vector3(270, 0, 0), [materialRoof, materialWallB], []);
    scene.add(roof);

    var mtlLoaderDoor = new THREE.MTLLoader();
    mtlLoaderDoor.setPath( "../../model3D/Door2/" );
    mtlLoaderDoor.load( '10057_wooden_door_v3_iterations-2.mtl', function( materialsDoor ) {

        materialsDoor.preload();

        var objLoaderDoor = new THREE.OBJLoader();
        objLoaderDoor.setMaterials( materialsDoor );
        objLoaderDoor.setPath( "../../model3D/Door2/" );
        objLoaderDoor.load( '10057_wooden_door_v3_iterations-2.obj', function ( objectDoor ) {
            objectDoor.position.x = -20;
            objectDoor.position.y = 0.0;
            objectDoor.position.z = -8.5;
            objectDoor.scale.set(0.09, 0.1, 0.075);
            objectDoor.rotateX(degToRad(-90));
            objectDoor.rotateZ(degToRad(90));
            scene.add( objectDoor );

        } );
    } );
    
   
   var mtlLoaderWardrobe = new THREE.MTLLoader();
   mtlLoaderWardrobe.setPath( "../../model3D/Wardrobe/" );
   mtlLoaderWardrobe.load( 'Traditional_Armoire_Honey_V1.mtl', function( materialsWardrobe ) {

       materialsWardrobe.preload();

       var objLoaderWardrobe = new THREE.OBJLoader();
       objLoaderWardrobe.setMaterials( materialsWardrobe );
       objLoaderWardrobe.setPath( "../../model3D/Wardrobe/" );
       objLoaderWardrobe.load( 'Traditional_Armoire_Honey_V1.obj', function ( objectWardrobe ) {
           objectWardrobe.position.x = -9.0;
           objectWardrobe.position.y = 7.2;
           objectWardrobe.position.z = 17.0;
           objectWardrobe.scale.set(0.15, 0.1, 0.13);
           objectWardrobe.rotateX(degToRad(-90));
           objectWardrobe.rotateZ(degToRad(180));
           scene.add( objectWardrobe );

       } );
   } );

    
}