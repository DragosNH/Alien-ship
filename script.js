import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
directionalLight.position.x += 3.5;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

scene.add(directionalLight);
scene.add(ambientLight);

// ------ Geometry ------
// --- Windshield ---
const windshieldGeo = new THREE.CapsuleGeometry(1.5, 1, 32, 10);
const windshieldMat = new THREE.MeshPhysicalMaterial({
    color: 0x6e9349,
    opacity: 0.8
});
const windshield = new THREE.Mesh(windshieldGeo, windshieldMat);
// -- inner windshield --
const innerWindshieldGeo = new THREE.CapsuleGeometry(1.2, 1, 32, 10);
const innerWindshieldMat = new THREE.MeshBasicMaterial({
    color: 0x587040
});
const innerWindshield = new THREE.Mesh(innerWindshieldGeo, innerWindshieldMat);
// --- Plates ---
// -- Superiour plate --
const superiourPlateGeo = new THREE.TorusGeometry(2, 0.7, 3, 80);
const superiourPlateMat = new THREE.MeshBasicMaterial({
    color: 0xb9bbbe
});
const superiourPlate = new THREE.Mesh(superiourPlateGeo, superiourPlateMat);
superiourPlate.rotation.x = 4.7;
superiourPlate.position.y -= 0.8;
// -- Middle Plate --
const middlePlateGeo = new THREE.TorusGeometry(1.2, 0.3, 3, 80);
const middlePlateMat = new THREE.MeshBasicMaterial({
    color: 0x939599
});
const middlePlate = new THREE.Mesh(middlePlateGeo, middlePlateMat);
middlePlate.rotation.x = 4.7;
middlePlate.position.y -= 1.5;
// -- inferiour Plate --
const inferiourPlateGeo = new THREE.TorusGeometry(1, 0.1, 3, 80);
const inferiourPlateMat = new THREE.MeshBasicMaterial({
    color: 0x75777b
});
const inferiourPlate = new THREE.Mesh(inferiourPlateGeo, inferiourPlateMat);
inferiourPlate.rotation.x = 4.7;
inferiourPlate.position.y -= 2;


// Objects added to the scene
scene.add(windshield);
scene.add(innerWindshield);
scene.add(superiourPlate);
scene.add(middlePlate);
scene.add(inferiourPlate);



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