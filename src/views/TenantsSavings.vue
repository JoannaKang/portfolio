<template>
  <main id="tenants">
    <div @click="frameworkBtnClick"><see-framework-btn :buttonClicked="frameworkBtnClicked" class="see-framework"></see-framework-btn></div>
    <div class="btn-wrapper" v-if="frameworkBtnClicked"></div>
    <img src="../assets/FrameworkBtn.svg" class="framework-btn" v-if="frameworkBtnClicked">
    <section id="page-title">
      <row>
        <column :lg="8" class="page-title">
          <div align="left" class="back">
            <router-link to="/">
              <img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back
            </router-link>
          </div>
          <h1 class="title">Tenants savings - Positive move on</h1>
        </column>
        <column :lg="4" class="progress-summary">
          <div class="doughnut-1"><aim-doughnut-chart :doughnutChartData="doughnutChartData1"></aim-doughnut-chart></div>
          <div class="doughnut-2"><time-doughnut-chart :doughnutChartData="doughnutChartData2"></time-doughnut-chart></div>
        </column>
      </row>
    </section>
    <section class="employment-select-area">
      <row :gutter="12" >
        <column :lg="1.5"><h3 class="employment-select-country">Select type</h3></column>
        <column :lg="2.5" class="employment-select-box">
          <v-select :options="moneyTypes" v-model="selectedStatus" placeholder="Show all" :searchable="false">
          </v-select>
        </column>
        <column :lg="1.5"><h3 class="employment-select-camp">Select fund</h3></column>
        <column :lg="2.5" class="employment-select-box">
          <v-select :options="funds" v-model="selectedFund" class="select-camp" :placeholder="fundPlaceholder" :searchable="false" :disabled="fundSelectboxDisabled">
            <span slot="no-options">
              <h3>No more available options</h3>
            </span>
          </v-select>
        </column>
        <column :lg="1.5"><h3 class="employment-select-school">Select  demographic</h3></column>
        <column :lg="2.5" class="employment-select-box">
          <v-select :options="demographics" v-model="selectedDemo" class="select-school" placeholder="Show none" :searchable="false" :disabled="demoSelectboxDisabled">
            <span slot="no-options">
              <h3 style="text-align:left; padding-left: 1.8rem; color:#686868; font-family: Helvetica; font-size:1.4rem;">No more available options</h3> 
            </span>            
          </v-select>
        </column>
      </row>
    </section>
    <section :gutter="12" class="chart-title-area">
      <row class="chart-title">
        <column :lg="8" :xs="6"><h2 class="employment-sub-title">Money offered to tenants - across funds</h2></column>
        <column class="chart-summary" :lg="4" :xs="6">
          <div class="total-tenants"> <span><h1>£ {{ totalTenants }}</h1></span> <h3 style="font-family:'Source Sans Pro';">money offered to tenants</h3></div>
          <div class="growth-rate"> <h1>{{growthRate}}</h1> <h3 style="font-family:'Source Sans Pro';">last 12 months</h3></div>
        </column>
      </row>
    </section>
    <section id="chart-area">
      <row :gutter="12" class="chart-main">
        <column :lg="8.16" class="line-chart-area">
          <h3>No of tenancies</h3>
          <line-chart :chart-data="chartData" :options="options"></line-chart>
          <column :lg="4" :xs="12" class="year-select-box" ><v-select :options="yearOptions" v-model="selectedYear" class="select-year" placeholder="Show all" :searchable="false"></v-select></column>
        </column>
        <!-- Status summary start-->
        <column :lg="3.84" class="summary-area">
          <div class="summary-wrapper" v-for="status in summaryBoxData" v-bind:key="status.vForId" :value="status.vForId">
            <div class="text-container">
              <input type="checkbox" v-bind:class="status.cssId" v-bind:id="status.cssId" v-bind:key="status.vForId" :value="status.vForId" v-model="checkedItems" style="display:none">
                <label v-bind:class="status.cssId" v-bind:for="status.cssId">
                  <div v-bind:class="status.cssId" v-bind:for="status.cssId" style="justify-content:center; align-item:center;">
                    <span v-bind:class="status.cssId" v-bind:for="status.cssId" style="color:#ffffff; margin:2px 2px 2px 5px; width:10px; height:10px;">V</span>
                  </div>
                </label>
                <div class="summary-text" v-bind:class="status.cssId" v-bind:for="status.cssId">
                  <div v-bind:class="status.cssId" v-bind:for="status.cssId" style="border:none; color:'#D8D8D8' !important; display:flex; width:27.7rem; justify-content:space-between; align-items:flex-end;">
                    <div>
                      <h1 style="display: inline; color:'#D8D8D8'; font-family: Helvetica; font-size:3rem; font-weight:500;" v-bind:class="status.cssId" v-bind:for="status.cssId">
                        £ {{ status.totalLessons }}
                      </h1>
                    </div>
                    <div class="summary-bar-chart-container" style="align-self:flex-end;">
                      <bar-chart id="bar-chart" class="barChart" :chart-data="barChartData[status.name]" :options="barchartOption"></bar-chart>
                    </div>
                  </div>
                  <div v-bind:class="status.cssId" v-bind:for="status.cssId" style="text-align:left; border:none; color:'#D8D8D8';">
                    <h2 style="font-family:'Source Sans Pro'; font-size:1.4rem; font-weight:300;">{{status.name}}</h2>
                  </div>
                </div>
            </div>
          </div>
        </column>
        <!-- Status summary end-->          
      </row>
      <Table :tableData="tableData"></Table>
    </section>
  </main>
