<template>
  <main id="edit-dashboard">
    <section id="page-title">
      <row>
        <column :lg="7" class="page-title">
          <div align="left" class="back">
            <router-link to="/editproject">
              <img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back
            </router-link>
          </div>
          <h1 class="title">INS Lessons - Edit</h1>
        </column>
        <column :lg="5" class="progress-summary">
          <span class="tap-to-edit-1" v-if="saveAimBtnShow === false">Tap to edit</span>
          <input type="button" class="doughnut-inputbox-1-saveBtn" v-if="saveAimBtnShow === true" @click="clearTextInput('doughnut-inputbox-1')"/>
          <input type="text" class="doughnut-inputbox-1" value="doughnut-inputbox-1" v-model="doughnutChartData1.subtitle1" @focus="changeTextColor" @keyup="getAimText(doughnutChartData1.subtitle1)"/>
          <div class="doughnut-1"><aim-doughnut-chart :doughnutChartData="doughnutChartData1"></aim-doughnut-chart></div>
          <span class="tap-to-edit-2" v-if="saveTimeBtnShow === false">Tap to edit</span>
          <input type="button" class="doughnut-inputbox-2-saveBtn" v-if="saveTimeBtnShow === true" @click="clearTextInput('doughnut-inputbox-2')"/>
          <input type="text" class="doughnut-inputbox-2"  value="doughnut-inputbox-2" v-model="doughnutChartData2.subtitle1" @focus="changeTextColor" @keyup="getTimeText(doughnutChartData2.subtitle1)"/>
          <div class="doughnut-2"><time-doughnut-chart :doughnutChartData="doughnutChartData2"></time-doughnut-chart></div>
        </column>
      </row>
    </section>
    <section class="edit-dashboard-select-area">
      <row :gutter="12" >
        <column :lg="1.5"><h3 class="edit-dashboard-selectbox-title-1">Select Country</h3></column>
        <column :lg="2.5" class="edit-dashboard-select-box">
          <selectbox-edit-dashboard
            :cssId="countryCssId"
            :selectedOption="selectedCountry"
            :selectboxOption="countries"
            @remove-option="removeSelectboxOption"
            @add-option="addSelectboxOption"
            @get-selectbox-text="getTextInput"
            @save-selectbox-option="saveSelectboxInput"/>
        </column>
        <column :lg="1.5"><h3 class="ins-select-camp">Select Camp</h3></column>
        <column :lg="2.5" class="edit-dashboard-select-box">
          <selectbox-edit-dashboard
            :cssId="campCssId"
            :selectedOption="selectedCamp"
            :selectboxOption="camps"
            @remove-option="removeSelectboxOption"
            @add-option="addSelectboxOption"
            @get-selectbox-text="getTextInput"
            @save-selectbox-option="saveSelectboxInput"/>
        </column>
        <column :lg="1.5"><h3 class="ins-select-school">Select School</h3></column>
        <column :lg="2.5" class="edit-dashboard-select-box">
          <selectbox-edit-dashboard
            :cssId="schoolCssId"
            :selectedOption="selectedSchool"
            :selectboxOption="schools"
            @remove-option="removeSelectboxOption"
            @add-option="addSelectboxOption"
            @get-selectbox-text="getTextInput"
            @save-selectbox-option="saveSelectboxInput"/>
        </column>
      </row>
    </section>
    <section :gutter="12" class="chart-title-area">
      <row class="chart-title">
        <column :lg="8" :xs="6"><h2 class="ins-sub-title">Number of lessons using INS {{country}} {{camp}} {{school}}</h2></column>
        <column class="chart-summary" :lg="4" :xs="6">
          <div class="total-lessons"> <span><h1>{{ totalLessons }}</h1> <h2>lessons</h2></span> <h3 style="font-family:'Source Sans Pro';">using INS</h3></div>
          <div class="growth-rate"> <h1>{{growthRate}}</h1> <h3 style="font-family:'Source Sans Pro';">in {{selectedYear}}</h3></div>
        </column>
      </row>
    </section>
    <section id="chart-area">
      <row :gutter="12" class="chart-main">
        <column :lg="8.16" class="line-chart-area">
          <h3> No of lessons in {{selectedYear}}</h3>
          <line-chart :chart-data="chartData" :options="options" v-if="linechartShow === true"></line-chart>
          <stacked-bar-chart id="stacked-bar-chart" :chart-data="stackedBarChartData" :options="stackedBarchartOption" v-if="stackedChartShow === true"></stacked-bar-chart>
          <column :lg="4" :xs="12" class="year-select-box" ><v-select :options="yearOptions" v-model="selectedYear" class="select-year" placeholder="Show all" :searchable="false"></v-select></column>
        </column>
        <column :lg="3.84" class="summary-area">
          <div class="country-wrapper" v-for="country in summaryBoxData" v-bind:key="country.vForId" :value="country.vForId">
            <div class="text-container">
              <input type="checkbox" v-bind:class="country.cssId" v-bind:id="country.cssId" v-bind:key="country.vForId" :value="country.vForId" v-model="checkedItems" style="display:none">
                <label v-bind:class="country.cssId" v-bind:for="country.cssId">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="justify-content:center; align-item:center;">
                    <span v-bind:class="country.cssId" v-bind:for="country.cssId" style="color:#ffffff; margin:2px 2px 2px 5px; width:10px; height:10px;">V</span>
                  </div>
                </label>
                <!-- Lessons summary start-->
                <div class="summary-text" v-bind:class="country.cssId" v-bind:for="country.cssId" v-if="linechartShow === true">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8' !important; display:flex; width:27.7rem; justify-content:space-between; align-items:flex-end;">
                    <div>
                      <h1 style="display: inline; color:'#D8D8D8'; font-family: Helvetica; font-size:3rem; font-weight:500;" v-bind:class="country.cssId" v-bind:for="country.cssId">
                        {{ country.totalLessons }}
                      </h1>
                      <h2 style="display: inline; color:'#D8D8D8'; font-family:'Source Sans Pro'; font-size:2.2rem;" v-bind:class="country.cssId" v-bind:for="country.cssId">lessons </h2>
                    </div>
                    <div class="summary-bar-chart-container" v-if="linechartShow === true" style="align-self:flex-end;">
                      <bar-chart id="bar-chart" class="barChart" :chart-data="barChartData[country.name]" :options="barchartOption"></bar-chart>
                    </div>
                  </div>
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="text-align:left; border:none; color:'#D8D8D8';">
                    <h2 style="font-family:'Source Sans Pro'; font-size:1.4rem; font-weight:300;">in {{country.vForId}}</h2>
                  </div>
                </div>
                <!-- Lessons summary end-->
                <!-- Topic summary -->
                <div class="summary-text" v-bind:class="country.cssId" v-bind:for="country.cssId" v-if="stackedChartShow === true">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8' !important; padding: 0;">
                      <h2 v-bind:class="country.cssId" v-bind:for="country.cssId">
                        {{ country.vForId }}
                      </h2>
                  </div>
                </div>
                <!-- Topic summary end -->
            </div>
          </div>
        </column>
      </row>
      <Table :tableData="tableData" v-if="linechartShow === true"></Table>
      <table-for-topic :TopicTableData="TopicTableData" v-if="stackedChartShow === true"></table-for-topic>
    </section>
  </main>
