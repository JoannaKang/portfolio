<template>
  <section class='project-data-area'>
    <div class='file-upload-area'>
      <h1 class="file-upload-area-title">Your project's data</h1>
      <h3 class="file-upload-area-subtitle">Please drag & drop one or multiple excel or csv file(s)</h3>
      <vue-dropzone
        ref="imgDropZone"
        id="customdropzone"
        :options="dropzoneOptions"
        @vdropzone-complete="afterComplete"
      ></vue-dropzone>
      <div v-if="uploading.length > 0" class="image-div">
        <div v-for="(file, index) in uploading" :key="index" class="filename-list">
          <img :src="setImgSrc(index)" class="upload-check"/><p>{{file}}</p><img src="../assets/Trash.svg" class="image" @click="deleteFile(index)"/>
        </div>
      </div>  
      <div class='terms-checkbox-area'>
        <input type='checkbox' id='terms-checkbox' @click="checkTermsAndCondition">
          <label class='terms-checkbox' for='terms-checkbox'>
            <div class='terms-checkbox-div' for='terms-checkbox'>
              <span class='terms-checkbox-v' for='terms-checkbox'>V</span>
            </div>
          </label>
        <h3 class='upload-sub-title'>Please tick the box to agree with our <a href='#'>Data Processing Terms & Conditions</a> </h3>
      </div>
    </div>
    <div class="upload-logo-area">
      <h3 class="upload-logo-area-subtitle">Connect to your database on: </h3>
      <img src="../assets/AwsLogo.svg">
      <img src="../assets/SalesforceLogo.svg">      
    </div>
  </section>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { store } from '../store/store'

export default {
  name: 'uploadmodule',
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      // imgSrc: require('../assets/UploadCheckIcon_0.svg'),
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        addRemoveLinks: false,
        acceptedFiles: '.csv, .xlsx',
        dictDefaultMessage: `<p class="drag-drop-text">Drag & Drop Files Here</p>`
      },
      uploading: [],
      savedFileList: [],
      termsAndConditionCheck: false
    }
  },
  mounted () {
    this.hideNavBar()
    this.termsAndConditionCheck = false
    this.uploading = []
    this.getFileList()
  },
  methods: {
    hideNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'none'
    },
    getFileList () {
      const storageRef = this.$fileupload.ref()
      const company = store.state.companyName
      const project = store.state.projectName
      const fileOriginRef = storageRef.child(`${company}/${project}/`)
      fileOriginRef.listAll()
        .then((res) => res._delegate.items
          .forEach((el) => {
            this.savedFileList.push(el.name)
          })
        )
    },
    hidePreviewArea () {
      const detailBox = document.getElementsByClassName('dz-preview')
      for (let i = 0; i < detailBox.length; i++) {
        detailBox[i].style.display = 'none'
      }
    },
    async afterComplete (upload) {
      if (this.termsAndConditionCheck === false) {
        alert("Please check term's and condition")
        this.hidePreviewArea()
      } else if (this.savedFileList.includes(upload.name)) {
        alert(`[ ${upload.name} ] has already been added in system`)
        this.hidePreviewArea()
      } else {
        this.isLoading = true
        try {
          let file = upload
          const metadata = { contentType: file.type }
          const storageRef = this.$fileupload.ref()
          const fileRef = storageRef.child(`${store.state.companyName}/${store.state.projectName}/${file.upload.filename}`)
          await fileRef.put(file, metadata)
            .then((snapshot) => {
              if (snapshot.state === 'success') {
                store.commit('setFileList', {
                  fileList: snapshot.metadata.name
                })
              } else {
                throw new Error('file upload failed')
              }
            })
            .catch((error) => {
              alert(error)
            })
          this.uploading.push(file.upload.filename)
          this.$refs.imgDropZone.removeFile(upload)
          this.fileUploadStatusChange()
        } catch (error) {
          alert(error)
        } finally {
          this.savedFileList = []
          this.getFileList()
        }
      }
    },
    deleteFile (index) {
      const storageRef = this.$fileupload.ref()
      const fileRef = storageRef.child(`${store.state.companyName}/${store.state.projectName}/${this.uploading[index]}`)
      fileRef.delete()
        .then(() => {
          const deletedItem = this.uploading[index]
          this.uploading.splice(index, 1)
          if (this.savedFileList.includes(deletedItem)) {
            const savedIndex = this.savedFileList.indexOf(deletedItem)
            this.savedFileList.splice(savedIndex, 1)
          }
          alert(`[ ${deletedItem} ] deleted`)
        }).catch((e) => {
          alert(e)
        })
    },
    setImgSrc (index) {
      const imgIndx = index % 3
      const src = require(`../assets/UploadCheckIcon_${imgIndx}.svg`)
      return src
    },
    checkTermsAndCondition () {
      this.termsAndConditionCheck = true
    },
    fileUploadStatusChange () {
      this.$emit('upload-status-change')
    }
  }
}

