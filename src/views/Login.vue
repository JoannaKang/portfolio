<template>
  <div class="login">
    <main id="login">
      <section class="login-form-area">
        <img src="../assets/alice_logo.png" width="91rem"/>
        <h1 class="login-title">Connect to turn your data to knowledge</h1>
        <form @submit="submitLogin">
          <input type="email" class="login-email" placeholder="Your email address" v-model="email">
          <input v-if="login === false" type="text" class="fullname-text" placeholder="Your full name" v-model="fullname">
          <input type="password" class="login-text" placeholder="Your password" v-model="password">
          <input @click="submitSignUp" v-if="login === false" type="button" class="sign-up" value="Sign up"/>
          <input @click="submitLogin" v-if="login === true" type="button" class="login-button" value="Login"/>
        </form>
        <h3 class="signing-up-text" v-if="login === false" > By signing up yo agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></h3>
        <h3 class="find-password-text" v-if="login === true" > Forgot password? Find it from <a href="#" @click="openPasswordModal">Here</a></h3>
        <p class="line">or</p>
        <button v-if="login === false" type="button" class="sign-in-with-google" value="Sign in with Google" @click="googleSignUp">
          <p>Sign up with Google</p>
          <img src="../assets/1004px-Google__G__Logo.svg.png" width="24px" height="24px">
        </button>
        <button v-if="login === true" type="button" class="sign-in-with-google" value="Sign in with Google" @click="googleLogin">
          <p>Login with Google</p>
          <img src="../assets/1004px-Google__G__Logo.svg.png" width="24px" height="24px">
        </button>
        <div class="rememberme-area">
          <span v-if="login === false" class="remember-me">
              <h3>Already have an account?</h3>
              <button class="login-view-togglebtn" @click="setLoginView">Login</button>
          </span>
          <span v-if="login === true" class="remember-me">
              <h3>Do you want to create new account?</h3>
              <button class="login-view-togglebtn" @click="setSigninView">Sign up</button>
          </span>
        </div>
        <b-modal id="modal-1" title="Insert your email" @ok="findPassword">
          <input type="email" class="find-password-email" placeholder="ex) alice@mailprovider.com" v-model="findPasswordId">
        </b-modal>
      </section>
    </main>
  </div>
</template>

<script>
import router from '../router'
import { store } from '../store/store'

export default {
  name: 'login',
  data () {
    return {
      email: null,
      fullname: null,
      password: null,
      loading: false,
      login: false,
      findPasswordId: '',
      matchOption: '(@resonance.com)'
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
    googleSignUp () {
      this.loading = true
      this.$firebase.auth().signInWithPopup(this.$google) // Sign-up with Firebase Auth
        .then((result) => {
          const currentUserEmail = result.user.email
          if (currentUserEmail.match(this.matchOption) !== null) { // check mail domain id is matched as Resonance email domain          
            const loginUserInfo = {
              userName: result.user.displayName,
              userId: result.user.uid,
              userEmail: result.user.email
            }
            this.$database.ref(`${result.user.uid}`).set({ // Save signed-up user's info in database
              loginUserInfo
            })
            this.$database.ref(`${result.user.uid}`).once('value') // Double check whether user info successfully saved in db or not
              .then((snapshot) => {
                const username = snapshot.node_.children_.root_.value.children_.root_.right.value.value_
                const userid = snapshot.key
                store.commit('setLogin', { // Send logged-in user info to Vuex store
                  loggedIn: true,
                  loginUserId: userid,
                  loginUserFullName: username
                })
                alert(`Hello ${store.state.loginUserFullName}, You have successfully registered and logged in!`)
              })
            router.push('/createproject')
          } else {
             // Delete account if user isn't belonged to Resonance
            let user = this.$firebase.auth().currentUser
            user.delete().then(() => {
              alert('Only Resonance user can access this system')
            })
          }
        })
        .catch((error) => {
          alert(error.message)
        })
      store.state.loggedIn = true
      this.loading = false
    },
    submitSignUp () {
      if (this.email.match(this.matchOption) !== null) { // check mail domain id is matched as Resonance email domain  
      this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          const loginUserInfo = {
            userName: this.fullname,
            userId: result.user.uid,
            userEmail: result.user.email
          }
          this.$database.ref(`${result.user.uid}`).set({
            loginUserInfo
          })
          this.$database.ref(`${result.user.uid}`).once('value')
            .then((snapshot) => {
              const username = snapshot.val().loginUserInfo.userName
              const userid = snapshot.key
              store.commit('setLogin', {
                loggedIn: true,
                loginUserId: userid,
                loginUserFullName: username
              })
              alert(`Hello ${store.state.loginUserFullName}, You have successfully registered and logged in!`)
              router.push('/createproject')
            })
        })
        .catch((error) => {
          alert(error.message)
        })
      } else {
        alert('Only Resonance user can access this system')
      }
    },
    submitLogin () {
      if (this.email.match(this.matchOption) !== null) { // check mail domain id is matched as Resonance email domain  
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$database.ref(`${user.user.uid}`).once('value')
            .then((snapshot) => {
              const username = snapshot.val().loginUserInfo.userName
              const userid = snapshot.key
              store.commit('setLogin', {
                loggedIn: true,
                loginUserId: userid,
                loginUserFullName: username
              })
              alert(`Hello ${store.state.loginUserFullName}, You have successfully logged in!`)
              router.push('/')
            })
        })
        .catch((error) => {
          alert(error.message)
        })
      } else {
        alert('Only Resonance user can access this system')
      }
    },
    googleLogin () {
      this.$firebase.auth().signInWithPopup(this.$google)
        .then((user) => {
          const currentUserEmail = user.user.email
          if (currentUserEmail.match(this.matchOption) !== null) { // check mail domain id is mached as Resonance email domain              
          this.$database.ref(`${user.user.uid}`).once('value')
            .then((snapshot) => {
              const username = snapshot.val().loginUserInfo.userName
              const userid = snapshot.val().loginUserInfo.userId
              store.commit('setLogin', {
                loggedIn: true,
                loginUserId: userid,
                loginUserFullName: username
              })
              alert(`Hello ${store.state.loginUserFullName}, You have successfully logged in!`)
              router.push('/')
            })
            .catch((error) => {
              console.log(error)
              alert("Can't find user information. Please sign up first")
            })
          } else {
            alert('Only Resonance user can access this system')
          }
        })
        .catch((error) => {
          alert(error.message)
        })
    },
    setLoginView () {
      this.login = true
    },
    setSigninView () {
      this.login = false
    },
    openPasswordModal () {
      this.$bvModal.show('modal-1')
    },
    findPassword () {
      const auth = this.$firebase.auth()
      auth.sendPasswordResetEmail(this.findPasswordId)
        .then(() => {
          alert(`An email has been sent to [${this.findPasswordId}] address`)
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}      

</script>

<style>
textarea:focus,
button:focus {
  outline: none !important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}

#login {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/Loginbackground.svg');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 90vw 30vh;
  align-items: center;
  vertical-align: center;
}

.login-form-area {
  position: absolute;
  top: 6%;
}

.login-title {
  font-family: Helvetica;
  font-size: 2.88rem;
  color: #8954BA;
  margin-top : 2rem;
  margin-bottom: 0;
}

#login form {
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.00);
  box-shadow: 0 22px 46px 0 #E1EAFC;
  margin-top: 3.5rem;
}

