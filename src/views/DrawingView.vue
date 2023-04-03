<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <canvas width="500" height="200" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove" id="drawing-board"></canvas>
            </v-col>
        </v-row>

        <v-file-input 
            label="File input"
            v-model="files"
            placeholder="Upload your documents"
            multiple
            prepend-icon="mdi-paperclip"
            @change="loadFiles"
            >
            <template v-slot:selection="{ fileNames }">
                <template v-for="fileName in fileNames" :key="fileName">
                    <v-chip
                    size="small"
                    label
                    color="primary"
                    class="me-2"
                    >
                    {{ fileName }}
                    </v-chip>
                </template>
            </template>
        </v-file-input>
    </v-container>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    let isPainting = false

    let canvas = null;
    let context = null;

    let canvasOffsetX = 0
    let canvasOffsetY = 0

    let lineWidth = 10;

    let files = ref([])

    function onMouseDown(e) {
        isPainting = true;

        context.beginPath();
        context.lineWidth = lineWidth
        context.strokeStyle = "black";
        context.lineJoin = "round";
        context.lineCap = "round";
        context.moveTo(e.clientX - canvasOffsetX / 2, e.clientY - canvasOffsetY);
    }

    function onMouseMove(e) {
        if (isPainting) {      
            context.lineTo(e.clientX - canvasOffsetX / 2, e.clientY - canvasOffsetY);
            context.stroke();      
        }
    }

    function onMouseUp() {
        isPainting = false;
        context.closePath();
        console.log(isPainting)
    }

    onMounted(() => {
        canvas = document.getElementById('drawing-board');
        context = canvas.getContext('2d');

        // offsets (distance between the canvas edges to the edge of the viewport)
        canvasOffsetX = canvas.offsetLeft;
        canvasOffsetY = canvas.offsetTop;

        canvas.width = window.innerWidth - canvasOffsetX;
        canvas.height = window.innerHeight - canvasOffsetY;
    })

    async function drawOnImage(file = null) {
        // if an image is present,
        // the image passed as a parameter is drawn in the canvas
        if (file) {
            
            let image = new Image();
            image.src = await fileToDataUri(file);

            const imageWidth = image.width;
            const imageHeight = image.height;

            // rescaling the canvas element
            // canvas.width = imageWidth;
            // canvas.height = imageHeight;

            image.onload = function() {
                context.drawImage(image, 0 ,0);
            };

            context.drawImage(image, 0, 0, imageWidth, imageHeight);
        }
    }

    function loadFiles(event) {
        // TODO: make single file
        const [file] = event.target.files;

        drawOnImage(file)
    }

    function fileToDataUri(field) {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
            resolve(reader.result);
        });

        reader.readAsDataURL(field);
    });
}
</script>

<style>

</style>