</script>

<style>
.project-data-area {
  display: flex;
  width: 64.4rem;
  position: relative;
}

.file-upload-area {
  border-right: 1px solid #DCE2F0;
  width: 39.6rem;
  padding-right: 5.8rem;
  padding-bottom: 3rem;
}

.file-upload-area-title {
  margin-top: 5.2rem;
  font-family: Helvetica;
  font-size: 2.6rem;
  color: #8954BA;
  line-height: 2.4rem;
  text-align: left;
}

.file-upload-area-subtitle {
  font-family: Helvetica;
  font-size: 1.4rem;
  color: #686868;
  text-align: left;
  margin-top: 1.6rem;
  margin-bottom : 4.1rem;
}

.upload-title {
  font-family: Helvetica;
  font-size: 2.88rem;
  color: #8954BA;
  margin-top : 2rem;
  }

.upload-sub-title  {
  font-family: Helvetica;
  font-size: 1.6rem;
  color: #686868;
  text-align: center;
  margin: 0.2rem 0 0 0;
  }

.upload-sub-title a {
  color:#2FB9EF;
}

.terms-checkbox-area {
  margin: 2rem 0 0 0;
  align-items: center;
  display: flex;
  justify-content: center;
}

input[id='terms-checkbox'] {
  display: none;
}

input[id='terms-checkbox'] + label {
  background-color:rgb(255, 255, 255, 0);
  border: 0.1rem solid #2FB9EF;
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
  color: rgb(255, 255, 255, 0);
  margin: 0 1rem 0 0 ;
}

input[id='terms-checkbox']:checked + label {
  color: #2FB9EF;
  width:20px;
  height:20px;
}

.terms-checkbox-div {
  align-items: center;
  vertical-align: center;
  width: 1.8rem;
  height: 1.8rem;
  margin: 0.2rem 0 0 0;
}

.terms-checkbox-v {
  position: relative;
}

.upload-drop-area {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  flex-direction: column;
  align-items: center;
}

.drag-drop-text {
  margin: 0;
  padding-top: 8rem;
}

.image-div {
  width: 30rem;
  margin-top: 1rem;
}

.filename-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 0.5px solid rgb(44, 62, 80, 0.4);
}

.filename-list p {
  margin: 0;
  font-size: 1.6rem;
  font-family: Helvetica;
  color: #34495E;
}

#customdropzone {
  border: 1px dashed #2FB9EF;
  background-color: #ffffff;
  transition: background-color .2s linear;
  background-image: url('../assets/UploadIcon.svg');
  background-position: center;
  background-repeat: no-repeat;
  font-family: Helvetica;
  font-size: 1.2rem;
  color: #686868;
  width: 34rem;
  align-self: center;
}

.dz-complete {
  height: 10rem;
}

.dz-progress {
  height: 10rem;
}

.upload-logo-area {
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 0 0;
}

.upload-check {
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}

@-webkit-keyframes bounceIn {
  0%, 100%, 20%, 40%, 60%, 80% {
    -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
  }
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }
  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03)
  }
  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97)
  }
  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}
@keyframes bounceIn {
  0%, 100%, 20%, 40%, 60%, 80% {
    -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
  }
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    -ms-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    -ms-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }
  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    -ms-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    -ms-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03)
  }
  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    -ms-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97)
  }
  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}

.upload-logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5.2rem;
  padding-left: 5.6rem;
  padding-bottom: 3rem;
  width: 24.3rem;
}

.upload-logo-area-subtitle {
  font-family: Helvetica;
  font-size: 1.4rem;
  color: #686868;
  margin-top: 4rem;
  margin-bottom: 0;
}

.upload-logo-area img {
  margin-top : 4.1rem;
}

</style>
