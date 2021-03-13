<template>
  <main id="employment">
    <section id="page-title">
      <row>
        <column :lg="8" class="page-title">
          <div align="left" class="back">
            <router-link to="/">
              <img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back
            </router-link>
          </div>
          <h1 class="title">Positive progress - Employment status</h1>
        </column>
        <column :lg="4" class="progress-summary">
          <div class="doughnut-1"><aim-doughnut-chart :doughnutChartData="doughnutChartData1"></aim-doughnut-chart></div>
          <div class="doughnut-2"><time-doughnut-chart :doughnutChartData="doughnutChartData2"></time-doughnut-chart></div>
        </column>
      </row>
    </section>
    <section class="employment-select-area">
      <row :gutter="12" >
        <column :lg="1.5"><h3 class="employment-select-country">Select status</h3></column>
        <column :lg="2.5" class="employment-select-box">
          <v-select :options="employmentStatus" v-model="selectedCountry" placeholder="Show all" :searchable="false">
          </v-select>
        </column>
        <column :lg="1.5"><h3 class="employment-select-camp">Select fund</h3></column>
        <column :lg="2.5" class="employment-select-box">
          <v-select :options="camps" v-model="selectedCamp" class="select-camp" placeholder="Select country to activate" :searchable="false" :disabled="campSelectboxDisabled">
            <span slot="no-options">
              <h3>No more available options</h3>
            </span>
          </v-select>
        </column>
        <column :lg="1.5"><h3 class="employment-select-school">Select  demographic</h3></column>
        <column :lg="2.5" class="employment-select-box">
          <v-select :options="schools" v-model="selectedSchool" class="select-school" placeholder="Select camp to activate" :searchable="false" :disabled="schoolSelectboxDisabled">
            <span slot="no-options">
              <h3 style="text-align:left; padding-left: 1.8rem; color:#686868; font-family: Helvetica; font-size:1.4rem;">No more available options</h3> 
            </span>            
          </v-select>
        </column>
      </row>
    </section>
    <section :gutter="12" class="chart-title-area">
      <row class="chart-title">
        <column :lg="8" :xs="6"><h2 class="employment-sub-title">Employment status {{country}} {{camp}} {{school}}</h2></column>
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
import {setYearSelectBox, getCountries, getCamps, getSchools, getLessons, getLessonsByTopics, getTotalLessonsByCountry, getTotalLessonsByCamp } from '../data/data-provider.js'
import { getAllPurpleColor, getLineChartColorScheme } from '../data/colour-scheme.js'
import { calcSum, compareDataByYear, getLineChartData, getTableData, getBarChartData, getStackedBarChartData } from '../data/data-handler'

