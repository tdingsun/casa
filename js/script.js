import * as THREE from "./three.module.js";
import { OBJLoader } from "./OBJLoader.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from "./OrbitControls.js";
import { FirstPersonControls } from "./FirstPersonControls.js";

var container;
var camera, controls, scene, renderer;
var material;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
// var objFileNames = ['MA_Arbol', 'MA_Flor', 'Piedra1', 'Monumento3-1', 'Monumento4', 'Piedra1'];
var objFileNames = ['ARBOL2V2'];

var views = {
	'ARBOL2V2': {
		"position": [-16.64, 1.95, -33.21],
		"rotation": [-3.12, -0.19, -3.13]
	}
}

var objID = 0;

var obj;

var clock = new THREE.Clock();


init();
// render();
animate();

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);

	//camera
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 100;

	//renderer

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'click', onDocumentClick, false );
	

	//controls
	controls = new FirstPersonControls(camera, renderer.domElement);
	controls.movementSpeed = 5;
	controls.lookSpeed = 0.01;

	//scene

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xeeeeee );

	//lights
	var ambientLight = new THREE.AmbientLight( 0xeeeeee, 0.5 );
	scene.add( ambientLight );

	var pointLight = new THREE.PointLight( 0xeeeeee, 0.5 );
	camera.add( pointLight );
	scene.add( camera );

	//texture
	// var texture = new THREE.TextureLoader().load("./textures/colors.png");
	//model

	//material
	material = new THREE.MeshPhongMaterial({
		shininess: 100,
		color: 0xaaaaaa,
		emissive: 0x555555,
		specular: 0xeeeeee
	});


	var loader = new GLTFLoader();
	// loader.load('../models/MA_Arbol.obj', function(obj){
	// 	object = obj;
	// }, onProgress, onError);

	function loadNextFile(){
		if(objID >= objFileNames.length) return;
		let name = objFileNames[objID]
		loader.load(`./models/${name}.gltf`, function(o){
			if(obj != null){
				console.log("cleanup");
				scene.remove(obj);
				console.log(obj);
				// obj.geometry.dispose();
				obj.traverse(function(child){
					if(child.isMesh){
						child.geometry.dispose();
					} 
				});
			}

			obj = o.scene;
			obj.traverse(function(child){
				if(child.isMesh){
					child.material = material;
					// child.material.map = texture;
					child.material.side = THREE.DoubleSide;
				} 
			});


			const box = new THREE.Box3().setFromObject(obj);
			const center = box.getCenter( new THREE.Vector3() );

			obj.position.x += ( obj.position.x - center.x );
			obj.position.y += ( obj.position.y - center.y );
			obj.position.z += ( obj.position.z - center.z );
			scene.add(obj);

			objID += 1;
			// controls.update();
			camera.position.set(views[name].position[0], views[name].position[1], views[name].position[2]);
			camera.rotation.set(views[name].rotation[0], views[name].rotation[1], views[name].rotation[2]);
			let vLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
			controls.lookAt(vLookAt);
			// let fwd = new THREE.Vector3(0,0,1);
			// fwd.applyMatrix3(camera.matrixWorld).normalize();
			// let offset = fwd.multiplyScalar(100);
			// camera.position.set(controls.target).sub(offset);
			render();

			setTimeout(loadNextFile, 5000);

		});
	}

	loadNextFile();
		

	//controls



	// controls = new OrbitControls(camera, renderer.domElement);
	// controls.addEventListener('change', render);
	// // controls.enableDamping = true;
	// // controls.dampingFactor = 0.05;
	// controls.screenSpacePanning = false;
	// // controls.keyPanSpeed = 20;

	// controls.minDistance = 50;
	// controls.maxDistance = 1000;

	// controls.maxPolarAngle = Math.PI;


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

function onDocumentClick( event ) {
	console.log(camera.position);
	console.log(camera.rotation);
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