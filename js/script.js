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
var objFileNames = [  'Flor1', 'Piedra2', 'Planta1',  'Arbol4',  'ARBOL2V2',  'Arbol3','Flor2',  'Monumento4', 'Piedra1', 'Monumento2', 'mONUMENTO3', 'Monumento1',      'Monumento5'];
// objFileNames = shuffle(objFileNames);

var views = {
	'Monumento4': {
		"position": [-248.52, 30.126, 416.96],
		"rotation": [0.27, -0.54, 0.14]
	},
	'Piedra1': {
		"position": [-4.43, 4.34, 42.96],
		"rotation": [-0.01, -0.21, 0.0]
	},
	'Monumento2': {
		"position": [23.36, 52.50, 22.95],
		"rotation": [0.35, 0.31, -0.11]
	},
	'Flor2': {
		"position": [-5, 10,  0],
		"rotation": [-1.57, -0.5, 0]
	},
	'Arbol3': {
		"position": [27.47, 100.83, 29.33],
		"rotation": [-1.56, -0.01, -0.60]
	},
	'ARBOL2V2': {
		"position": [-16.64, 10.95, -33.21],
		"rotation": [-3.12, -0.19, -3.13]
	},
	'mONUMENTO3': {
		"position": [10, 20.00, -10],
		"rotation": [-3, 0.52, 3.00]
	},
	'Arbol4': {
		"position": [-2.86, 9.00, -7.50],
		"rotation": [-3.14, -0.55, -3.14]
	},
	'Monumento1': {
		"position": [-67.90, 40, 85.92],
		"rotation": [-0.07, -0.63, -0.04]
	},
	'Planta1': {
		"position": [45.81, 12, 7.53],
		"rotation": [-0.47, 1.42, 0.46]
	},
	'Piedra2': {
		"position": [-7.82, 8.5, 64.87],
		"rotation": [-6.19, -0.15, -9.58]
	},
	'Monumento5': {
		"position": [22.98, 20, 9.89],
		"rotation": [1.89, 0.66, -2.06]
	},
	'Flor1': {
		"position": [0, -45, 5.00],
		"rotation": [1.57, 0, 0]
	},
}

var objID = 0;

var obj;

var clock = new THREE.Clock();


init();
// render();
var player = new Tone.Player("./audio.mp3").toMaster();

$('#play-btn').click(function(){
    if(player.loaded){
        Tone.context.resume();
        player.start();
        // setTimeout(() => {
        //     t = setTimeout(displayText, speed);
        // }, 4000);
		$('#play-btn').hide();
		animate();
    }

});

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
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	container.appendChild( renderer.domElement );

	document.addEventListener( 'click', onDocumentClick, false );
	

	//controls
	controls = new FirstPersonControls(camera, renderer.domElement);
	controls.movementSpeed = 5;
	controls.lookSpeed = 0.05;

	//orbit controls
	// controls = new OrbitControls(camera, renderer.domElement);
	// controls.addEventListener('change', render);


	//scene

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcccccc );

	//lights
	// var ambientLight = new THREE.AmbientLight( 0xeeeeee, 0.4 );
	// scene.add( ambientLight );

	var pointLight = new THREE.PointLight( 0xffffff, 0.5 );
	// pointLight.castShadow = true;
	pointLight.position.set( 0, 200, 100 );

	camera.add( pointLight );

	var light = new THREE.DirectionalLight( 0x000000, 0.5);
	light.position.set( 0, 100, 0 );
	light.castShadow = true;
	scene.add(light);
	// camera.add( light );

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 512;  // default
	light.shadow.mapSize.height = 512; // default
	light.shadow.camera.near = 10;       // default
	light.shadow.camera.far = 2000;      // default
	light.shadow.camera.zoom = 1;      // default
	light.shadow.camera.right = 100;      // default
	light.shadow.camera.left = -100;      // default
	light.shadow.camera.top = 100;      // default
	light.shadow.camera.bottom = -100;      // default

	light.shadow.bias = - 0.000222;
	light.shadow.radius = 10;
	
	


	scene.add( camera );

	//texture
	// var texture = new THREE.TextureLoader().load("./textures/colors.png");
	//model

	//material
	material = new THREE.MeshPhongMaterial({
		shininess: 200,
		color: 0xdddddd,
		emissive: 0x777777,
		specular: 0x111111,
		// flatShading: true
	});


	//floor
	var planeGeometry = new THREE.PlaneBufferGeometry(500, 500);
	planeGeometry.rotateX( - Math.PI / 2);
	var planeMaterial = new THREE.ShadowMaterial();
	planeMaterial.opacity = 0.3;
	var plane = new THREE.Mesh( planeGeometry, planeMaterial );
	plane.position.y = 0;
	plane.receiveShadow = true;
	scene.add( plane );

	// var helper = new THREE.CameraHelper( light.shadow.camera );
	// scene.add( helper );


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
					child.castShadow = true;
					child.material = material;
					// child.material.map = texture;
					child.material.side = THREE.DoubleSide;
				} 
			});


			const box = new THREE.Box3().setFromObject(obj);
			const center = box.getCenter( new THREE.Vector3() );

			obj.position.x += ( obj.position.x - center.x );
			obj.position.y += ( obj.position.y - box.min.y );
			obj.position.z += ( obj.position.z - center.z );
			scene.add(obj);

			objID += 1;
			// controls.update();

			camera.position.set(views[name].position[0], views[name].position[1], views[name].position[2]);
			camera.rotation.set(views[name].rotation[0], views[name].rotation[1], views[name].rotation[2]);
			let vLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
			controls.lookAt(vLookAt);
			render();

			setTimeout(loadNextFile, 2000);

		});
	}

	loadNextFile();
		

	//controls



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

function animate() {

	requestAnimationFrame( animate );
	render();

}

function render() {
	controls.update( clock.getDelta() );
	renderer.render( scene, camera );
}

function shuffle(array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}