<template>
  <form class="editdashboard-dropbox-form">
  <input type="button" class="editdashboard-dropbox-activateBtn" value="Drop to edit" v-if="savebuttonShow === false">
  <input type="button" class="save-optionlist-button" v-if="savebuttonShow === true"  @click="saveOption(cssId)"/>
  <div class="editdashboard-dropbox" @mouseleave="toggleDropdown(cssId)">
    <button type="button" class="editdashboard-dropdown-toggle" @click="toggleDropdown(cssId)">
      {{selectboxPlaceholder}}
    </button>
    <ul class="editdashboard-dropdown-menu" v-bind:id="cssId">
      <li class="editdashboard-dropdown-item" v-for="(option, index) in selectbox" v-bind:key="index">
        <div class="editdashboard-dropdown-option-wrapper">
          <input type="text"  class="editdashboard-dropdown-option" :placeholder="option" v-model="inputText[index]" @keyup="getText(inputText[index], index, cssId)">
          <input type="button" class="crossImgUrl" @click="removeItem(option, index, cssId)" v-if="index !== noOfInputbox">
          <input type="button" class="plusImgUrl" @click="addItem(option, index)" v-if="index === noOfInputbox">
        </div>
      </li>
    </ul>
  </div>
</form>
</template>

<script>

export default {
  props: {
    cssId: {
      type: String
    },
    selectboxOption: {
      type: Array
    },
    selectedOption: {
      type: String
    }
  },
  data () {
    return {
      selectboxPlaceholder: 'Show all',
      crossImgUrl: require('../assets/SelectboxCross.svg'),
      plusImgUrl: require('../assets/SelectboxPlus.svg'),
      selectbox: [],
      inputText: [],
      savebuttonShow: false
    }
  },
  mounted () {
    this.selectbox = [...this.selectboxOption, ""]
  },
  methods: {
    toggleDropdown (cssId) {
      const menu = document.getElementById(`${cssId}`)
      menu.classList.toggle('show')
    },
    removeItem (item, index, cssId) {
      const removedItem = { item, index, cssId }
      this.$emit('remove-option', removedItem)
      this.savebuttonShow = true
    },
    addItem (item, index, cssId) {
      const addedItem = { item, index, cssId }
      this.$emit('add-option', addedItem)
    },
    getText (selectedOption, index, cssId) {
      this.savebuttonShow = true
      this.$emit('get-selectbox-text', { selectedOption, index, cssId })
    },
    saveOption (cssId) {
      this.savebuttonShow = false
      this.$emit('save-selectbox-option', cssId)
      this.toggleDropdown()
    }
  },
  watch: {
    selectboxOption () {
      this.selectbox = [...this.selectboxOption, ""] 
      this.inputText = [...this.selectboxOption, ""]
    }
  },
  computed: {
    noOfInputbox () {
      return this.selectbox.length - 1
    }
  }
}
</script>

<style>
.editdashboard-dropbox {
  position: absolute;
  z-index: 1;
  top: 6.5rem;
  left: -0.1rem;
  border-bottom: 0.1rem solid #8954BA;
}

.editdashboard-dropbox-activateBtn {
  font-size: 1rem;
  color: #8954BA;
  background-color: rgba(0,0,0,0);
  border: none;
  outline: none;
  position: relative;
}

.editdashboard-dropbox-form {
  width: 100%;
  text-align: right;
}

.editdashboard-dropbox-form ul,
.editdashboard-dropbox-form li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}

.editdashboard-dropbox li:hover {
  background-color: #2FB9EF;
  color: #ffffff;
}

.editdashboard-dropbox li button:hover {
  background-color: #2FB9EF;
  color: #ffffff;
}

.editdashboard-dropbox-form button {
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #3f4150;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
  height: 3.8rem;
}

.editdashboard-dropbox-form li button {
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.editdashboard-dropbox-form li button img {
  margin: 0.1rem;
}

.editdashboard-dropbox-form button:focus,
.editdashboard-dropbox-form button:active {
  outline: none;
  box-shadow: none;
}

.editdashboard-dropbox-form .editdashboard-dropbox {
  background-color: #fff;
  width: 100%;
  height: 3.8rem;
}

.editdashboard-dropbox-form .editdashboard-dropdown-item {
  padding: 0 1rem;
  margin: 0;
  border-top: 1px solid #DCE2F0;
  text-align: left;
}

.editdashboard-dropdown-toggle {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 3.8rem;
  color: rgba(133, 136, 150, 0.5);
  text-align: left;
  transition: border-color 100ms ease-in;
  padding: 0 1.8rem;
  background-image: url('../assets/Dropdown.svg');
  background-position: right;
  background-repeat: no-repeat;
  background-origin: content-box;
  border-bottom: 1px solid #DCE2F0;
  font-size: 1.6rem;
}

.editdashboard-dropdown-menu {
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
  margin-bottom: 0;
}

.editdashboard-dropdown-menu.show {
  max-height: 38.2rem;
}

.editdashboard-dropdown-option {
  width: 100%;
  height: 4.6rem;
  padding: 0;
  line-height: 2.88rem;
  text-align: left;
  font-size: 1.6rem;
  font-family: Helvetica;
  color: #686868;
  margin: 0;
  border: none;
  outline: none;
  background-color:rgba(0,0,0,0);
}

.editdashboard-dropdown-option-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.editdashboard-dropdown-option:hover {
  color: #ffffff;
  background-color: #2FB9EF;
}

.crossImgUrl {
  background-image: url('../assets/SelectboxCross.svg');
  background-repeat: no-repeat;
  border: none;
  outline: none;
  background-color: rgba(0,0,0,0);
  background-position: center;
  margin: 0.1rem;
}
.plusImgUrl {
  background-image: url('../assets/SelectboxPlus.svg');
  background-repeat: no-repeat;
  border: none;
  outline: none;
  background-color: rgba(0,0,0,0);
  background-position: center;
  margin: 0.1rem;
}
.save-optionlist-button {
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  font-size: 3.5rem;
  width: 5rem;
  height: 5rem;
  color: #8954BA;
  box-shadow: 0 7px 20px 0 rgba(159,168,214,0.59);
  padding: 0;
  background-image: url('../assets/ObjectSaveBtn.svg');
  background-position: 55% 27%;
  background-size: 10rem 10rem; 
}
</style>