<template>
  <main id="creat-project">
    <section class="creat-project-form-area">
      <img src="../assets/alice_logo.png" width="91rem"/>
      <h1 class="creat-project-title">Create your project</h1>
      <form>
        <h1>Your company's name</h1>
        <input v-model="companyName" type="text" class="companyname-text" placeholder="eg Vodafone Foundation">
        <h1>Your project's name</h1>
        <input v-model="projectName" type="text" class="projectname-text" placeholder="eg Instant Network Schools - INS">
        <h1 class="objective-form-title">Your project’s impact objective(s)</h1>
          <div v-for="(objective, index) in objectives" v-bind:key="index" class="objective-vfor-wrapper">
            <objective-input-div
              @add-objectives="addObjectives"
              @remove-objectives="removeObjectives"
              :objective="objective"
              :index="index"
              :placeholderText="placeholders"
              :totalLength="noOfObjectiveInputForm"
              v-bind:class="index"
            ></objective-input-div>
          </div>
      </form>
    <button @click="projectCreate" class="project-create-button">Create</button>
    <button @click="logOut" class="logout-button">Logout</button>
    </section>
      <section class="upload-area">
        <upload-module v-if="uploadAreaShow === true" @upload-status-change="uploadStatusChange"></upload-module>
      </section>
    <button v-if="uploadButtonShow === true" class="file-upload-button" @click="saveFileList">Upload</button>
  </main>
</template>

<script>
import router from '../router'
import { store } from '../store/store'
import UploadModule from '../components/UploadModule.vue'
import ObjectiveInputDiv from '../components/ObjectiveInputDiv.vue'

export default {
  name: 'creat-project',
  components: {
    UploadModule,
    ObjectiveInputDiv
  },
  data () {
    return {
      companyName: '',
      projectName: '',
      objectives: [''],
      uploadAreaShow: false,
      uploadButtonShow: false,
      placeholders: ['eg How many lessons use INS', 'eg How many students have ICT skills', 'How many students have ICT skills']
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
    logOut () {
      this.$firebase.auth().signOut().then(() => {
        this.$firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            store.commit('clearObjectives')
            store.commit('clearFileList')
            store.commit('setLogOut')
            alert('You have logged out')
            router.push('/login')
          }
        })
      }).catch((error) => {
        alert(error)
      })
    },
    addObjectives (addedObj) {
      const userInput = addedObj.userInputSubComp
      const index = addedObj.noOfIndex

      this.objectives[index - 1] = userInput
      if (this.objectives.length === index) this.objectives.push('')
    },
    removeObjectives (removeObj) {
      const index = removeObj.noOfIndex
      this.objectives.splice(index - 1, 1)
    },
    projectCreate () {
      const company = this.companyName
      const project = this.projectName
      const objectives = this.objectives
      const userId = store.state.loginUserId

      if (userId && objectives && company && project) {
        const projectInfo = {
          companyName: company,
          projectName: project,
          projectObjectives: objectives
        }

        const update = {}
        update[`/${userId}/projectInfo/${company}/projects/${project}/`] = projectInfo
        this.$database.ref().update(update)
          .then(() => {
            const database = this.$database.ref(`${userId}`)
            database.on('value', (snapshot) => {
              const projectInfo = snapshot.val().projectInfo[company].projects[project]
              const savedObjectives = projectInfo.projectObjectives

              store.commit('setProjectInfo', {
                companyName: projectInfo.companyName,
                projectName: projectInfo.projectName
              })

              savedObjectives.forEach(objective => {
                store.commit('setObjectives', {
                  addedObj: objective
                })
              })
            })

            alert('Project detail saved!')

            this.uploadAreaShow = true
          })
      } else {
        alert('Company name & Project name are mandatory')
      }
    },
    saveFileList () {
      const userid = store.state.loginUserId
      const company = store.state.companyName
      const project = store.state.projectName
      const fileList = store.state.filelist
      const update = {}

      console.assert(userid, 'Logged in user id is not exist')
      console.assert(company, 'company name is not exist')
      console.assert(project, 'project name is not exist')
      update[`/${userid}/projectInfo/${company}/projects/${project}/projectFiles/`] = fileList
      this.$database.ref().update(update)
        .then(() => {
          store.commit('clearObjectives')
          store.commit('clearFileList')
          alert('Data has been saved in system!')
          router.push('/editproject')
        })
        .catch((error) => { alert(error) })
    },
    uploadStatusChange () {
      this.uploadButtonShow = true
    }
  },
  computed: {
    noOfObjectiveInputForm () {
      return this.objectives.length
    }
  }
}