</template>

<script>
import LineChart from '../components/Chart/LineChart.js'
import BarChart from '../components/Chart/BarChart.js'
import StackedBarChart from '../components/Chart/StackedBarChart.js'
import AimDoughnutChart from '../components/Chart/AimDoughnutChart.vue'
import TimeDoughnutChart from '../components/Chart/TimeDoughnutChart.vue'
import Table from '../components/Table'
import TableForTopic from '../components/TableforTopic'
import SelectboxEditDashboard from '../components/SelectboxEditDashboard'
import { setYearSelectBox, getCountries, getLessons } from '../data/data-provider.js'
import { getAllPurpleColor, getLineChartColorScheme } from '../data/colour-scheme.js'
import { calcSum, compareDataByYear, getLineChartData, getTableData, getBarChartData } from '../data/data-handler'

export default {
  components: {
    LineChart,
    BarChart,
    Table,
    TableForTopic,
    StackedBarChart,
    AimDoughnutChart,
    TimeDoughnutChart,
    SelectboxEditDashboard
  },
  data () {
    return {
      viewMode: 'All',
      selectedCountry: null,
      countryCssId: 'country-selectbox',
      selectedCamp: null,
      campCssId: 'camp-selectbox',
      selectedSchool: null,
      schoolCssId: 'school-selectbox',
      selectedYear: 2019,
      chartData: {},
      saveAimBtnShow: false,
      saveTimeBtnShow: false,
      linechartShow: true,
      stackedChartShow: false,
      campSelectboxDisabled: true,
      schoolSelectboxDisabled: true,
      barChartData: [],
      stackedBarChartData: {},
      doughnutChartData1: {
        box: 'box1',
        title: 'Aim',
        subtitle1: '800',
        subtitle2: 'using INS',
        percentage: '87',
        insideText: 'complete',
        color: '#8954BA'
      },
      doughnutChartData2: {
        box: 'box2',
        title: 'Time',
        subtitle1: '3 years',
        subtitle2: '',
        percentage: '1',
        insideText: 'more year',
        color: '#0091FF'
      },
      tableData: [],
      TopicTableData: [],
      summaryBoxData: [],
      yearOptions: [],
      countries: ['Kenya', 'Tanzania', 'South Soudan', 'DR Congo'],
      camps: ['camp1', 'camp2', 'camp3', 'camp4'],
      schools: ['school1', 'school2', 'school3', 'school4'],
      country: '',
      camp: '',
      school: '',
      checkedItems: [],
      totalLessons: '',
      growthRate: '',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              color: '#ffffff'
            },
            ticks: {
              callback: function (value, index) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                value = months[index]
                return value
              }
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          labels: {
            boxWidth: 10,
            fontSize: 14,
            padding: 20,
            usePointStyle: true
          }
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']          
              return data.datasets[0].label + ' | ' + months[tooltipItem[0].index]
            },
            label: function (tooltipItem) {
              return tooltipItem.value + ' lessons'
            }
          }
        }
      },
      barchartOption: {
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem) {
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']          
              return months[tooltipItem[0].index]
            }
          }
        }
      },
      stackedBarchartOption: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              color: '#ffffff'
            },
            ticks: {
              callback: function (value, index) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                value = months[index]
                return value
              }
            }
          }],
          yAxes: [{
            stacked: true,
            suggestedMin: true,
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          labels: {
            boxWidth: 10
          }
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem) {
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']          
              return months[tooltipItem[0].index]
            }
          }
        }        
      },
      doughnutChartOption: {
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem) {
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']          
              return months[tooltipItem[0].index]
            }
          }
        }
      },      
    }
  },
  mounted () {
    this.showNavBar()
    this.countries = getCountries() // Set initial Country select box options
    this.yearOptions = setYearSelectBox() // Set initial Year select box options
    this.updateData()

    document.getElementsByClassName('doughnut-inputbox-1')[0].style.color = 'rgba(0, 0, 0, 0)'
    document.getElementsByClassName('doughnut-inputbox-2')[0].style.color = 'rgba(0, 0, 0, 0)'
  },
  methods: {
    showNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'inline'
    },
    updateData () {
      this.updateConditionalRendering()
      let lessons = {}
      let prevYearLessons = {}
      // let totalCurrLessons = []
      // let totalPrevLessons = []
      let tableLessons = {}
      let prevTableLessons = {}

      tableLessons = getLessons(getCountries(), [], [], this.selectedYear)
      prevTableLessons = getLessons(getCountries(), [], [], this.selectedYear - 1)
      if (this.checkedItems.length === 0) {
        lessons = getLessons([], [], [], this.selectedYear)
        prevYearLessons = getLessons([], [], [], this.selectedYear - 1)
        this.totalLessons = calcSum(Object.values(lessons.lessons[0]))
        this.growthRate = compareDataByYear(Object.values(prevYearLessons.lessons[0]), Object.values(lessons.lessons[0]))
        this.chartData = getLineChartData(lessons, getAllPurpleColor)
      } else {
        lessons = tableLessons
        this.chartData = this.filterChartData(getLineChartData(lessons, getLineChartColorScheme), this.checkedItems)
      }
      this.barChartData = getBarChartData(getTableData('Country', tableLessons, prevTableLessons))
      this.tableData = getTableData('Country', tableLessons, prevTableLessons)
      this.summaryBoxData = this.filterTopics(getTableData('Country', tableLessons, prevTableLessons))
      this.updateColors(this.viewMode, getLineChartColorScheme)
    },
    updateConditionalRendering () {
      this.linechartShow = true
      this.stackedChartShow = false
      this.camplSelectboxDisabled = true
      this.schoolSelectboxDisabled = true
      this.selectedCountry = null
      this.selectedCamp = null
      this.selectedSchool = null
      this.country = '- across countries'
      this.camp = ''
      this.school = ''
    },
    filterTopics (tableData) {
      const filtered = tableData.filter(el => el.totalLessons !== 0)
      return filtered
    },
    uncheckAllCheckboxes () {
      for (let i = 0; i < this.checkedItems.length; i++) {
        const checkedItem = this.checkedItems[i]
        const cssId = checkedItem.toLowerCase().replaceAll(' ', '-')
        const dom = document.getElementsByClassName(`${cssId}`)
        dom[0].checked = false
      }
      this.checkedItems = []
    },
    filterChartData (chartData, filter) {
      if (filter.length !== 0) {
        const filtered = chartData.datasets.filter(el => filter.indexOf(el.label) !== -1)
        chartData.datasets = filtered
      }
      return chartData
    },
    updateColors (view, colorScheme) {
      for (let i = 0; i < this.summaryBoxData.length; i++) {
        const cssId = this.summaryBoxData[i].cssId
        const dom = document.getElementsByClassName(`${cssId}`)
        if (dom.length !== 0 && dom[0].checked === true) {
          const checkedColor = colorScheme(this.summaryBoxData[i].colorIndex)
          dom[1].style.color = checkedColor // label
          dom[2].style.border = `1px solid ${checkedColor}` // connected div to checkbox
          dom[3].style.color = checkedColor // V
          dom[4].style.color = checkedColor // Topic text
          dom[9].style.color = checkedColor // Table name
        } else if (dom.length !== 0 && !dom[0].checked) {
          dom[1].style.color = '#D8D8D8'
          dom[2].style.border = '1px solid #D8D8D8'
          dom[3].style.color = '#ffffff'
          dom[4].style.color = '#D8D8D8'
          dom[9].style.color = '#212529'
        }
      }
    },
    saveSelectboxInput (cssId) {
      switch (cssId) {
        case 'country-selectbox':
          alert(`${this.countries} saved!`)
          break
        case 'camp-selectbox':
          alert(`${this.camps} saved!`)
          break
        case 'school-selectbox':
          alert(`${this.schools} saved!`)
          break
      }
    },
    addSelectboxOption (addedItem) {
      const selectboxType = addedItem.cssId
      switch (selectboxType) {
        case 'country-selectbox':
          this.countries.push(addedItem.item)
          break
        case 'camp-selectbox':
          this.camps.push(addedItem.item)
          break
        case 'school-selectbox':
          this.schools.push(addedItem.item)
          break
      }
    },
    removeSelectboxOption (removedItem) {
      const selectboxType = removedItem.cssId
      switch (selectboxType) {
        case 'country-selectbox':
          this.countries.splice(removedItem.index, 1)
          break
        case 'camp-selectbox':
          this.camps.splice(removedItem.index, 1)
          break
        case 'school-selectbox':
          this.schools.splice(removedItem.index, 1)
          break
      }
    },
    getTextInput (addedItem) {
      const selectboxType = addedItem.cssId
      switch (selectboxType) {
        case 'country-selectbox':
          this.countries.splice(addedItem.index, 1, addedItem.selectedOption)
          break
        case 'camp-selectbox':
          this.camps.splice(addedItem.index, 1, addedItem.selectedOption)
          break
        case 'school-selectbox':
          this.schools.splice(addedItem.index, 1, addedItem.selectedOption)
          break
      }
    },
    getAimText (aimText) {
      this.doughnutChartData1.subtitle1 = ''
      this.saveAimBtnShow = true
      const inputText = document.getElementsByClassName('doughnut-inputbox-1')
      inputText[0].style.color = '#686868'
      this.doughnutChartData1.subtitle1 = aimText
    },
    getTimeText (timeText) {
      this.doughnutChartData2.subtitle1 = ''
      this.saveTimeBtnShow = true
      const inputText = document.getElementsByClassName('doughnut-inputbox-2')
      inputText[0].style.color = '#686868'
      this.doughnutChartData2.subtitle1 = timeText
    },
    clearTextInput (value) {
      const inputText = document.getElementsByClassName(value)
      inputText[0].style.color = 'rgba(0, 0, 0, 0)'
      if (value === 'doughnut-inputbox-1') {
        this.saveAimBtnShow = false
      } else {
        this.saveTimeBtnShow = false
      }
      alert('Saved!')
    },
    changeTextColor (event) {
      const className = (event.target.className === 'doughnut-inputbox-1') ? 'doughnut-inputbox-1' : 'doughnut-inputbox-2'
      const inputText = document.getElementsByClassName(className)
      inputText[0].style.color = '#686868'
    }
  },
  watch: {
    checkedItems () {
      this.updateData()
    }
  }
}
</script>

