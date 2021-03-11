<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:100%" class="thead">
        <tr style="width:100%">
          <th style="width:10%; border-right:1px solid #D8D8D8;" scope="col">Students</th>
          <th style="width:10%" scope="col">Schools</th>
          <th style="width:7.4%" v-for="(school, index) in column" v-bind:key="index" v-bind:class="school">
            {{school}}
          </th>
          <th scope="col" style="border-left:1px solid #D8D8D8;">Avg No of ICT skills/student across schools</th>
        </tr>
      </thead>
      <tbody style="width:100%; border-bottom:1px solid #D8D8D8;">
        <tr>
          <th rowspan="3" align="center" style="border-right:1px solid #D8D8D8;">Total</th>
          <td>before INS</td>
          <td v-for=" (data, index) in totalBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in totalAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in totalDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
        <tr>
          <th rowspan="3" align = "center" style="border-right:1px solid #D8D8D8;">Male</th>
          <td>before INS</td>
          <td v-for=" (data, index) in maleBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in maleAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in maleDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
        <tr>
          <th rowspan="3" align = "center" style="border-right:1px solid #D8D8D8;">Female</th>
          <td>before INS</td>
          <td v-for=" (data, index) in femaleBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in femaleAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in femaleDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
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
      tableName: 'Name',
      column: '',
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
    this.column = this.tableData.columns
    this.totalBeforeIns = this.tableData.total.beforeIns
    this.totalAfterIns = this.tableData.total.afterIns
    this.totalDifference = this.tableData.total.difference
    this.maleBeforeIns = this.tableData.male.beforeIns
    this.maleAfterIns = this.tableData.male.afterIns
    this.maleDifference = this.tableData.male.difference
    this.femaleBeforeIns = this.tableData.female.beforeIns
    this.femaleAfterIns = this.tableData.female.afterIns
    this.femaleDifference = this.tableData.female.difference
  },
  methods: {
    borderStyle (index) {
      const columnLength = this.column.length
      if (index === columnLength - 1) {
        return 'border-right:1px solid #D8D8D8;'
      }
    }
  },
  watch: {
    tableData () {
      if (this.tableData.columns.length !== 0) {
        this.column = this.tableData.columns
        this.totalBeforeIns = this.tableData.total.beforeIns
        this.totalAfterIns = this.tableData.total.afterIns
        this.totalDifference = this.tableData.total.difference
        this.maleBeforeIns = this.tableData.male.beforeIns
        this.maleAfterIns = this.tableData.male.afterIns
        this.maleDifference = this.tableData.male.difference
        this.femaleBeforeIns = this.tableData.female.beforeIns
        this.femaleAfterIns = this.tableData.female.afterIns
        this.femaleDifference = this.tableData.female.difference
      } else {
        return null
      }
    }
  }
}
</script>
