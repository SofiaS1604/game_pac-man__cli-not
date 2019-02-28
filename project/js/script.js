let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let geometry = new THREE.BoxGeometry( 10, 5, 5 );

let orange = new THREE.Color('rgb(255, 130, 24)');
let green = new THREE.Color('rgb(129, 235, 214)');
let purple = new THREE.Color('rgba(131, 72, 252, 0.5)');

let material = new THREE.MeshFaceMaterial([
    new THREE.MeshPhongMaterial({color: orange}),
    new THREE.MeshPhongMaterial({color: orange}),
    new THREE.MeshPhongMaterial({color: purple}),
    new THREE.MeshPhongMaterial({color: purple}),
    new THREE.MeshPhongMaterial({color: green}),
    new THREE.MeshPhongMaterial({color: green}),
]);

let pointLight = new THREE.PointLight( green, 1, 100 );
pointLight.position.set( 10, 10, 10 );
scene.add( pointLight );

let sphereSize = 1;
let pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

let pointLight_2 = new THREE.PointLight( purple, 1, 100 );
pointLight_2.position.set( 50, 5, 0 );
scene.add( pointLight_2);

let pointLightHelper_2 = new THREE.PointLightHelper( pointLight_2, sphereSize );
scene.add( pointLightHelper_2 );

let cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

let clock = new THREE.Clock();
let angle = 0;
let angularSpeed = THREE.Math.degToRad(50);
let delta = 0;
let radius = 20;

function animate() {
    delta = clock.getDelta();
    requestAnimationFrame(animate);
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    angle += angularSpeed * delta;
    camera.lookAt(cube.position);
    renderer.render(scene, camera);
};

animate();