<style>
main#edit-dashboard {
  display: flex;
  flex-direction: column;
  margin: 6.2rem 0 0 6.2rem;
  padding: 8rem 4.5rem 4.5rem 8rem;
  max-width: 1440px;
}

.navbar {
  background: white;
}

.back {
  padding: 1.5rem 0 1.5rem 0;
}

#edit-dashboard .title {
  font-family: Helvetica;
  font-size: 3.4rem;
  color: var(--color-purple);
  font-weight: 300;
  text-align: left;
  margin-top: 1rem;
}

#edit-dashboard #page-title {
  display: flex;
  flex-direction: column;
  align-self: left;
}

#edit-dashboard #page-title .container {
  max-width: 125.5rem !important;
  padding-right: 1.2rem !important;
}

#edit-dashboard .progress-summary .tap-to-edit-1 {
  position: relative;
  top: 2.6rem;
  left: 1.5rem;
  color: #686868;
}

#edit-dashboard .progress-summary .tap-to-edit-2 {
  position: relative;
  top: 2.63rem;
  left: 3.5rem;
  color: #686868;
}

.doughnut-inputbox-1 {
  position: relative;
  top: 2.25rem;
  left: 2.2rem;
  width: 2.4rem;
  height: 1.8rem;
  background-color: rgba(245, 247, 252, 0);
  color: #686868;
  border: none;
  border-bottom: 1px solid #686868;
  font-size: 1.1rem;
}

