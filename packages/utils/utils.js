export const camelize = function toHump(name) {
  return name.replace(/-(\w)/g, function(all, letter){
      return letter.toUpperCase();
  })
}

export const isObject = function(obj){
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isArray = function(obj){
  return Object.prototype.toString.call(obj) === '[object Array]'
}

export const isString = function(obj){
  return Object.prototype.toString.call(obj) === '[object String]'
}

export const trim = function(s) {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export const getWindowSize = function(){
  const size = {}
  size.width = window.innerWidth
  size.height = window.innerHeight
  return size
}

export default {camelize,isObject,trim,isArray,isString,getWindowSize}
  
