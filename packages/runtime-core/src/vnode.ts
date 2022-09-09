/*
 * @Author: hanjing
 * @Date: 2022-09-08 18:46:59
 * @LastEditTime: 2022-09-09 18:42:22
 */
// type(div 函数 组件)
// props
// children
export function isVnode(value) {
  return !!(value && value.__v_isVnode)
}

import { isArray, isString, ShapeFlags } from '@vue/shared'

// 虚拟节点很多 ：组件的，元素的，文本的
// props :属性
export function creatVnode(type, props, children = null) {
  // 组合方案 shapeFalg 标识（使用二进制） 想知道一个元素包含的是一个儿子还是多个
  let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0 //类型是一个元素
  // 虚拟DOM就是一个对象，diff算法 真实DOM属性很多 比对性能很差
  const vnode = {
    type,
    props,
    el: null, // 虚拟节点上对应的真实节点，后续diff算法对比
    children,
    key: props?.['key'], //标识虚拟节点类型
    __v_isVnode: true,
    shapeFlag,
  }
  if (children) {
    let types = 0
    if (isArray(children)) {
      types = ShapeFlags.ARRAY_CHILDREN
    } else {
      children = String(children)
      types = ShapeFlags.TEXT_CHILDREN
    }
    vnode.shapeFlag |= types
  }
  return vnode
}
