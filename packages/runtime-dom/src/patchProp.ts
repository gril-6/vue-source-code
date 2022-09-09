/*
 * @Author: hanjing
 * @Date: 2022-09-08 16:55:49
 * @LastEditTime: 2022-09-09 19:09:29
 */
// Dom属性的操作api
// null 值
// 值 值

import { patchAttr } from './modules/attr'
import { patchClass } from './modules/class'
import { patchEvent } from './modules/event'
import { patchStyle } from './modules/style'

// 值 null
export function patchProp(el, key, preValue, nextValue) {
  if (key === 'class') {
    // 类名 el.className
    patchClass(el, nextValue)
  } else if (key === 'style') {
    // 样式 el.style
    patchStyle(el, preValue, nextValue)
  } else if (/^on[a-z]/.test(key)) {
    //正则有点问题
    // events addEventListener
    patchEvent(el, key, nextValue)
  } else {
    //普通属性 el.setAttribute
    patchAttr(el, key, nextValue)
  }
}
