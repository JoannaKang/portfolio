<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:100%">
        <tr style="width:100%">
          <th style="width:7%; border-right:1px solid #D8D8D8;" scope="col">{{tableName}}<img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyName" class="sort-button"/></th>
          <th style="width:3.77%" scope="col" v-for="month in monthlyColumn" :key="month">{{month}}</th>
          <th style="width:10%; border-left:1px solid #D8D8D8;" scope="col">Total times <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyLessons" class="sort-button"/></th>
          <th style="width:14.5%" scope="col">Difference in 12 Months <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyDifference" class="sort-button"/></th>
        </tr>
      </thead>
      <tbody style="width:100%; border-bottom:1px solid #D8D8D8;">
        <tr style="width:100%" v-for="topic in TopicTableData" v-bind:key="topic.name">
          <td v-bind:class="topic.cssId" id="country-name" style="border-right:1px solid #D8D8D8;">
            {{topic.name}}
          </td>
          <th scope="row" class="monthly-data" v-for="(lesson, index) in topic.monthlyData.lessons"  v-bind:key="index"  v-bind:style="borderStyle(index)">
            {{lesson}}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getMonthlyColumn } from '../data/data-handler'
export default {
  props: {
    TopicTableData: {
      type: Array
    }},
  data () {
    return {
      sortedByName: false,
      sortedByLessons: false,
      sortedByDifference: false,
      tableName: 'Topic',
      monthlyColumn: getMonthlyColumn()
    }
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
    sortTableDatabyLessons () {
      if (this.sortedByLessons === false) {
        const unsorted = this.TopicTableData
        unsorted.sort((a, b) => (a.totalLessons > b.totalLessons) ? 1 : -1)
        this.sortedByLessons = true
      } else if (this.sortedByLessons === true) {
        const sorted = this.TopicTableData
        sorted.sort((a, b) => (a.totalLessons < b.totalLessons) ? 1 : -1)
        this.sortedByLessons = false
      }
    },
    sortTableDatabyDifference () {
      if (this.sortedByDifference === false) {
        const unsorted = this.TopicTableData
        unsorted.sort((a, b) => (a.difference > b.difference) ? 1 : -1)
        this.sortedByLessons = true
      } else if (this.sortedByDifference === true) {
        const sorted = this.tableData
        sorted.sort((a, b) => (a.difference < b.difference) ? 1 : -1)
        this.sortedByLessons = false
      }
    },
    borderStyle (index) {
      if (index === 11) {
        return 'border-right:1px solid #D8D8D8;'
      }
    }
  },
  watch: {
    TopicTableData () {
      this.tableName = this.TopicTableData[0].type
    }
  }
}
</script>