.doughnut-inputbox-2 {
  position: relative;
  font-size: 1rem;
  top: 2.2rem;
  left: 5.3rem;
  width: 3.5em;
  height: 2rem;
  background-color: rgb(245, 247, 252, 0);
  color: #686868;
  border: none;
  border-bottom: 1px solid #686868;
  font-size: 1.2rem;
}

.doughnut-inputbox-1-saveBtn,
.doughnut-inputbox-2-saveBtn,
.doughnut-inputbox-1:focus,
.doughnut-inputbox-2:focus {
  background-color: rgb(245, 247, 252);
  outline: none;
}

.doughnut-inputbox-1-saveBtn {
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  font-size: 3.5rem;
  width: 3rem;
  height: 3rem;
  color: #8954BA;
  box-shadow: 0 7px 20px 0 rgba(159,168,214,0.59);
  position: relative;
  right: -1.5rem;
  top: 2rem;
  padding: 0;
  background-image: url('../assets/ObjectSaveBtn.svg');
  background-position: 51% 25%;
  background-size: 5.5em 5.5rem;
}

.doughnut-inputbox-2-saveBtn {
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  font-size: 3.5rem;
  width: 3rem;
  height: 3rem;
  color: #8954BA;
  box-shadow: 0 7px 20px 0 rgba(159,168,214,0.59);
  position: relative;
  right: -3.5rem;
  top: 2rem;
  padding: 0;
  background-image: url('../assets/ObjectSaveBtn.svg');
  background-position: 54% 25%;
  background-size: 5.5rem 5.5rem;
}

