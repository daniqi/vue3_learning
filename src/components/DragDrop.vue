<template>
  <div>
    <v-container>
      <div id="drag-area">
        <form class="my-form">
          <v-list>
            <v-list-item v-for="file in uploadFiles" :key="file.name" :title="file.name"></v-list-item>
          </v-list>
        </form>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'

// props example
const props = defineProps(["msg"])
console.log(props.msg)

// TODO: upload knop toevoegen.

let uploadFiles = ref([]);
let dragArea = ref(undefined);

const handleDrop = (e) => {
  const dt = e.dataTransfer

  uploadFiles.value = dt.files
}

const highlight = () => {
  dragArea.value.classList.add('highlight')
}

const unhighlight = () => {
  dragArea.value.classList.remove('highlight')
}

const preventDefaults = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

onMounted(() => {
  // set properties
  dragArea.value = document.getElementById("drag-area");

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dragArea.value.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dragArea.value.addEventListener(eventName, highlight, false)
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dragArea.value.addEventListener(eventName, unhighlight, false)
  })

  dragArea.value.addEventListener('drop', handleDrop, false)
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#drag-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  width: 480px;
  margin: 50px auto;
  width: 100%;
  min-height: 200px;
  margin: 20px 0px;
  padding: 20px;
}

#drag-area.highlight {
  border-color: #296aa9;
}

</style>
