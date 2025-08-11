import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
import { Group } from 'three/examples/jsm/libs/tween.module.js';

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
directionalLight.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

// ------ Lightbulbs lights ------
// --- Back ---
const pointLightOneBottom = new THREE.PointLight(0x0ff00f, 50, 20, 60);
pointLightOneBottom.position.z += 2;
pointLightOneBottom.position.y -= 1.3;
const pointLightOneTop = new THREE.PointLight(0x0ff00f, 10, 50, 60);
pointLightOneTop.position.z += 2;
pointLightOneTop.position.y -= 0.6;
// --- Front ---
const pointLightTwoBottom = new THREE.PointLight(0x0ff00f, 50, 20, 60);
pointLightTwoBottom.position.z -= 2;
pointLightTwoBottom.position.y -= 1.3;
const pointLightTwoTop = new THREE.PointLight(0x0ff00f, 10, 50, 60);
pointLightTwoTop.position.z -= 2;
pointLightTwoTop.position.y -= 0.7;
// --- Left ---
const pointLightThreeBottom = new THREE.PointLight(0x0ff00f, 50, 20, 60);
pointLightThreeBottom.position.x -= 2;
pointLightThreeBottom.position.y -= 1.3;
const pointLightThreeTop = new THREE.PointLight(0x0ff00f, 10, 50, 60);
pointLightThreeTop.position.x -= 2;
pointLightThreeTop.position.y -= 0.7;
// --- Right ---
const pointLightFourBottom = new THREE.PointLight(0x0ff00f, 50, 20, 60);
pointLightFourBottom.position.x += 2;
pointLightFourBottom.position.y -= 1.3;
const pointLightFourTop = new THREE.PointLight(0x0ff00f, 10, 50, 60);
pointLightFourTop.position.x += 2;
pointLightFourTop.position.y -= 0.7;


scene.add(directionalLight);
scene.add(ambientLight);

// ------ Lightbulb glow group ------
const lightbulbsGlow = new THREE.Group();
lightbulbsGlow.add(pointLightOneBottom);
lightbulbsGlow.add(pointLightOneTop);
lightbulbsGlow.add(pointLightTwoBottom);
lightbulbsGlow.add(pointLightTwoTop);
lightbulbsGlow.add(pointLightThreeBottom);
lightbulbsGlow.add(pointLightThreeTop);
lightbulbsGlow.add(pointLightFourBottom);
lightbulbsGlow.add(pointLightFourTop);

scene.add(lightbulbsGlow);



