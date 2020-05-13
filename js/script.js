import * as THREE from "./three.module.js";
import { OBJLoader } from "./OBJLoader.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from "./OrbitControls.js";
import { FirstPersonControls } from "./FirstPersonControls.js";

var container;
var camera, controls, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var objFileNames = ['MA_Arbol', 'MA_Flor', 'Piedra1', 'Monumento3-1', 'Monumento4', 'Piedra1'];
var objID = 0;

var clock = new THREE.Clock();


init();
// render();
animate();

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);

	//camera
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 250;

	//scene

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x6495ed );

	//lights
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );

	//model

	var loader = new GLTFLoader();
	// loader.load('../models/MA_Arbol.obj', function(obj){
	// 	object = obj;
	// }, onProgress, onError);

	function loadNextFile(){
		if(objID >= objFileNames.length) return;

		loader.load(`./models/${objFileNames[objID]}.gltf`, function(o){
			let obj = o.scene;
			// obj.traverse(function(child){
			// 	if(child.isMesh) child.material.map = texture;
			// });

			obj.position.x = Math.random() * 200 - 100;
			obj.position.y = Math.random() * 200 - 100;
			obj.scale.set(10, 10, 10);
			obj.rotation.x = -1.57;

			scene.add(obj);

			objID += 1;
			render();
			loadNextFile();

		});
	}

	loadNextFile();
		
	//renderer

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	//controls
	// controls = new OrbitControls(camera, renderer.domElement);
	controls = new FirstPersonControls(camera, renderer.domElement);
	controls.movementSpeed = 150;
	controls.lookSpeed = 0.1;
	// controls.addEventListener('change', render);
	// controls.enableDamping = true;
	// controls.dampingFactor = 0.05;
	// controls.screenSpacePanning = true;
	// controls.keyPanSpeed = 20;

	controls.minDistance = 50;
	controls.maxDistance = 1000;

	controls.maxPolarAngle = Math.PI;


	//window resize

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;

}

//

function animate() {

	requestAnimationFrame( animate );
	// controls.update();
	render();

}

var t = 0;
var r = 250;
var xdelta = 0;
var zdelta = 0;

function render() {

	// t += 0.01;

	// xdelta = r * Math.cos(t);
	// zdelta = r * Math.sin(t);
	// camera.position.x = r * Math.cos(mouseX * 0.05);
	// camera.position.z = r * Math.sin(mouseX * 0.05);
	// camera.position.y = (-mouseY + windowHalfY);
	// camera.lookAt( scene.position );
	controls.update( clock.getDelta() );
	renderer.render( scene, camera );

}