<template>
<column :lg="4" class="summary-area">
  <div class="country-wrapper" v-for="country in vFor" v-bind:key="country.vForId" :value="country.vForId">
    <div class="text-container">
      <input type="checkbox" v-bind:class="country.cssId" v-bind:id="country.cssId" v-bind:key="country.vForId" :value="country.vForId" v-model="checkedItems" style="display:none">
        <label v-bind:class="country.cssId" v-bind:for="country.cssId">
          <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="justify-content:center; align-item:center;">
            <span v-bind:class="country.cssId" v-bind:for="country.cssId" style="color:#ffffff; margin:2px 2px 2px 5px; width:10px; height:10px;">V</span>
          </div>
        </label>
        <div class="summary-text" v-bind:class="country.cssId" v-bind:for="country.cssId">
          <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8' !important;">
              <h1 style="display: inline; margin-right: 5px;" v-bind:class="country.cssId" v-bind:for="country.cssId">
                {{ country.totalLessons }}
              </h1>
              <h2 style="display: inline;" v-bind:class="country.cssId" v-bind:for="country.cssId">lessons </h2>
          </div>
          <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8';">
            <h2 style="font-size:1rem; text-align:left">in {{country.vForId}}</h2>
          </div>
        </div>
    </div>
    <div class="chart-container">
      <bar-chart id="bar-chart" class="barChart" :chart-data="barChartData[country.name]" :options="barchartOption"></bar-chart>
    </div>
  </div>
</column>
</template>

<script>
import BarChart from '../components/BarChart.js'

export default {
  components: {
    BarChart
  },
  props: {
    dictForVfor: {
      type: Array
    },
    barChartData: {
      type: Array
    }
  },
  data () {
    return {
      vFor: [],
      barChartDataProp: [],
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
        }
      }
    }
    // },
    // methods: {

  // }
  },
  mounted () {
    this.vFor = this.dictForVfor
    this.barChartDataProp = this.barChartData
  }
}
</script>
