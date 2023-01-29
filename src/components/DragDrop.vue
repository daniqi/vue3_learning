<template>
  <div>
    <div id="drag-area">
      <form class="my-form">
        <v-list>
          <v-list-item v-for="file in uploadFiles" :key="file.name" :title="file.name"></v-list-item>

          {{ setLoading }}
        </v-list>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"
import { onMounted } from 'vue'

let uploadFiles = ref([]);

const handleDrop = (e) => {
  const dt = e.dataTransfer

  uploadFiles.value = dt.files
}

const highlight = () => {
  const dragArea = document.getElementById("drag-area")
  dragArea.classList.add('highlight')
}

const unhighlight = () => {
  const dragArea = document.getElementById("drag-area")
  dragArea.classList.remove('highlight')
}

const preventDefaults = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

onMounted(() => {
  let dragArea = document.getElementById("drag-area");

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dragArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dragArea.addEventListener(eventName, highlight, false)
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dragArea.addEventListener(eventName, unhighlight, false)
  })

  dragArea.addEventListener('drop', handleDrop, false)
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
