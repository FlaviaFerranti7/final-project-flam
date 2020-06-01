var scene = new THREE.Scene();
var container = document.getElementById('container');

var camera = new THREE.PerspectiveCamera( 75, container.offsetWidth/ container.offsetHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( container.offsetWidth, container.offsetHeight);
container.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var controls = new THREE.OrbitControls (camera, renderer.domElement);

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();