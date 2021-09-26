import { camelize, isObject, trim, isArray, isString } from './utils'

export function createElement (name, options) {
  const el = document.createElement(name)
  addClass(el, options.class)
  if (isObject(options.style)) {
    Object.keys(options.style).forEach(key => {
      setStyle(el, key, options.style[key])
    })
  }
  return el
}

export function addChild (el, chil) {
  console.log(Object.prototype.toString.call(chil))
  if (isArray(chil) || Object.prototype.toString.call(chil) === '[object NodeList]') {
    chil.forEach(chi => {
      el.appendChild(chi)
    })
  } else {
    el.appendChild(chil)
  }
}

export function unshiftChild (el, chil) {
  const ele = el.firstChild
  if (isArray(chil) || Object.prototype.toString.call(chil) === '[object NodeList]') {
    chil.forEach(chi => {
      unshiftChild(el, chi)
    })
  } else {
    el.insertBefore(chil, ele)
  }
}

export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) { throw new Error('className should not contain space.') }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

function getClasses (cls) {
  let classes = []
  if (isString(cls)) {
    classes = (cls || '').split(' ')
  } else if (isArray(cls)) {
    for (let i = 0, j = cls.length; i < j; i++) {
      classes = [...classes, ...getClasses(cls[i])]
      // classes = classes.concat(getClasses(cls))
    }
  } else if (isObject(cls)) {
    Object.keys(cls).forEach(key => {
      if (cls[key]) {
        // classes = classes.concat(getClasses(key))
        classes = [...classes, ...getClasses(key)]
      }
    })
  }
  return classes
}

export function addClass (el, cls) {
  if (!el) return
  let curClass = el.className
  const classes = getClasses(cls)
  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass (el, cls) {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export const getStyle = function (element, styleName) {
  if (!element || !styleName) return null
  styleName = camelize(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const style = element.style[styleName]
    if (style) return style
    const computed = document.defaultView.getComputedStyle(element, '')
    return computed ? computed[styleName] : ''
  } catch (e) {
    return element.style[styleName]
  }
}

export function setStyle (element, styleName, value) {
  if (!element || !styleName) return

  if (isObject(styleName)) {
    Object.keys(styleName).forEach(prop => {
      setStyle(element, prop, styleName[prop])
    })
  } else {
    styleName = camelize(styleName)
    element.style[styleName] = value
  }
}

export function removeStyle (element, style) {
  if (!element || !style) return

  if (isObject(style)) {
    Object.keys(style).forEach(prop => {
      setStyle(element, prop, '')
    })
  } else {
    setStyle(element, style, '')
  }
}

function isNoneDisplay (el) {
  const display = getStyle(el, 'display')
  if (display !== 'none') {
    if (el.parentNode && el.parentNode.nodeName !== 'BODY') {
      return isNoneDisplay(el.parentNode)
    } else {
      return { isNone: false, ele: el }
    }
  } else {
    return { isNone: true, ele: el }
  }
}

export function getElementSize (el) {
  const size = {}
  const displayNone = isNoneDisplay(el)
  if (displayNone.isNone) {
    const position = getStyle(displayNone.ele, 'position')
    const zIndex = getStyle(displayNone.ele, 'zIndex')
    const visibility = getStyle(displayNone.ele, 'visibility')
    const display = getStyle(displayNone.ele, 'display')
    setStyle(displayNone.ele, 'position', 'absolute')
    setStyle(displayNone.ele, 'zIndex', '-100')
    setStyle(displayNone.ele, 'visibility', 'hidden')
    setStyle(displayNone.ele, 'display', 'block')
    size.width = displayNone.ele.getBoundingClientRect().width
    size.height = displayNone.ele.getBoundingClientRect().height
    setStyle(displayNone.ele, 'position', position)
    setStyle(displayNone.ele, 'zIndex', zIndex)
    setStyle(displayNone.ele, 'visibility', visibility)
    setStyle(displayNone.ele, 'display', display)
  } else {
    size.width = el.getBoundingClientRect().width
    size.height = el.getBoundingClientRect().height
  }
  return size
}

export default { createElement, addClass, hasClass, removeClass, getStyle, setStyle, removeStyle, addChild, unshiftChild, getElementSize }