.login-email,
.login-text,
.fullname-text {
  width: 50.7rem;
  border-radius: 0.2rem;
  font-size: 1.68rem;
  padding: 1.8rem 2.6rem;
  border: none;
}

.login-email {
  border-bottom: 0.1rem solid #DCE2F0;
  border-top: 0;
  border-right: 0;
  border-left: 0;
}

.fullname-text{
  border-bottom: 0.1rem solid #DCE2F0;
}

.login-text{
  border: none;
}

#login .sign-up {
  float: inline-end;
  background: #5D38DB;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
  border-radius: 2.4px;
  color: #ffffff;
  height: 5.5rem;
  width: 12rem;
  position: absolute;
  top: 51.5%;
  left: 89%;
  border: none;
  font-family: .SFNS-Regular;
  font-size: 1.68rem;
}

#login .login-button {
  float: inline-end;
  background: #5D38DB;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
  border-radius: 2.4px;
  color: #ffffff;
  height: 5.5rem;
  width: 12rem;
  position: absolute;
  top: 45%;
  left: 89%;
  border: none;
  font-family: .SFNS-Regular;
  font-size: 1.68rem;
}

.line {
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
}

.line:after {
  display: inline-block;
  margin: 0 0 3px 20px;
  height: 1px;
  content: "";
  text-shadow: none;
  background-color: var(--color-light-grey);
  width: 44%;
}

.line:before {
  display: inline-block;
  margin: 0 20px 3px 0;
  height: 1px;
  content: "";
  text-shadow: none;
  background-color: var(--color-light-grey);
  width: 44%;
}

.signing-up-text,
.find-password-text {
  font-size: 1.68rem;
  color: #8954BA;
  margin: 2rem;
}

.signing-up-text a, 
.find-password-text a {
  display: inline;
  text-decoration: underline;
  font-family: Helvetica;
  font-size: 1.68rem;
  color: #8954BA;
}

input[id='rememberme-checkbox'] {
  display: none;
}

input[id='rememberme-checkbox'] + label {
  background-color:rgb(255, 255, 255, 0);
  border: 0.1rem solid #8954BA;
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
  color: rgb(255, 255, 255, 0);
  margin: 0 1rem 0 0 ;
  position: relative;
  top: 0.3rem;
}

input[id='rememberme-checkbox']:checked + label { 
  color: #8954BA;
  width: 2rem;
  height: 2rem;
}

.rememberme-checkbox-div {
  width: 2rem;
  height: 2rem;
  margin: 0;
  padding: 0;
}

.rememberme-checkbox-v {
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
  position: relative;
  top: -0.35rem;
}

.rememberme-area {
  font-family: Helvetica;
  font-size: 1.68rem;
  color: #8954BA;
  margin-top: 1.5rem;
  display: flex;
  padding: 0 1.9rem;
}

.rememberme-area h3 {
  display: inline;
  margin: 0;
}

.remember-me {
  width: 100%;
  padding: 0;
  margin: 0;
}

.remember-me a {
  text-decoration: underline;
  margin-left: 0.5rem;
  color: #8954BA;  
}

.sign-in-with-google {
  width: 50.7rem;
  height: 2rem;
  background-color : white;
  border: none;
  font-size: 1.68rem;
  text-align: left;
  padding: 1.6rem 2rem;
  color:  #686868;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0.5rem 3rem 0 rgba(52,77,178,0.34);
}

.find-password-email {
  width: 20rem;
  border: 0.1rem solid var(--color-light-grey);
  padding: 0.5rem;
  border-radius: 0.2rem;
}

.login-view-togglebtn {
  text-decoration: underline;
  margin-left: 0.5rem;
  color: #8954BA;
  background-color: rgba(0,0,0,0);
  border: none;
}

</style>
