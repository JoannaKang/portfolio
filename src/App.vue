<template>

  <div id="app">
    <div id="nav">
      <header class="horizontal-nav" :gutter="12">
      <nav class="navbar navbar-light bg-white justify-content-end fixed-top border-bottom">
        <button @click="logOut" class="logout-button">Logout</button>
        <img src="../src/assets/alice_logo.png" width="42" height="42" class="company_logo" alt="company_logo">
          <img class="search-icon" src="../src/assets/Search.svg" alt="search-icon">
        <form class="form-inline">
          <input class="form-control mr-sm-2" style="width:250px; border: none;" type="search" placeholder="Search e.g. INS exam results" aria-label="Search">
          <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
        </form>
        <div class="notification-icon"><img src="../src/assets/Alert.svg" alt="alert"/></div>
        <div class="profile-icon"><img src="../src/assets/Profile.svg" alt="profile" class="profile-picture"/></div>
      </nav>
      </header>
      <aside class="vertical-nav">
        <nav class="navbar navbar-light bg-white flex-column justify-content-start">
            <router-link to="/"><img :src="homeImgSrc" id="home-icon" class="home" alt="home"></router-link>
            <img :src="dashboardImgSrc" id="dashboard" class="dashboard" alt="dashboard">
            <router-link to="/editproject"><img :src="editpageImgSrc" id="edit-project-icon" class="edit-project-icon" alt="edit-project"></router-link>
            <!-- FIXME: change link directory -->
            <router-link to="/"><img src='../src/assets/Settings.svg' class="settings" alt="settings"></router-link>
        </nav>
      </aside>
    </div>
    <router-view/>
  </div>
</template>

<script>
import router from './router'
import { store } from './store/store'

export default {
  data () {
    return {
      homeImgSrc: require('../src/assets/Home-selected.svg'),
      dashboardImgSrc: require('../src/assets/Dashboard.svg'),
      editpageImgSrc: require('../src/assets/Edit.svg')
    }
  },
  mounted () {
  },
  methods: {
    logOut () {
      this.$firebase.auth().signOut().then(() => {
        this.$firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            store.commit('setLogOut')
            alert('You have logged out')
            router.push('/login')
          }
        })
      }).catch((error) => {
        alert(error)
      })
    }
  },
  watch: {
    '$route' (to) {
      const clickedRoute = to.name
      const homeIcon = document.getElementById('home-icon')
      const dashboardIcon = document.getElementById('dashboard')
      const editpageIcon = document.getElementById('edit-project-icon')

      if (clickedRoute === '/' || clickedRoute === 'home') {
        this.homeImgSrc = require('../src/assets/Home-selected.svg')
        this.dashboardImgSrc = require('../src/assets/Dashboard.svg')
        this.editpageImgSrc = require('../src/assets/Edit.svg')
        homeIcon.style.borderRight = '3px solid #8954BA'
        dashboardIcon.style.border = '0px'
        editpageIcon.style.border = '0px'
      } else if (clickedRoute === 'editproject' || clickedRoute === 'editdashboard' ) {
        this.homeImgSrc = require('../src/assets/Home.svg')
        this.dashboardImgSrc = require('../src/assets/Dashboard.svg')
        this.editpageImgSrc = require('../src/assets/Edit-selected.svg')
        homeIcon.style.border = '0px'
        editpageIcon.style.borderRight = '3px solid #8954BA'
        dashboardIcon.style.border = '0px'
      } else {
        this.homeImgSrc = require('../src/assets/Home.svg')
        this.dashboardImgSrc = require('../src/assets/Dashboard-selected.svg')
        this.editpageImgSrc = require('../src/assets/Edit.svg')
        homeIcon.style.border = '0px'
        editpageIcon.style.border = '0px'
        dashboardIcon.style.borderRight = '3px solid #8954BA'
      }
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap');
* {
  box-sizing: inherit;
}

:root {
  /* main font color */
  --color-light-grey: #D8D8D8;
  --color-dark-grey: #585858;
  --color-purple: #8954BA;
}

html {
  display: flex;
  background-color: #F5F7FC;
  width: 100vw;
  height: 100vh;
  font-size: 62.5%;
  font-family: Helvetica;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
}

input:focus {
  outline-color: rgb(137, 84, 186, 0.8);
  outline-width: 1.2px;
}

.container-fluid {
  background-color: #F5F7FC !important;
}

h1 {
  font-size: 3.4rem;
  font-family: Helvetica;
  font-weight: 300;
  margin: 0;
  letter-spacing: -0.01px;
}

h2 {
  font-size: 2.88em;
  font-family: Helvetica;
  font-weight: 300;
  margin: 0;
  letter-spacing: -0.01px;
}

h3 {
  font-family: Helvetica;
  font-size: 1.68rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: -0.01px;
}
.navbar {
  padding: 0 !important;
}
.company_logo {
  align-self: start;
  position: fixed;
  top: 0.9rem;
  left: 0.8rem;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.container-fluid {
  padding: 0px !important;
}

.form-inline .form-control {
  font-size: 1.5rem;
}

.search-icon {
  margin-right: 0.5rem;
}

.notification-icon {
  padding: 20px 20px 20px 20px !important;
  border-left: 1px solid var(--color-light-grey);
}

.profile-icon {
  padding: 10px 20px 10px 20px;
  margin-right: 10px;
  border-left: 1px solid var(--color-light-grey);
}

.profile-picture {
  border-radius: 70%;
}

.vertical-nav {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 60px;
  height: 95%;
  justify-content: space-around;
  background-color: #ffffff;
  top: 62px;
  padding-top: 15rem;
}

.vertical-nav > ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.vertical-nav img {
  margin-bottom: 7.7rem;
}

#home-icon {
  padding: 0 12px 0 12px;
  border-right: 3px solid #8954BA;
}

#edit-project-icon {
  padding: 0 12px 0 12px;
}

.dashboard {
  padding: 0 12px 0 12px;
  margin: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.home #Home {
  background: var(--color-purple)
}

.container[data-v-42e9a5e0] {
  width: 100% !important;
}

.logout-button {
  margin-right: 2rem;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease;
}

.logout-button:hover {
  margin-right: 2rem;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.2rem;
  background-color: var(--color-purple);
  color: #ffffff;
  font-size: 1.2rem;
}
</style>
