<template>
  <main id="framework">
    <section id="page-title">
      <router-link to="/tenants"><img src="../assets/FrameworkBtn.svg" class="framework-btn"></router-link>
      <row>
        <column :lg="8" class="page-title">
          <div align="left" class="back">
            <router-link to="/tenants">
              <img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back
            </router-link>
          </div>
          <h1 class="title">Policy in practice - Low income households’ savings</h1>
        </column>
        <column :lg="4" class="progress-summary">
          <div class="doughnut-1"><aim-doughnut-chart :doughnutChartData="doughnutChartData1"></aim-doughnut-chart></div>
          <div class="doughnut-2"><time-doughnut-chart :doughnutChartData="doughnutChartData2"></time-doughnut-chart></div>
        </column>
      </row>
    </section>
    <section class="framework-select-area">
      <row :gutter="12" >
        <column :lg="1.5"><h3 class="framework-select-country">Select type</h3></column>
        <column :lg="2.5" class="framework-select-box">
          <v-select :options="moneyTypes" v-model="selectedStatus" placeholder="Show all" :searchable="false">
          </v-select>
        </column>
      </row>
    </section>
    <section :gutter="12" class="chart-title-area">
      <row class="chart-title">
        <column :lg="8" :xs="6"><h2 class="framework-sub-title">Low income households’ savings - across funds</h2></column>
        <column class="chart-summary" :lg="4" :xs="6">
          <div class="total-money"> <span><h1>£ {{ totalTenants }}</h1></span> <h3 style="font-family:'Source Sans Pro';">by Resonance’s tenants</h3></div>
          <div class="growth-rate"> <h1>{{growthRate}}</h1> <h3 style="font-family:'Source Sans Pro';">in 2020</h3></div>
        </column>
      </row>
    </section>
    <section id="chart-area">
      <row :gutter="12" class="chart-main">
        <column :lg="6" class="douhnut-chart-area">
        <h2>Achieved - £10,000 saved by Resonance tenants</h2>
          <framework-doughnut-chart :doughnutChartData="achievedDoughnutChartData"></framework-doughnut-chart>
          <column :lg="4" :xs="12" class="year-select-box" >in <v-select :options="yearOptions" v-model="selectedYear" class="select-year" placeholder="Show all" :searchable="false"></v-select></column>
        </column>
        <column :lg="6" class="douhnut-chart-area">
        <h2>Aim - £60,000 savings aim by Resonance tenants</h2>
          <framework-doughnut-chart :doughnutChartData="aimDoughnutChartData"></framework-doughnut-chart>
          <column :lg="4" :xs="12" class="year-select-box" >in <v-select :options="yearOptions" v-model="selectedYear" class="select-year" placeholder="Show all" :searchable="false"></v-select></column>
        </column>
      </row>
    </section>
  </main>
</template>

<script>
import AimDoughnutChart from '../components/Chart/AimDoughnutChart.vue'
import TimeDoughnutChart from '../components/Chart/TimeDoughnutChart.vue'
// import SeeFrameworkBtn from '../components/SeeFrameworkBtn.vue'
import FrameworkDoughnutChart from '../components/Chart/FrameworkDoughnutChart'
import { getValueByMoney, setYearSelectBox, getLessons } from '../data/data-provider.js'
import { getAllPurpleColor, getLineChartColorScheme} from '../data/colour-scheme.js'
import { getLineChartData, getTableData, getBarChartData } from '../data/data-handler'

