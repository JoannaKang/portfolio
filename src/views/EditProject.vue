<template>
  <main id="edit-proejct">
    <div class="back">
      <router-link to="/">
        <img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back
      </router-link>
    </div>
    <section class="your-project">
      <h1 class="edit-project-title">Your projects</h1>
      <h3 class="edit-project-subtitle">Your company's name</h3>
        <article class="editproject-dropdown" v-if="showCompanySelectBox">
          <select-box
            :cssId="companyCssId"
            :selectboxOption="companyNames"
            :selectedOption="selectedCompany"
            @get-selectbox-text="getSelectboxText"
            >
          </select-box>
        </article>
        <article class="objective-vfor-wrapper" v-if="showCreateNewCompany">
          <h3 class="objective-vfor-wrapper-subtitle">Please type the name of the new company name</h3>
            <object-input-div
              @add-objectives="addCompany"
              @remove-objectives="removeCompany"
              objective=""
              index=0
              :placeholderText="companyPlaceholder"
              totalLength=1
              v-bind:class="0"
            ></object-input-div>
        </article>        
      <h3 class="edit-project-subtitle">Your project’s name</h3>
        <article class="editproject-dropdown" v-if="showProjectSelectBox">
          <select-box
            :cssId="projectCssId"
            :selectboxOption="projectNames"
            :selectedOption="selectedProject"
            @get-selectbox-text="getSelectboxText"
            >
          </select-box>
        </article>
        <article class="objective-vfor-wrapper-subtitle-2" v-if="!showProjectSelectBox">
          <h3>Please select company first</h3>
        </article>
        <article class="objective-vfor-wrapper" v-if="showCreateNewProject">
          <h3 class="objective-vfor-wrapper-subtitle">Please type the name of the new project</h3>
            <object-input-div
              @add-objectives="addProject"
              @remove-objectives="removeProject"
              objective=""
              :index="0"
              :placeholderText="projectPlaceholder"
              :totalLength="noOfObjInputForm"
              v-bind:class="0"
            ></object-input-div>
        </article>
      <h3 class="edit-project-subtitle">Your project’s impact objective(s)</h3>
        <article class="objective-vfor-wrapper-subtitle-2" v-if="!showCreateNewObject">
          <h3>Please select company & project first</h3>    
        </article>
        <article class="objective-vfor-wrapper" v-if="showCreateNewObject">
          <div v-for="(objective, index) in objectives" v-bind:key="index" class="objective-input-wrapper">
            <object-input-div
              @add-objectives="addObjectives"
              @remove-objectives="removeObjectives"
              :objective="objective"
              :index="index"
              :placeholderText="objectivePlaceholder"
              :totalLength="noOfObjInputForm"
              v-bind:class="index"
            ></object-input-div>
          </div>
        </article>
      <button @click="projectUpdate" class="project-update-button">Update</button>
    </section>
    <section class="upload-module-area" v-if="uploadAreaShow">
      <upload-module></upload-module>
      <button @click="fileListUpdate" class="project-update-button">Upload</button>      
    </section>
    <section class="dashboard-area">
      <h3 class="dashboard-area-title">Your project's dashboards</h3>
        <row :gutter="12" class="framework-thumbnails-wrapper">
          <column class="framework-thumbnail-tile" :lg="3" :md="2" :xs="5">
            <router-link to="/editdashboard">
            <div>
              <div class="framework-link-title">
                <h1>Tenants in employment</h1>
                <h1 style="color:#8954BA;">{{growthRate1}}</h1>
              </div>
              <h3>Showing data till {{lastUpdate}}</h3>
              <img src="../../src/assets/dummy1.svg"/>
              </div>
            </router-link>
            <div class="framework-thumbnail-hover">
              <span>Edit  |</span>
              <span>  Archive  |</span>
              <span>  Delete</span>
            </div>
          </column>
          <column class="framework-thumbnail-tile-2" :lg="3" :md="2" :xs="5">
            <router-link to="/editdashboard">
            <div>
              <div class="framework-link-title">
                <h1>Avg tenants stay</h1>
                <h1 style="color:#8954BA;">{{growthRate2}}</h1>
              </div>
              <h3>Showing data till {{lastUpdate}}</h3>
              <h1 style="color:#8954BA;"></h1>
              <img src="../../src/assets/dummy2.svg"/>
            </div>  
            </router-link>
            <div class="framework-thumbnail-hover-2">
              <span>Edit  |</span>
              <span>  Archive  |</span>
              <span>  Delete</span>
            </div>
          </column>
          <column class="framework-thumbnail-tile-3" :lg="3" :md="2" :xs="5">
            <router-link to="/editdashboard">
            <div>
              <div class="framework-link-title">
                <h1>Tenants' savings</h1>
                <h1 style="color:#8954BA;">{{growthRate3}}</h1>
              </div>            
              <h3>Showing data till {{lastUpdate}}</h3>
              <img src="../../src/assets/dummy3.svg"/>
            </div>
            </router-link>
            <div class="framework-thumbnail-hover-3">
              <span>Edit  |</span>
              <span>  Archive  |</span>
              <span>  Delete</span>
            </div>
          </column>
        </row>
    </section>
    <section class="framework-area">
      <h3 class="edit-project-subtitle-2">Your impact measurement framework(s)</h3>
      <h3 class="edit-project-subtitle-3">Your framework</h3>
      <framework-select-box
        @save-framework-data="saveFramewokrData">
      </framework-select-box>
      <div class="framework-target">
        <h3 class="edit-project-subtitle-3">Your framework's target</h3>
        <selectbox-framework-target
          @save-framework-target="saveFrameworkTarget"
        ></selectbox-framework-target>
      </div>
    </section>
  </main>
