<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:100%">
        <tr style="width:100%">
          <th style="width:7%; border-right:1px solid #D8D8D8;" scope="col">{{tableName}}<img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyName" class="sort-button"/></th>
          <th v-bind:style="columnWidth()" scope="col" v-for="month in monthlyColumn" :key="month">{{month}}</th>
          <th style="width:10%; border-left:1px solid #D8D8D8;" scope="col">Total tenants<img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyTenants" class="sort-button"/></th>
          <th style="width:7.25%" scope="col">Difference in 12 Months <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyDifference" class="sort-button"/></th>
          <th style="width:7.25%" scope="col">% of total <img src="../../src/assets/Sorting.svg" class="sort-button"/></th>
        </tr>
      </thead>
      <tbody style="width:100%; border-bottom:1px solid #D8D8D8;">
        <tr style="width:100%" v-for="topic in TopicTableData" v-bind:key="topic.name">
          <td v-bind:class="topic.cssId" id="country-name" style="border-right:1px solid #D8D8D8;">
            {{topic.name}}
          </td>
          <th scope="row" class="monthly-data" v-for="(tenant, index) in topic.monthlyData.tenants"  v-bind:key="index"  v-bind:style="borderStyle(index)">
            <div style="display: inline;"><demo-doughnut-chart class="chart" :doughnutChartData="{tenant, topic}" v-if="index === topic.monthlyData.tenants.length - 1"></demo-doughnut-chart></div>
            {{tenant}}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getMonthlyColumn, getFundColumn } from '../data/data-handler'
import DemoDoughnutChart from '../components/Chart/DemoDoughnutChart'

export default {
  components: {
    DemoDoughnutChart
  },  
  props: {
    TopicTableData: {
      type: Array
    }},
  data () {
    return {
      sortedByName: false,
      sortedByTenants: false,
      sortedByDifference: false,
      tableName: 'Topic',
      monthlyColumn: (this.TopicTableData[0].monthlyData.tenants.length === 15) ? getMonthlyColumn() : getFundColumn()
    }
  },
  mounted () {
    this.TopicTableData
  },
  methods: {
    sortTableDatabyName () {
      if (this.sortedByName === false) {
        const unsorted = this.TopicTableData
        unsorted.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.sortedByName = true
      } else if (this.sortedByName === true) {
        const sorted = this.TopicTableData
        sorted.sort((a, b) => (a.name < b.name) ? 1 : -1)
        this.sortedByName = false
      }
    },
    sortTableDatabyTenants () {
      if (this.sortedByTenants === false) {
        const unsorted = this.TopicTableData
        unsorted.sort((a, b) => (a.totalTenants > b.totalTenants) ? 1 : -1)
        this.sortedByTenants = true
      } else if (this.sortedByTenants === true) {
        const sorted = this.TopicTableData
        sorted.sort((a, b) => (a.totalTenants < b.totalTenants) ? 1 : -1)
        this.sortedByTenants = false
      }
    },
    sortTableDatabyDifference () {
      if (this.sortedByDifference === false) {
        const unsorted = this.TopicTableData
        unsorted.sort((a, b) => (a.difference > b.difference) ? 1 : -1)
        this.sortedByTenants = true
      } else if (this.sortedByDifference === true) {
        const sorted = this.tableData
        sorted.sort((a, b) => (a.difference < b.difference) ? 1 : -1)
        this.sortedByTenants = false
      }
    },
    borderStyle (index) {
      if (index === this.monthlyColumn.length - 1) {
        return 'border-right:1px solid #D8D8D8;'
      }

      if (index === this.monthlyColumn.length + 2) {
        return 'color: white; font-size: 0px;'
      }
    },
    columnWidth () {
      const width = (this.TopicTableData[0].monthlyData.tenants.length === 15) ? 'width:3.77%;' : 'width:7.7%;'
      return width
    }
  },
  watch: {
    TopicTableData () {
      this.tableName = this.TopicTableData[0].type
    }
  }
}
</script>

