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
const windShieldGeo = new THREE.CapsuleGeometry(1, 1, 4, 8);
const windShieldMat = new THREE.MeshBasicMaterial({
    color: 0x6e9349
});
const windShield = new THREE.Mesh(windShieldGeo, windShieldMat);



scene.add(windShield);




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