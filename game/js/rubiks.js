
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Create a single small cube geometry
const smallCubeGeometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);

// Create an array to hold all the small cube meshes
const smallCubes = [];
const smallCubeMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xffff00, shadowSide: THREE.DoubleSide }), // yellow
    new THREE.MeshBasicMaterial({ color: 0x0000ff, shadowSide: THREE.DoubleSide }), // blue
    new THREE.MeshBasicMaterial({ color: 0xffffff, shadowSide: THREE.DoubleSide }), // white
    new THREE.MeshBasicMaterial({ color: 0x00ff00, shadowSide: THREE.DoubleSide }), // green
    new THREE.MeshBasicMaterial({ color: 0xff0000, shadowSide: THREE.DoubleSide }), // red
    new THREE.MeshBasicMaterial({ color: 0xffa500, shadowSide: THREE.DoubleSide })  // orange
];





const cubeGroup = new THREE.Group();
var groupX = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
var groupY = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
// cubeGroup.scale.set(1,1,1)
// Create a cube with different colored faces using small cubes
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {

        for (let z = -1; z <= 1; z++) {
            const smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterials);
            smallCube.position.set(x, y, z);
            smallCube.receiveShadow = true;
            smallCube.castShadow = true;

            // Load font
            // const loader = new THREE.FontLoader();
            // loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
            //     const textGeometry = new THREE.TextGeometry(`${x},${y},${z}`, {
            //         font: font,
            //         size: 0.1,
            //         height: 0.05,
            //     });
            //     const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            //     const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            //     textMesh.position.copy(smallCube.position.clone().add(new THREE.Vector3(0, 0, 0)));
            //     smallCube.add(textMesh);
            // });
            cubeGroup.add(smallCube); // Add the small cube to the group
            // groupX[x + 1].add(smallCube);
            // groupY[y + 1].add(smallCube);
        }
    }
}

// for (let i = 0; i < 3; i++) {
//     cubeGroup.add(groupX[i]);
//     cubeGroup.add(groupY[i]);
// }

// Add the cube group to the scene
scene.add(cubeGroup);
function animate() {
    requestAnimationFrame(animate);
    // const group = new THREE.Group(); // Create a new group

    // Add cubes with x = layerIndex to the group
    if (groupX[1].children.length == 0) {
        const layerCubes = cubeGroup.children.filter(cube => cube.position.x === 0);
        layerCubes.forEach((cube) => {
            if (cube.position.x === 0) {
                groupX[1].add(cube);
            }
            // console.log(cube.position)
        });

        // groupX[1].children.forEach((cube) => {
        //     cubeGroup.remove(cube);
        // });
        cubeGroup.add(groupX[1]);
    }

    // Rotate the group
    groupX[1].rotation.x += 0.02;

    // Add the group back to the cubeGroup
    cubeGroup.rotation.x += 0.01;
    cubeGroup.rotation.y += 0.01;
    // Render the scene with the camera
    renderer.render(scene, camera);

    // groupX[1].children.forEach((cube) => {
    //     groupX[1].remove(cube);
    //     cubeGroup.add(cube);
    // });
    // cubeGroup.remove(groupX[1]);
}

animate();
renderer.render(scene, camera);


function rotateLayerX(layerIndex, direction) {

}

function rotateLayerY(layerIndex, direction) {
    
}

// rotateLayerX(1,'clockwise');

// animate();



const canvas = document.getElementById('myCanvas');

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);

let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};
let rotationAngles = {
    x: 0,
    y: 0
};

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };

    //选中哪一层
    cubeGroup.children.forEach((cube) => {
        if (cube.userData.isSelected) {
            cube.userData.isSelected = false;
            cubeGroup.remove(cube.userData.selectionBox);
        }
    });
    // Get the cube that was clicked
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubeGroup.children);
    if (intersects.length > 0) {
        const selectedCube = intersects[0].object;
        // Add a selection box to the selected cube
        const selectionBoxGeometry = new THREE.BoxGeometry(1.01, 1.01, 1.01);
        const selectionBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, linewidth: 10 });
        const selectionBox = new THREE.Mesh(selectionBoxGeometry, selectionBoxMaterial);
        selectionBox.position.copy(selectedCube.position);
        selectedCube.userData.isSelected = true;
        selectedCube.userData.selectionBox = selectionBox;
        cubeGroup.add(selectionBox);

        renderer.render(scene, camera);
    }
}

function onMouseMove(event) {
    if (!isDragging) return;

    const deltaMousePosition = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    rotationAngles.x += deltaMousePosition.y * 0.01;
    rotationAngles.y += deltaMousePosition.x * 0.01;

    cubeGroup.rotation.x = rotationAngles.x;
    cubeGroup.rotation.y = rotationAngles.y;

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };

    renderer.render(scene, camera);
}

function onMouseUp() {
    isDragging = false;
}


document.addEventListener('keydown', onKeyPress);

function onKeyPress(event) {
    const selectedCube = cubeGroup.children.find(cube => cube.userData.isSelected);

    if (selectedCube) {
        switch (event.key) {
            case 'ArrowUp':
                rotateCube(selectedCube, 'up');
                break;
            case 'ArrowDown':
                rotateCube(selectedCube, 'down');
                break;
            case 'ArrowLeft':
                rotateCube(selectedCube, 'left');
                break;
            case 'ArrowRight':
                rotateCube(selectedCube, 'right');
                break;
        }
    }
}

function rotateCube(cube, direction) {
    // let x = cube.position.x;
    // let y =cube.position.y;
    // let dir = 'clockwise';
    // switch (direction) {
    //     case 'up':
    //         dir = 'clockwise';
    //         rotateLayerY(y,dir);
    //         return;
    //     case 'down':
    //         dir = 'anticlockwise';
    //         rotateLayerY(y,dir);
    //         return;
    //     case 'left':
    //         dir = 'clockwise';
    //         rotateLayerX(x,dir);
    //         return;
    //     case 'right':
    //         dir = 'anticlockwise';
    //         rotateLayerX(x,dir);
    //         return;
    // }
}
