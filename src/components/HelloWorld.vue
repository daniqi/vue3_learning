<template>
  <div>
    <div id="drag-area">
      <form class="my-form">
        <v-list>
          <v-list-item v-for="file in uploadFiles" :key="file.name" :title="file.name"></v-list-item>
        </v-list>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    
  },
  methods: {
    handleDrop(e) {
      const dt = e.dataTransfer
      this.uploadFiles = dt.files
    },
    highlight() {
      const dragArea = document.getElementById("drag-area");
      dragArea.classList.add('highlight')
    },
    unhighlight() {
      const dragArea = document.getElementById("drag-area");
      dragArea.classList.remove('highlight')
    },
    preventDefaults: function (e) {
      e.preventDefault()
      e.stopPropagation()
    }
  },
  data() {
    return {
      setLoading: false,
      uploadFiles: [],
    }
  },
  mounted() {
    let dragArea = document.getElementById("drag-area");

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dragArea.addEventListener(eventName, this.preventDefaults, false)
      document.body.addEventListener(eventName, this.preventDefaults, false)
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dragArea.addEventListener(eventName, this.highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dragArea.addEventListener(eventName, this.unhighlight, false)
    })

    dragArea.addEventListener('drop', this.handleDrop, false)
  }
}
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
