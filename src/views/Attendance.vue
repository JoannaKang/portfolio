<template>
  <main id="attendance">
    <section id="page-title" class="container-fluid">
      <div class="back"><router-link to="/"><img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back </router-link></div>
      <div><h1 class="title">Students attendance</h1></div>
    </section>
    <section class="attendance-select-area">
      <row :gutter="12">
        <column :lg="1" class="attendance-select-country"><h3>Select Country</h3></column>
        <column :lg="3" class="attendance-select-box">
          <v-select :options="countries" v-model="selectedCountry" class="select-country" placeholder="Show All" :searchable="false">
            <span slot="no-options">
              <h3>No more available options</h3>
            </span>
          </v-select>
        </column>
        <column :lg="1.2"><h3 class="attendance-select-camp">Select Camp</h3></column>
        <column :lg="2.8" class="attendance-select-box"><v-select :options="camps" v-model="selectedCamp" class="select-camp" placeholder="Select camp to activate" :searchable="false" :disabled="true"></v-select></column>
        <column :lg="1.2"><h3 class="attendance-select-school">Select School</h3></column>
        <column :lg="2.8" class="attendance-select-box"><v-select :options="schools" v-model="selectedSchool" class="select-school" placeholder="Select camp to activate" :searchable="false" :disabled="true"></v-select></column>
      </row>
    </section>
    <section :gutter="12" class="attendance-chart-title">
      <row>
        <column :lg="7" :xs="6"><h2 class="attendance-sub-title">Number of students attending - accross countries</h2></column>
        <column :lg="5" :xs="6" class="chart-summary">
          <div class="attendance-total-lessons"> <span><h1>32K</h1> <h2>students</h2></span><h3>after INS</h3></div>
          <div class="growth-rate"> <h1>{{'+38%'}}</h1> <h3 style="font-family:'Source Sans Pro';">last 12months</h3></div>
        </column>
      </row>
    </section>
    <section class="chart-area">
      <row :gutter="12" class="chart-main">
        <column :lg="8.64" class="attendance-bar-chart-area">
          <h3> No of students attending</h3>
          <group-bar-chart :chart-data="barChartData" :options="options"></group-bar-chart>
          <column class="year-select-box">
            <v-select :lg="12" :xs="12" :options="compareyears" placeholder="Before INS (Oct 2017) vs After INS (Oct 2020)" :searchable="false" :disabled="true"></v-select>
          </column>
        </column>
        <column :lg="3.36" class="summary-area">
        <row v-for="i in setNoOfRows" v-bind:key="i">
          <column v-for="j in [0, 1]" v-bind:key="i*2+j" :lg="6" :xs="6">
            <div v-if="i*2+j < summaryBoxData.length" class="summary-grid">
              <input type="checkbox" style="display:none" v-bind:id="summaryBoxData[i*2+j].cssId" v-bind:class="summaryBoxData[i*2+j].cssId" v-bind:value="summaryBoxData[i*2+j].name" v-model="checkedItems">
              <label v-bind:class="summaryBoxData[i*2+j].cssId" v-bind:for="summaryBoxData[i*2+j].cssId">
                <div v-bind:class="summaryBoxData[i*2+j].cssId" style="justify-content:center; align-item:center;">
                  <span v-bind:class="summaryBoxData[i*2+j].cssId" style="color: #ffffff; margin:2px 2px 2px 2.5px; width:10px; height:10px;">V</span>
                </div>
              </label>
              <div v-bind:class="summaryBoxData[i*2+j].cssId" id="checkbox-text-area">
                <h1>{{summaryBoxData[i*2+j].difference}}</h1>
                <h3>{{summaryBoxData[i*2+j].name}}</h3>
              </div>
              </div>
          </column>
        </row>
        </column>
      </row>
      <table-for-attendance class="attendance-table-area" :tableData="tableData"></table-for-attendance>
    </section>

  </main>
</template>

<script>
import GroupBarChart from '../components/Chart/GroupBarChart'
import TableForAttendance from '../components/TableForAttendance.vue'
import { getGroupBarChartColorSheme } from '../data/colour-scheme'

