<template>
  <div class="home">
    <main id="home">
      <section id="filtering-area" >
        <row :gutter="12" class="select-programm-area">
          <column :lg="2.5" :xs="2"><h3>Select programme</h3></column>
          <column :lg="3" :xs="2">
            <v-select class="dashboard-select" placeholder="Homelessness funds" :searchable="false">
              <span slot="no-options">
                <h3 style="text-align:left; padding-left: 1.8rem; color:#686868; font-family: Helvetica; font-size:1.68rem;">No more available options</h3> 
              </span>
            </v-select>
          </column>
          <column :lg="1" :xs="1"><img src="../../src/assets/Grid.svg" alt="grid" class="grid"/></column>
          <column :lg="0.5" :xs="1"><img src="../../src/assets/List.svg" class="list"/></column>
        </row>
      </section>
      <section id="thumbnail-area">
        <row :gutter="12">
          <h1>See the impact of your work</h1>
        </row>
        <row :gutter="12" id="thumbnails">
          <router-link to="/employment">
            <column class="thumbnail-tile" :lg="4">
              <div class="link-title">
                <h1>Tenants in employment</h1>
                <h1 style="color:#8954BA;">{{growthRate1}}</h1>
              </div>
              <div class="link-sub-title">Positive progress</div>
              <img src="../../src/assets/dummy1.svg"/>
              <h3>Showing data till {{lastUpdate}}</h3>
            </column>
          </router-link>
          <router-link to="/tenants">
            <column class="thumbnail-tile" :lg="4">
              <div class="link-title">
                <h1>Avg tenants stay</h1>
                <h1 style="color:#8954BA;">{{growthRate2}}</h1>
              </div>
              <div class="link-sub-title">Positive move on</div>
              <img src="../../src/assets/dummy2.svg"/>
              <h3>Showing data till {{lastUpdate}}</h3>
            </column>
          </router-link>
          <router-link to="/employment">
            <column class="thumbnail-tile" :lg="4">
              <div class="link-title">
                <h1>Tenants’ savings</h1>
                <h1 style="color:#8954BA;">{{growthRate3}}</h1>
              </div>
              <div class="link-sub-title">Positive move on</div>
              <img src="../../src/assets/dummy3.svg"/>
              <h3>Showing data till {{lastUpdate}}</h3>
            </column>
          </router-link>
        </row>
        <row :gutter="12" id="thumbnails">
          <router-link to="/employment">
            <column class="thumbnail-tile" :lg="4">
              <div class="link-title">
                <h1>Payments on time</h1>
                <h1 style="color:#8954BA;">{{growthRate4}}</h1>
              </div>
              <div class="link-sub-title">Maintaining home</div>
              <img src="../../src/assets/dummy3.svg"/>
              <h3>Showing data till {{lastUpdate}}</h3>
            </column>
          </router-link>
        </row>        
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
export default {

  name: 'home',
  components: {
    // LinkPrevue
  },
  data () {
    return {
      dashboardName: 'INS Lessons',
      lastUpdate: '31/12/2019',
      growthRate1: '+56%',
      growthRate2: '18 months',
      growthRate3: '+38%',
      growthRate4: '+38%'
    }
  },
  mounted () {
    this.showNavBar()
  },
  methods: {
    showNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'inline'
    }
  }
}
</script>

<style>

main#home {
  display: flex;
  flex-direction: column;
  margin: 6.2rem 0 0 6.2rem;
  padding: 6.5rem 4.5rem 4.5rem 9rem;
  max-width: 1440px;
}

.select-programm-area {
  align-items: center;
}

.container {
  padding: 0;
  margin: 0;
}

#filtering-area {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
}

#filtering-area h3 {
  color: var(--color-dark-grey);
  font-size: 1.68rem;
  text-align: right;
  margin-right: 2rem;
}

#filtering-area .container {
  justify-content: flex-end;
  width: 100%;
}

.grid {
  margin-left: 1rem;
  margin-right: 1rem;
}

.container[data-v-42e9a5e0] {
  margin: 0 !important;
  padding: 0 !important;
}

/* selectbox design customizing start */
#home .vs__dropdown-toggle {
  height: 4.68rem;
  width: 29.04rem;
  background-color: #ffffff;
  border: none;
  font-size: 1.68rem;
  color: #686868;
  padding-left: 1rem;
}

#home .vs__dropdown-menu {
  background-color: #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.68rem;
  width: 29.04rem !important;
}

#home .vs__search {
  margin: 0;
  padding: 0;
}

#home .vs__selected {
  margin: 0;
  padding: 0;
}

/* selectbox design customizing end */

#thumbnails a {
  text-decoration: none;
}

#thumbnails .container {
  padding: 0rem !important;
}

.thumbnail-tile {
  background-color: #ffffff;
  width: 32.4rem;
  height: 32.8rem;
  margin-top: 4.5rem;
  margin-right: 4.2rem;
  padding: 2.2rem 2.5rem 2.8rem 1.9rem !important;
  box-shadow: -13px 11px 25px 0 #adb6d92b;
}

.thumbnail-tile img {
  margin-top: 1.5rem;
  margin-bottom: 1.6rem;
  width: 27.9rem;
  height: 18.1rem;
  border: 1px solid  var(--color-light-grey);
}

.thumbnail-tile h1 {
  display: inline;
  font-family: Helvetica;
  font-size: 2.16rem;
  color: var(--color-dark-grey);
}

.thumbnail-tile h3 {
  font-family: Helvetica;
  font-size: 1.68rem;
  margin: 0;
  color: #A6A7A8;
  text-align: left;
}

.link-title {
display: flex;
justify-content:space-between;
}

.link-sub-title {
  font-family: Helvetica;
  font-size: 1.8rem;
  color: #8954BA;
  line-height: 2.4rem;
  text-align: left;
}

</style>