export default {
  components: {
    AimDoughnutChart,
    TimeDoughnutChart,
    // SeeFrameworkBtn,
    FrameworkDoughnutChart
  },
  data () {
    return {
      selectedStatus: null,
      selectedFund: null,
      selectedDemo: null,
      selectedYear: 2020,
      chartData: {},
      fundSelectboxDisabled: true,
      demoSelectboxDisabled: true,
      barChartData: [],
      stackedBarChartData: {},
      doughnutChartData1: {
        box: 'box1',
        title: 'Aim',
        subtitle1: '£50K',
        subtitle2: '/year',
        subtitle2Position: [36, 36.2, 40],
        subtitle3: 'by Resonance',
        percentage: '20',
        insideText: 'complete',
        color: '#8954BA',
        canvasId:'achieved'
      },
      doughnutChartData2: {
        box: 'box2',
        title: 'Time',
        subtitle1: '8 years',
        subtitle2: '',
        percentage: '5',
        insideText: 'more year',
        color: '#0091FF',
        totalYear: 8
      },
      achievedDoughnutChartData: {
        canvasId:'achieved',
        firstlinebold: '£60k',
        firstlinelight: 'saved by UK households',
        firstlinePosition: [6, 11, 500, 45, 11, 500],
        secondlinebold: '£10k',
        secondlinelight: 'saved by Resonance tenants',
        secondlinePostiion: [7, 43, 500, 45, 43, 500],
        thirdlinebold: '£4k',
        thirdlinelight: 'spent by Resonance tenants',
        thirdlinePostiion: [15, 75, 500, 45, 75, 500],
        percentageForChart: [90, 20, 10], // out / middle / inside
        percentage: '16.6',
        percentageTextPostiion: [180, 160, 500],
        insideText: 'contribution',
        insideTextPostiion: [200, 190, 100],
        centerX: 250,
        centerY: 163.5
      }, 
      aimDoughnutChartData: {
        canvasId:'aim',
        firstlinebold: '£200k',
        firstlinelight: 'savings aim by UK households',
        firstlinePosition: [2, 11, 500, 50, 11, 500],
        secondlinebold: '£60k',
        secondlinelight: 'savings aim by Resonance tenants',
        secondlinePostiion: [10, 43, 500, 50, 43, 500],
        thirdlinebold: '£34k',
        thirdlinelight: 'spending aim by Resonance tenants ',
        thirdlinePostiion: [10, 75, 500, 50, 75, 500],
        percentageForChart: [60, 30, 40], // out / middle / inside
        percentage: '30',
        percentageTextPostiion: [250, 160, 500],        
        insideText: 'contribution',
        insideTextPostiion: [255, 190, 100],
        centerX: 291.66,
        centerY: 163.5
      },            
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
      totalTenants: '10,000',
      growthRate: '+38%',
      fundPlaceholder: 'Show all',
    }
  },
  mounted () {
    this.showNavBar()
    this.yearOptions = setYearSelectBox() // Set initial Year select box options        
    this.updateData()
  },
  methods: {
    showNavBar () {
      const navbar = document.getElementById('nav')
      navbar.style.display = 'inline'
    },
    updateData () {
      let lessons = {}
      let tableLessons = {}
      let prevTableLessons = {}

      tableLessons = getValueByMoney(this.selectedYear) // for table & summary area
      prevTableLessons = getValueByMoney(this.selectedYear - 1)
      if (this.checkedItems.length === 0) {
        lessons = getLessons([], [], [], this.selectedYear, 'All') // for line graph
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
main#framework {
  display: flex;
  flex-direction: column;
  margin: 6.2rem 0 0 6.2rem;
  padding: 8rem 4.5rem 4.5rem 8rem;
  max-width: 1440px;
}

.navbar {
  background: white;
}

.see-framework {
  position: absolute;
  top: 2.4rem;
  right: -2.4rem;
}

.back {
  padding: 1.5rem 0 1.5rem 0;
}

#framework .title {
  font-family: Helvetica;
  font-size: 3.4rem;
  color: #F19C42;
  font-weight: 300;
  text-align: left;
  padding-bottom: 2rem;
}

#framework .framework-btn {
  width: 11.5rem; 
  height: 11.5rem;
  position: absolute;
  top: 2.5rem;
  right: -4.5rem;  
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

/* select box area start */
.framework-select-area {
  max-width: 125.5rem !important;
}

.framework-select-area .container {
  max-width: 125.5rem !important;
  align-items: center;
}

.framework-select-area h3 {
  font-size: 1.4rem;
  color: #858585;
  margin: 0;
}

.framework-select-country {
  margin: 0;
  padding: 0;
  text-align: left;
}

.framework-select-camp {
  text-align:right;
  margin: 0 1rem 0 0
}

.framework-select-school {
  text-align:right;
  margin:0 1rem 0 0;
}

/* select box area end */

/* selectbox design customizing start */
#framework .framework-select-area .vs__dropdown-toggle {
  width: 24.2rem;
  height: 3.9rem;
  background-color: #ffffff;
  border: none;
  font-size: 1.68rem;
  color: #686868;
  padding-left: 1rem;
}

#framework .framework-select-area .vs__dropdown-menu {
  background-color: #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.68rem;
  width: 24.2rem !important;
  color: #686868;
}

#framework .framework-select-area .vs--disabled .vs__dropdown-toggle {
  background-color: rgba(255, 255, 255, 0.40);
  font-size: 14px;
  color: rgba(104,104,104,0.40) !important; 
}