export default {
  name: 'attendance',
  components: {
    GroupBarChart,
    TableForAttendance
  },
  data () {
    return {
      selectedCountry: null,
      selectedCamp: null,
      selectedSchool: null,      
      countries: [],
      camps: [],
      schools: [],
      setNoOfRows: [0, 1, 2, 3],
      summaryBoxData: [
        { difference: '+26%', name: 'Kenya', cssId: 'Kenya' },
        { difference: '+21%', name: 'Tanzania', cssId: 'Tanzania' },
        { difference: '+43%', name: 'South Sudan', cssId: 'SouthSudan' },
        { difference: '+31', name: 'DR Congo', cssId: 'DRCongo' }
      ],
      checkedItems: [],
      colorIndex: [],
      compareyears: ['Before INS (Oct 2017) vs After INS (Oct 2020)'],
      barChartData: {},
      options: {
        legend: { display: false },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: { color: '#ffffff' },
            display: true,
            stacked: false
          }],
          yAxes: [{
            display: true,
            position: 'left',
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return value + '%'
              }
            } }]
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem) {
              if (tooltipItem[0].datasetIndex === 0) {
                return 'Before Ins'
              } else if (tooltipItem[0].datasetIndex === 1) {
                return 'After Ins'
              }
            },
            label: function (tooltipItem) {
              return parseInt(tooltipItem.value).toFixed(0) + '%'
            }
          }
        }        
      },
      tableData: {
        totalBaseYearData: [{ denominator: 100, skills: 30 }, '30%', { denominator: 100, skills: 20 }, '20%', { denominator: 100, skills: 20 }, '10%', { denominator: 100, skills: 15 }, '15%', '21%'],
        totalEndYearData: [{ denominator: 100, skills: 56 }, '56%', { denominator: 100, skills: 41 }, '41%', { denominator: 100, skills: 53 }, '53%', { denominator: 100, skills: 46 }, '46%', '49%'],
        totalDiff: ['', '+26%', '', '+21%', '', '+43%', '', '+31%', '+28%'],
        maleBaseYearData: [{ denominator: 100, skills: 20 }, '20%', { denominator: 100, skills: 20 }, '20%', { denominator: 100, skills: 20 }, '20%', { denominator: 100, skills: 20 }, '20%', '20%'],
        maleEndYearData: [{ denominator: 100, skills: 42 }, '42%', { denominator: 100, skills: 42 }, '42%', { denominator: 100, skills: 20 }, '42%', { denominator: 100, skills: 20 }, '42%', '42%'],
        maleDiff: ['', '+22%', '', '+22%', '', '+22%', '', '+22%', '+22%'],
        femaleBaseYearData: [{ denominator: 100, skills: 20 }, '20%', { denominator: 100, skills: 20 }, '20%', { denominator: 100, skills: 20 }, '20%', { denominator: 100, skills: 20 }, '20%', '20%'],
        femaleEndYearData: [{ denominator: 100, skills: 42 }, '42%', { denominator: 100, skills: 42 }, '42%', { denominator: 100, skills: 20 }, '42%', { denominator: 100, skills: 20 }, '42%', '42%'],
        femaleDiff: ['', '+22%', '', '+22%', '', '+22%', '', '+22%', '+22%']
      }
    }
  },
  mounted () {
    this.showNavBar()
    this.barChartData = this.setBarchartData()
  },
  methods: {
    showNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'inline'
    },    
    setBarchartData () {
      const initialData = { labels: ['Kenya', 'Tanzania', 'South Sudan', 'DR Congo'],
        datasets: [{ // label: 'baseYear'
          backgroundColor: ['rgb(232, 79, 137, 0.5)', 'rgb(47, 185, 239, 0.5)', 'rgb(103, 182, 117, 0.5)', 'rgb(247, 101, 17, 0.5)'],
          borderColor: ['rgb(232, 79, 137, 0.5)', 'rgb(47, 185, 239, 0.5)', 'rgb(103, 182, 117, 0.5)', 'rgb(247, 101, 17, 0.5)'],
          data: ['30', '20', '10', '15'],
          barThickness: 15
        }, { // label: 'endYear'
          backgroundColor: ['#EA4C89', '#2FB9EF', '#67B675', '#f76511'],
          borderColor: ['#EA4C89', '#2FB9EF', '#67B675', '#f76511'],
          data: ['56', '41', '53', '46'],
          barThickness: 15
        }]}
      return initialData
    },
    updateColor (colorScheme, colorIndex) {
      let haveSet = 0
      colorIndex.sort((a, b) => a - b)
      for (let i = 0; i < this.summaryBoxData.length; i++) {
        const school = this.summaryBoxData[i].cssId
        const dom = document.getElementsByClassName(`${school}`)
        if (dom.length !== 0 && dom[0].checked === true) {
          const setColor = colorScheme().normal[colorIndex[haveSet]]
          dom[1].style.color = setColor
          dom[2].style.border = `1px solid ${setColor}`
          dom[3].style.color = setColor
          dom[4].style.color = setColor
          dom[5].style.color = setColor
          haveSet += 1
        } else if (dom.length !== 0) {
          dom[1].style.color = '#D8D8D8'
          dom[2].style.border = `1px solid ${'#D8D8D8'}`
          dom[3].style.color = '#ffffff'
          dom[4].style.color = '#D8D8D8'
          dom[5].style.color = '#212529'
        }
      }
    },
    filterChartData (chartData) {
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
          chartData.datasets[1].data.splice(el, 1, '-')
          chartData.labels.splice(el, 1, '-')
        })
        return chartData
      }
    }
  },
  watch: {
    checkedItems () {
      this.barChartData = this.filterChartData(this.setBarchartData())
      this.updateColor(getGroupBarChartColorSheme, this.colorIndex)
    }
  }
}
</script>

