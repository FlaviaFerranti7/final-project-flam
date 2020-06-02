var scene = new THREE.Scene();
var container = document.getElementById('container');

var camera = new THREE.PerspectiveCamera( 75, container.offsetWidth/ container.offsetHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( container.offsetWidth, container.offsetHeight);
container.appendChild( renderer.domElement ); //renderer.domElement is the canvas

camera.position.z = 5;

var controls = new THREE.OrbitControls (camera, renderer.domElement);

//first room

var size = 20;
var divisions = 20;
var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

const loader = new THREE.TextureLoader();
const materialPlane = new THREE.MeshBasicMaterial({
  map: loader.load('../../images/parquet.jpg'),
});

var planeGeometry = new THREE.PlaneGeometry( 20, 20 );
var plane = new THREE.Mesh( planeGeometry, materialPlane );
plane.rotateX(-1.57); 
scene.add( plane );

var wallGeometry = new THREE.PlaneGeometry( 20, 20 );
var materialWall1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var wall1 = new THREE.Mesh( wallGeometry, materialWall1 );
wall1.position.z = 10; 
wall1.position.y = 10; 
scene.add( wall1 );

var materialWall2 = new THREE.MeshBasicMaterial( {color: 0x0000ff, side: THREE.DoubleSide} );
var wall2 = new THREE.Mesh( wallGeometry, materialWall2 );
wall2.position.z = -10; 
wall2.position.y = 10; 
scene.add( wall2 );

var materialWall3 = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
var wall3 = new THREE.Mesh( wallGeometry, materialWall3 );
wall3.rotateY(1.57);
wall3.position.x = -10; 
wall3.position.y = 10; 
scene.add( wall3 );

var materialWall4 = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
var wall4 = new THREE.Mesh( wallGeometry, materialWall4 );
wall4.rotateY(1.57);
wall4.position.x = 10; 
wall4.position.y = 10; 
scene.add( wall4);

var roofGeometry = new THREE.PlaneGeometry( 20, 20 );
var materialRoof = new THREE.MeshBasicMaterial( {color: 0xff00ff, side: THREE.DoubleSide} );
var roof = new THREE.Mesh( roofGeometry, materialRoof );
roof.rotateX(1.57); 
roof.position.y = 20; 
scene.add( roof );

//second room
var gridHelper2 = new THREE.GridHelper( size, divisions );
gridHelper2.position.z = 20;
scene.add( gridHelper2 );


var animate = function () {
    requestAnimationFrame( animate );

   
    renderer.render( scene, camera );
};

animate();