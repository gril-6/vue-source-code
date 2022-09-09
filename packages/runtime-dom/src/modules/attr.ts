/*
 * @Author: hanjing
 * @Date: 2022-09-08 16:59:13
 * @LastEditTime: 2022-09-08 18:08:19
 */
export function patchAttr(el, key, nextValue) {
  if (nextValue) {
    el.setAttribute(key, nextValue)
  } else {
    el.removeAttribute(key)
  }
}
