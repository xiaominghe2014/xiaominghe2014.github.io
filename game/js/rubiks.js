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
const smallCubeGeometry = new THREE.BoxGeometry(0.99, 0.99, 0.99);

// Create an array to hold all the small cube meshes
const smallCubes = [];

// Create a cube with different colored faces using small cubes
// Create a group to hold all the small cubes
const cubeGroup = new THREE.Group();
// cubeGroup.scale.set(1,1,1)
// Create a cube with different colored faces using small cubes
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const smallCubeMaterials = [
                new THREE.MeshBasicMaterial({ color: 0xffff00, shadowSide: THREE.DoubleSide }), // yellow
                new THREE.MeshBasicMaterial({ color: 0x0000ff, shadowSide: THREE.DoubleSide}), // blue
                new THREE.MeshBasicMaterial({ color: 0xffffff, shadowSide: THREE.DoubleSide}), // white
                new THREE.MeshBasicMaterial({ color: 0x00ff00, shadowSide: THREE.DoubleSide}), // green
                new THREE.MeshBasicMaterial({ color: 0xff0000, shadowSide: THREE.DoubleSide}), // red
                new THREE.MeshBasicMaterial({ color: 0xffa500, shadowSide: THREE.DoubleSide})  // orange
            ];
            const smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterials);
            smallCube.position.set(x, y, z);
            smallCube.receiveShadow = true;
            smallCube.castShadow = true;
            cubeGroup.add(smallCube); // Add the small cube to the group
        }
    }
}

// Add the cube group to the scene
scene.add(cubeGroup);
function animate() {
    requestAnimationFrame(animate);
    // TWEEN.update();
    // Rotate the small cubes

    cubeGroup.children.forEach((cube) => {
        if (cube.position.x === 0) {
            cube.rotation.x += 0.02;
        }
        // if (cube.position.y === 0) {
        //     cube.rotation.y += 0.02;
        // }
        // if (cube.position.z === 0) {
        //     cube.rotation.z += 0.02;
        // }
    });
    cubeGroup.rotation.x += 0.01;
    cubeGroup.rotation.y += 0.01;
    // Render the scene with the camera
    renderer.render(scene, camera);
}

// animate();
renderer.render(scene, camera);


function rotateLayerX(layerIndex, direction) {
    // 根据层级和方向计算旋转角度
    const angle = direction === 'clockwise' ? Math.PI / 2 : -Math.PI / 2;

    // 遍历指定层级上的小方块，进行旋转
    cubeGroup.children.forEach((cube) => {
        if (cube.position.x === layerIndex) {
            cube.rotation.x = angle;
        }
    });
}

// rotateLayerX(1,'clockwise');

animate();