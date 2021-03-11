<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:100%" class="thead">
        <tr style="width:100%">
          <th style="width:7.6%; border-right:1px solid #D8D8D8;" scope="col">{{tableName}}<img src="../../src/assets/Sorting.svg" v-on:click="sortTable(name)" class="sort-button"/></th>
          <th style="width:3.77%" scope="col" v-for="month in monthlyColumn" :key="month">{{month}}</th>
          <th style="width:10.415%; border-left:1px solid #D8D8D8;" scope="col">Total lessons <img src="../../src/assets/Sorting.svg" v-on:click="sortTable(totalLessons)" class="sort-button"/></th>
          <th style="width:14%" scope="col">Difference in 12 Months <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyDifference" class="sort-button"/></th>
        </tr>
      </thead>
      <tbody style="width:100%; border-bottom:1px solid #D8D8D8;">
        <tr style="width:100%;" v-for="country in tableData" v-bind:key="country.name">
          <th v-bind:class="country.cssId" id="country-name" style="border-right:1px solid #D8D8D8;">
            {{country.name}}
          </th>
          <td scope="row" class="monthly-data" v-for="(month, index) in country.monthlyData.lessons" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{month}}
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import { getMonthlyColumn } from '../data/data-handler'
export default {
  props: {
    tableData: {
      type: Array
    }},
  data () {
    return {
      sortedByDifference: false,
      sorted: false,
      tableName: 'Name',
      monthlyColumn: getMonthlyColumn(),
      name: '',
      totalLessons: ''
    }
  },
  methods: {
    sortTable () {
      if (this.sorted === false) {
        const unsorted = this.tableData
        unsorted.sort((a, b) => (a.columnName > b.columnName) ? 1 : -1)
        this.sorted = true
      } else if (this.sorted === true) {
        const sorted = this.tableData
        sorted.sort((a, b) => (a.columnName < b.columnName) ? 1 : -1)
        this.sorted = false
      }
    },
    sortTableDatabyDifference () {
      if (this.sortedByDifference === false) {
        const unsorted = this.tableData
        unsorted.sort((a, b) => (parseInt(a.monthlyData.lessons[13].slice(0, -1), 10) > parseInt(b.monthlyData.lessons[13].slice(0, -1), 10)) ? 1 : -1)
        this.sortedByDifference = true
      } else if (this.sortedByDifference === true) {
        const sorted = this.tableData
        sorted.sort((a, b) => (parseInt(a.monthlyData.lessons[13].slice(0, -1), 10) < parseInt(b.monthlyData.lessons[13].slice(0, -1), 10)) ? 1 : -1)
        this.sortedByDifference = false
      }
    },
    borderStyle (index) {
      if (index === 11) {
        return 'border-right:1px solid #D8D8D8;'
      }
    }
  },
  watch: {
    tableData () {
      this.tableName = this.tableData[0].type
    }
  }
}
</script>
