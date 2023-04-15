<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <canvas width="500" height="200" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove" id="drawing-board"></canvas>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
    import { onMounted, defineExpose } from 'vue'

    // Expose this function to call from parent.
    defineExpose({
        drawOnImage
    });

    let isPainting = false

    let canvas = null;
    let context = null;

    let canvasOffsetX = 0
    let canvasOffsetY = 0

    let lineWidth = 10;

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

    function drawOnImage(image = null) {
        // if an image is present,
        // the image passed as a parameter is drawn in the canvas
        if (image) {
            
            const imageWidth = image.width;
            const imageHeight = image.height;

            image.onload = function() {
                context.drawImage(image, 0 ,0);
            };

            context.drawImage(image, 0, 0, imageWidth, imageHeight);
        }
    }
</script>