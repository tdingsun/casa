import * as THREE from "./three.module.js";
import { OBJLoader } from "./OBJLoader.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from "./OrbitControls.js";

var container;
var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var objFileNames = ['MA_Arbol', 'MA_Flor', 'Piedra1', 'Monumento3-1', 'Monumento4', 'Piedra1'];
var objID = 0;

init();
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
			obj.scale.x = 1.2;
			obj.scale.y = 1.2;
			obj.scale.z = 1.2;

			scene.add(obj);

			objID += 1;
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

	//window resize

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;

}

//

function animate() {

	requestAnimationFrame( animate );
	render();

}

var t = 0;
var r = 250;
var xdelta = 0;
var zdelta = 0;
function render() {

	t += 0.01;

	xdelta = r * Math.cos(t);
	zdelta = r * Math.sin(t);
	camera.position.x = xdelta
	camera.position.z = zdelta
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	r = Math.abs(500 - mouseY);
	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}