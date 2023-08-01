
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Create a single small cube geometry
const smallCubeGeometry = new THREE.BoxGeometry(0.99, 0.99, 0.99);

// Create an array to hold all the small cube meshes
const smallCubeMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xffffff, shadowSide: THREE.DoubleSide }), // white
    new THREE.MeshBasicMaterial({ color: 0xffff00, shadowSide: THREE.DoubleSide }), // yellow
    new THREE.MeshBasicMaterial({ color: 0xff0000, shadowSide: THREE.DoubleSide }), // red
    new THREE.MeshBasicMaterial({ color: 0xffa500, shadowSide: THREE.DoubleSide }), // orange
    new THREE.MeshBasicMaterial({ color: 0x0000ff, shadowSide: THREE.DoubleSide }), // blue
    new THREE.MeshBasicMaterial({ color: 0x00ff00, shadowSide: THREE.DoubleSide }), // green
];





const cubeGroup = new THREE.Group();
var groupX = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
var groupY = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
var groupZ = [new THREE.Group(), new THREE.Group(), new THREE.Group()];



THREE.Outline = function (object) {

    var indices = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
    var positions = new Float32Array(8 * 3);

    var geometry = new THREE.BufferGeometry();
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    THREE.LineSegments.call(this, geometry, new THREE.LineBasicMaterial({
        color: 0x00,
        linewidth: 10,
        linecap: 'round',
        // linejoin: 'bevel'
    }));

    if (object !== undefined) {

        this.update(object);

    }

};

THREE.Outline.prototype = Object.create(THREE.LineSegments.prototype);
THREE.Outline.prototype.constructor = THREE.Outline;

THREE.Outline.prototype.update = (function () {

    var outline = new THREE.Box3();

    return function (object) {

        outline.setFromObject(object);

        if (outline.empty()) return;

        var min = outline.min;
        var max = outline.max;

        /*
          5____4
        1/___0/|
        | 6__|_7
        2/___3/
        0: max.x, max.y, max.z
        1: min.x, max.y, max.z
        2: min.x, min.y, max.z
        3: max.x, min.y, max.z
        4: max.x, max.y, min.z
        5: min.x, max.y, min.z
        6: min.x, min.y, min.z
        7: max.x, min.y, min.z
        */

        var position = this.geometry.attributes.position;
        var array = position.array;

        array[0] = max.x;
        array[1] = max.y;
        array[2] = max.z;
        array[3] = min.x;
        array[4] = max.y;
        array[5] = max.z;
        array[6] = min.x;
        array[7] = min.y;
        array[8] = max.z;
        array[9] = max.x;
        array[10] = min.y;
        array[11] = max.z;
        array[12] = max.x;
        array[13] = max.y;
        array[14] = min.z;
        array[15] = min.x;
        array[16] = max.y;
        array[17] = min.z;
        array[18] = min.x;
        array[19] = min.y;
        array[20] = min.z;
        array[21] = max.x;
        array[22] = min.y;
        array[23] = min.z;

        position.needsUpdate = true;

        this.geometry.computeBoundingSphere();

    }

})();

// object:要添加线条的模型
// color:线条颜色
function frameline(object, color) {
    // 边框辅助线
    const edges = new THREE.EdgesGeometry(object.geometry)
    const material = new THREE.LineBasicMaterial({
        color: color,
        linewidth: 1,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.05
    })

    const line = new THREE.LineSegments(edges, material)

    // 获取物体的世界坐标 旋转等
    const worldPosition = new THREE.Vector3()
    object.getWorldPosition(worldPosition)

    line.scale.copy(object.scale)
    line.rotation.copy(object.rotation)
    line.position.copy(worldPosition)

    return line
    // return之后，直接添加到场景，或者自建的group/object3D组里即可
    // group.add(line)
}

let allCubes = [];
let allX = [[],[],[]];
let allY = [[],[],[]];
let allZ = [[],[],[]];
// cubeGroup.scale.set(1,1,1)
// Create a cube with different colored faces using small cubes
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {

        for (let z = -1; z <= 1; z++) {
            const smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterials);
            const boxHelper = new THREE.Outline(smallCube);
            smallCube.add(boxHelper);
            smallCube.position.set(x, y, z);
            smallCube.receiveShadow = true;
            smallCube.castShadow = true;
            smallCube.x = x;
            smallCube.y = y;
            smallCube.z = z;
            groupX[x+1].add(smallCube);
            allCubes.push(smallCube);
            allX[x+1].push(smallCube);
            allY[y+1].push(smallCube);
            allZ[z+1].push(smallCube);
        }
    }
}

