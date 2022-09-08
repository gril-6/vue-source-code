export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive', //proxy的属性
}
import { isObject } from '@vue/shared'
import { reactive } from './reactive'
import { track, trigger } from './effect'

export const mutableHandlers = {
  get(target, key, receiver) {
    // &去代理对象上取值 就get
    //   return target[key]
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
    track(target, 'get', key)
    let res = Reflect.get(target, key, receiver)
    if (isObject(res)) {
      return reactive(res)
    }
    return res
  },
  set(target, key, value, receiver) {
    // &去代理上设置值 就执行set
    //   target[key] = value
    let oldValue = target[key]
    let reslut = Reflect.set(target, key, value, receiver) //需要先设置值
    if (oldValue !== value) {
      // 要更新
      trigger(target, 'set', key, value, oldValue)
    } //值变化了
    return reslut
  },
}
