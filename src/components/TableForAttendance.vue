<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead class="thead">
        <tr>
          <th style="border-right:1px solid #D8D8D8;" scope="col">Students</th>
          <th scope="col">Skills</th>
          <th v-for="(school, index) in setCountryColumn" v-bind:key="index" v-bind:class="school.replaceAll(' ', '')">
            {{school}}
          </th>
          <th style="white-space:nowrap; border-left:1px solid #D8D8D8;" scope="col">% of students attending across countries</th>
        </tr>
      </thead>
      <tbody style="border-bottom:1px solid #D8D8D8;">
        <tr>
          <th rowspan="3" align="center" style="border-right:1px solid #D8D8D8;">Total</th>
          <td style="white-space:nowrap;">before INS</td>
          <td v-for=" (data, index) in totalBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index === 8">{{data}}</div>
            <div v-if="index % 2 === 0 && index !== 8" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in totalAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index === 8">{{data}}</div>
            <div v-if="index % 2 === 0 && index !== 8" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in totalDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0" ></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 8">{{data}}</div>    
          </td>
        </tr>
        <tr>
          <th rowspan="3" align = "center" style="border-right:1px solid #D8D8D8;">Male</th>
          <td>before INS</td>
          <td v-for=" (data, index) in maleBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index === 8">{{data}}</div>
            <div v-if="index % 2 === 0 && index !== 8" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in maleAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0 && index !== 8" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 8">{{data}}</div>
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in maleDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0" ></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 8">{{data}}</div>    
          </td>
        </tr>
        <tr>
          <th rowspan="3" align = "center" style="border-right:1px solid #D8D8D8;">Female</th>
          <td>before INS</td>
          <td v-for=" (data, index) in femaleBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0 && index !== 8"><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 8">{{data}}</div>     
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in femaleAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0 && index !== 8" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 8">{{data}}</div>            
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in femaleDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0" ></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 8">{{data}}</div>    
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCountries } from '../data/data-provider'

export default {
  props: {
    tableData: {
      type: Object
    } },
  data () {
    return {
      sortedByName: false,
      sortedByLessons: false,
      sortedByDifference: false,
      tableName: 'Students',
      // column: ['Kenya', '%', 'Tanzania', '%', 'South Sudan', '%', 'DR Congo', '%'],
      totalBeforeIns: [],
      totalAfterIns: [],
      totalDifference: [],
      maleBeforeIns: [],
      maleAfterIns: [],
      maleDifference: [],
      femaleBeforeIns: [],
      femaleAfterIns: [],
      femaleDifference: []
    }
  },
  mounted () {
    this.totalBeforeIns = this.tableData.totalBaseYearData
    this.totalAfterIns = this.tableData.totalEndYearData
    this.totalDifference = this.tableData.totalDiff
    this.maleBeforeIns = this.tableData.maleBaseYearData
    this.maleAfterIns = this.tableData.maleEndYearData
    this.maleDifference = this.tableData.maleDiff
    this.femaleBeforeIns = this.tableData.femaleBaseYearData
    this.femaleAfterIns = this.tableData.femaleEndYearData
    this.femaleDifference = this.tableData.femaleDiff
  },
  methods: {
    borderStyle (index) {
      const columnLength = this.setCountryColumn.length
      if (index === columnLength - 1) {
        return 'border-right:1px solid #D8D8D8;'
      }
    }
  },
  watch: {
    tableData () {
      if (this.tableData.length !== 0) {
        this.totalBeforeIns = this.tableData.totalBaseYearData
        this.totalAfterIns = this.tableData.totalEndYearData
        this.totalDifference = this.tableData.totalDiff
        this.maleBeforeIns = this.tableData.maleBaseYearData
        this.maleAfterIns = this.tableData.maleEndYearData
        this.maleDifference = this.tableData.maleDiff
        this.femaleBeforeIns = this.tableData.femaleBaseYearData
        this.femaleAfterIns = this.tableData.femaleEndYearData
        this.femaleDifference = this.tableData.femaleDiff
      } else {
        return null
      }
    }
  },
  computed: {
    setCountryColumn () {
      const countries = getCountries()
      const countryList = []
      countries.forEach(country => {
        countryList.push(country)
        countryList.push('%')
      })
      return countryList
    }
  }
}
</script>