export default {
  components: {
    LineChart,
    BarChart,
    Table,
    TableForTopic,
    StackedBarChart,
    AimDoughnutChart,
    TimeDoughnutChart
  },
  data () {
    return {
      viewMode: 'All',
      selectedCountry: null,
      selectedCamp: null,
      selectedSchool: null,
      selectedYear: 2019,
      chartData: {},
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
      employmentStatus: [],
      camps: [],
      schools: [],
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
                const fundNames = [
                "RLPF1 - St Mungo’s",
                "RLPF2 - St Mungo’s",
                "NHPF 1 - Oxford",
                "NHPF 1 - Bristol",
                "NHPF 1 - Lancaster",
                "NHPF 1 - Manchester"
                ]
                value = fundNames[index]
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
              const fundNames = [
                "RLPF1 - St Mungo’s",
                "RLPF2 - St Mungo’s",
                "NHPF 1 - Oxford",
                "NHPF 1 - Bristol",
                "NHPF 1 - Lancaster",
                "NHPF 1 - Manchester"
              ]          
              return fundNames[tooltipItem[0].index]
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
    this.employmentStatus = getCountries() // Set initial Country select box options
    this.yearOptions = setYearSelectBox() // Set initial Year select box options        
    this.updateData()
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
      let totalCurrLessons = []
      let totalPrevLessons = []
      let tableLessons = {}
      let prevTableLessons = {}

      switch (this.viewMode) {
        case 'All':
          tableLessons = getLessons(getCountries(), [], [], this.selectedYear)
          prevTableLessons = getLessons(getCountries(), [], [], this.selectedYear - 1)
          console.log(tableLessons, prevTableLessons)
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
          this.barChartData = getBarChartData(getTableData('Status', tableLessons, prevTableLessons))
          this.tableData = getTableData('Status', tableLessons, prevTableLessons)
          this.summaryBoxData = this.filterTopics(getTableData('Status', tableLessons, prevTableLessons))
          this.updateColors(this.viewMode, getLineChartColorScheme)
          break

        case 'Country':
          tableLessons = getLessons([this.selectedCountry], getCamps(this.selectedCountry), [], this.selectedYear)
          prevTableLessons = getLessons([this.selectedCountry], getCamps(this.selectedCountry), [], this.selectedYear - 1)
          if (this.checkedItems.length === 0) {
            lessons = getTotalLessonsByCountry(this.selectedCountry, this.selectedYear)
            prevYearLessons = getTotalLessonsByCountry(this.selectedCountry, this.selectedYear - 1)
            this.chartData = getLineChartData(lessons, getAllPurpleColor)
          } else {
            lessons = getLessons([this.selectedCountry], getCamps(this.selectedCountry), [], this.selectedYear)
            prevYearLessons = getLessons([this.selectedCountry], getCamps(this.selectedCountry), [], this.selectedYear - 1)
            this.chartData = this.filterChartData(getLineChartData(lessons, getLineChartColorScheme), this.checkedItems)
          }
          totalCurrLessons = lessons.lessons.flatMap(el => Object.values(el))
          totalPrevLessons = prevYearLessons.lessons.flatMap(el => Object.values(el))
          this.totalLessons = calcSum(totalCurrLessons)
          this.growthRate = compareDataByYear(totalPrevLessons, totalCurrLessons)
          this.barChartData = getBarChartData(getTableData('Fund', tableLessons, prevTableLessons))
          this.tableData = getTableData('Fund', tableLessons, prevTableLessons)
          this.summaryBoxData = this.filterTopics(getTableData('Fund', tableLessons, prevTableLessons))
          this.updateColors(this.viewMode, getLineChartColorScheme)
          break

        case 'Camp':
          // table lessons data
          tableLessons = getLessons([this.selectedCountry], [this.selectedCamp], getSchools(this.selectedCountry, this.selectedCamp), this.selectedYear)
          prevTableLessons = getLessons([this.selectedCountry], [this.selectedCamp], getSchools(this.selectedCountry, this.selectedCamp), this.selectedYear - 1)
          
          if (this.checkedItems.length === 0) {
            lessons = getTotalLessonsByCamp(this.selectedCountry, this.selectedCamp, this.selectedYear)
            prevYearLessons = getTotalLessonsByCamp(this.selectedCountry, this.selectedCamp, this.selectedYear - 1)
            this.chartData = getLineChartData(lessons, getAllPurpleColor)
          } else {
            lessons = getLessons([this.selectedCountry], [this.selectedCamp], getSchools(this.selectedCountry, this.selectedCamp), this.selectedYear)
            prevYearLessons = getLessons([this.selectedCountry], [this.selectedCamp], getSchools(this.selectedCountry, this.selectedCamp), this.selectedYear - 1)
            this.chartData = this.filterChartData(getLineChartData(lessons, getLineChartColorScheme), this.checkedItems)
          }
          totalCurrLessons = lessons.lessons.flatMap(el => Object.values(el))
          totalPrevLessons = prevYearLessons.lessons.flatMap(el => Object.values(el))
          this.totalLessons = calcSum(totalCurrLessons)
          this.growthRate = compareDataByYear(totalPrevLessons, totalCurrLessons)
          this.barChartData = getBarChartData(getTableData('Schools', tableLessons, prevTableLessons))
          this.tableData = getTableData('Schools', tableLessons, prevTableLessons)
          this.summaryBoxData = this.filterTopics(getTableData('Schools', tableLessons, prevTableLessons))
          this.updateColors(this.viewMode, getLineChartColorScheme)
          break

        case 'School':
          lessons = getLessonsByTopics([this.selectedCountry], [this.selectedCamp], [this.selectedSchool], this.selectedYear)
          prevYearLessons = getLessonsByTopics([this.selectedCountry], [this.selectedCamp], [this.selectedSchool], this.selectedYear - 1)
          totalCurrLessons = lessons.lessons.flatMap(el => Object.values(el))
          totalPrevLessons = prevYearLessons.lessons.flatMap(el => Object.values(el))
          this.totalLessons = calcSum(totalCurrLessons)
          this.growthRate = compareDataByYear(totalPrevLessons, totalCurrLessons)
          this.stackedBarChartData = this.filterChartData(getStackedBarChartData(lessons, getLineChartColorScheme), this.checkedItems)
          this.TopicTableData = getTableData('Topics', lessons, prevYearLessons)
          this.summaryBoxData = this.filterTopics(getTableData('Topics', lessons, prevYearLessons)) // for checkbox rendering
          this.updateColors(this.viewMode, getLineChartColorScheme)
          break
      }
    },
    updateConditionalRendering () {
      switch (this.viewMode) {
        case 'All':
          this.linechartShow = true
          this.stackedChartShow = false
          this.camplSelectboxDisabled = true
          this.schoolSelectboxDisabled = true
          this.selectedCountry = null
          this.selectedCamp = null
          this.selectedSchool = null
          this.country = '- all, across funds'
          this.camp = ''
          this.school = ''
          break
        case 'Country':
          this.linechartShow = true
          this.stackedChartShow = false
          this.campSelectboxDisabled = false
          this.schoolSelectboxDisabled = true
          this.selectedCamp = null
          this.selectedSchool = null
          this.camps = getCamps(this.selectedCountry)
          this.country = '- ' + this.selectedCountry
          this.camp = ''
          this.school = ''
          break
        case 'Camp':
          this.linechartShow = true
          this.stackedChartShow = false
          this.campSelectboxDisabled = false
          this.schoolSelectboxDisabled = false
          this.selectedSchool = null
          this.schools = getSchools(this.selectedCountry, this.selectedCamp)
          this.camp = ', ' + this.selectedCamp
          this.school = ''
          break
        case 'School':
          this.linechartShow = false
          this.stackedChartShow = true
          this.campSelectboxDisabled = false
          this.schoolSelectboxDisabled = false
          this.school = ', ' + this.selectedSchool
          break
      }
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
      const tableFontDomIndex = view === 'School' ? 7 : 9
      for (let i = 0; i < this.summaryBoxData.length; i++) {
        const cssId = this.summaryBoxData[i].cssId
        const dom = document.getElementsByClassName(`${cssId}`)
        if (dom.length !== 0 && dom[0].checked === true) {
          const checkedColor = colorScheme(this.summaryBoxData[i].colorIndex)
          dom[1].style.color = checkedColor // label
          dom[2].style.border = `1px solid ${checkedColor}` // connected div to checkbox
          dom[3].style.color = checkedColor // V
          dom[4].style.color = checkedColor // Topic text
          dom[tableFontDomIndex].style.color = checkedColor // Table name
        } else if (dom.length !== 0 && !dom[0].checked) {
          dom[1].style.color = '#D8D8D8'
          dom[2].style.border = '1px solid #D8D8D8'
          dom[3].style.color = '#ffffff'
          dom[4].style.color = '#D8D8D8'
          dom[tableFontDomIndex].style.color = '#212529'
        }
      }
    }
  },
  watch: {
    checkedItems () {
      this.updateData()
    },
    selectedYear () {
      this.uncheckAllCheckboxes()
      this.updateData()
    },
    selectedCountry () {
      if (this.selectedCountry === null) {
        this.viewMode = 'All'
        this.uncheckAllCheckboxes()
        this.updateData()
      } else {
        this.viewMode = 'Country'
        this.uncheckAllCheckboxes()
        this.updateData()
      }
    },
    selectedCamp () {
      if (this.selectedCamp === null) {
        this.viewMode = 'Country'
        this.uncheckAllCheckboxes()
        this.updateData()
      } else {
        this.viewMode = 'Camp'
        this.uncheckAllCheckboxes()
        this.updateData()
      }
    },
    selectedSchool () {
      if (this.selectedSchool === null) {
        this.viewMode = 'Camp'
        this.uncheckAllCheckboxes()
        this.updateData()
      } else {
        this.viewMode = 'School'
        this.uncheckAllCheckboxes()
        this.updateData()
      }
    }
  }
}
</script>

