import * as THREE from 'three';

// ------ Scene and camera ------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// ------ Renderer ------
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

// ------ Geometry ------
const windshieldGeo = new THREE.CapsuleGeometry(1, 1, 4, 8);
const windshieldMat = new THREE.MeshBasicMaterial({
    color: 0x6e9349
});
const windshield = new THREE.Mesh(windshieldGeo, windshieldMat);



scene.add(windshield);




// ------ Responsive page ------
window.addEventListener('resize', ()=>{
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});

// ------ Animate ------
function animate() {
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );