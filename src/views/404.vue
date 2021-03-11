<template>
  <div class="four-o-four">
    <main id="four-o-four">
      <section class="four-o-four-section">
        <h1 class="login-title">Please login before access this page</h1>
        <input @click="goToLogin" type="button" class="sign-up" value="Go to Login page"/>
      </section>
    </main>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'four-o-four',
  // components: {
  // },
  // data () {
  //   return {
  //   }
  // },
  // mounted () {
  // },
  methods: {
    goToLogin () {
      router.push('/login')
    }
  }
}      

</script>

<style>
#four-o-four {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/Loginbackground.svg');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 90vw 30vh;
  justify-content: center;
  align-items: center;
  vertical-align: center;
}

.four-o-four .sign-up {
  float: inline-end;
  background: #5D38DB;
  box-shadow: 0 14px 42px 0 rgba(52,77,178,0.34);
  border-radius: 2.4px;
  color: #ffffff;
  height: 5.5rem;
  width: 20rem;
  border: none;
  font-family: .SFNS-Regular;
  font-size: 1.68rem;
  margin-top: 3rem;
}
</style>
