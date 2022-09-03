<template>
  <QuillEditor v-model:content="content" v-model:contentType="contentType" :modules="modules" :options="options" theme="snow" :toolbar="toolbarOption" @update:content="this.$emit('changeContent', this.content)" style="background-color: white;" />
  <p></p>
  <div id="hide-toolbar" style="display: none;"></div>
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

  },
  props: {
    toolbarOption: String,
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
              axios.post('/api/files', formData)
              .then(res => {
                resolve(res.data.data)
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
        placeholder: '내용을 입력해주세요.',
        theme: 'snow',
      }
  }),
}
</script>

<style>

</style>