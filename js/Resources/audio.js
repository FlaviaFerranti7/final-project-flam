
/* ------------------------- AUDIO ------------------------- */

var listener = new THREE.AudioListener();

var walk = new THREE.Audio(listener);
var openDoor = new THREE.Audio(listener);
var closeDoor = new THREE.Audio(listener);
var violin = new THREE.Audio(listener);
var drawer = new THREE.Audio(listener);
var wardrobeDoor = new THREE.Audio(listener);
var takeObject = new THREE.Audio(listener);
var gunSound = new THREE.Audio(listener);

var audioLoader = new THREE.AudioLoader();
audioLoader.load('../audio/walk/walkOnTheWood.ogg', function (buffer) {
  walk.setBuffer(buffer);
  walk.setLoop(true);
  walk.setVolume(0.6);
});

var openDoorLoader = new THREE.AudioLoader();
openDoorLoader.load('../audio/door/open.ogg', function (buffer) {
  openDoor.setBuffer(buffer);
  openDoor.setVolume(0.8);
});

var closeDoorLoader = new THREE.AudioLoader();
closeDoorLoader.load('../audio/door/close.ogg', function (buffer) {
  closeDoor.setBuffer(buffer);
  closeDoor.setVolume(1);
});

var violinLoader = new THREE.AudioLoader();
violinLoader.load('../audio/violin/sound.ogg', function (buffer) {
  violin.setBuffer(buffer);
  violin.setVolume(1);
});

var drawerLoader = new THREE.AudioLoader();
drawerLoader.load('../audio/drawer/drawer.ogg', function (buffer) {
  drawer.setBuffer(buffer);
  drawer.setVolume(1);
});

var wardrobeDoorLoader = new THREE.AudioLoader();
wardrobeDoor.load('../audio/wardrobe/wardrobeDoor.ogg', function (buffer) {
    wardrobeDoor.setBuffer(buffer);
    wardrobeDoor.setVolume(1);
});

var takeObjectLoader = new THREE.AudioLoader();
takeObjectLoader.load('../audio/takeObject/takeObject.ogg', function (buffer) {
    takeObject.setBuffer(buffer);
    takeObject.setVolume(1);
});

var gunLoader = new THREE.AudioLoader();
gunLoader.load('../audio/gun/gun.ogg', function (buffer) {
    gunSound.setBuffer(buffer);
    gunSound.setVolume(1);
});