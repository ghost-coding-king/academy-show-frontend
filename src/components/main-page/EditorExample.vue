<template>
  <QuillEditor v-model:content="content" v-model:contentType="contentType" :modules="modules" :options="options" theme="snow" toolbar="full" />
  <p></p>
  {{ content }}
  <v-btn @click="submit">제출하기</v-btn>
  <br>
      {{ resData }}
  <div v-html="resData"></div>
  <v-btn @click="test">테스트버버버버튼</v-btn>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'
import ImageUploader from "quill-image-uploader"
import axios from 'axios'

export default {
  name: 'EditorExample',
  components: {
    QuillEditor,
  },
  methods: {
    submit: function () {
      axios.post("/posts", {'content': this.content})
      .then(res => {
        this.resData = res.data
      })
    },
    test: function () {
      axios.get("/api/test")
      .then(res => {
        console.log(res.data);
      })
    }
  },
  setup: () => {
    const modules = [
      {
        name: 'blotFormatter',  
        module: BlotFormatter, 
        options: {/* options */}
      },
      {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
          upload: file => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("file", file);
              axios.post('/files', formData)
              .then(res => {
                resolve(res.data)
              })
              .catch(err => {
                  reject("upload failed")
                  console.error("error: ", err)
                }
              )
            });
          }
        }
      }
    ]
    const contentType = 'html'
    return { modules, contentType }
  },
  data: () => ({
    resData: 'init',
    content: '',
    // type: 'html',
    options: {
        debug: 'warn',
        modules: {
          toolbar: [],
        },
        placeholder: 'Insert here.',
        theme: 'snow',
      }
  }),
}
</script>

<style>

</style>