</script>

<style>
textarea:focus,
input:focus,
button:focus {
  outline: none !important;
}

#creat-project {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100vh; */
  background-image: url('../assets/Loginbackground.svg');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 90vw 30vh;
  align-items: center;
  vertical-align: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 6.5rem 0 30rem 0;
}

/* .creat-project-form-area {
  position: absolute;
  top: 6%;
} */

.companyname-text,
.projectname-text {
  margin-top : 1.2rem;
  margin-bottom : 5rem;
  border: none;
  height: 4.6rem;
  width: 39.8rem;
  padding: 0rem 2.3rem;
}

.creat-project-title {
  font-family: Helvetica;
  font-size: 2.88rem;
  color: #8954BA;
  margin-top : 2rem;
  margin-bottom: 0;
}

#creat-project form {
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.00);
  margin-top: 3.5rem;
  align-items: left;
  width: 100%;
  font-family: Helvetica;
  font-size: 1.68rem;
  color: rgba(104,104,104,0.70);
  line-height: 2.4rem;
}

#creat-project form h1{
  font-family: Helvetica;
  font-size: 2.6rem;
  color: #8954BA;
  line-height: 2.4rem;
  text-align: left;
}

.creat-project-text{
  border: none;
}

#creat-project .add-button {
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  font-size: 3.5rem;
  width: 5rem;
  height: 5rem;
  color: #8954BA;
  box-shadow: 0 7px 20px 0 rgba(159,168,214,0.59);
  position: relative;
  right: -3rem;
  padding: 0;
  background-image: url('../assets/ObjectAddBtn.svg');
  background-position: 48% 38%;
  background-size: 10rem 10rem;
}

.objective-form-title {
  margin-bottom: 2rem;
}

.objective-vfor-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-top: 2rem; */
}

.project-objective-input {
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.project-objective-add {
  display: flex;
  flex-direction: column;
}

.objective-text {
  border: none;
  height: 4.6rem;
  width: 39.8rem;
  padding: 0 2.3rem;
  margin-bottom: 2rem;
}

.creat-project-form-area .logout-button {
  border: none;
  padding: 0 1.5rem;
  margin: 0 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease;
  font-size: 1.68rem;
}

.project-create-button {
  border: none;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease;
  background-color: #5D38DB;
  color: #ffffff;
  font-size: 1.68rem;
  position: relative;
  right: -22rem;
  width: 12rem;
}

.creat-project-form-area .logout-button:hover {
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  background-color: #5D38DB;
  color: #ffffff;
  font-size: 1.88rem;
}

.project-create-button:hover {
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  background-color: #efefef;
  color: #000000;
  font-size: 1.88rem;
}

.project-create-button,
.creat-project-form-area .logout-button {
  margin-top: 3rem;
  height: 5.5rem;
}

.creat-project-form-area .logout-button {
  position: relative;
  left: -5rem;
}

.file-upload-button {
  border: none;
  padding: 0 1.5rem;
  margin: 0 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease;
  font-size: 1.68rem;
  position: relative;
  right: -18rem;
  width: 12rem;
  height: 5.5rem;
}

.file-upload-button:hover {
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  background-color: #5D38DB;
  color: #ffffff;
  font-size: 1.88rem;
}

.upload-area {
  margin-left: 20rem;
}
</style>
