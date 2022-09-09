/*
 * @Author: hanjing
 * @Date: 2022-09-08 16:14:49
 * @LastEditTime: 2022-09-08 18:42:43
 */
import { creatRenderer } from '@vue/runtime-core'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'
const renderOptions = Object.assign(nodeOps, { patchProp }) // dom API

export function render(vnode, contianer) {
  // 在创建渲染器时调用
  creatRenderer(renderOptions).render(vnode, contianer)
}
console.log(renderOptions)
export * from '@vue/runtime-core'

// creatRenderer(renderOptions).render(
//   h('h1', 'hello'),
//   document.getElementById('app')
// )
// h创建虚拟DOM render渲染
