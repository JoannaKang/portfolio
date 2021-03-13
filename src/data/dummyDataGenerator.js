const fs = require('fs')

const YEARS = [
  '2018',
  '2019',
  '2020',
]

const STATUS = ['Full time - 35+ hours/week',
'24+ hours/week',
'16+ hours/week',
'16- hours/week',
'Zero hours contract',
'Unemployed',
'Unemployed - not eligible']

const FUNDNAMES = [
  "RLPF1 - St Mungo’s",
  "RLPF2 - St Mungo’s",
  "NHPF 1 - Oxford",
  "NHPF 1 - Bristol",
  "NHPF 1 - Lancaster",
  "NHPF 1 - Manchester"
]

const AGERANGE = [
  '18-21 years old',
  '22-24 years old',
  '25-34 years old',
  '35-44 years old',
  '45-54 years old'
]

const DUMMYCATEGORY = [
  'Case 1',
  'Case 2',
  'Case 3',
  'Case 4',
  'Case 5',
]

const GENDER = [
  'Male',
  'Female'
]

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min
}

function setMonthlyValues () {
  const yearObj = {}
  for (let i = 0; i < YEARS.length; i++) {
    const nestedObj = {}
    yearObj[YEARS[i]] = nestedObj
    for (let j = 1; j <= 12; j++) {
      nestedObj[j] = getRandomInt(0,50)
    }
  }
  return yearObj
}

function setValuseByFund () { // for demographic data
  const yearObj = {}
  for (let i = 0; i < YEARS.length; i++) {
    const nestedObj = {}
    yearObj[YEARS[i]] = nestedObj
    for (let j = 0; j < FUNDNAMES.length; j++) {
      nestedObj[FUNDNAMES[j]] = getRandomInt(0,50)
    }
  }
  return yearObj
}

function demographicValue (demoType) {
  const childrenObj = {}
  for (let i = 0; i < demoType.length; i++) {
    childrenObj[demoType[i]] = {values: setValuseByFund()}
  }
  return childrenObj
}

function setDemoObj () {
  const demographicObj = {
    'Age at survey date': {
      values: {},
      children: demographicValue(AGERANGE)
    },
    'Benefits': {
      values: {},
      children: demographicValue(DUMMYCATEGORY)
    },
    'Households with children': {
      values: {},
      children: demographicValue(DUMMYCATEGORY)
    },
    'Tenants with disabilities': {
      values: {},
      children: demographicValue(DUMMYCATEGORY)
    },
    'Ethnic origin': {
      values: {},
      children: demographicValue(DUMMYCATEGORY)
    },  
    'Gender': {
      values: {},
      children: demographicValue(GENDER)
    },        
  }
  return demographicObj
}

function setChildren () {
  const childrenObj = {}
  for (let index = 0; index < STATUS.length; index++) {
    const fundTypeObj = {}
    for (let j = 0; j < FUNDNAMES.length; j++) {
      const monthlyValues = setMonthlyValues()
      const fundValues = setMonthlyValues()
      const demograpicObj = setDemoObj()
      fundTypeObj[FUNDNAMES[j]] = {
        values: fundValues,
        children: demograpicObj}
      childrenObj[STATUS[index]] = { 
        values: monthlyValues,
        children: fundTypeObj }
    }
  }
  return childrenObj
}


function setFullData () {
  const dummyData = {}
  dummyData.values = setMonthlyValues()
  dummyData.children = setChildren()
  return dummyData
}

// console.log(setChildren())
const data = setFullData()
const parsed =  JSON.stringify(data)

fs.writeFileSync('dummyJsonData.json', parsed)