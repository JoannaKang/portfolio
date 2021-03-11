<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead class="thead">
        <tr>
          <th style="border-right:1px solid #D8D8D8;" scope="col">Students</th>
          <th scope="col" >Skills</th>
          <th v-for="(school, index) in setSkillList" v-bind:key="index" v-bind:class="school" v-bind:style="borderStyle(index)">
            {{school}}
          </th>
          <th style="white-space:nowrap;" scope="col">Avg No of ICT skills/student in {{tableName}}</th>
        </tr>
      </thead>
      <tbody style="border-bottom:1px solid #D8D8D8;">
        <tr>
          <th rowspan="3" align="center" v-bind:style="borderStyle(index)">Total</th>
          <td style="white-space:nowrap;">before INS</td>
          <td v-for=" (data, index) in totalBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index === 42">{{data}}</div>
            <div v-if="index % 2 === 0 && index !== 42" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in totalAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index === 42">{{data}}</div>
            <div v-if="index % 2 === 0 && index !== 42" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in totalDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0" ></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 42">{{data}}</div>    
          </td>
        </tr>
        <tr>
          <th rowspan="3" align = "center" v-bind:style="borderStyle(index)">Male</th>
          <td>before INS</td>
          <td v-for=" (data, index) in maleBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index === 42">{{data}}</div>
            <div v-if="index % 2 === 0 && index !== 42" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in maleAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0 && index !== 42" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 42">{{data}}</div>
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in maleDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0" ></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 42">{{data}}</div>    
          </td>
        </tr>
        <tr>
          <th rowspan="3" align = "center" v-bind:style="borderStyle(index)">Female</th>
          <td>before INS</td>
          <td v-for=" (data, index) in femaleBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0 && index !== 42"><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 42">{{data}}</div>     
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in femaleAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0 && index !== 42" ><h3 style="font-size: 1.2em; display:inline;">{{data.skills}}</h3>/<h4 style="font-size: 0.6rem !important; display:inline;">{{data.denominator}}</h4></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === 42">{{data}}</div>            
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in femaleDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            <div v-if="index % 2 === 0" ></div>
            <div v-if="index % 2 !== 0">{{data}}</div>
            <div v-if="index === columnLength">{{data}}</div>    
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
      index: '',
      sortedByName: false,
      sortedByLessons: false,
      sortedByDifference: false,
      tableName: 'Name',
      totalBeforeIns: [],
      totalAfterIns: [],
      totalDifference: [],
      maleBeforeIns: [],
      maleAfterIns: [],
      maleDifference: [],
      femaleBeforeIns: [],
      femaleAfterIns: [],
      femaleDifference: [],
      columnLength: '',
      beforeIns: ''
    }
  },
  mounted () {
    this.maleBeforeIns = this.tableData.maleBaseYearData
    this.maleAfterIns = this.tableData.maleEndYearData
    this.femaleBeforeIns = this.tableData.femaleBaseYearData
    this.femaleAfterIns = this.tableData.femaleEndYearData
    this.maleDifference = this.tableData.maleDiff
    this.femaleDifference = this.tableData.femaleDiff
    this.totalBeforeIns = this.tableData.totalBaseYearData
    this.totalAfterIns = this.tableData.totalEndYearData
    this.totalDifference = this.tableData.totalDiff
    this.tableName = this.tableData.tableName
  },
  methods: {
    borderStyle (index) {
      const columnLength = this.setSkillList.length
      if (index === columnLength) {
        return 'border-right:1px solid #fffff;'
      } else {
        return 'border-right:1px solid #D8D8D8;'
      }
    }
  },
  watch: {
    tableData () {
      if (this.tableData.maleBaseYearData.length !== 0) {
        this.maleBeforeIns = this.tableData.maleBaseYearData
        this.maleAfterIns = this.tableData.maleEndYearData
        this.femaleBeforeIns = this.tableData.femaleBaseYearData
        this.femaleAfterIns = this.tableData.femaleEndYearData
        this.femaleDifference = this.tableData.femaleDiff
        this.maleDifference = this.tableData.maleDiff
        this.totalBeforeIns = this.tableData.totalBaseYearData
        this.totalAfterIns = this.tableData.totalEndYearData
        this.totalDifference = this.tableData.totalDiff
        this.tableName = this.tableData.tableName
      } else {
        return null
      }
    }
  },
  computed: {
    setSkillList () {
      const skillList = []
      for (let i = 1; i <= 21; i++) {
        skillList.push('Skill' + i)
        skillList.push('%')
      }
      return skillList
    }
  }
}
</script>