#edit-dashboard .progress-summary{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

#edit-dashboard .back {
  padding-bottom: 3rem;
  align-items: center;
}

#edit-dashboard .back a {
  color: var(--color-dark-grey);
  font-size: 1.2rem;
}

#edit-dashboard .title {
  padding-bottom: 2rem;
}

.edit-dashboard-select-box {
  height: 10rem;
}

.editdashboard-dropbox-form {
  display: flex;
  justify-content: flex-end;
  height: 9rem;
}


/* select box area start */
#edit-dashboard .edit-dashboard-select-area {
  max-width: 125.5rem !important;
  margin-top: 5rem;
  align-items: center;
}

#edit-dashboard .edit-dashboard-select-area .container {
  max-width: 125.5rem !important;
  align-items: flex-end;
}

#edit-dashboard .edit-dashboard-select-area h3 {
  font-size: 1.4rem;
  color: #858585;
  margin: 0;
}

#edit-dashboard .edit-dashboard-selectbox-title-1 {
  margin: 0;
  padding: 0;
  text-align: left;
}

#edit-dashboard .ins-select-camp {
  text-align:right;
  margin: 0 1rem 0 0
}

#edit-dashboard .ins-select-school {
  text-align:right;
  margin:0 1rem 0 0;
}


#edit-dashboard .chart-title-area {
  display: flex;
  color: var(--color-purple);
  margin-top: 3rem;
}