</template>

<script>
import { store } from '../store/store'
import UploadModule from '../components/UploadModule.vue'
import ObjectInputDiv from '../components/ObjectiveInputDiv.vue'
import FrameworkSelectBox from '../components/Framework.vue'
import SelectboxFrameworkTarget from '../components/SelectboxFrameworkTarget.vue'
import SelectBox from '../components/Selectbox.vue'

export default {
  components: {
    ObjectInputDiv,
    UploadModule,
    FrameworkSelectBox,
    SelectboxFrameworkTarget,
    SelectBox
  },
  data () {
    return {
      companyCssId: 'company-selectbox',
      companyNames: [],
      selectedCompany: null,
      companyPlaceholder: ['eg Vodafon foundation'],
      projectCssId: 'project-selectbox',
      projectNames: [],
      selectedProject: null,
      projectPlaceholder: ['eg INS project'],
      objectiveCssId: 'objective-selectbox',
      objectives: [],
      objectivePlaceholder: ['eg How many lessons use INS', 'eg How many students have ICT skills', 'How many students have ICT skills'],
      dashboardName: 'INS Lessons',
      lastUpdate: '31/12/2019',
      growthRate1: '+25%',
      growthRate2: '+35%',
      growthRate3: '+30%',
      editHoverboxShow1: false,
      editHoverboxShow2: false,
      editHoverboxShow3: false,
      showCompanySelectBox: false,
      showProjectSelectBox: false,
      showCreateNewCompany: false,
      showCreateNewProject: false,
      showCreateNewObject: false,
      stateSelectCompany: 'stateSelectCompany',
      stateSelectProject: 'stateSelectProject',
      stateEditCompany: 'stateEditCompany',
      stateEditProject: 'stateEditProject',
      stateEditObjectives: 'stateEditObjectives',
      state: null,
      createNewCompanyString: 'Create new company',
      createNewProjectString: 'Create new project',
      emptyObjectiveList: [""],
      companyDropdown: 0,
      projectDropdown: 1,
      loggedInUserId: '',
      uploadAreaShow: false,
      framework: null
    }
  },
  async mounted () {
    this.showNavBar()

    const firebaseDB = this.$database
    let context = this
    this.$firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          // User is signed in.
          context.loggedInUserId = user.uid
          const database = firebaseDB.ref(`${user.uid}`)
          database.on('value', (snapshot) => {
            let projectSelectOptions = snapshot.val().projectInfo ? [...Object.keys(snapshot.val().projectInfo), 'Create new company'] : ['Create new company']
            context.companyNames = projectSelectOptions
            context.changeState(context.stateSelectCompany)
          })
        } else {
          // No user is signed in.
          console.log('not logged in')
        }
      })
  },
  methods: {
    changeState (newState) {
      this.objectives = ['']
      store.commit('clearProjectInfo')
      store.commit('clearObjectives')
      store.commit('clearFileList')
      
      switch (newState) {
        case this.stateSelectCompany:
          this.selectedProject = null
          this.showCreateNewCompany = false
          this.showCreateNewObject = false
          this.showProjectSelectBox = false
          this.showCompanySelectBox = true
          this.showCreateNewProject = false
          break
        case this.stateEditCompany:
          this.showCreateNewCompany = true
          this.showCreateNewObject = false
          this.showProjectSelectBox = false
          this.showCompanySelectBox = true
          this.showCreateNewProject = false
          break
        case this.stateSelectProject:
          this.showCompanySelectBox = true
          this.showCreateNewCompany = false
          this.selectedProject = null
          this.showProjectSelectBox = this.selectedCompany !== null
          this.showCreateNewProject = false
          this.showCreateNewObject = false
          break
        case this.stateEditProject:
          this.showCompanySelectBox = true
          this.showCreateNewCompany = false
          this.showProjectSelectBox = true
          this.showCreateNewProject = true
          this.showCreateNewObject = false
          break
        case this.stateEditObjectives:
          this.showCompanySelectBox = true
          this.showCreateNewCompany = false
          this.showProjectSelectBox = true
          this.showCreateNewProject = false
          this.showCreateNewObject = true
          break
      }

      this.state = newState
    },
    getSelectboxText (selected) {
      const selectboxType = selected.selectboxType
      const selectedOption = selected.selectedOption

      switch (selectboxType) {
        case 'company-selectbox':
          this.selectedCompany = selectedOption
          this.handleSelectLogic(this.companyDropdown)
          break
        case 'project-selectbox':
          this.selectedProject = selectedOption
          this.handleSelectLogic(this.projectDropdown)
          break
      }
    },
    // Only to be called when select dropdown menu
    handleSelectLogic (dropdownType) {
      switch (dropdownType) {
        case this.companyDropdown:
          this.projectNames = null
          if (this.selectedCompany === this.createNewCompanyString) {
            this.changeState(this.stateEditCompany)
          } else if (this.selectedCompany !== null) {
            this.getProjectListFromDB()
            this.changeState(this.stateSelectProject)
          }
          break
        case this.projectDropdown:
          if (this.selectedProject === this.createNewProjectString) {
            this.changeState(this.stateEditProject)
          } else if (this.selectedProject !== null) {
            this.changeState(this.stateEditObjectives)
            this.getObjectiveListFromDB()
          }
          break
      }
    },
    getProjectListFromDB () {
      const database = this.$database.ref(`${this.loggedInUserId}`)
      database.on('value', (snapshot) => {
        this.alertAssert(this.selectedCompany, 'Selected Company name is not exist')
        const projectInfo = snapshot.val().projectInfo
        this.alertAssert(projectInfo[this.selectedCompany], `Selected company ${this.selectedCompany} not found in project info`)
        const projects = projectInfo[this.selectedCompany].projects
        this.projectNames = projects ? [...Object.keys(projects)] : []
        this.projectNames.push(this.createNewProjectString)
      })
    },
    // this function gets the objected associated with this company + project from database set in internal state
    async getObjectiveListFromDB () {
      if (this.selectedCompany && this.selectedProject) {
        const database = this.$database.ref(`${this.loggedInUserId}`)
        await database.on('value', (snapshot) => {
          const projectInfo = snapshot.val().projectInfo
          const objectList = projectInfo[this.selectedCompany].projects[this.selectedProject].projectObjectives
          this.objectives = objectList ? objectList : this.emptyObjectiveList
        })
      }
    },
    showNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'inline'
    },
    addCompany (addedCompany) {
      const createdCompany = addedCompany.userInputSubComp
      this.objectives = this.emptyObjectiveList
      this.selectedCompany = createdCompany
      this.saveNewCompanyInDB(createdCompany)
      this.selectedCompany = createdCompany
      this.changeState(this.stateSelectProject)
    },
    addProject (addedProject) {
      const createdProject = addedProject.userInputSubComp
      this.saveNewProjectInDB(createdProject)
      this.objectives = this.emptyObjectiveList
      this.selectedProject = createdProject
      this.changeState(this.stateEditObjectives)
    },
    async saveNewCompanyInDB (createdCompany) {
      const userId = this.loggedInUserId
      const company = createdCompany
      const dummy = {
        placeholder: 'dummy'
      }

      // for Firebase update
      const update = {}
      update[`/${userId}/projectInfo/${company}`] = dummy
      await this.$database.ref().update(update)
        .then(() => {
          const database = this.$database.ref(`${userId}`)
          database.on('value', () => {
            this.getProjectListFromDB()
            this.selectedCompany = createdCompany
          })
        })
    },
    async saveNewProjectInDB (createdProject) {
      const userId = this.loggedInUserId
      const company = this.selectedCompany

      // for Firebase update
      const update = {}
      let savedInfoFromDB = {}
      update[`/${userId}/projectInfo/${company}/projects/${createdProject}/companyName`] = company
      update[`/${userId}/projectInfo/${company}/projects/${createdProject}/projectName`] = createdProject
      await this.$database.ref().update(update)
        .then(() => {
          const database = this.$database.ref(`${userId}`)
          database.on('value', (snapshot) => {
            savedInfoFromDB = snapshot.val().projectInfo
            this.selectedCompany = company
            this.selectedProject = createdProject
            this.objectives = this.emptyObjectiveList
          })
        })
      alert(`[${savedInfoFromDB[company].projects[createdProject].projectName}] project created!`)
    },
    addObjectives (editedObjFromComp) {
      const editedIndex = editedObjFromComp.noOfIndex - 1
      const edtiedText = editedObjFromComp.userInputSubComp
      this.objectives.splice(editedIndex, 1, edtiedText)
      if (editedIndex === this.objectives.length - 1) {
        this.objectives.push("")
      }
      this.$forceUpdate()
    },
    removeObjectives (editedObjFromComp) {
      const editedIndex = editedObjFromComp.noOfIndex - 1  
      this.objectives.splice(editedIndex, 1)
    },
    removeCompany (removeIndex) {
      console.log(removeIndex)
    },
    removeProject (removeIndex) {
      console.log(removeIndex)
    },
    projectUpdate () {
      this.firebaseUpdate()
      alert('Project information has been saved!')
    },
    async firebaseUpdate () {
      const userId = this.loggedInUserId
      const company = this.selectedCompany
      const project = this.selectedProject
      const objective = this.objectives

      if (company && project && objective) {
        const update = {}
        update[`/${userId}/projectInfo/${company}/projects/${project}/companyName`] = company
        update[`/${userId}/projectInfo/${company}/projects/${project}/projectName`] = project
        update[`/${userId}/projectInfo/${company}/projects/${project}/projectObjectives`] = objective
        await this.$database.ref().update(update)
          .then(() => {
            const database = this.$database.ref(`${userId}`)
            database.on('value', (snapshot) => {
              const projectInfo = snapshot.val().projectInfo
              const addedObjectives = projectInfo[company].projects[project].projectObjectives

              this.changeState(this.stateEditObjectives)
              this.selectedCompany = company
              this.selectedProject = project
              this.objectives = addedObjectives

              this.uploadAreaShow = true

              // save info in vuex store -> for file upload module
              store.commit('setProjectInfo', {
                companyName: company,
                projectName: project
              })
            })
          })
      }
    },
    fileListUpdate () {
      const fileList = store.state.filelist
      const update = {}
      update[`/${this.loggedInUserId}/projectInfo/${store.state.companyName}/projects/${store.state.projectName}/projectFiles/`] = fileList
      this.$database.ref().update(update)
        .then(() => {
          store.commit('clearObjectives')
          store.commit('clearFileList')
          alert('Upload successful')
          location.reload()
        })
    },
    saveFramewokrData (frameworkInfo) {
      this.alertAssert(this.loggedInUserId, 'Logged in user id is not exist')
      this.alertAssert(store.state.companyName, 'Please select company name first')
      this.alertAssert(store.state.projectName, 'Please select project name first')
      const update = {}
      update[`/${this.loggedInUserId}/projectInfo/${store.state.companyName}/projects/${store.state.projectName}/frameworksInfo/${frameworkInfo.frameworksName}`] = frameworkInfo
      this.$database.ref().update(update)
        .then(() => {
          const database = this.$database.ref(`${this.loggedInUserId}`)
          database.on('value', (snapshot) => {
            const projectInfo = snapshot.val().projectInfo
            this.framework = projectInfo[store.state.companyName].projects[store.state.projectName].frameworksInfo[frameworkInfo.frameworksName].frameworksName
          })
        })
    },
    saveFrameworkTarget (frameworkTargets) {
      this.alertAssert(this.framework, 'Please add framework first')
      if (this.framework) {
        const update = {}
        update[`/${this.loggedInUserId}/projectInfo/${store.state.companyName}/projects/${store.state.projectName}/frameworksInfo/${this.framework}/target`] = frameworkTargets
        this.$database.ref().update(update)
          .then(() => {
            const database = this.$database.ref(`${this.loggedInUserId}`)
            database.on('value', (snapshot) => {
              const projectInfo = snapshot.val().projectInfo
              console.log(projectInfo)
            })
          })  
      }
    },
    alertAssert (condition, message) {
      if (!condition) {
        alert(message)
      }
    }
  },
  computed: {
    noOfObjInputForm () {
      return this.objectives.length
    }
  }
}
</script>