<style>
main#employment {
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

.title {
  font-family: Helvetica;
  font-size: 3.4rem;
  color: var(--color-purple);
  font-weight: 300;
  text-align: left;
}

#page-title {
  display: flex;
  flex-direction: column;
  align-self: left;
}

#page-title .container {
  max-width: 125.5rem !important;
  padding-right: 1.2rem !important;
}

.doughnut-1 {
  padding-right: 4.2825rem;
}

.doughnut-2 {
  padding-left: 4.2825rem;
}

.progress-summary{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.back {
  padding-bottom: 3rem;
  align-items: center;
}

.back a {
  color: var(--color-dark-grey);
  font-size: 1.2rem;
}

.title {
  padding-bottom: 2rem;
}

/* select box area start */
.employment-select-area {
  max-width: 125.5rem !important;
}

.employment-select-area .container {
  max-width: 125.5rem !important;
  align-items: center;
}

.employment-select-area h3 {
  font-size: 1.4rem;
  color: #858585;
  margin: 0;
}

.employment-select-country {
  margin: 0;
  padding: 0;
  text-align: left;
}

.employment-select-camp {
  text-align:right;
  margin: 0 1rem 0 0
}

.employment-select-school {
  text-align:right;
  margin:0 1rem 0 0;
}

/* select box area end */

/* selectbox design customizing start */
#employment .employment-select-area .vs__dropdown-toggle {
  width: 24.2rem;
  height: 3.9rem;
  background-color: #ffffff;
  border: none;
  font-size: 1.68rem;
  color: #686868;
  padding-left: 1rem;
}