#framework .framework-select-area .vs--disabled .vs__search {
  background-color: rgba(255, 255, 255, 0.40);
  font-size: 14px;
  color: rgba(104,104,104,0.40) !important; 
}

#framework .year-select-box .vs__dropdown-toggle {
  background-color: #ffffff;
  border: none;
  font-size: 1.4rem;
  min-width: 12rem;
  padding-left: 1rem;
}

#framework .year-select-box .vs__dropdown-menu {
  background-color:  #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.4rem;
  min-width: 12rem !important;
  color: #686868;
}

#framework .vs__search {
  margin: 0;
  padding: 0;
  color: #686868;    
}

#framework .vs__selected {
  margin: 0;
  padding: 0;
  color: #686868;  
}
/* selectbox design customizing end */


#framework .chart-summary {
  display: flex;
  flex-direction: row;
}

#framework .growth-rate {
  margin-left: 2rem;
}

#framework .growth-rate h3 {
  font-size: 1rem;
  font-weight: 100;
}

#framework .total-money {
  display: flex;
  flex-direction: column;
  padding-left: 7rem;
  padding-right: 2rem;
}

#framework .total-money span {
  align-self: start;
}

#framework .total-money h1,
#framework .total-money h2,
#framework .total-money h3 {
  display: inline;
  color: #F19C42;
}

#framework .total-money h1 {
  margin-right: 1rem;
  font-size:3rem;
  font-weight: 500;
}

#framework .total-money h2 {
  font-size: 2.2rem;
  font-weight: 300;
}

#framework .total-money h3 {
  text-align: left;
  font-size: 1.4rem;
  font-weight: 100;
}

#framework .growth-rate h1 {
  font-size: 3rem;
  font-weight: 500;
}

#framework .growth-rate h3 {
  font-size: 1.4rem;
}

.container {
  max-width: 125.5rem !important;
  padding: 0 !important;
  margin: 0 !important;
}

.year-select-box {
  align-self: flex-end;
  margin: 1rem 3.5rem 0 0;
  display: flex;
  flex-direction: row;
  font-size: 1.6rem;
}

#framework .chart-title-area {
  display: flex;
  color: #F19C42;
  margin-top: 3rem;
}

#framework .framework-sub-title {
  font-size: 2.88rem;
  font-family: 'Source Sans Pro';
  font-weight: 300 !important;
  text-align: left;
  color: #F19C42;
}

#framework .chart-summary {
  display: flex;
  flex-direction: row;
}

#framework .growth-rate {
  margin-left: 2rem;
}

#framework .growth-rate h3 {
  font-size: 1rem;
  font-weight: 100;
}

#framework .total-money {
  display: flex;
  flex-direction: column;
  padding-left: 7rem;
  padding-right: 2rem;
}

#framework .total-money span {
  align-self: start;
}

#framework .total-money h1,
#framework .total-money h2,
#framework .total-money h3 {
  display: inline;
  color: #F19C42;
}

#framework .total-money h1 {
  margin-right: 1rem;
  font-size:3rem;
  font-weight: 500;
}

#framework .total-money h2 {
  font-size: 2.2rem;
  font-weight: 300;
}

#framework .total-tenamoneynts h3 {
  text-align: left;
  font-size: 1.4rem;
  font-weight: 100;
}

#framework .growth-rate h1 {
  font-size: 3rem;
  font-weight: 500;
  margin: 0;
}

#framework .growth-rate h3 {
  font-size: 1.4rem;
}

.container {
  max-width: 125.5rem !important;
  padding: 0 !important;
  margin: 0 !important;
}

#framework #chart-area {
  margin-top: 4rem;
  padding: 4.5rem 5.8rem;
  max-width: 125.3rem;
  background-color: #ffffff;
}

.douhnut-chart-area {
  display: flex;
  flex-direction: column;
}
.douhnut-chart-area h2 {
  color:  #F19C42;
  margin-bottom: 2.48rem;
  font-size: 2rem;
}

#framework {
    animation: fadein 1.5s;
    -moz-animation: fadein 1.5s; /* Firefox */
    -webkit-animation: fadein 1.5s; /* Safari and Chrome */
    -o-animation: fadein 1.5s; /* Opera */
}
@keyframes fadein {
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@-moz-keyframes fadein { /* Firefox */
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@-webkit-keyframes fadein { /* Safari and Chrome */
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}
@-o-keyframes fadein { /* Opera */
    from {
        opacity:0;
    }
    to {
        opacity: 1;
    }
}

</style>
