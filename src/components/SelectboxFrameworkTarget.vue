<template>
  <div class="framework-target-form-area">
    <form class="framework-target-dropdown-form" @mouseenter="toggleDropdown" @mouseleave="toggleDropdown">
      <div class="framework-target-dropdown">
        <button type="button" class="framework-target-dropdown-toggle">
          {{selectboxPlaceholder}}
        </button>
        <ul class="framework-target-dropdown-menu">
          <li class="framework-target-dropdown-item" v-for="(option, index) in selectList" v-bind:key="index" v-bind:for="option" :id="option">
            <button type="button" :value="option" v-bind:for="option" @mouseenter="mouseEnter" @mouseleave="mouseLeave" class="framework-target-dropdown-option" >
              {{option}}
              <input type="checkbox" :value="option" :class="option" :id="option" @click="setSelectboxPlaceholder">
            </button>
          </li>
        </ul>
      </div>
    </form>
  <button class='target-submit' @click="saveFrameworksData">Add</button>
  </div>
</template>

<script>
export default {
  name: 'framework-target',
  data () {
    return {
      selectList: [
        'SDG 1 - No poverty',
        'SDG 2 - Zero hunger',
        'SDG 3 - Good health & well-being',
        'SDG 4 - Quality education',
        'SDG 5 - Gender equality',
        'SDG 6 - Clean water and sanitation'
      ],
      textInputShow: false,
      selectedOption: [],
      placeholderText: ['https://www.sopact.com/social-impact-measurement-framework'],
      selectboxPlaceholder: 'SDG 1 - No poverty',
      selectboxNumber: 0,
      colorWhite: 'rgb(255, 255, 255)',
      colorGrey: 'rgb(104, 104, 104)',
      colorBlue: 'rgba(47, 185, 239)',
      colorLightBlue: 'rgba(47, 185, 239, 0.5)'
    }
  },
  mounted () {
  },
  methods: {
    mouseEnter (event) {
      const text = event.target.value
      const checkBox = document.querySelector(`input[id='${text}']`)
      const checkedOption = document.querySelector(`li[id='${text}']`)
      checkedOption.style.backgroundColor = checkBox.checked ? this.colorLightBlue : this.colorBlue
      checkedOption.firstChild.style.color = this.colorWhite
    },
    mouseLeave (event) {
      const text = event.target.value
      const checkBox = document.querySelector(`input[id='${text}']`)
      const checkedOption = document.querySelector(`li[id='${text}']`)

      if (checkBox.checked) {
        checkedOption.style.backgroundColor = this.colorLightBlue
        checkedOption.firstChild.style.color = this.colorWhite
      } else {
        checkedOption.style.backgroundColor = this.colorWhite
        checkedOption.firstChild.style.color = this.colorGrey
      }
    },
    toggleDropdown () {
      const menu = document.querySelector('.framework-target-dropdown-menu')
      menu.classList.toggle('show')
    },
    setSelectboxPlaceholder (event) {
      const text = event.target.value
      const checkBox = document.querySelector(`input[id='${text}']`)

      if (checkBox.checked) {
        this.selectedOption.push(text)
      } else {
        const placeholderIndex = this.selectboxPlaceholder.indexOf(text)
        this.selectedOption.splice(placeholderIndex, 1)
      }
      
      this.mouseEnter(event)
      
      if (this.selectedOption.length > 0) {
        this.selectboxPlaceholder = `${this.selectedOption.length} selected`
      } else {
        this.selectboxPlaceholder = 'Select target'
      }
    },
    saveFrameworksData () {
      const frameworkTargets = this.selectedOption
      this.$emit('save-framework-target', { frameworkTargets })
      this.selectedOption = []
      this.setSelectboxPlaceholder()
    }
  },
  watch: {
  }
}
</script>

<style>
.framework-target-form-area {
  position: relative;
  display: flex;
  flex-direction: column;
}

.framework-target-form-area ul,
.framework-target-form-area li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}

.framework-target-form-area button {
  font-size: 15px;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #3f4150;
  background-color: rgb(0, 0, 0, 0);
  border: none;
  cursor: pointer;
}

.framework-target-form-area button:focus,
.framework-target-form-area button:active {
  outline: none;
  box-shadow: none;
}

.framework-target-form-area .title {
  width: 20rem;
  margin-bottom: 1.6rem;
}

.framework-target-form-area .title img {
  width: 100%;
  height: auto;
}

.framework-target-form-area .framework-target-dropdown-form {
  background-color: #fff;
  margin-top: 2rem;
  width: 39.7rem;
  height: 4.7rem;
}

.framework-target-form-area form h1 {
  margin-bottom: 0.8rem;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #3f4150;
}

.framework-target-form-area .framework-target-dropdown {
  position: relative;
  z-index: 0;
}

.framework-target-form-area .framework-target-dropdown-item {
  padding: 0 1.6rem 0 1.6rem;
  margin: 0;
  border-bottom: 1px solid #DCE2F0;
}

.framework-target-form-area .framework-target-dropdown-toggle {
  width: 36.7rem;
  height: 4.7rem;
  color: rgba(133, 136, 150, 0.5);
  background-color: #fff;
  text-align: left;
  transition: border-color 100ms ease-in;
  padding: 0 1.6rem 0 1.6rem;
  background-image: url('../assets/Dropdown.svg');
  background-position: right;
  background-repeat: no-repeat;
  background-origin: content-box;
}

.framework-target-form-area .framework-target-dropdown-toggle.selected {
  color: #3f4150;
  border-color: rgba(224, 226, 231, 1);
}

.framework-target-form-area .framework-target-dropdown-toggle:active {
  border-color: rgba(224, 226, 231, 1);
}

.framework-target-form-area .framework-target-dropdown-menu {
  position: relative;
  z-index: 2;
  left: 0;
  width: 100%;
  max-height: 0;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid transparent;
  transition: border-color 200ms ease-in, padding 200ms ease-in,
    max-height 200ms ease-in, box-shadow 200ms ease-in;
}

.framework-target-form-area .framework-target-dropdown-menu.show {
  max-height: 38.2rem;
}

.framework-target-form-area .framework-target-dropdown-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 4.7rem;
  padding: 0;
  line-height: 2.88rem;
  text-align: left;
  font-size: 1.68rem;
  font-family: Helvetica;
  color: #686868;
  background-color: rgb(0, 0, 0, 0);
  margin: 0;
}

.framework-target-form-area .text-form {
  width: 39.7rem;
  height:  4.7rem;
  border-style: none;
  border-color: Transparent;
  overflow: auto;
  outline: none;
  padding: 1.6rem;
}

.framework-target-form-area .text-form::placeholder {
  font-family: Helvetica;
  font-size: 1.68rem;
  color: rgba(0,0,0,0.25);
  text-align: center;
}

.framework-target-form-area .target-submit{
  background: #5D38DB;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
  border-radius: 2.4px;
  color: #ffffff;
  height: 5.5rem;
  width: 12rem;
  margin-top: 2rem;
} 

.framework-target-form-area button::after {
  display: none;
}

</style>
