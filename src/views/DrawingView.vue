<template>
    <v-container>
        <DrawingsCanvas ref="myChild"/>
        
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
    import DrawingsCanvas from '@/components/DrawingsCanvas.vue'
    import { ref } from 'vue'

    const myChild = ref(null)

    let files = ref([])
    
    async function loadFiles(event) {
        // TODO: make single file
        const [file] = event.target.files;

        let image = new Image();
        image.src = await fileToDataUri(file);

            // rescaling the canvas element
            // canvas.width = imageWidth;
            // canvas.height = imageHeight;

        myChild.value.drawOnImage(image);
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