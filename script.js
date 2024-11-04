const canvas = document.getElementById('visualizationCanvas');
const ctx = canvas.getContext('2d');
let array = [];
const arraySize = 20;
let sorting = false;
let currentIndex = 0;
let iterationIndex = 0;
let speed = 500; // начальная скорость в миллисекундах

// generates random array
function generateArray() {
    array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * canvas.height));
    drawArray();
}

// draws array with Canvas
function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / arraySize;

    array.forEach((value, index) => {
        ctx.fillStyle = index === currentIndex || index === currentIndex + 1 ? 'red' : 'blue';
        ctx.fillRect(index * barWidth, canvas.height - value, barWidth, value);
    });
}

// bubble sort with animation
async function bubbleSortStep() {
    if (iterationIndex < array.length - 1) {
        if (currentIndex < array.length - iterationIndex - 1) {
            if (array[currentIndex] > array[currentIndex + 1]) {
                [array[currentIndex], array[currentIndex + 1]] = [array[currentIndex + 1], array[currentIndex]];
            }
            currentIndex++;
            drawArray();
            await new Promise(resolve => setTimeout(resolve, speed));
        } else {
            currentIndex = 0;
            iterationIndex++;
        }
    } else {
        sorting = false;
    }
}

// starts sorting process
async function startSort() {
    if (sorting) return;
    sorting = true;
    iterationIndex = 0;
    currentIndex = 0;

    while (sorting) {
        await bubbleSortStep();
    }
}

// commit a step of sorting function 
async function stepSort() {
    if (!sorting) {
        await bubbleSortStep();
    }
}

// reseting sort process
function resetSort() {
    sorting = false;
    generateArray();
}

// updating sort's speed 
function updateSpeed(newSpeed) {
    speed = newSpeed;
}

// starting point
generateArray();