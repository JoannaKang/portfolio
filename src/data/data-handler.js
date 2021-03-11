import { getStudentIctSchoolAvg, getTeacherIctSchoolAvg, getIctSchoolList } from './data-provider'
import { getGroupBarChartColorSheme, getLineChartColorScheme } from './colour-scheme'

// For INS Page
export function calcSum (lessons) {
  const sum = lessons.reduce(
    (prev, curr) => prev + curr
  )
  return sum
}

export function compareDataByYear (prevYearLessons, currYearLessons) {
  const prevSum = calcSum(prevYearLessons)
  const currSum = calcSum(currYearLessons)
  const growthRate = ((currSum / prevSum) - 1) * 100
  if (Number.isNaN(growthRate)) {
    return '-'
  } else if (growthRate !== Infinity && growthRate > 0) {
    return '+' + growthRate.toFixed(0) + '%'
  } else if (growthRate !== Infinity && growthRate < 0) {
    return growthRate.toFixed(0) + '%'
  } else {
    return '+100%'
  }
}

export function getLineChartData (lessons, colorScheme) {
  const totalLessons = lessons.lessons.flatMap(el => Object.values(el))
  const sum = calcSum(totalLessons)

  const labels = lessons.labels
  const dataset = lessons.lessons
  const lineChartData = []
  let chartDataObj = {}

  if (sum === 0) {
    chartDataObj = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [{
        label: 'No lessons data for this year',
        backgroundColor: 'transparent',
        borderColor: '#D8D8D8',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pointRadius: 6,
        borderWidth: 1.5,
        pointBackgroundColor: '#FFFFFF',
        lineTension: 0
      }]
    }
  } else {
    for (let i = 0; i < dataset.length; i++) {
      const color = colorScheme(i)
      const lineChartDataSet = {
        chartType: 'line',
        label: labels[i],
        backgroundColor: 'transparent',
        borderColor: color,
        data: Object.values(dataset[i]),
        pointRadius: 6,
        borderWidth: 1.5,
        pointBackgroundColor: '#FFFFFF',
        lineTension: 0,
        pointHoverRadius: 8,
        pointStyle: 'round'
      }
      lineChartData.push(lineChartDataSet)
    }
    chartDataObj = {
      labels: Object.keys(dataset[0]),
      datasets: lineChartData
    }
  }
  return chartDataObj
}

export function getTableData (tabletype, lessons, prevYear) {
  const countries = lessons.labels
  const tableDataArray = []

  for (let countryIndex = 0; countryIndex < countries.length; countryIndex++) {
    const lessonsData = lessons.lessons[countryIndex]
    const prevYearLessonsData = prevYear.lessons[countryIndex]
    const total = calcSum(Object.values(lessonsData))
    let growthRate = ''

    if (prevYearLessonsData) {
      growthRate = compareDataByYear(Object.values(prevYearLessonsData), Object.values(lessonsData))
    } else {
      growthRate = '+100%'
    }

    const tableDataSet = {
      type: tabletype,
      name: countries[countryIndex],
      totalLessons: total,
      cssId: countries[countryIndex].toLowerCase().replaceAll(' ', '-'),
      vForId: countries[countryIndex],
      propId: countries[countryIndex].replace(/\s+/g, ''),
      monthlyData: {
        lessons: Object.values(lessonsData),
        months: Object.keys(lessonsData)
      },
      colorIndex: countryIndex
    }

    tableDataSet.monthlyData.lessons.push(total)
    tableDataSet.monthlyData.lessons.push(growthRate)
    tableDataSet.monthlyData.months.push('Total Lessons')
    tableDataSet.monthlyData.months.push('Difference in 12 Months')
    tableDataArray.push(tableDataSet)
  }
  return tableDataArray
}

export function getBarChartData (dataByCountry) {
  const allDataDict = {}
  dataByCountry.forEach((el, index) => {
    let key = el.name
    let value = el.monthlyData.lessons.slice(0, 12)
    allDataDict[key] = {
      labels: el.monthlyData.months.slice(0, 12),
      datasets: [{
        data: value,
        hoverBackgroundColor: getLineChartColorScheme(index),
        hoverBorderColor: getLineChartColorScheme(index)
      }]
    }
  })
  return allDataDict
}

