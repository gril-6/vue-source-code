/*
 * @Author: hanjing
 * @Date: 2022-09-08 16:59:07
 * @LastEditTime: 2022-09-08 17:54:44
 */
function creatInvoker(nextValue) {
  const invoker = (e) => invoker.value(e)
  invoker.value = nextValue
  return invoker
}
export function patchEvent(el, eventName, nextValue) {
  // 可以移除事件再绑定 性能低 remove->add
  // add + 一个自定义事件 （里面调用绑定发方法）
  let invokers = el._vei || (el._vei = {})
  let exits = invokers[eventName]
  if (exits && nextValue) {
    exits.value = nextValue
  } else {
    // onClick => click
    let event = eventName.slice(2).toLowerCase()
    if (nextValue) {
      const invoker = (invokers[eventName] = creatInvoker(nextValue))
      el.addEventListener(event, invoker)
    } else if (exits) {
      // 如果有老值，需要将老的事件移除
      el.removeEventListener(event, exits)
      invokers[eventName] = undefined
    }
  }
}
