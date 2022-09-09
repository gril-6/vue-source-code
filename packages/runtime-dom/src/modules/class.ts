/*
 * @Author: hanjing
 * @Date: 2022-09-08 16:58:35
 * @LastEditTime: 2022-09-08 17:19:57
 */
export function patchClass(el, nextValue) {
  if (nextValue === null) {
    el.removeAttribute('class') // 如果不需要class直接一出
  } else {
    el.className = nextValue
  }
}