export function getStackedBarChartData (lessons, colorScheme) {
  const totalLessons = lessons.lessons.flatMap(el => Object.values(el))
  const sum = calcSum(totalLessons)
  const barChartData = []
  for (let i = 0; i < lessons.labels.length; i++) {
    const barChartDataSet = {
      label: lessons.labels[i],
      backgroundColor: colorScheme(i),
      data: Object.values(lessons.lessons[i]),
      barThickness: 15
    }
    barChartData.push(barChartDataSet)
  }

  let chartDataObj = {}
  if (sum === 0) {
    chartDataObj = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [{
        label: 'No lessons data for this year',
        backgroundColor: 'transparent',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]
    }
  } else if (lessons.lessons.length > 0) {
    chartDataObj = {
      labels: Object.keys(lessons.lessons[0]),
      datasets: barChartData
    }
  }
  return chartDataObj
}

// For ICT page
export function getStudentIctRate (school, type, year) {
  const avgSchoolIctSkill = getStudentIctSchoolAvg(`${school}`, `${type}`, `${year}`)
  return avgSchoolIctSkill
}

export function getTeacherIctRate (school, type, year) {
  const avgSchoolIctSkill = getTeacherIctSchoolAvg(`${school}`, `${type}`, `${year}`)
  return avgSchoolIctSkill
}

export function calcDifference (base, end) {
  const difference = end.map((end, index) => {
    if (end - base[index] < 0) {
      const res = end - base[index]
      return res + '%'
    } else if (end - base[index] > 0) {
      const plus = '+'
      return plus.concat('', end - base[index]) + '%'
    } else {
      return 0 + '%'
    }
  })
  return difference
}

export function getIctTableData (getRateDataFunc, getAcrossAvgDataFunc) {
  const labelArr = getIctSchoolList()
  const totalBaseYearData = {}
  const totalEndYearData = {}
  const maleBaseYearData = {}
  const maleEndYearData = {}
  const femaleBaseYearData = {}
  const femaleEndYearData = {}
  const tableProp = {}

  labelArr.forEach(el => {
    totalBaseYearData[el] = getRateDataFunc(`${el}`, 'Total', 'Base')
    totalEndYearData[el] = getRateDataFunc(`${el}`, 'Total', 'End')
    maleBaseYearData[el] = getRateDataFunc(`${el}`, 'Male', 'Base')
    maleEndYearData[el] = getRateDataFunc(`${el}`, 'Male', 'End')
    femaleBaseYearData[el] = getRateDataFunc(`${el}`, 'Female', 'Base')
    femaleEndYearData[el] = getRateDataFunc(`${el}`, 'Female', 'End')
  })

  tableProp.columns = Object.keys(totalBaseYearData)
  tableProp.total = {
    beforeIns: Object.values(totalBaseYearData),
    afterIns: Object.values(totalEndYearData)
  }
  tableProp.male = {
    beforeIns: Object.values(maleBaseYearData),
    afterIns: Object.values(maleEndYearData)
  }
  tableProp.female = {
    beforeIns: Object.values(femaleBaseYearData),
    afterIns: Object.values(femaleEndYearData)
  }
  tableProp.total.beforeIns.push(getAcrossAvgDataFunc('Total', 'Base'))
  tableProp.total.afterIns.push(getAcrossAvgDataFunc('Total', 'End'))
  tableProp.total.difference = calcDifference(tableProp.total.beforeIns, tableProp.total.afterIns)
  tableProp.male.beforeIns.push(getAcrossAvgDataFunc('Male', 'Base'))
  tableProp.male.afterIns.push(getAcrossAvgDataFunc('Male', 'End'))
  tableProp.male.difference = calcDifference(tableProp.male.beforeIns, tableProp.male.afterIns)
  tableProp.female.beforeIns.push(getAcrossAvgDataFunc('Female', 'Base'))
  tableProp.female.afterIns.push(getAcrossAvgDataFunc('Female', 'End'))
  tableProp.female.difference = calcDifference(tableProp.female.beforeIns, tableProp.female.afterIns)
  return tableProp
}

export function getGroupBarChartData (label, getInfoFunc, type) {

  const labelArr = label
  
  const baseYearData = {}
  const endYearData = {}

  labelArr.forEach(el => {
    baseYearData[el] = getInfoFunc(`${el}`, type, 'Base')
  })
  labelArr.forEach(el => {
    endYearData[el] = getInfoFunc(`${el}`, type, 'End')
  })

  const dataset = {
    labels: labelArr,
    datasets: [{ // label: 'baseYear',
      backgroundColor: getGroupBarChartColorSheme().opacity,
      barThickness: 15,
      data: Object.values(baseYearData)
    }, {// label: 'endYear',
      backgroundColor: getGroupBarChartColorSheme().normal,
      barThickness: 15,
      data: Object.values(endYearData)
    }]
  }

  return dataset
}

// For INS table
export function getMonthlyColumn () {
  const MONTH = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  return MONTH
}