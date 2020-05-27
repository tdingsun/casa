import * as THREE from "./three.module.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { FirstPersonControls } from "./FirstPersonControls.js";
THREE.Cache.enabled = true;

var container;
var camera, controls, scene, renderer;
var material;
var loader;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var objects = [];

var objID = 0;
var clock = new THREE.Clock();
var timerInterval;
var objTimeout;
var length = 1889; //time in seconds

var started = false;

var objFileNames = ['ARBOL2V2', 'mONUMENTO3', 'Arbol3', 'Planta1', '12', '1', '3', 'Flor1',  'Monumento1', 'Arbol4',  'Flor2' , 'Piedra1',  'Piedra2'];
objFileNames = shuffle(objFileNames);

var views = {
	'1': {
		"position": [10, 71, 122],
		"rotation": [0.24, -0.57, 0.13]
	},
	'Piedra1': {
		"position": [-4.43, 4.34, 38],
		"rotation": [-0.01, -0.21, 0.0]
	},
	'3': {
		"position": [57, 47, 27],
		"rotation": [0.06, 0.7, -0.04]
	},
	'Flor2': {
		"position": [-3.5, 7,  0],
		"rotation": [-1.57, -0.5, 0]
	},
	'Arbol3': {
		"position": [50, 7.5, -13],
		"rotation": [0.54, 0.91, -0.44]
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
		"position": [12, 9.00, 31],
		"rotation": [0, 0.72, 0]
	},
	'Monumento1': {
		"position": [35, 30, 16],
		"rotation": [0.19, 0.78, -0.01]
	},
	'Planta1': {
		"position": [34, 10, 3],
		"rotation": [-0.06, 1.46, 0.06]
	},
	'Piedra2': {
		"position": [-7.82, 8.5, 64.87],
		"rotation": [-6.19, -0.15, -9.58]
	},
	'12': {
		"position": [18, 23, 6],
		"rotation": [2, 0.63, -2.28]
	},
	'Flor1': {
		"position": [0, -25, 0],
		"rotation": [1.57, 0, 0]
	}
}

var audioLoaded = false;
var firstModelLoaded = false;

var audio = new Audio('./audio.mp3');
audio.onloadedmetadata = function() {
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) ){
		audioLoaded = true;
		console.log("loaded");

		if(firstModelLoaded){
			$("#titlescreen").addClass("loaded");
			$('#loading').hide();
		}
	}
};
audio.oncanplay = function() {
	console.log("loaded");
	audioLoaded = true;
	if(firstModelLoaded){
		$("#titlescreen").addClass("loaded");
		$('#loading').hide();
	}
};

var volume = new Tone.Volume(-12);
var noise = new Tone.Noise('brown').start();
var autoFilter = new Tone.AutoFilter({
	"frequency" : "16m",
	"baseFrequency": 400,
	"octaves": 1
}).start();
noise.chain(autoFilter, volume, Tone.Master);

init();
animate();

$('#titlescreen').click(function(e){
	if($(this).hasClass("loaded")){
		Tone.context.resume();
		audio.play();
		$('#title-container').hide();
		$("#arrow").show();
		timerInterval = setInterval(timer, 1000);
		objTimeout = setTimeout(loadNextFile, 150000);
		started = true;
	};
});

$('#arrow').click(function(){
	if(objects[objID] != undefined){

		clearTimeout(objTimeout);
		objTimeout = setTimeout(loadNextFile(), 0);
	}
});

$(document).click(function(){
	console.log(camera.position);
	console.log(camera.rotation);
})

function timer(){
	var minutes = Math.floor((length % (60 * 60)) / (60));
	var seconds = Math.floor((length % 60));
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	document.getElementById("timer").innerHTML = minutes + ":" + seconds;
	length -= 1;
	if (length < 0) {
		clearInterval(timerInterval);
		document.getElementById("timer").innerHTML = "00:00";
	}
}

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);

	//camera
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 550 );

	//renderer

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio( 1 );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.autoUpdate = false;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	container.appendChild( renderer.domElement );	

	//controls
	controls = new FirstPersonControls(camera, renderer.domElement);
	controls.movementSpeed = 5;
	controls.lookSpeed = 0.03;

	//scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xcccccc);


	var spotLight = new THREE.SpotLight( 0xffffff, 0.5 );
	spotLight.position.set( 0, 50, 100 );

	camera.add( spotLight );

	var light = new THREE.DirectionalLight( 0x000000, 0.5);
	light.position.set( 0, 100, 0 );
	light.castShadow = true;
	scene.add(light);

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 512;  // default
	light.shadow.mapSize.height = 512; // default
	light.shadow.camera.near = -200;       // default
	light.shadow.camera.far = 200;      // default
	light.shadow.camera.zoom = 1;      // default
	light.shadow.camera.right = 200;      // default
	light.shadow.camera.left = -200;      // default
	light.shadow.camera.top = 50;      // default
	light.shadow.camera.bottom = -50;      // default

	light.shadow.bias = - 0.000222;
	light.shadow.radius = 10;
	
	scene.add( camera );

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
	plane.matrixAutoUpdate = false
	scene.add( plane );

	// var helper = new THREE.CameraHelper( light.shadow.camera );
	// scene.add( helper );

	loader = new GLTFLoader();
	loadFirst();

	//window resize
	window.addEventListener( 'resize', onWindowResize, false );
}

