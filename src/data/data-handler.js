import { getLineChartColorScheme } from './colour-scheme'

export function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min
}

// For Employment page
export function calcSum (tenants) {
  const sum = tenants.reduce(
    (prev, curr) => prev + curr
  )
  return sum
}

export function compareDataByYear (prevYearTenants, currYearTenants) {
  const prevSum = calcSum(prevYearTenants)
  const currSum = calcSum(currYearTenants)
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

export function getLineChartData (tenants, colorScheme) {
  const totalTenants = tenants.tenants.flatMap(el => Object.values(el))
  const sum = calcSum(totalTenants)

  const labels = tenants.labels
  const dataset = tenants.tenants
  const lineChartData = []
  let chartDataObj = {}

  if (sum === 0) {
    chartDataObj = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [{
        label: 'No tenants data for this year',
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

export function getTableData (tabletype, currentYear, prevYear) {
  const tableLabels = currentYear.labels
  const tableDataArray = []
  
  for (let labelIndex = 0; labelIndex < tableLabels.length; labelIndex++) {
    const tenantsData = currentYear.tenants[labelIndex]
    const prevYearTenantsData = prevYear.tenants[labelIndex]
    const total = calcSum(Object.values(tenantsData))
    let growthRate = ''

    if (prevYearTenantsData) {
      growthRate = compareDataByYear(Object.values(prevYearTenantsData), Object.values(tenantsData))
    } else {
      growthRate = '+100%'
    }

    const tableDataSet = {
      type: tabletype,
      name: tableLabels[labelIndex],
      totalTenants: total,
      cssId: tableLabels[labelIndex].toLowerCase().replaceAll(' ', '-'),
      vForId: tableLabels[labelIndex],
      propId: tableLabels[labelIndex].replace(/\s+/g, ''),
      monthlyData: {
        tenants: Object.values(tenantsData),
        months: Object.keys(tenantsData)
      },
      colorIndex: labelIndex
    }
    tableDataSet.monthlyData.tenants.push(total)
    tableDataSet.monthlyData.tenants.push(growthRate)
    tableDataSet.monthlyData.months.push('Total Tenants')
    tableDataSet.monthlyData.months.push('Difference in 12 Months')
    if (tabletype === 'Topics') {
      tableDataSet.monthlyData.tenants.push(getRandomInt(0, 100))
      tableDataSet.monthlyData.months.push('% of total')    
    }
    tableDataArray.push(tableDataSet)
  }
  return tableDataArray
}

export function getBarChartData (dataByCountry) {
  const allDataDict = {}
  dataByCountry.forEach((el, index) => {
    let key = el.name
    let value = el.monthlyData.tenants.slice(0, 12)
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

export function getStackedBarChartData (tenants, colorScheme) {
  const totalTenants = tenants.tenants.flatMap(el => Object.values(el))
  const sum = calcSum(totalTenants)
  const barChartData = []
  for (let i = 0; i < tenants.labels.length; i++) {
    const barChartDataSet = {
      label: tenants.labels[i],
      backgroundColor: colorScheme(i),
      data: Object.values(tenants.tenants[i]),
      barThickness: 15
    }
    barChartData.push(barChartDataSet)
  }

  let chartDataObj = {}
  if (sum === 0) {
    chartDataObj = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [{
        label: 'No tenants data for this year',
        backgroundColor: 'transparent',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]
    }
  } else if (tenants.tenants.length > 0) {
    chartDataObj = {
      labels: Object.keys(tenants.tenants[0]),
      datasets: barChartData
    }
  }
  return chartDataObj
}

// For Employment page table
export function getMonthlyColumn () {
  const MONTH = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  return MONTH
}

export function getFundColumn () {
  const FUNDS = [
    "RLPF1 - St Mungo’s",
    "RLPF2 - St Mungo’s",
    "NHPF 1 - Oxford",
    "NHPF 1 - Bristol",
    "NHPF 1 - Lancaster",
    "NHPF 1 - Manchester"]
  
    return FUNDS
}