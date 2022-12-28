// import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// function main(){
//     const renderer = new THREE.WebGLRenderer();

//     //renderer.shadowMap.enabled = true;

//     renderer.setSize(window.innerWidth, window.innerHeight);

//     document.body.appendChild(renderer.domElement);

//     const fov = 75;
//     const aspect = 2;
//     const near = 0.1;
//     const far = 10;
//     const camera = THREE.PerspectiveCamera(fov, aspect, near, far);
//     camera.position.set(-1,2,4);

//     const scene = new THREE.Scene();
//     // {
//     //     const color = 0XFFFFFF;
//     //     const intensity = 1;
//     //     const light = new THREE.DirectionalLight(color, intensity);
//     //     light.position.set(30,30,30);
//     //     scene.add(light);
//     // }

//     // const camera = new THREE.PerspectiveCamera(
//     //     75,
//     //     window.innerWidth / window.innerHeight,
//     //     0.01,
//     //     1000
//     // )
//     //camera.position.set(30,30,0);

//     const spheregeometry =  new THREE.SphereGeometry(5);
//     const spherematerial = new THREE.MeshBasicMaterial({color: 0xaa4488});
//     const sphere = new THREE.Mesh(spheregeometry, spherematerial);
//     scene.add(sphere);

//     // const directionallight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
//     // scene.add(directionallight);
 

//     renderer.render(scene, camera);
// }
// main();

// main ();
import * as THREE from 'three';
import { CubeTextureLoader, TextureLoader } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import startexture from '../img/stars.jpg';
import suntexture from '../img/sun.jpg';
import earthtexture from '../img/earth.jpg';
import jupitertexture from '../img/jupiter.jpg';
import marstexture from '../img/mars.jpg';
import mercurytexture from '../img/mercury.jpg';
import neptunetexture from '../img/neptune.jpg';
import plutotexture from '../img/pluto.jpg';
import saturnringexture from '../img/saturn ring.png';
import saturntexture from '../img/saturn.jpg';
import uranusringtexture from '../img/uranus ring.png';
import uranustexture from '../img/uranus.jpg';
import venustexture from '../img/venus.jpg';
import moontexture from '../img/moon.jpg';


function main() {
    // Necessary evil

    const renderer = new THREE.WebGLRenderer();

    renderer.shadowMap.enabled = true;

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // camera-> move according to mouse

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(-90, 140, 140);
    orbit.update();


    // scene and ligth(ambient light)
    

  const scene = new THREE.Scene();
  const ambientlight = new THREE.AmbientLight(0x3333333);
  scene.add(ambientlight);

  // texture for the background, we took a cubical background and specify the each side of the cube

  const CubeTextureLoader = new THREE.CubeTextureLoader();
  scene.background = CubeTextureLoader.load([
    startexture,
    startexture,
    startexture,
    startexture,
    startexture,
    startexture
  ])

 // texture for planets and sun 

    const TextureLoader = new THREE.TextureLoader();

    const geometry = new THREE.SphereGeometry(16,30,30);
    const material = new THREE.MeshBasicMaterial({
        map: TextureLoader.load(suntexture)
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);


   
  const pointlight = new THREE.PointLight(0xFFFFFF, 2, 1000);
  scene.add(pointlight);
  
function createplanet(size, texture, position, ring){
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: TextureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring){
        const ringgeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius, 
            32
        );
        const ringmat = new THREE.MeshBasicMaterial({
            map: TextureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringmesh = new THREE.Mesh(ringgeo, ringmat);
        obj.add(ringmesh);
        ringmesh.position.x = position;
        ringmesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj};
}

const mercury = createplanet(3.2, mercurytexture, 28);
const mars = createplanet(4, marstexture, 78);
// const earth = createplanet(6, earthtexture, 62);
const venus = createplanet(5.8, venustexture, 44);
const jupiter = createplanet(12, jupitertexture, 100);
const saturn = createplanet(10, saturntexture, 138, {
    innerRadius: 10,
    outerRadius: 20, 
    texture: saturnringexture
});
const uranus = createplanet(7, uranustexture, 176, {
    innerRadius: 7,
    outerRadius: 12, 
    texture: uranusringtexture
});
const neptune = createplanet(7, neptunetexture, 200);
const pluto = createplanet(2.8, plutotexture, 216);


// make a moon for our earth
const moongeo = new THREE.SphereGeometry(2,30,30);
const moonmat = new THREE.MeshBasicMaterial({
    map: TextureLoader.load(moontexture)
});
const earthobj = new THREE.Object3D();
const moonobj = new THREE.Object3D();
const moon = new THREE.Mesh(moongeo, moonmat);
const earthgeo = new THREE.SphereGeometry(6,30,30);
const earthmat = new THREE.MeshBasicMaterial({
    map: TextureLoader.load(earthtexture)
});
const earth = new THREE.Mesh(earthgeo, earthmat);
moonobj.add(moon);
earth.add(moonobj);
earthobj.add(earth);
scene.add(earthobj);
earth.position.x = 62;
moon.position.x = 10;
// obj.add(moon);
// earth.add(obj);


function animate(time) {

    //self rotation
    sphere.rotation.y = time / 1000;
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    //earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.18);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);
    earth.rotateY(0.02);
    moon.rotateY(0.02);

    // sun rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    //earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);
    earthobj.rotateY(0.01);
    moonobj.rotateY(0.002);



    renderer.render(scene, camera);

    }
    renderer.setAnimationLoop(animate);
    window.addEventListener('resize', function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    })
}

main();


