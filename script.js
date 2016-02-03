var camera, controls;

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if(havePointerLock) {
    var element = document.body;

    var pointerlockchange = function(event) {
        if(document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

            controlsEnabled = true;
            controls.enabled = true;

        }else{

            controls.enabled = false;

        }
    };

    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.addEventListener('click', function(event){
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
    }, false);
}


var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(20, 20, 20);
var number = 30;
var angle = 0;
var increase = Math.PI * 2 / number;

for(var i = 0; i < number; i++){
    var material = new THREE.MeshPhongMaterial({ color: 0x028482, specular: 0x009900, shininess: 30, blending: THREE.FlatShading });
    var cube = new THREE.Mesh(geometry, material);

    cube.position.x = 200 * Math.cos(angle);
    cube.position.y = 10;
    cube.position.z = 200 * Math.sin(angle);
    scene.add(cube);
    angle += increase;
}

var light = new THREE.AmbientLight(0x999999);
scene.add(light);
var directional = new THREE.DirectionalLight(0xffffff);
directional.position.set(0, 50, 0).normalize();
scene.add(directional);

//camera.position.z = 5;
controls = new THREE.PointerLockControls(camera);
scene.add(controls.getObject());

function render() {
    requestAnimationFrame(render);
    for(var i = 0; i < number; i++){
        var object = scene.children[i];
        object.rotation.y += 0.03;
        object.rotation.x += 0.05;
        object.rotation.z += 0.03;
    }
    renderer.render(scene, camera);
}
render();
