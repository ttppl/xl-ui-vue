export const camelize = function toHump (name) {
  return name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

export const isObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

export const isString = function (obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export const trim = function (s) {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export const getWindowSize = function () {
  const size = {}
  size.width = window.innerWidth
  size.height = window.innerHeight
  return size
}

export function getDate (dateString, format) {
  if (!dateString) {
    return new Date()
  }
  const formatLower = format.toLowerCase()
  const year = dateString.slice(formatLower.indexOf('yyyy'), formatLower.indexOf('yyyy') + 4) / 1
  const month = dateString.slice(format.indexOf('MM'), format.indexOf('MM') + 2) / 1
  const day = dateString.slice(formatLower.indexOf('dd'), formatLower.indexOf('dd') + 2) / 1
  const hour = dateString.slice(formatLower.indexOf('hh'), formatLower.indexOf('hh') + 2) / 1
  const minute = dateString.slice(format.indexOf('mm'), format.indexOf('mm') + 2) / 1
  const second = dateString.slice(formatLower.indexOf('ss'), formatLower.indexOf('ss') + 2) / 1
  return new Date(year, month - 1, day, hour, minute, second)
}

export default { camelize, isObject, trim, isArray, isString, getWindowSize, getDate }