for (let i = 0; i < 3; i++) {
    cubeGroup.add(groupX[i]);
    cubeGroup.add(groupY[i]);
    cubeGroup.add(groupZ[i]);
}

// Add the cube group to the scene
scene.add(cubeGroup);

let rStart = true;

let rotationXY = 0;

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
    let rXY = rotationXY%3;
    let l =  Math.floor(rotationXY/3)%3;
    if(rXY == 0){
        //x
        const layerCubes = getAllCubeX(l-1)
        const tempGroup = groupX[l];
        layerCubes.forEach(cube => {
            changeCubeGroup(cube, tempGroup);
        });
        rotateGroup(tempGroup, 'x', 0.02);
    }else if(rXY == 1){
        //y
        const layerCubes = getAllCubeY(l-1)
        const tempGroup = groupY[l];
        layerCubes.forEach(cube => {
            changeCubeGroup(cube, tempGroup);
        });
        rotateGroup(tempGroup, 'y', 0.02);
    }
    else if(rXY == 2){
        //z
        const layerCubes = getAllCubeZ(l-1)
        const tempGroup = groupZ[l];
        layerCubes.forEach(cube => {
            changeCubeGroup(cube, tempGroup);
        });
        rotateGroup(tempGroup, 'z', 0.02);
    }

    renderer.render(scene, camera);
}

function rotateGroup(group, axis, angle) {
    if(axis == 'x'){
        let r = group.rotation.x;
        if((r+angle)>Math.PI*2){
            group.rotation.x = 0;
            rotationXY += 1;
        }else{
            group.rotation.x += angle;
        }
    }else if(axis == 'y'){
        let r = group.rotation.y;
        if((r+angle)>Math.PI*2){
            group.rotation.y = 0;
            rotationXY += 1;
        }else{
            group.rotation.y += angle;
        }
    }else if(axis == 'z'){
        let r = group.rotation.z;
        if((r+angle)>Math.PI*2){
            group.rotation.z = 0;
            rotationXY += 1;
        }else{
            group.rotation.z += angle;
        }
    }
}

cubeGroup.rotation.x = 0.6;
cubeGroup.rotation.y = 0.6;
renderer.render(scene, camera);

function changeCubeGroup(cube, newGroup){
    // 创建 object 的深拷贝
    // let objectCopy = Object.assign(Object.create(Object.getPrototypeOf(object)), object);
    // 获取物体在世界中的位置、旋转和缩放
    // const worldPosition = new THREE.Vector3();
    // const worldQuaternion = new THREE.Quaternion();
    // const worldScale = new THREE.Vector3();
    // object.matrixWorld.decompose(worldPosition, worldQuaternion, worldScale);

    // 将物体从其当前的父级移除
    cube.parent.remove(cube);
    // 将物体添加到新的组
    newGroup.add(cube);
    const box = cube.userData.selectionBox
    if(box && box.parent){
        box.parent.remove(box);
        newGroup.add(box);
    }
    // 设置物体在新组中的位置、旋转和缩放，以保持其在世界中的视角不变
    // object.position.copy(worldPosition);
    // object.quaternion.copy(worldQuaternion);
    // object.scale.copy(worldScale);
}

//旋转90度后坐标变化
function updateOnRote90(cube, axis) {
    let oldX = cube.x;
    let oldY = cube.y;
    let oldZ = cube.z;
    const rMap = {
        '-1-1': [1, -1],
        '0-1': [1, 0],
        '1-1': [1, 1],
        '10': [0, 1],
        '11': [-1, 1],
        '01': [-1, 0],
        '-11': [-1, -1],
        '-10': [0, -1]
    };
    switch (axis) {
        case 'x':
            //y,z
            //-1,-1 = > 1,-1
            //0,-1 = > 1,0
            //1,-1 => 1,1
            //1,0 => 0,1
            //1,1 => -1,1
            //0,1 => -1,0
            //-1,1 => -1,-1
            //-1,0 => 0,-1
            // cube.y = oldZ;
            // cube.z = oldY;
            let k = oldY+""+oldZ;
            if(rMap[k]){
                cube.y = rMap[k][0];
                cube.z = rMap[k][1];
                console.log(`${oldY},${oldZ}=>${rMap[k]}`)
            }
            break;
        case 'y':
            cube.x = oldZ;
            cube.z = oldX;
            break;
        case 'z':
            cube.x = oldY;
            cube.y = oldX;
            break;
    }
}

