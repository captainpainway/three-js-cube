var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({ color: 0xffaa00, shininess: 30, blending: THREE.FlatShading });
var cube = new THREE.Mesh(geometry, material);
var light = new THREE.PointLight(0x404040, 5, 100);
var light2 = new THREE.AmbientLight(0x404040);
light.position.set(1,1,1);
scene.add(light);
scene.add(light2);
scene.add(cube);

camera.position.z = 5;

function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.03;
    renderer.render(scene, camera);
}
render();
