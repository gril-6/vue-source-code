import { ShapeFlags } from '@vue/shared'

/*
 * @Author: hanjing
 * @Date: 2022-09-08 18:21:48
 * @LastEditTime: 2022-09-09 18:58:01
 */
export function createRenderer(renderOptions) {
  //
  const render = (vnode, container) => {
    // 渲染过程是使用传入的renderOPtions来渲染

    let {
      insert: hostInsert,
      romove: hostRemove,
      setElementText: hostSetElementText,
      setText: hostSetText,
      parentNode: hostParentNode,
      nextSibling: hostNextsibling,
      createElement: hostCreatElement,
      createText: hostCreatText,
      patchProp: hostPatchProp,
    } = renderOptions

    const mountChildren = (children, container) => {
      for (let i = 0; i < children.length; i++) {
        patch(null, children[i], container)
      }
    }

    const mountElement = (vnode, contianer) => {
      let { type, props, children, shapeFlag } = vnode
      let el = (vnode.el = hostCreatElement(type)) // 将真实元素挂载到这个虚拟节点上，后续用于复用节点更新
      if (props) {
        for (let key in props) {
          hostPatchProp(el, key, null, props[key])
        }
      }
      if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // 文本
        hostSetElementText(el, children)
      } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(children, container)
      }
      hostInsert(el, container)
    }
    const patch = (n1, n2, contianer) => {
      //核心
      if (n1 === n2) return
      if (n1 === null) {
        // 初次渲染
        // 元素初次渲染
        mountElement(n2, contianer)
      } else {
        // 更新流程
      }
    }
    // 如果当前vnode是空的
    if (vnode === null) {
      // 卸载逻辑
    } else {
      // 挂载 既有初始化又有更新逻辑
      patch(container._vnode || null, vnode, container)
    }
    container._vnode = vnode
    // 重命名
  }

  return { render }
}