#employment .employment-select-area .vs__dropdown-menu {
  background-color: #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.68rem;
  width: 24.2rem !important;
  color: #686868;
}

#employment .employment-select-area .vs--disabled .vs__dropdown-toggle {
  background-color: rgba(255, 255, 255, 0.40);
  font-size: 14px;
  color: rgba(104,104,104,0.40) !important; 
}

#employment .employment-select-area .vs--disabled .vs__search {
  background-color: rgba(255, 255, 255, 0.40);
  font-size: 14px;
  color: rgba(104,104,104,0.40) !important; 
}

#employment .year-select-box .vs__dropdown-toggle {
  background-color: #ffffff;
  border: none;
  font-size: 1.4rem;
  min-width: 12rem;
  padding-left: 1rem;
}

#employment .year-select-box .vs__dropdown-menu {
  background-color:  #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.4rem;
  min-width: 12rem !important;
  color: #686868;
}

#employment .vs__search {
  margin: 0;
  padding: 0;
  color: #686868;    
}

#employment .vs__selected {
  margin: 0;
  padding: 0;
  color: #686868;  
}
/* selectbox design customizing end */

.chart-title-area {
  display: flex;
  color: var(--color-purple);
  margin-top: 3rem;
}

.employment-sub-title {
  font-size: 2.88rem;
  font-family: 'Source Sans Pro';
  font-weight: 300 !important;
}

.chart-summary {
  display: flex;
  flex-direction: row;
}

.growth-rate {
  margin-left: 2rem;
}

.growth-rate h3 {
  font-size: 1rem;
  font-weight: 100;
}

.total-lessons {
  display: flex;
  flex-direction: column;
  padding-left: 7rem;
  padding-right: 2rem;
}

.total-lessons span {
  align-self: start;
}

.total-lessons h1,
.total-lessons h2,
.total-lessons h3 {
  display: inline;
  color: var(--color-purple);
}

.total-lessons h1 {
  margin-right: 1rem;
  font-size:3rem;
  font-weight: 500;
}

