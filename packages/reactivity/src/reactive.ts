/*
 * @Author: hanjing
 * @Date: 2022-08-30 11:00:05
 * @LastEditTime: 2022-08-30 17:25:04
 */

import { isObject } from '@vue/shared'
import { mutableHandlers, ReactiveFlags } from './baseHandler'

export const reactiveMap = new WeakMap() //&key只能是对象
// &实现同一个对象 代理多次 返回同一个代理
// &代理对象被再次代理 直接返回
// &将数据转化为响应式 只能做对象代理
export function reactive(target) {
  if (!isObject(target)) {
    return
  }

  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  let exisitingProxy = reactiveMap.get(target)
  if (exisitingProxy) {
    return exisitingProxy
  }

  // &第一次普通对象代理，会通过new proxy代理一次
  // &下次传递对象时， 首先看一下是否被代理过，就是访问这个proxy 是否有get方法

  // &并没有重新定义属性，只是代理，在取值时会被调用get,赋值时会调用set
  const proxy = new Proxy(target, mutableHandlers)
  reactiveMap.set(target, proxy)
  return proxy
}

// let target = {
//   name: 'zf',
//   get alias() {
//     return this.name
//   },
// }
// &proxy.alias  是去alias取值，但是也取了name，但是不会监控到name