function loadFirst(){
	document.getElementById("currcount").innerHTML = 1;
	loader.load(`./models/${objFileNames[objID]}.glb`, function(o){
		if(objFileNames[objID] == 'mONUMENTO3' || objFileNames[objID] == 'Arbol3' || objFileNames[objID] == 'Planta1' ||objFileNames[objID] == '12' || objFileNames[objID] == '1' || objFileNames[objID] == '3'){
			o.scene.traverse(function(child){
				if(child.isMesh){
					child.rotation.set(-1.57, 0, 0);
				} 
			});
		}
		
		addObjectToScene(o.scene);
		renderObject();
		objID += 1;
		
		firstModelLoaded = true;

		if(audioLoaded){
			$("#titlescreen").addClass("loaded");
			$('#loading').hide();
		}

		//preload second one
		$("#arrow").hide();
		loader.load(`./models/${objFileNames[objID]}.glb`, function(o){
			if(objFileNames[objID] == 'mONUMENTO3' || objFileNames[objID] == 'Arbol3' || objFileNames[objID] == 'Planta1' ||objFileNames[objID] == '12' || objFileNames[objID] == '1' || objFileNames[objID] == '3'){
				o.scene.traverse(function(child){
					if(child.isMesh){
						child.rotation.set(-1.57, 0, 0);
					} 
				});
			}
			addObjectToScene(o.scene);
			if(started){
				$("#arrow").show();
			}
		});
	});
}

function loadNextFile(){
	document.getElementById("currcount").innerHTML = objID + 1;
	renderObject();
	objID += 1;

	if(objID >= objFileNames.length){
		objID = 0;
	}

	if(objects.length < objFileNames.length){
		$("#arrow").hide();
		loader.load(`./models/${objFileNames[objID]}.glb`, function(o){
			$("#arrow").show();
			if(objFileNames[objID] == 'mONUMENTO3' || objFileNames[objID] == 'Arbol3' || objFileNames[objID] == 'Planta1' ||objFileNames[objID] == '12' || objFileNames[objID] == '1' || objFileNames[objID] == '3'){
				o.scene.traverse(function(child){
					if(child.isMesh){
						child.rotation.set(-1.57, 0, 0);
					} 
				});
			}
			addObjectToScene(o.scene);
			clearTimeout(objTimeout);
			objTimeout = setTimeout(loadNextFile, 150000);
		});
	} else {
		clearTimeout(objTimeout);
		objTimeout = setTimeout(loadNextFile, 150000);
	}
}

function addObjectToScene(obj){
	obj.matrixAutoUpdate = false;

	objects.push(obj);
	obj.visible = false;
	obj.traverse(function(child){
		if(child.isMesh){
			child.castShadow = true;
			child.material = material;
			child.material.side = THREE.DoubleSide;
		} 
	});

	const box = new THREE.Box3().setFromObject(obj);
	const center = box.getCenter( new THREE.Vector3() );

	obj.position.x = -center.x;
	obj.position.y = -box.min.y;
	obj.position.z = -center.z;
	obj.updateMatrix()
	scene.add(obj);
}

function renderObject(){
	renderer.shadowMap.needsUpdate = true;

	objects.forEach(function(object){
		object.visible = false;
	});

	let name = objFileNames[objID];
	objects[objID].visible = true;

	camera.position.set(views[name].position[0], views[name].position[1], views[name].position[2]);
	camera.rotation.set(views[name].rotation[0], views[name].rotation[1], views[name].rotation[2]);
	let vLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
	controls.lookAt(vLookAt);
	render();
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
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