.total-lessons h2 {
  font-size: 2.2rem;
  font-weight: 300;
}

.total-lessons h3 {
  text-align: left;
  font-size: 1.4rem;
  font-weight: 100;
}

.growth-rate h1 {
  font-size: 3rem;
  font-weight: 500;
}

.growth-rate h3 {
  font-size: 1.4rem;
}

.container {
  max-width: 125.5rem !important;
  padding: 0 !important;
  margin: 0 !important;
}

#chart-area {
  margin-top: 4rem;
  padding: 0 2rem 3.5rem 2rem;
  max-width: 125.3rem;
  background-color: #ffffff;
}

.chart-title {
  display: flex;
  padding: 0 !important;
}

.chart-title h2 {
  text-align:left;
  margin: 0;
  color: var(--color-purple)
}

.line-chart-area {
  padding: 0 0 0 0 !important;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-light-grey);
}

.data-v-300908ca .chartjs-size-monitor {
  position: relative !important;
}

canvas#line-chart.chartjs-render-monitor {
  padding: 0 1.8rem 0 2rem;
  margin: 0 0 0 0 !important;
  max-width: 80rem !important;
  max-height: 43.8rem !important;
}

.line-chart-area h3 {
  font-family: Source Sans Pro;
  font-size: 1.2rem;
  letter-spacing: -0.01px;
  text-align: left;
  margin: 2.5rem 0 1.5rem 2.5rem;
}

#employment .summary-area {
  display: flex;
  flex-direction: column;
  max-height: 40rem;
  overflow-y: auto;
  border: none;
  align-items: left;
  margin: 8rem 0 5rem 0;
}

#employment .summary-area::-webkit-scrollbar {
  width: 4px;
  height: 355px;
  background-color: rgba(216, 216, 216, 0.4);
}

#employment .summary-area::-webkit-scrollbar-thumb {
  width: 4px;
  height: 60px;
  background-color: #d8d8d8;
}

.text-container {
  display: flex;
  /* height: 80%; */
  width: 100%;
}

.summary-text{
  color: #D8D8D8;
}

.summary-text h1 {
  margin: 0 0 0 0;
}

.summary-text h2 {
  display: inline;
  margin: 0 0.5rem 0 0;
  color:'#D8D8D8';
  font-size: 2rem;
}

.summary-bar-chart-container {
  display: flex;
  padding-left: 1.5rem;
}

.year-select-box {
  align-self: flex-end;
  margin: 1rem 3.5rem 0 0;
}

.summary-area #bar-chart #bar-chart {
  width: 100px !important;
  height: 50px !important;
}

#stacked-bar-chart canvas#bar-chart.chartjs-render-monitor {
  padding: 0 1.3rem 0 2rem;
  width: 80rem !important;
  height: 43.8rem !important;
}

.country-wrapper {
  display: flex;
  align-items: center;
  height: 8rem;
  width: 35rem;
  padding: 1rem 0 1rem 2.75rem;
}

.text-container {
  display: flex;
  flex-direction: row;
  text-align: left;
  color: var(--color-light-grey);
  align-items: center;
}

.text-container label div {
  display:flex;
  width:2rem;
  height:2rem;
  background:white;
  border:1px solid var(--color-light-grey);
  cursor:pointer;
  border-radius: 3px;
  margin: 0 1rem 0 0;
}

.table-responsive {
  display: flex;
  color: var(--color-dark-grey);
  overflow: hidden;
  max-width: 144rem;
  margin-top: 3rem;
  padding: 0 0.8rem 0 0.8rem;
}

table#table-content tr {
  width: 100%;
}

table#table-content th {
  vertical-align: middle;
}

table#table-content td {
  vertical-align: middle;
}

#country-name {
  font-weight: 500;
}

.monthly-data {
  font-weight: 200;
}

#table-content {
  margin-top: 3rem;
  font-size: 1.2rem;
  width: 100%;
}

#table-content thead th {
  border-bottom: none;
}

#table-content.thead{
  width: 100%;
}

#table-content .thead {
  width: 100%;
}

.sort-button {
  margin-left: 0.7rem;
}

</style>