</template>

<script>
import LineChart from '../components/Chart/LineChart.js'
import BarChart from '../components/Chart/BarChart.js'
import AimDoughnutChart from '../components/Chart/AimDoughnutChart.vue'
import TimeDoughnutChart from '../components/Chart/TimeDoughnutChart.vue'
import SeeFrameworkBtn from '../components/SeeFrameworkBtn.vue'
import Table from '../components/TableForTenants.vue'
import { getValueByMoney, setYearSelectBox, getLessons } from '../data/data-provider.js'
import { getAllPurpleColor, getLineChartColorScheme} from '../data/colour-scheme.js'
import { getMonthlyColumn, calcSum, compareDataByYear, getLineChartData, getTableData, getBarChartData } from '../data/data-handler'

export default {
  components: {
    LineChart,
    BarChart,
    Table,
    AimDoughnutChart,
    TimeDoughnutChart,
    SeeFrameworkBtn
  },
  data () {
    return {
      frameworkBtnClicked: false,
      selectedStatus: null,
      selectedFund: null,
      selectedDemo: null,
      selectedYear: 2020,
      chartData: {},
      linechartShow: true,
      groupBarchartShow: false,
      stackedChartShow: false,
      fundSelectboxDisabled: true,
      demoSelectboxDisabled: true,
      barChartData: [],
      stackedBarChartData: {},
      doughnutChartData1: {
        box: 'box1',
        title: 'Aim',
        subtitle1: '£1200',
        subtitle2: 'savings',
        subtitle2Position: [36, 36.2, 60],
        subtitle3: '/household/annum',
        percentage: '80',
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
        color: '#0091FF',
        totalYear: 3
      },
      tableData: [],
      tableDataByStatus: [],
      TopicTableData: [],
      summaryBoxData: [],
      yearOptions: [],
      moneyTypes: [
        'Money offered to tenants',
        'Money saved by tenants',
        'Money spent by tenants'
      ],
      funds: [],
      demographics: [],
      status: '- all, across funds',
      fund: '',
      demo: '',
      checkedItems: [],
      totalTenants: '',
      growthRate: '',
      fundPlaceholder: 'Show all',
      colorIndex: [],
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
                const months = getMonthlyColumn()
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
              const months = getMonthlyColumn()        
              return data.datasets[0].label + ' | ' + months[tooltipItem[0].index]
            },
            label: function (tooltipItem) {
              return tooltipItem.value + ' tenancies'
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
              const months = getMonthlyColumn()          
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
                if (value.length < 3) {
                  value = getMonthlyColumn()[index]
                  return value
                } else {
                  return value
                }
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
          },
          display: true
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem) {
              const month = getMonthlyColumn()
              return month[tooltipItem[0].index]
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
              const months = getMonthlyColumn()         
              return months[tooltipItem[0].index]
            }
          }
        }
      }
    }
  },
  mounted () {
    this.showNavBar()
    this.yearOptions = setYearSelectBox() // Set initial Year select box options        
    this.updateData()
  },
  methods: {
    frameworkBtnClick() {
      console.log('clicked')
      this.frameworkBtnClicked = true 
    },
    showNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'inline'
    },
    updateData () {
      let lessons = {}
      let prevYearLessons = {}
      let tableLessons = {}
      let prevTableLessons = {}

      tableLessons = getValueByMoney(this.selectedYear) // for table & summary area
      prevTableLessons = getValueByMoney(this.selectedYear - 1)
      if (this.checkedItems.length === 0) {
        lessons = getLessons([], [], [], this.selectedYear, 'All') // for line graph
        prevYearLessons = getLessons([], [], [], this.selectedYear - 1, 'All')
        this.totalTenants = calcSum(Object.values(lessons.lessons[0]))
        this.growthRate = compareDataByYear(Object.values(prevYearLessons.lessons[0]), Object.values(lessons.lessons[0]))
        this.chartData = getLineChartData(lessons, getAllPurpleColor)
      } else {
        lessons = tableLessons
        this.chartData = this.filterChartData(getLineChartData(lessons, getLineChartColorScheme), this.checkedItems)
      }
      this.barChartData = getBarChartData(getTableData('Money', tableLessons, prevTableLessons))
      this.tableData = getTableData('Money', tableLessons, prevTableLessons)
      this.summaryBoxData = this.filterTopics(getTableData('Money', tableLessons, prevTableLessons))
      this.updateColors(getLineChartColorScheme)
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
    filterBarChartData (chartData) {
      if (this.checkedItems.length === 0) {
        return chartData
      } else {
        const checked = this.checkedItems
        const colorIndex = []
        checked.forEach(el => {
          colorIndex.push(chartData.labels.indexOf(el))
        })
        this.colorIndex = colorIndex
      
        const dataIndex = [...Array(chartData.labels.length).keys()].filter(el => colorIndex.includes(el) === false)
        dataIndex.forEach(el => {
          chartData.datasets[0].data.splice(el, 1, '-')
          chartData.labels.splice(el, 1, '-')
        })
        return chartData
      }
    },
    updateColors (colorScheme) {
      for (let i = 0; i < this.summaryBoxData.length; i++) {
        const cssId = this.summaryBoxData[i].cssId
        const dom = document.getElementsByClassName(`${cssId}`)
        if (dom.length !== 0 && dom[0].checked === true) {
          const checkedColor = colorScheme(this.summaryBoxData[i].colorIndex)
          dom[1].style.color = checkedColor // label
          dom[2].style.border = `1px solid ${checkedColor}` // connected div to checkbox
          dom[3].style.color = checkedColor // V
          dom[4].style.color = checkedColor // Topic text
          dom[8].style.color = checkedColor // Table name
        } else if (dom.length !== 0 && !dom[0].checked) {
          dom[1].style.color = '#D8D8D8'
          dom[2].style.border = '1px solid #D8D8D8'
          dom[3].style.color = '#ffffff'
          dom[4].style.color = '#D8D8D8'
          dom[8].style.color = '#212529'
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
    }
  }
}
</script>

<style>
main#tenants {
  display: flex;
  flex-direction: column;
  margin: 6.2rem 0 0 6.2rem;
  padding: 8rem 4.5rem 4.5rem 8rem;
  max-width: 1440px;
}