#edit-dashboard .ins-sub-title {
  font-size: 2.88rem;
  font-family: 'Source Sans Pro';
  font-weight: 300 !important;
}

#edit-dashboard .chart-summary {
  display: flex;
  flex-direction: row;
}

#edit-dashboard .growth-rate {
  margin-left: 2rem;
}

#edit-dashboard .growth-rate h3 {
  font-size: 1rem;
  font-weight: 100;
}

#edit-dashboard .total-lessons {
  display: flex;
  flex-direction: column;
  padding-left: 7rem;
  padding-right: 2rem;
}

#edit-dashboard .total-lessons span {
  align-self: start;
}

#edit-dashboard .total-lessons h1,
#edit-dashboard .total-lessons h2,
#edit-dashboard .total-lessons h3 {
  display: inline;
  color: var(--color-purple);
}

#edit-dashboard .total-lessons h1 {
  margin-right: 1rem;
  font-size:3rem;
  font-weight: 500;
}

#edit-dashboard .total-lessons h2 {
  font-size: 2.2rem;
  font-weight: 300;
}

#edit-dashboard .total-lessons h3 {
  text-align: left;
  font-size: 1.4rem;
  font-weight: 100;
}

#edit-dashboard .growth-rate h1 {
  font-size: 3rem;
  font-weight: 500;
}

#edit-dashboard .growth-rate h3 {
  font-size: 1.4rem;
}

#edit-dashboard .container {
  max-width: 125.5rem !important;
  padding: 0 !important;
  margin: 0 !important;
}

#edit-dashboard #chart-area {
  margin-top: 4rem;
  padding: 0 2rem 3.5rem 2rem;
  max-width: 125.3rem;
  background-color: #ffffff;
}

#edit-dashboard .chart-title {
  display: flex;
  padding: 0 !important;
}

#edit-dashboard .chart-title h2 {
  text-align:left;
  margin: 0;
  color: var(--color-purple)
}

#edit-dashboard .line-chart-area {
  padding: 0 0 0 0 !important;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-light-grey);
}

#edit-dashboard .data-v-300908ca .chartjs-size-monitor {
  position: relative !important;
}