const loader = new EXRLoader();
loader.load('textures/puresky.exr', function (texture) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envMap = pmremGenerator.fromEquirectangular(texture).texture;

    scene.environment = envMap;

    // Display backgorund image
    scene.background = envMap;

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
    reflectivity: 1.0
});
const innerWindshield = new THREE.Mesh(innerWindshieldGeo, innerWindshieldMat);
// --- Plates ---
// -- Superiour plate --
const superiourPlateGeo = new THREE.TorusGeometry(2, 0.7, 3, 80);
const superiourPlateMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9bbbe,
    roughness: 0.2,
    metalness: 1,
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
const lightbulbMat = new THREE.MeshPhysicalMaterial({
    color: 0x0ff00f,
    roughness: 0,
    emissive: 0x0ff00f,
    emissiveIntensity: 50
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
// ------ Lighbulb Front ------
// --- Below ---
const lightbulbBelowTwo = new THREE.Mesh(lightbulbGeo, lightbulbMat);
lightbulbBelowTwo.position.z -= 2;
lightbulbBelowTwo.position.y -= 1.3;
// --- Above ---
const lightbulbAboveTwo = new THREE.Mesh(lightbulbGeo, lightbulbMat);
lightbulbAboveTwo.position.z -= 2;
lightbulbAboveTwo.position.y -= 0.7;
// ------ Lighbulb Left ------
// --- Below ---
const lightbulbBelowThree = new THREE.Mesh(lightbulbGeo, lightbulbMat);
lightbulbBelowThree.position.x -= 2;
lightbulbBelowThree.position.y -= 1.3;
// --- Above ---
const lightbulbAboveThree = new THREE.Mesh(lightbulbGeo, lightbulbMat);
lightbulbAboveThree.position.x -= 2;
lightbulbAboveThree.position.y -= 0.7;
// ------ Lighbulb Right ------
// --- Below ---
const lightbulbBelowFour = new THREE.Mesh(lightbulbGeo, lightbulbMat);
lightbulbBelowFour.position.x += 2;
lightbulbBelowFour.position.y -= 1.3;
// --- Above ---
const lightbulbAboveFour = new THREE.Mesh(lightbulbGeo, lightbulbMat);
lightbulbAboveFour.position.x += 2;
lightbulbAboveFour.position.y -= 0.7;


// ------ Groups ------
// --- Lightbulbs ---
const lightbulbs = new THREE.Group();
lightbulbs.add(lightbulbBelowOne)
lightbulbs.add(lightbulbAboveOne)
lightbulbs.add(lightbulbBelowTwo)
lightbulbs.add(lightbulbAboveTwo)
lightbulbs.add(lightbulbBelowThree)
lightbulbs.add(lightbulbAboveThree)
lightbulbs.add(lightbulbBelowFour)
lightbulbs.add(lightbulbAboveFour)
// --- Spaceship ---
const spaceship = new THREE.Group();
spaceship.add(windshield);
spaceship.add(innerWindshield);
spaceship.add(superiourPlate);
spaceship.add(middlePlate);
spaceship.add(inferiourPlate);
spaceship.add(lightbulbs);


// Spaceship added to the scene
// scene.add(spaceship);


// ------ Terrain ------

const forestGroundTexture = new THREE.TextureLoader().load("textures/ground.jpg");
forestGroundTexture.wrapS = THREE.RepeatWrapping;
forestGroundTexture.wrapT = THREE.RepeatWrapping;
forestGroundTexture.repeat.set(50, 50);
forestGroundTexture.encoding = THREE.sRGBEncoding;

const groundGeo = new THREE.PlaneGeometry(1000, 1000);
const groundMat = new THREE.MeshPhysicalMaterial({
    map: forestGroundTexture,
    side: THREE.DoubleSide,
    color: 0x444444,
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x += -Math.PI / 2;
ground.position.y -= 8;


scene.add(ground);

// ------ Vegetation ------
let vegetation = [];

for (let i = 0; i < 2000; i++) {
    // ------ Tree ------
    const treeTrunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 2.5, 16);
    const treeTrunkMat = new THREE.MeshPhysicalMaterial({
        color: 0x574436,
    });
    const treeTrunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);

    const leafsGeo = new THREE.SphereGeometry(1, 16, 16);
    const leafsMat = new THREE.MeshPhysicalMaterial({
        color: 0x276235,
    });
    const leafs = new THREE.Mesh(leafsGeo, leafsMat);
    leafs.position.y += 2;
    // ------ Bush ------
    const leftBush = new THREE.Mesh(leafsGeo, leafsMat);
    leftBush.position.x -= 1;
    const rightBush = new THREE.Mesh(leafsGeo, leafsMat);
    rightBush.position.x += 1;
    const middleBush = new THREE.Mesh(leafsGeo, leafsMat);
    const topBush = new THREE.Mesh(leafsGeo, leafsMat);
    topBush.position.y += 0.5;

    // ------ Groups ------
    // --- Tree ---
    const tree = new THREE.Group();
    tree.add(treeTrunk);
    tree.add(leafs);
    // --- Bush ---
    const bush = new THREE.Group();
    bush.add(leftBush);
    bush.add(rightBush);
    bush.add(middleBush);
    bush.add(topBush);

    tree.position.set(
        (Math.random() - 0.5) * 1000, 
        -7.5,
        (Math.random() - 0.5) * 1000
    );

    bush.position.set(
        (Math.random() - 0.5) * 1000, 
        -7.7,
        (Math.random() - 0.5) * 1000
    )

    bush.rotation.y += (Math.random() + 0) * 2;

    scene.add(tree);
    scene.add(bush);
    vegetation.push(tree);
    vegetation.push(bush);
}

// ------ Animals ------

// --- Sheep ---
// Head
const sheepHeadGeo = new THREE.SphereGeometry(0.3, 32, 16);
const sheepMat = new THREE.MeshPhysicalMaterial({
    color: 0xa3a3a3
});
const sheepHead = new THREE.Mesh(sheepHeadGeo,sheepMat);
// Muzzle
const sheepMuzzleGeo = new THREE.CylinderGeometry(0.09, 0.05, 0.2, 16);
const sheepMuzzle = new THREE.Mesh(sheepMuzzleGeo, sheepMat);
sheepMuzzle.position.x -= 0.4;
sheepMuzzle.rotation.x += Math.PI / 2;
sheepMuzzle.rotation.z -= Math.PI / 2;
// Body 
const sheepBodyGeo = new THREE.CapsuleGeometry(0.4, 0.4, 12, 36);
const sheepBody = new THREE.Mesh(sheepBodyGeo, sheepMat);
sheepBody.rotation.x += Math.PI / 2;
sheepBody.rotation.z += Math.PI / 2;
sheepBody.position.x += 0.3;
sheepBody.position.y -= 0.5;
// Legs
// Front left leg
const sheepLegsGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.5, 16);
const sheepFrontLeftLeg = new THREE.Mesh(sheepLegsGeo, sheepMat);
sheepFrontLeftLeg.position.y -= 1;
sheepFrontLeftLeg.position.z += 0.2;
// Front right leg
const sheepFrontRightLeg = new THREE.Mesh(sheepLegsGeo, sheepMat);
sheepFrontRightLeg.position.y -= 1;
sheepFrontRightLeg.position.z -= 0.2;
// Back left leg
const sheepBackLeftLeg = new THREE.Mesh(sheepLegsGeo, sheepMat);
sheepBackLeftLeg.position.y -= 1;
sheepBackLeftLeg.position.x += 0.6;
sheepBackLeftLeg.position.z += 0.2;
// Back right leg
const sheepBackRightLeg = new THREE.Mesh(sheepLegsGeo, sheepMat);
sheepBackRightLeg.position.y -= 1;
sheepBackRightLeg.position.x += 0.6;
sheepBackRightLeg.position.z -= 0.2;
// tail
const sheepTailGeo = new THREE.SphereGeometry(0.1, 32, 16);
const sheepTail = new THREE.Mesh(sheepTailGeo, sheepMat);
sheepTail.position.x += 0.8;
sheepTail.position.y -= 0.2;

scene.add(sheepHead);
scene.add(sheepMuzzle);
scene.add(sheepBody);
scene.add(sheepFrontLeftLeg);
scene.add(sheepFrontRightLeg);
scene.add(sheepBackLeftLeg);
scene.add(sheepBackRightLeg);
scene.add(sheepTail);




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