function getAllCubeX(x){
    return allCubes.filter(_=>_.x == x);
}

function getAllCubeY(y){
    return allCubes.filter(_=>_.y == y);
}

function getAllCubeZ(z){
    return allCubes.filter(_=>_.z == z);
}


// function allCubes(){
//     return getAllCubeX().concat(getAllCubeY());
// }

function handlerAngle(angle){
    if(angle>0 && angle<Math.PI/4){
        return 0;
    }
    if(angle>=Math.PI/4){
        return Math.PI / 2;
    }
    if(angle<=0 && angle>=-Math.PI/4){
        return 0;
    }
    if(angle<=-Math.PI/4){
        return -Math.PI / 2;
    }
}

let rotating = false;

function rotateLayerX(layerIndex, angle) {
    const layer = groupX[layerIndex+1];
    const layerCubes = getAllCubeX(layerIndex)
    layerCubes.forEach(cube => {
        if(cube.parent!=layer){
            cube.parent&&cube.parent.remove(cube);
            layer.add(cube);
        }
    });
   
    let targetAngle = handlerAngle(angle);

    new TWEEN.Tween(layer.rotation)
        .to({ x: targetAngle }, 1000) // 1000ms
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {rotating = false;})
        .start();
}



function rotateLayerY(layerIndex, angle) {
    const layer = groupY[layerIndex+1];
    const layerCubes = getAllCubeY(layerIndex)
    layerCubes.forEach(cube => {
        if(cube.parent!=layer){
            cube.parent&&cube.parent.remove(cube);
            layer.add(cube);
        }
    });
   
    let targetAngle = handlerAngle(angle);

    new TWEEN.Tween(layer.rotation)
        .to({ y: targetAngle }, 1000) // 1000ms
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {rotating = false;})
        .start();
}

animate();
// rotateLayerX(1,'clockwise');




const canvas = document.getElementById('myCanvas');

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);

if (navigator.maxTouchPoints > 0) {
    // Touch device, add touch event listeners
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onTouchEnd);
} else {
    // Computer, add mouse event listeners
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
}

function onTouchStart(event) {
    // Convert touch event to mouse event and call onMouseDown
    onMouseDown(convertTouchToMouseEvent(event));
}

function onTouchMove(event) {
    // Convert touch event to mouse event and call onMouseMove
    onMouseMove(convertTouchToMouseEvent(event));
}

function onTouchEnd(event) {
    // Convert touch event to mouse event and call onMouseUp
    onMouseUp(convertTouchToMouseEvent(event));
}

function convertTouchToMouseEvent(touchEvent) {
    // Convert a touch event into a mouse event
    return {
        clientX: touchEvent.touches[0].clientX,
        clientY: touchEvent.touches[0].clientY
    };
}

let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};
let rotationAngles = {
    x: 0,
    y: 0
};

let selectedCube = null;
function removeSelect(){
    if(selectedCube != null){
        selectedCube.userData.isSelected = false;
        selectedCube.userData.selectionBox.parent.remove(selectedCube.userData.selectionBox);
        selectedCube = null;
        renderer.render(scene, camera);
    }
}

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };

    //选中哪一层
    if(rotating) return;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(allCubes);
    if (intersects.length > 0) {
        removeSelect();
        selectedCube = intersects[0].object;
        // Add a selection box to the selected cube
        const selectionBoxGeometry = new THREE.BoxGeometry(1.01, 1.01, 1.01);
        const selectionBoxMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 10,
            transparent: true,
            opacity: 0.2 // Adjust the opacity value as desired
        });
        const selectionBox = new THREE.Mesh(selectionBoxGeometry, selectionBoxMaterial);
        selectionBox.position.copy(selectedCube.position);
        selectedCube.userData.isSelected = true;
        selectedCube.userData.selectionBox = selectionBox;
        selectedCube.parent.add(selectionBox);
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

    
    // let absX = Math.abs(deltaMousePosition.x);
    // let absY = Math.abs(deltaMousePosition.y);

    // if ((absX>10 || absY>10 ) && selectedCube &&!rotating) {
    //     rotating = true;
    //     if (Math.abs(rotationAngles.x) > Math.abs(rotationAngles.y)) {
    //         rotateLayerX(selectedCube.position.x,rotationAngles.x);
    //     } else {
    //         rotateLayerY(selectedCube.position.y,rotationAngles.y);
    //     }
    // } else {
    //     cubeGroup.rotation.x = rotationAngles.x;
    //     cubeGroup.rotation.y = rotationAngles.y;
    // }

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

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});
