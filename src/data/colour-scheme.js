export function getAllPurpleColor () {
  const COLOR_SCHEME = '#8954BA'
  return COLOR_SCHEME
}

export function getLineChartColorScheme (index) {
  let COLOR_SCHEME = [
    '#E84F89',
    '#2FB9EF',
    '#F69855',
    '#BED23F',
    '#58CCCA',
    '#F7B500',
    '#EF664F',
    '#869898',
    '#B643C4',
    '#5BC87D',
    '#8C6450',
    '#E08685',
    '#50788C'
  ]
  return COLOR_SCHEME[index % COLOR_SCHEME.length]
}

export function getCountryColorSchme (index) {
  let COLOR_SCHEME = [
    '#EA4C89',
    '#2FB9EF',
    '#67B675',
    '#f76511'
  ]
  return COLOR_SCHEME[index % COLOR_SCHEME.length]
}

export function getCampColorSchme (index) {
  let COLOR_SCHEME = [
    '#F69855',
    '#BED23F',
    '#3FC9D2',
    '#D23FC5'
  ]
  return COLOR_SCHEME[index % COLOR_SCHEME.length]
}

export function getSchoolColorSchme (index) {
  let COLOR_SCHEME = [
    '#EF6D73',
    '#9355DE',
    '#ffa600',
    '#ff7c43',
    '#f95d6a',
    '#d45087',
    '#a05195',
    '#665191',
    '#2f4b7c',
    '#003f5c',
    '#488f31',
    '#de6069',
    '#f0b8b8'
  ]
  return COLOR_SCHEME[index % COLOR_SCHEME.length]
}

export function getTopicColorSchme (index) {
  let COLOR_SCHEME = [
    '#A26AE6',
    '#BED23F',
    '#FE8708',
    '#5496FF',
    '#c70039',
    '#111d5e',
    '#654062',
    '#65d6ce',
    '#ffcc29',
    '#184d47'
  ]
  return COLOR_SCHEME[index % COLOR_SCHEME.length]
}

export function getGroupBarChartColorSheme () {
  const COLOR_SCHEME = [
    '#EA4C89',
    '#2FB9EF',
    '#67B675',
    '#f76511',
    '#1CB8C4',
    '#F7B500',
    '#4908d4'
  ]

  const OPACITY_COLOR_SCHEME = [
    'rgb(232, 79, 137, 0.5)',
    'rgb(47, 185, 239, 0.5)',
    'rgb(103, 182, 117, 0.5)',
    'rgb(247, 101, 17, 0.5)',
    'rgb(28, 184, 196, 0.5)',
    'rgb(247, 181, 0, 0.5',
    'rgb(73, 8, 212, 0.5)'
  ]

  const colorSchemeObj = {
    normal: COLOR_SCHEME,
    opacity: OPACITY_COLOR_SCHEME
  }

  return colorSchemeObj
}

export function getSkillsGroupBarChartColorSheme () {
  const COLOR_SCHEME = [
    '#EA4C89',
    '#2FB9EF',
    '#67B675',
    '#f76511',
    '#1CB8C4',
    '#F7B500',
    '#4908d4',
    '#EF6D73',
    '#9355DE',
    '#ffa600',
    '#ff7c43',
    '#f95d6a',
    '#d45087',
    '#a05195',
    '#665191',
    '#2f4b7c',
    '#003f5c',
    '#488f31',
    '#de6069',
    '#f0b8b8',
    '#184d47'
  ]

  const OPACITY_COLOR_SCHEME = [
    'rgb(232, 79, 137, 0.5)',
    'rgb(47, 185, 239, 0.5)',
    'rgb(103, 182, 117, 0.5)',
    'rgb(247, 101, 17, 0.5)',
    'rgb(28, 184, 196, 0.5)',
    'rgb(247, 181, 0, 0.5',
    'rgb(73, 8, 212, 0.5)',
    'rgb(239, 109, 115, 0.5)',
    'rgb(147, 85, 222, 0.5)',
    'rgb(255, 166, 0, 0.5)',
    'rgb(255, 124, 67, 0.5)',
    'rgb(249, 93, 106, 0.5)',
    'rgb(212, 80, 135, 0.5)',
    'rgb(160, 81, 149, 0.5)',
    'rgb(102, 81, 145, 0.5)',
    'rgb(47, 75, 124, 0.5)',
    'rgb(0, 63, 92, 0.5)',
    'rgb(72, 143, 49, 0.5)',
    'rgb(222, 96, 105, 0.5)',
    'rgb(240, 184, 184, 0.5)',
    'rgb(24, 77, 71, 0.5)'
  ]

  const colorSchemeObj = {
    normal: COLOR_SCHEME,
    opacity: OPACITY_COLOR_SCHEME
  }

  return colorSchemeObj
}