<style>
main#attendance {
  display: flex;
  flex-direction: column;
  margin: 6.2rem 0 0 6.2rem;
  padding: 8rem 4.5rem 4.5rem 8rem;
  max-width: 144rem;
}

#attendance .title {
  font-family: Helvetica;
  font-size: 3.4rem;
  color: var(--color-purple);
  font-weight: 300;
  text-align: left;
  margin: 0 0 0.5rem 0;
  padding: 0;
}

.attendance-sub-title {
  font-size: 2.88rem;
  font-family: 'Source Sans Pro';
  font-weight: 300 !important;
}

.attendance-chart-title .chart-summary {
  display:flex;
  justify-content: flex-end;
  flex-direction: row;
}

.attendance-total-lessons {
  color: var(--color-purple);
  margin-right: 4.3rem;
}

#attendance .growth-rate {
  margin-right: 7rem;
}

.attendance-total-lessons h1,
.attendance-total-lessons h2 {
  display: inline;
}

.attendance-total-lessons h1 {
  font-size: 3rem;
  margin-right: 0.5rem;
  font-weight: 500;  
}

.attendance-total-lessons h2 {
  font-size: 2.2rem;
  font-family: 'Source Sans Pro';
  font-weight: 300;
}

.attendance-total-lessons h3 {
  font-size: 1.4rem;
  font-family: 'Source Sans Pro';
  font-weight: 100;
  margin: 0;
}

#attendance .growth-rate h1 {
  margin: 0;
  color: var(--color-purple);  
}

#attendance .growth-rate h3 {
  margin: 0;
  color: var(--color-purple);
  font-size: 1.4rem;
  font-family: 'Source Sans Pro';
  font-weight: 100;
  margin: 0;  
}

/* select box area start */
.attendance-select-area {
  max-width: 125.5rem !important;
  margin: 0;
  padding: 0;
}

.attendance-select-area .container {
  max-width: 125.5rem !important;
  align-items: center;
}

.attendance-select-area h3 {
  font-size: 1.4rem;
  color: #858585;
  margin: 0;
}

.attendance-select-country {
  margin: 0;
  padding: 0;
  text-align: left;
}

