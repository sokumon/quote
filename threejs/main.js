import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
// Create a scene
const scene = new THREE.Scene();

const searchParams = new URLSearchParams(window.location.search);
let word
if (!searchParams.has("word")){
    word = "Hello world"
}else{

    word = searchParams.get('word'); // price_descending

}
// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the font
const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    // Create TextGeometry
    const textGeometry = new TextGeometry(word, {
        font: font,
        size: 1,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: false
    });

    // Center the text
    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    textGeometry.translate(-0.5 * textWidth, 0, 0);

    // Create a material
    const material = new THREE.MeshBasicMaterial({ color: 0x123456 });

    // Create a mesh
    const textMesh = new THREE.Mesh(textGeometry, material);

    // Add the mesh to the scene
    scene.add(textMesh);

    // Render the scene
    renderer.render(scene, camera);

    const exporter = new GLTFExporter();

// Parse the input and generate the glTF output
exporter.parse(
	scene,
	// called when the gltf has been generated
	function ( gltf ) {

		console.log( gltf );
		downloadJSON( gltf);

	},
	// called when there is an error in the generation
	function ( error ) {

		console.log( 'An error happened' );

	}
);
});


function downloadJSON(gltf){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gltf));
    var dlAnchorElem = document.createElement("a")
    dlAnchorElem.setAttribute("href",dataStr);
    word = word.replace(/[^a-zA-Z ]/g,"")
    let filename = `${word}.gltf`
    dlAnchorElem.setAttribute("download",filename);
    dlAnchorElem.click();
}


