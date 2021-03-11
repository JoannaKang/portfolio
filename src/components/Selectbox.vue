<template>
  <form class="editproject-dropbox-form">
  <div class="editproject-dropbox">
    <button type="button" class="editproject-dropdown-toggle" @click="toggleDropdown(cssId)">
      {{selectboxPlaceholder}}
    </button>
    <ul class="editproject-dropdown-menu" v-bind:id="cssId">
      <li class="editproject-dropdown-item" v-for="(option, index) in selectboxOption" v-bind:key="index">
        <button :value="option" class="editproejct-dropdown-option" @click="getText(option, cssId)">
          {{option}}
        </button>
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
      selectboxPlaceholder: 'Select option'
    }
  },
  mounted () {
    // if (this.selectedOption === null) {
    //   this.selectboxPlaceholder = 'Select option'
    // } else {
    //   this.selectboxPlaceholder = this.selectedOption
    // }
  },
  methods: {
    toggleDropdown (cssSelectorId) {
      const menu = document.getElementById(`${cssSelectorId}`)
      menu.classList.toggle('show')
    },
    getText (selectedOption, selectboxType) {
      this.toggleDropdown(selectboxType)
      switch (selectboxType) {
        case 'company-selectbox':
          this.selectboxPlaceholder = selectedOption
          this.$emit('get-selectbox-text', { selectedOption, selectboxType })

          break
        case 'project-selectbox':
          this.selectboxPlaceholder = selectedOption
          this.$emit('get-selectbox-text', { selectedOption, selectboxType })
          break
        default:
          this.selectboxPlaceholder = 'Select option'
      }
    }
  },
  watch: {
    selectboxOption () {
      if (this.selectedOption === null) {
        this.selectboxPlaceholder = 'Select option'
      } else {
        this.selectboxPlaceholder = this.selectedOption
      }      
    }
  }
}
</script>

<style>
.editproject-dropbox {
  position: relative;
  z-index: 1;
  /* background-color: yellowgreen; */
}

.editproject-dropbox-form ul,
.editproject-dropbox-form li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}

.editproject-dropbox-form li:hover {
  background-color: #2FB9EF;
}

.editproject-dropbox-form li button:hover {
  color: #ffffff;
}

.editproject-dropbox-form button {
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #3f4150;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
}

.editproject-dropbox-form button:focus,
.editproject-dropbox-form button:active {
  outline: none;
  box-shadow: none;
}

.editproject-dropbox-form .editproject-dropbox {
  background-color: #fff;
  width: 40rem;
}

.editproject-dropbox-form .editproject-dropdown-item {
  padding: 0 1.6rem 0 1.6rem;
  margin: 0;
  border-top: 1px solid #DCE2F0;
}

.editproject-dropdown-toggle {
  width: 37rem;
  height: 5rem;
  color: rgba(133, 136, 150, 0.5);
  background-color: #fff;
  text-align: left;
  transition: border-color 100ms ease-in;
  padding: 0 1.6rem 0 1.6rem;
  background-image: url('../assets/Dropdown.svg');
  background-position: right;
  background-repeat: no-repeat;
  background-origin: content-box;
  border-bottom: 1px solid #DCE2F0;
  font-size: 1.6rem;
}

.editproject-dropdown-menu {
  position: relative;
  z-index: 2;
  left: 0;
  width: 39.8rem;
  max-height: 0;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid transparent;
  transition: border-color 200ms ease-in, padding 200ms ease-in,
    max-height 200ms ease-in, box-shadow 200ms ease-in;
  margin-bottom: 0;
}

.editproject-dropdown-menu.show {
  max-height: 38.2rem;
}

.editproejct-dropdown-option {
  width: 100%;
  height: 4.6rem;
  padding: 0;
  line-height: 2.88rem;
  text-align: left;
  font-size: 1.6rem;
  font-family: Helvetica;
  color: #686868;
  margin: 0;
}
</style>