<style>
#edit-proejct {
  display: flex;
  flex-direction: column;
  margin: 6.2rem 0 0 6.2rem;
  padding: 8rem 0 8rem 8rem;
  max-width: 144rem;
}

.back {
  align-self: start;
  padding: 0;
}

.back a {
  color: var(--color-dark-grey);
  font-size: 1.2rem;
}

.your-project {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.your-project h1 {
  margin-bottom: 4.2rem;
}

.your-project h3 {
  margin-bottom: 1.3rem;
}

.edit-project-title {
  font-family: Helvetica;
  font-size: 3.4rem;
  color: #8954BA;
  line-height: 2.4rem;
  text-align: left;
}

.editproject-dropdown {
  margin-bottom: 2rem;
}

#edit-proejct > section.dashboard-area > div.container {
  display: flex;
  max-width: 144rem;
}

.framework-thumbnails-wrapper {
  padding: 1rem;
}

.framework-thumbnails-wrapper a {
  text-decoration: none;
}

.edit-project-subtitle {
  margin-bottom: 1rem;
}

.edit-project-subtitle-2 {
  margin-top: 8.3rem;
}

.edit-project-subtitle-3 {
  margin-top: 3.3rem;
}

.edit-project-subtitle,
.edit-project-subtitle-2,
.edit-project-subtitle-3,
.dashboard-area-title {
  font-family: Helvetica;
  font-size: 2.6rem;
  color: #8954BA;
  line-height: 2.4rem;
  text-align: left;
}