.navbar {
  background: white;
}

#tenants .see-framework {
  position: absolute;
  top: 2.8rem;
  right: -1.5rem;
  z-index: 9;
}

#tenants .framework-btn {
  position: absolute;
  z-index: 10;
  width: 11.5rem; 
  height: 11.5rem;
  top: 2.5rem;
  right: -4.5rem;
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}

#tenants .btn-wrapper {
  background-color: #ffffff;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 10;
  top: 4rem;
  right: -2rem;   
}

@-webkit-keyframes bounceIn {
  0%, 100%, 20%, 40%, 60%, 80% {
    -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
  }
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }
  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03)
  }
  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97)
  }
  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}
@keyframes bounceIn {
  0%, 100%, 20%, 40%, 60%, 80% {
    -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
  }
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    -ms-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    -ms-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }
  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    -ms-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    -ms-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03)
  }
  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    -ms-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97)
  }
  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
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
  margin-right: 3rem;
}

.progress-summary{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom : 3.2rem;
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
#tenants .employment-select-area .vs__dropdown-toggle {
  width: 24.2rem;
  height: 3.9rem;
  background-color: #ffffff;
  border: none;
  font-size: 1.68rem;
  color: #686868;
  padding-left: 1rem;
}

#tenants .employment-select-area .vs__dropdown-menu {
  background-color: #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.68rem;
  width: 24.2rem !important;
  color: #686868;
}

