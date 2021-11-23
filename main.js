import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup
// const boxTexture = new THREE.TextureLoader().load("slate.jpg");
const circleTexture = new THREE.TextureLoader().load("lookinup.jpg");
const waterTexture = new THREE.TextureLoader().load("water.jpg");
const scene = new THREE.Scene();
// Background

const backgroundTexture = new THREE.TextureLoader().load("wave.jpg");
scene.background = backgroundTexture;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// const material = new THREE.MeshStandardMaterial({ color: "#381513" });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// const geometry = new THREE.CircleGeometry(5, 32);
// const material = new THREE.MeshStandardMaterial({ color: "#381513" });
// const circle = new THREE.Mesh(geometry, material);

// // scene.add(circle);
// const Cgeometry = new THREE.CircleGeometry(20, 100);
// const Cmaterial = new THREE.MeshBasicMaterial({ map: circleTexture });
// const circle = new THREE.Mesh(Cgeometry, Cmaterial);
// scene.add(circle);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ waterTexture });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Avatar

const box = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ color: "#292525" })
);

scene.add(box);

// Moon

const moonTexture = new THREE.TextureLoader().load("earth.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

box.position.z = -6.5;

// circle.position.z = 10;
// circle.position.x = -7;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  box.rotation.y += 0.01;
  box.rotation.z += 0.01;

  // scene.background.rotation.x += 0.0001;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  box.rotation.x += 0.001;
  box.rotation.y += 0.001;
  box.rotation.z += 0.001;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