.dashboard-area-title {
  margin-bottom: 4.8rem;
  text-align: left;
}

.your-project .objective-vfor-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 0 2rem 0;
  /* margin-bottom: 2.7rem; */
}

.your-project .objective-vfor-wrapper .objective-text{
  width: 37.1rem;
  padding: 0 1.6rem;
}

.objective-vfor-wrapper-subtitle {
  text-align: left;
  font-family: Helvetica;
  font-size: 1.6rem;
  color: #686868;
  margin: 0.3rem 0 1.1rem 0;
}

.objective-vfor-wrapper-subtitle-2 {
  text-align: left;
  font-family: Helvetica;
  font-size: 1.6rem;
  color: #686868;
  background-color: #fafafa;
  width: 39.8rem;
  padding: 1.6rem;
  margin: 0.3rem 0 2rem 0 !important;
}

.objective-vfor-wrapper-subtitle-2 h3 {
  margin: 0;
  font-size: 1.68rem;
}

.upload-module-area {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.project-update-button {
  border: none;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease;
  background-color: #8954BA;
  color: #ffffff;
  font-size: 1.68rem;
  position: relative;
  left: 33rem;
  width: 12rem;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
}

.project-create-button:hover {
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  background-color: #efefef;
  color: #000000;
  font-size: 1.88rem;
}

.dashboard-area {
  margin-top: 5.4rem;
}

.dashboard-area .container {
  max-width: 144rem;
}

.framework-area {
  display: flex;
  flex-direction: column;
}

.framework-thumbnail-tile,
.framework-thumbnail-tile-3 {
  background-color: #ffffff;
  min-width: 32.4rem !important;
  max-width: 32.4rem !important;
  height: 21.8rem;
  box-shadow: -13px 11px 25px 0 #adb6d92b;
  padding: 3rem 1.8rem !important;
  /* margin-bottom: 2rem; */
}

.framework-thumbnail-tile-3,
.framework-thumbnail-tile {
  margin: 0 7rem 2rem 0;
}

.framework-thumbnail-hover-3,
.framework-thumbnail-hover {
  background-color:  rgb(137, 84, 186, 0.9);
  min-width: 32.4rem;
  height: 6.3rem;
  position: relative;
  left: -1.8rem;
  top: -6rem;
  padding: 2.5rem;
  color: #ffffff;
}

.framework-thumbnail-hover-3 span,
.framework-thumbnail-hover span {
  color: #ffffff;
  font-family: Helvetica;
  font-size: 1.8rem;
}

.framework-thumbnail-tile-2 {
  background-color: #ffffff;
  min-width: 32.4rem !important;
  max-width: 32.4rem !important;
  height: 21.8rem;
  margin: 0 7rem 2rem 0;
  padding: 3rem 2.4rem !important;
}

.framework-thumbnail-hover-2 {
  background-color:  rgb(137, 84, 186, 0.9);
  min-width: 32.4rem;
  height: 6.3rem;
  position: relative;
  left: -2.5rem;
  top: -6rem;
  padding: 2.5rem;
  color: #ffffff;
}

.framework-thumbnail-hover-2 span {
  color: #ffffff;
  font-family: Helvetica;
  font-size: 1.8rem;
}

.framework-thumbnail-tile a {
  text-decoration: none;
}

.framework-thumbnail-tile-3 img,
.framework-thumbnail-tile-2 img,
.framework-thumbnail-tile img {
  width: 27.6rem;
  height: 13.6rem;
  object-fit: cover;
}

.framework-thumbnail-tile-3 h1,
.framework-thumbnail-tile-2 h1,
.framework-thumbnail-tile h1 {
  font-family: Helvetica;
  font-size: 2.16rem;
  color: #585858;
  line-height: 2.4rem;
  text-align: left;
  margin-bottom: 0;
}

.framework-thumbnail-tile-3 h3,
.framework-thumbnail-tile-2 h3,
.framework-thumbnail-tile h3 {
  font-family: Helvetica;
  font-size: 1.68rem;
  color: #A6A7A8;
  line-height: 2.4rem;
  text-align: left;
  margin-bottom: 0;
}

.framework-link-title {
  display: flex;
  justify-content:space-between;
}

.framework-link-title h1 {
  display: inline;
}

.framework-target {
  position: relative;
  margin-top: 5rem;
}


</style>