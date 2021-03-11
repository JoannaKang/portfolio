<template>
  <div class="framework-form-area">
    <form class="dropdown-form">
      <div class="framework-dropdown">
        <button type="button" class="framework-dropdown-toggle" @click="FrameworkToggleDropdown">
          {{selectboxPlaceholder}}
        </button>
        <ul class="framework-dropdown-menu">
          <li class="framework-dropdown-item" v-for="(option, index) in selectList" v-bind:key="index" @click="FrameworkToggleDropdown">
            <button type="button" :value="option" class="framework-dropdown-option" @click="getFrameworkText(option)">
              {{option}}
            </button>
          </li>
        </ul>
      </div>
    </form>
    <form class="add-link-form" v-if="showAddLinkArea">
      <h3 class='framework-sub-title'>Add a link to the framework you’re using</h3>
      <!-- <input class='text-form' type='text' placeholder="https://www.sopact.com/social-impact-measurement-framework"> -->
      <div v-for="(link, index) in links" v-bind:key="index" class="objective-input-wrapper">
        <framework-link-input
          @add-objectives="addFrameworks"
          @remove-objectives="removeObjectives"
          :objective="link"
          :index="index"
          :placeholderText="placeholderText"
          :totalLength="noOfObjInputForm"
          v-bind:class="index"
        ></framework-link-input>
      </div>
    </form>
    <button class='text-submit' @click="saveFrameworksData">Add</button>
  </div>
</template>

<script>
import FrameworkLinkInput from '../components/ObjectiveInputDiv'
export default {
  name: 'framework',
  components: {
    FrameworkLinkInput
  },
  data () {
    return {
      selectList: [
        'No framework',
        'SDG - Sustainable Development Goals',
        'SROI - Social Return on Investment',
        'ESG - Environmental, Social, Governance',
        'IRIS - Impact Reporting & Investment Standards',
        'GIIRS - Global Impact Investing Rating System',
        'Other framework'],
      selectedOption: '',
      placeholderText: ["https://www.sopact.com/social-impact-measurement-framework"],
      links: [""],
      selectboxPlaceholder: 'No framework',
      showAddLinkArea: false
    }
  },
  mounted () {

  },
  methods: {
    FrameworkToggleDropdown () {
      const menu = document.querySelector('.framework-dropdown-menu')
      menu.classList.toggle('show')
    },
    getFrameworkText (text) {
      this.selectboxPlaceholder = text
      if (text === 'Other framework') {
        this.showAddLinkArea = true
      } else {
        this.showAddLinkArea = false
      }
    },
    addFrameworks (addedFramework) {
      this.links.unshift(addedFramework.userInputSubComp)
    },
    removeObjectives (removedFramework) {
      const editedIndex = removedFramework.noOfIndex - 1
      this.links.splice(editedIndex, 1)
    },
    saveFrameworksData () {
      const frameworksName = this.selectboxPlaceholder
      const addedLinks = this.links
      this.$emit('save-framework-data', { frameworksName, addedLinks })
    }
  },
  watch: {
  },
  computed: {
    noOfObjInputForm () {
      return this.links.length
    }
  }
}
</script>

<style>
.framework-form-area {
  display: flex;
  flex-direction: column;
}

.framework-form-area ul,
.framework-form-area li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}

.framework-form-area button {
  font-size: 15px;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #3f4150;
  background-color: rgb(255, 255, 255, 0);
  border: none;
  cursor: pointer;
  width: 100%;
}

.framework-form-area button:focus,
.framework-form-area button:active {
  outline: none;
  box-shadow: none;
}

.framework-form-area .title {
  width: 20rem;
  margin-bottom: 1.6rem;
}

.framework-form-area .title img {
  width: 100%;
  height: auto;
}

.framework-form-area .dropdown-form {
  background-color: #fff;
  margin-top: 2rem;
  width: 39.7rem;
  height: 4.7rem;
  position: relative;
}

.framework-form-area form h1 {
  margin-bottom: 0.8rem;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #3f4150;
}

.framework-form-area .framework-dropdown {
  position: relative;
  z-index: 1;
}

.framework-form-area .framework-dropdown-item {
  /* padding: 0 1.6rem 0 1.6rem; */
  margin: 0;
  border-bottom: 1px solid #DCE2F0;
}

.framework-form-area .framework-dropdown-toggle {
  width: 36.7rem;
  height: 4.7rem;
  /* color: rgba(133, 136, 150); */
  background-color: #fff;
  text-align: left;
  transition: border-color 100ms ease-in;
  padding: 0 1.6rem 0 1.6rem;
  background-image: url('../assets/Dropdown.svg');
  background-position: right;
  background-repeat: no-repeat;
  background-origin: content-box;
}

.framework-form-area .framework-dropdown-toggle.selected {
  color: #3f4150;
  border-color: rgba(224, 226, 231, 1);
}

.framework-form-area .dropdown-toggle:active {
  border-color: rgba(224, 226, 231, 1);
}

.framework-form-area .framework-dropdown-menu {
  position: relative;
  z-index: 2;
  left: 0;
  width: 100%;
  /* padding: 0 1.6rem; */
  max-height: 0;
  overflow: hidden;
  background-color: rgba(255, 255, 255);
  border: 1px solid transparent;
  transition: border-color 200ms ease-in, padding 200ms ease-in,
    max-height 200ms ease-in, box-shadow 200ms ease-in;
}

.framework-form-area .framework-dropdown-menu.show {
  max-height: 38.2rem;
}

.framework-form-area .framework-dropdown-option {
  width: 100%;
  height: 4.7rem;
  padding: 0;
  line-height: 2.88rem;
  text-align: left;
  font-size: 1.68rem;
  font-family: Helvetica;
  color: #686868;
  margin: 0;
}

.framework-dropdown-menu li {
  width: 100%;
  padding: 0 1.6rem;
}

.framework-dropdown-menu li:hover {
  background-color: #2FB9EF;
}

.framework-dropdown-menu li button:hover {
  color: #ffffff;
}

.framework-form-area .add-link-form {
  position: relative;
  /* margin-top: 2.5rem; */
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
}

.framework-form-area .add-link-form h3 {
  margin-bottom: 2.5rem;
  font-family: Helvetica;
  font-size: 1.6rem;
  color: #686868;
  text-align: left;
}

.objective-input-wrapper {
  position: relative;
}

.framework-form-area .text-submit {
  float: inline-end;
  background: #5D38DB;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
  border-radius: 2.4px;
  color: #ffffff;
  height: 5.5rem;
  width: 12rem;
  margin-top: 2rem;
}

.framework-form-area button::after {
  display: none;
}

.add-link-form {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
}

</style>
