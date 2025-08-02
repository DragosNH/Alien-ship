import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

// ------ Scene and camera ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// ------ Renderer ------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 8;

// ------ Lights ------
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.x += 10;
directionalLight.position.y += 10;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

scene.add(directionalLight);
scene.add(ambientLight);



const loader = new EXRLoader();
loader.load('textures/puresky.exr', function (texture) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envMap = pmremGenerator.fromEquirectangular(texture).texture;

    scene.environment = envMap;

    // Display backgorund image
    // scene.background = envMap;

    texture.dispose();
    pmremGenerator.dispose();

    render();
});


// ------ Geometry ------
// --- Windshield ---
const windshieldGeo = new THREE.CapsuleGeometry(1.5, 1, 32, 10);
const windshieldMat = new THREE.MeshPhysicalMaterial({
    color: 0x6e9349,
    opacity: 0.8,
    roughness: 0,
    transparent: true
});
const windshield = new THREE.Mesh(windshieldGeo, windshieldMat);
// -- inner windshield --
const innerWindshieldGeo = new THREE.CapsuleGeometry(1.2, 1, 32, 10);
const innerWindshieldMat = new THREE.MeshPhysicalMaterial({
    color: 0x587040,
    roughness: 0,
    metalness: 1,
});
const innerWindshield = new THREE.Mesh(innerWindshieldGeo, innerWindshieldMat);
// --- Plates ---
// -- Superiour plate --
const superiourPlateGeo = new THREE.TorusGeometry(2, 0.7, 3, 80);
const superiourPlateMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9bbbe,
    roughness: 0.2,
    metalness: 1
});
const superiourPlate = new THREE.Mesh(superiourPlateGeo, superiourPlateMat);
superiourPlate.rotation.x = 4.7;
superiourPlate.position.y -= 1;
// -- Middle Plate --
const middlePlateGeo = new THREE.TorusGeometry(1.2, 0.3, 3, 80);
const middlePlateMat = new THREE.MeshPhysicalMaterial({
    color: 0x939599,
    roughness: 0.2,
    metalness: 1
});
const middlePlate = new THREE.Mesh(middlePlateGeo, middlePlateMat);
middlePlate.rotation.x = 4.7;
middlePlate.position.y -= 2;
// -- inferiour Plate --
const inferiourPlateGeo = new THREE.TorusGeometry(1, 0.1, 3, 80);
const inferiourPlateMat = new THREE.MeshPhysicalMaterial({
    color: 0x75777b,
    roughness: 0.2,
    metalness: 1
});
const inferiourPlate = new THREE.Mesh(inferiourPlateGeo, inferiourPlateMat);
inferiourPlate.rotation.x = 4.7;
inferiourPlate.position.y -= 2.5;

// ------ Decoraitions to the ship ------
const lightbulbGeo = new THREE.SphereGeometry(0.2, 32, 16);
const lightbulbMat = new THREE.MeshBasicMaterial({
    color: 0x0ff00f
});
// ------ Lightbulb back ------
// --- Below ---
const lightbulbBelowOne = new THREE.Mesh(lightbulbGeo, lightbulbMat);
lightbulbBelowOne.position.z += 2;
lightbulbBelowOne.position.y -= 1.3;
// --- Above ---
const lightbulbAboveOne = new THREE.Mesh(lightbulbGeo, lightbulbMat);
lightbulbAboveOne.position.z += 2;
lightbulbAboveOne.position.y -= 0.7;

scene.add(lightbulbBelowOne)
scene.add(lightbulbAboveOne)

// ------ Groups ------
const spaceship = new THREE.Group();
spaceship.add(windshield);
spaceship.add(innerWindshield);
spaceship.add(superiourPlate);
spaceship.add(middlePlate);
spaceship.add(inferiourPlate);


// Objects added to the scene
scene.add(spaceship);



// ------ Responsive page ------
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});

// ------ Animate ------
function animate() {

    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);