/*
 * @Author: hanjing
 * @Date: 2022-09-08 16:21:48
 * @LastEditTime: 2022-09-09 19:00:25
 */
export const nodeOps = {
  // 增加
  insert(child, parent, anchor = null) {
    parent.insertBefore(child, anchor) // inserBefore 可以等价于appendChild
  },
  // 创建元素
  createElement(tagName) {
    return document.createElement(tagName)
  },
  // 创建文本
  creatText(text) {
    return document.createTextNode(text)
  },
  // 删除
  remove(child) {
    const parentNode = child.parentNode
    if (parentNode) {
      parentNode.removeChild(child)
    }
  },
  //修改 文本节点 元素中的内容
  setElementText(el, text) {
    el.textContent = text
  },
  // 设置节点内容
  setText(node, text) {
    // document.creatTextNode
    node.nodeValue = text
  },
  //查询
  querySelector(selector) {
    return document.querySelector(selector)
  },
  parentNode(node) {
    return node.parentNode
  },
  // 兄弟节点
  nextSibling(node) {
    return node.nextSibling
  },
}
