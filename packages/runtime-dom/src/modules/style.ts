/*
 * @Author: hanjing
 * @Date: 2022-09-08 16:58:57
 * @LastEditTime: 2022-09-08 17:26:43
 */
export function patchStyle(el, preValue, nextValue) {
  // 样式需要比对差异
  for (let key in nextValue) {
    // 用新的覆盖即可 去除之前有的
    el.style[key] = nextValue[key]
  }
  if ([preValue]) {
    for (let key in preValue) {
      if (nextValue.style[key] === null) {
        el.style[key] = null
      }
    }
  }
}