#edit-dashboard canvas#line-chart.chartjs-render-monitor {
  padding: 0 1.8rem 0 2rem;
  margin: 0 0 0 0 !important;
  max-width: 80rem !important;
  max-height: 43.8rem !important;
}

#edit-dashboard .line-chart-area h3 {
  font-family: Source Sans Pro;
  font-size: 1.2rem;
  letter-spacing: -0.01px;
  text-align: left;
  margin: 2.5rem 0 1.5rem 2.5rem;
}

#edit-dashboard .summary-area {
  display: flex;
  flex-direction: column;
  max-height: 40rem;
  overflow-y: auto;
  border: none;
  align-items: left;
  margin: 8rem 0 5rem 0;
}

#edit-dashboard .summary-area::-webkit-scrollbar {
  width: 4px;
  height: 355px;
  background-color: rgba(216, 216, 216, 0.4);
}

#edit-dashboard .summary-area::-webkit-scrollbar-thumb {
  width: 4px;
  height: 60px;
  background-color: #d8d8d8;
}

#edit-dashboard .text-container {
  display: flex;
  /* height: 80%; */
  width: 100%;
}

#edit-dashboard .summary-text{
  color: #D8D8D8;
}

#edit-dashboard .summary-text h1 {
  margin: 0 0 0 0;
}

#edit-dashboard .summary-text h2 {
  display: inline;
  margin: 0 0.5rem 0 0;
  color:'#D8D8D8';
  font-size: 2rem;
}

#edit-dashboard .summary-bar-chart-container {
  display: flex;
  padding-left: 1.5rem;
}

#edit-dashboard .year-select-box {
  align-self: flex-end;
  margin: 1rem 3.5rem 0 0;
}

#edit-dashboard .year-select-box .vs__dropdown-toggle {
  background-color: #ffffff;
  border: none;
  font-size: 1.4rem;
  min-width: 12rem;
  padding-left: 1rem;
}

#edit-dashboard .year-select-box .vs__dropdown-menu {
  background-color:  #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.4rem;
  min-width: 12rem !important;
  color: #686868;
}

.vs__dropdown-menu .vs__search{
  border: none;
}

#edit-dashboard .summary-area #bar-chart #bar-chart {
  width: 100px !important;
  height: 50px !important;
}

#edit-dashboard #stacked-bar-chart canvas#bar-chart.chartjs-render-monitor {
  padding: 0 1.3rem 0 2rem;
  width: 80rem !important;
  height: 43.8rem !important;
}

#edit-dashboard .country-wrapper {
  display: flex;
  align-items: center;
  height: 8rem;
  width: 35rem;
  padding: 1rem 0 1rem 2.75rem;
}

#edit-dashboard .text-container {
  display: flex;
  flex-direction: row;
  text-align: left;
  color: var(--color-light-grey);
  align-items: center;
}

#edit-dashboard .text-container label div {
  display:flex;
  width:2rem;
  height:2rem;
  background:white;
  border:1px solid var(--color-light-grey);
  cursor:pointer;
  border-radius: 3px;
  margin: 0 1rem 0 0;
}

#edit-dashboard .table-responsive {
  display: flex;
  color: var(--color-dark-grey);
  overflow: hidden;
  max-width: 144rem;
  margin-top: 3rem;
  padding: 0 0.8rem 0 0.8rem;
}

#edit-dashboard table#table-content tr {
  width: 100%;
}

#edit-dashboard table#table-content th {
  vertical-align: middle;
}

#edit-dashboard table#table-content td {
  vertical-align: middle;
}

#edit-dashboard #country-name {
  font-weight: 500;
}

#edit-dashboard .monthly-data {
  font-weight: 200;
}

#edit-dashboard #table-content {
  margin-top: 3rem;
  font-size: 1.2rem;
  width: 100%;
}

#edit-dashboard #table-content thead th {
  border-bottom: none;
}

#edit-dashboard #table-content.thead{
  width: 100%;
}

#edit-dashboard #table-content .thead {
  width: 100%;
}

#edit-dashboard .sort-button {
  margin-left: 0.7rem;
}

</style>
