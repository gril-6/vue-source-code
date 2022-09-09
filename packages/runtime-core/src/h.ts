/*
 * @Author: hanjing
 * @Date: 2022-09-08 18:28:19
 * @LastEditTime: 2022-09-09 18:49:22
 */
// 是给用户使用 具备多样性
// h('h1')
// h('h1','hello)
// h('h1),{style:{'color:red}}
// h('h1),null,[h(span)]}
// h('h1),{style:{'color:red},'hello}

import { isArray, isObject } from '@vue/shared'
import { creatVnode, isVnode } from './vnode'

// h('h1),null,'hello','world}
export function h(type, propsChildren, children) {
  // 其余除了3个之外肯定是孩子
  const l = arguments.length
  if (l === 2) {
    // h('h1','hello)
    // h('h1),{style:{'color:red}}
    // h('h1),[h(span),h(span)]}
    if (isObject(propsChildren) && !isArray(propsChildren)) {
      if (isVnode(propsChildren)) {
        return creatVnode(type, null, [propsChildren]) //包装成数组
      }
      return creatVnode(type, propsChildren) //属性
    } else {
      return creatVnode(type, null, propsChildren) //是数组
    }
  } else {
    if (l > 3) {
      children = Array.from(arguments).slice(2)
    } else if (l === 3) {
      children = children
      // 等于3个
    }
    // 其他
    return creatVnode(type, propsChildren, children) //children的情况有2种纯文本/数组
  }
}
