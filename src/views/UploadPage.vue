<template>
  <div class='upload'>
    <main id='upload'>
      <section class='upload-form-area'>
        <img src='../assets/alice_logo.png' width='91rem'/>
        <h1 class='upload-title'>Upload your impact data files</h1>
        <h3 class='upload-sub-title'>File should be excel(.xlsx) or csv</h3>
        <div class='upload-drop-area'>
          <vue-dropzone
            ref="imgDropZone"
            id="customdropzone"
            :options="dropzoneOptions"
            @vdropzone-complete="afterComplete"
            @vdropzone-mounted="getFileList"
          ></vue-dropzone>
          <div v-if="uploading.length > 0" class="image-div">
            <div v-for="(file, index) in uploading" :key="index" class="filename-list">
              <img :src="setImgSrc(index)" class="upload-check"/><p>{{file}}</p><img src="../assets/Trash.svg" class="image" @click="deleteFile(index)"/>
            </div>
          </div>          
        </div>
        <div class='terms-checkbox-area'>
          <input type='checkbox' id='terms-checkbox' >
            <label class='terms-checkbox' for='terms-checkbox'>
              <div class='terms-checkbox-div' for='terms-checkbox'>
                <span class='terms-checkbox-v' for='terms-checkbox'>V</span>
              </div>
            </label>
          <h3 class='upload-sub-title'>Please tick the box to agree with our <br><a href='#'>Data Processing Terms & Conditions</a> </h3>
        </div>
        <h1 class='upload-title'>ΟR Connect to your database on:</h1>
        <div class='upload-logo-area'>
          <img src="../assets/AwsLogo.svg">
          <img src="../assets/SalesforceLogo.svg">
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'upload',
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
      savedFileList: []
    }
  },
  mounted () {
    this.hideNavBar()
  },
  methods: {
    hideNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'none'
    },
    getFileList () {
      const storageRef = firebase.storage().ref()
      const fileOriginRef = storageRef.child(`files/`)
      fileOriginRef.listAll()
        .then((res) => res._delegate.items
          .forEach((el) => { this.savedFileList.push(el.name) })
        )
    },
    async afterComplete (upload) {
      if (this.savedFileList.includes(upload.name)) {
        alert(`[ ${upload.name} ] has already been added in system`)
        const detailBox = document.getElementsByClassName('dz-preview')
        for (let i = 0; i < detailBox.length; i++) {
          detailBox[i].style.display = 'none'
        }
      } else {
        this.isLoading = true
        try {
          let file = upload
          const metadata = {
            contentType: file.type
          }
          const storageRef = firebase.storage().ref()
          const fileRef = storageRef.child(`files/${file.upload.filename}`)
          await fileRef.put(file, metadata)
          this.uploading.push(file.upload.filename)
          this.$refs.imgDropZone.removeFile(upload)
        } catch (error) {
          alert(error)
        } finally {
          this.savedFileList = []
          this.getFileList()
        }
      }
    },
    deleteFile (index) {
      const storageRef = firebase.storage().ref()
      const fileRef = storageRef.child(`files/${this.uploading[index]}`)
      fileRef.delete()
        .then(() => {
          alert(`[ ${this.uploading[index]} ] deleted`)
          this.uploading.splice(index, 1)
        }).catch((e) => {
          alert(e)
        })
    },
    setImgSrc (index) {
      const imgIndx = index % 3
      const src = require(`../assets/UploadCheckIcon_${imgIndx}.svg`)
      return src
    }
  }
}

</script>

<style>
#upload {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/Loginbackground.svg');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 90vw 30vh;
  align-items: center;
  padding-top: 12vh;
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
  font-size: 12px;
  color: #686868;
  width: 300px;
  padding: 0 ;
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

</style>
