const data = require('./dummyStatusJsonData.json')
const fundData = require('./dummyFundJsonData.json')
const demoData = require('./dummyDemoJsonData.json')
const moneyData = require('./dummyMoneyJsonData.json')

// for INS
function getZeroData () {
  return {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0
  }
}

export function getStatusNames () { // getCountries
  const statusList = Object.keys(data.children)
  return statusList
}

export function getFundNames (fund) { // getCamps
  return Object.keys(data.children[fund].children)
}

export function getDemoCategories (status, fund) { //getSchools
  return Object.keys(data.children[status].children[fund].children)
}

export function getTotalTenantsByStatus (status, year) {
  const dataByStatus = {}
  const tenantsData = data.children[status].values[year]

  if (tenantsData === undefined) {
    dataByStatus.tenants = [getZeroData()]
  } else {
    dataByStatus.tenants = [tenantsData]
  }
  dataByStatus.labels = ['All']

  return dataByStatus
}

export function getTotalTenantsByFund (status, fund, year) { //getTotalLessonsByCamp
  const dataByFund = {}
  const tenantsData = data.children[status].children[fund].values[year]
  
  if (tenantsData === undefined) {
    dataByFund.tenants = [getZeroData()]
  } else {
    dataByFund.tenants = [tenantsData]
  }
  dataByFund.labels = ['All']

  return dataByFund
}

export function getTenantsNumber (employmentStatus, funds, demographics, year, viewMode) {
  let values = {}
  let chartdata = {}
  if (viewMode === 'Fund') {
    chartdata = fundData
  } else {
    chartdata = data
  }
  
  if (employmentStatus.length === 0) {
    values['All'] = chartdata.values[year] ? chartdata.values[year] : getZeroData()
  } else {
    for (let statusIndex = 0; statusIndex < employmentStatus.length; statusIndex++) {
      const status = employmentStatus[statusIndex]
      if (funds.length === 0) {
        const tenants = chartdata.children[status].values[year]
        if (tenants) {
          values[status] = tenants
        } else {
          values[status] = getZeroData()
        }
      } else {
        for (let fundIndex = 0; fundIndex < funds.length; fundIndex++) {
          const fund = funds[fundIndex]
          if (demographics.length === 0) {
            const tenants = chartdata.children[status].children[fund].values[year]           
            if (tenants) {
              values[fund] = tenants
            } else {
              values[fund] = getZeroData()
            }
          } else {
            for (let demoIndex = 0; demoIndex < demographics.length; demoIndex++) {
              const demo = demographics[demoIndex]
              const tenants = chartdata.children[status].children[fund].children[demo].values[year]
              if (tenants) {
                values[demo] = tenants
              } else {
                values[demo] = getZeroData()
              }
            }
          }
        }
      }
    }
  }

  values = {
    labels: Object.keys(values),
    tenants: Object.values(values)
  }

  return values
}

export function getTenantsByTopics (status, fund, demo, year) {
  let values = data.children[status].children[fund].children[demo].children
  let allMonthlyDataByYears = Object.values(values)

  const allTopics = Object.keys(values)
  let existingTopicsInYear = {}

  allTopics.forEach((el, index) => {
    const monthlyData = allMonthlyDataByYears[index].values[year]
    existingTopicsInYear[el] = monthlyData || getZeroData()
  })
  return {
    labels: Object.keys(existingTopicsInYear),
    tenants: Object.values(existingTopicsInYear),
    type: 'Month'
  }
}

export function getValueByDemo (status, demo, year) {
  const values = demoData.children[status].children[demo].children
  const valuesByDemo = Object.values(values)
  const allDemoCategory = Object.keys(values)

  const demoDataInYear = {}
  allDemoCategory.forEach((el, index) => {
    const dataByFund = valuesByDemo[index].values[year]
    demoDataInYear[el] = dataByFund || getZeroData()
  })
  return {
    labels: Object.keys(demoDataInYear),
    tenants: Object.values(demoDataInYear),
    type: 'Fund'
  }
}

// for Tenant savings page
export function getValueByMoney (year) {
  const data = moneyData.children
  const labelsArray = Object.keys(data)
  const values = Object.values(data)
  const valuesArray = []
  labelsArray.forEach((el, index) => {
    valuesArray.push(values[index].values[year])
  })
  const returnObj = {}
  returnObj.labels = labelsArray
  returnObj.tenants = valuesArray
  return returnObj
}

// set year select box options
export function setYearSelectBox (country) {
  const totalDataByCountry = Object.values(data.children)
  let yearlyIndex = []
  let uniqueYear = []

  if (country === undefined) {
    totalDataByCountry.forEach(el => {
      const totalData = el.values
      yearlyIndex.push(...Object.keys(totalData))
    })
    uniqueYear = yearlyIndex.filter((item, index) => yearlyIndex.indexOf(item) === index).sort((a, b) => b - a)
  }

  return uniqueYear
}