#tenants .employment-select-area .vs--disabled .vs__dropdown-toggle {
  background-color: rgba(255, 255, 255, 0.40);
  font-size: 14px;
  color: rgba(104,104,104,0.40) !important; 
}

#tenants .employment-select-area .vs--disabled .vs__search {
  background-color: rgba(255, 255, 255, 0.40);
  font-size: 14px;
  color: rgba(104,104,104,0.40) !important; 
}

#tenants .year-select-box .vs__dropdown-toggle {
  background-color: #ffffff;
  border: none;
  font-size: 1.4rem;
  min-width: 12rem;
  padding-left: 1rem;
}

#tenants .year-select-box .vs__dropdown-menu {
  background-color:  #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.4rem;
  min-width: 12rem !important;
  color: #686868;
}

#tenants .vs__search {
  margin: 0;
  padding: 0;
  color: #686868;    
}

#tenants .vs__selected {
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

.total-tenants {
  display: flex;
  flex-direction: column;
  padding-left: 7rem;
  padding-right: 2rem;
}

.total-tenants span {
  align-self: start;
}

.total-tenants h1,
.total-tenants h2,
.total-tenants h3 {
  display: inline;
  color: var(--color-purple);
}

.total-tenants h1 {
  margin-right: 1rem;
  font-size:3rem;
  font-weight: 500;
}

.total-tenants h2 {
  font-size: 2.2rem;
  font-weight: 300;
}

.total-tenants h3 {
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

#tenants .summary-grid-area,
#tenants .summary-area {
  display: flex;
  flex-direction: column;
  max-height: 40rem;
  overflow-y: auto;
  border: none;
  align-items: left;
  margin: 8rem 0 5rem 0;
}

#tenants .summary-grid-area label div {
  display:flex;
  width:18px;
  height:18px;
  background:white;
  border:1px solid var(--color-light-grey);
  cursor:pointer;
  border-radius: 3px;
  margin: 0 2rem 0 2rem;
}

#tenants .summary-area::-webkit-scrollbar {
  width: 4px;
  height: 355px;
  background-color: rgba(216, 216, 216, 0.4);
}

#tenants .summary-area::-webkit-scrollbar-thumb {
  width: 4px;
  height: 60px;
  background-color: #d8d8d8;
}

#tenants .summary-grid {
 display: inline-flex;
  align-items: center;
  margin-bottom : 1.5rem;
  width: 100%;
  color: #d8d8d8;
  padding-left: 2.5rem;
}

#tenants .summary-grid h1 {
  font-size: 2.5rem;
  font-family: Helvetica;
  font-weight: 500;
}

#tenants .summary-grid h3 {
  font-size: 1rem;
  font-family:'Source Sans Pro'; 
  font-weight:300;
}

#checkbox-text-area {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.text-container {
  display: flex;
  /* height: 80%; */
  width: 100%;
}

.summary-text{
  color: #D8D8D8;
  width: 100%;
}

.summary-text h1 {
  margin: 0 0 0 0;
}

/* .summary-text h2 {
  display: inline;
  margin: 0 0.2rem 0 0;
  color:'#D8D8D8';
  font-size: 2rem;
} */

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

.summary-wrapper {
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