.attendance-select-camp {
  text-align:right;
  margin: 0 1rem 0 0;
  background-color: #f8f8f8;
}

.attendance-select-school {
  text-align:right;
  margin:0 1rem 0 0;
  background-color: #f8f8f8;
}
/* select box area end*/

/* selectbox design customizing start */
#attendance .attendance-select-area .vs__dropdown-toggle {
  width: 24.2rem;
  height: 3.9rem;
  background-color: #ffffff;
  border: none;
  font-size: 1.68rem;
  color: #686868;
  padding-left: 1rem;
}

#attendance .attendance-select-area .vs--disabled .vs__dropdown-toggle {
  background-color: rgba(255, 255, 255, 0.40);
  font-size: 14px;
  color: rgba(104,104,104,0.40) !important; 
}

#attendance .attendance-select-area .select-country h3 {
  text-align: left;
  margin-left:1rem;
}

#attendance .attendance-select-area .vs__dropdown-menu {
  background-color: #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.68rem;
  width: 24.2rem !important;
  color: #686868;
}

#attendance .year-select-box {
  margin: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

#attendance .year-select-box .vs__dropdown-toggle {
  width: 25rem;
  text-align: right;
  background-color: #ffffff;
  border: none;
  color: #686868;  
}

#attendance .year-select-box .vs--disabled .vs__search,
#attendance .year-select-box .vs--disabled .vs__dropdown-toggle {
  background-color: #ffffff;
  color: #686868;
}

#attendance .vs__search {
  margin: 0;
  padding: 0;
  color: #686868;  
}

#attendance .vs__selected {
  margin: 0;
  padding: 0;
  color: #686868;  
}
/* selectbox design customizing end */

#attendance .attendance-chart-title {
  max-width: 125.5rem !important;
  display: flex;
  color: var(--color-purple);
  margin-top: 5rem;
}

#attendance .attendance-chart-title .container{
  max-width: 125.5rem !important;
}

#attendance .chartjs-size-monitor{
  margin: 0;
}

#attendance .chart-area {
  margin-top: 6rem;
  padding: 0 2rem 3.5rem 2rem;
  max-width: 125.3rem;
  display: flex;
  flex-direction: column;
  height: 45%;
  background-color: #ffffff;
}

#attendance .chart-main {
  display: flex;
  max-width: 125.3rem !important;
}

#attendance .attendance-chart-title {
  display: flex;
  max-width: 144rem !important;
  margin: 3rem 0 0 0 !important;
}

#attendance .attendance-chart-title h2 {
  text-align:left;
  margin: 0;
  color: var(--color-purple);
  font-size: 2.88rem;
}

#attendance .attendance-bar-chart-area {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-light-grey);
}

#attendance .attendance-bar-chart-area h3 {
  font-family: Source Sans Pro;
  font-size: 1.2rem;
  letter-spacing: -0.01px;
  text-align: left;
  margin: 2.5rem 0 1.5rem 2.5rem;
}

#attendance .attendance-bar-chart-area #bar-chart {
  padding: 0 1.8rem 0 2rem;
  margin: 0 0 0 0 !important;
  max-width: 84rem !important;
  max-height: 43.8rem !important;
}

#attendance .summary-area {
  display: flex;
  flex-direction: column;
  max-height: 40rem;
  overflow-y: auto;
  border: none;
  align-items: left;
  margin: 8rem 0 5rem 0;
  padding: 0;
}

#attendance .summary-area label div {
  display:flex;
  width:18px;
  height:18px;
  background:white;
  border:1px solid var(--color-light-grey);
  cursor:pointer;
  border-radius: 3px;
  margin: 0 2rem 0 2rem;
}

#attendance .summary-grid h1 {
  font-size: 2.5rem;
  font-family: Helvetica;
  font-weight: 500;
}

#attendance .summary-grid h3 {
  font-size: 1rem;
  font-family:'Source Sans Pro'; 
  font-weight:300;
}

.attendance-table-area {
  margin-top : 2.7rem;
}

</style>
