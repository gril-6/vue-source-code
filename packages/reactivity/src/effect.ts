/*
 * @Author: hanjing
 * @Date: 2022-08-30 10:59:34
 * @LastEditTime: 2022-08-31 15:48:42
 */

export let activeEffect = undefined // 导出的是引用改变了会变化
function clearupEffect(effect) {
  const { deps } = effect // 里面是name的effect
  for (let i = 0; i < deps.length; i++) {
    deps[i].delete(effect)
  }
  effect.deps.length = 0
}
class ReactiveEffect {
  // &这里表示在实例上新增了active属性
  public active = true // &effect默认是激活状态
  public parent = null
  public deps = [] //记录所有依赖属性
  constructor(public fn, public scheduler?) {
    // &用户传递参数也会当this上 this.fn = fn
  }
  run() {
    // &run就是执行effect
    if (!this.active) {
      this.fn() // &表示如果是非激活情况，只需要执行函数，不需要进行依赖收集
    }
    // &依赖收集 核心将当前的effect和稍后渲染属性关联
    try {
      this.parent = activeEffect
      activeEffect = this

      // &需要将执行用户函数之前收集内容清空
      clearupEffect(this)
      return this.fn() // &当稍后调用取值操作时 可以获取到这个全局的activeEffect
    } finally {
      activeEffect = this.parent
      this.parent = null
    }
  }
  stop() {
    if (this.active) {
      this.active = false
      clearupEffect(this) // 停止effect的收集
    }
  }
}
export function effect(fn, options: any = {}) {
  // &fn可以根据状态变化 重新执行 effect可以嵌套写
  const _effect = new ReactiveEffect(fn, options.scheduler)
  _effect.run() // 默认执行一次
  const runner = _effect.run.bind(_effect) // 绑定this指向
  runner.effect = _effect //  将effect挂载到runner函数上
  return runner
}

// &一个effect对应多个属性， 一个属性对应多个effec 多对多
const targetMap = new WeakMap()
export function track(target, type, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target) // 第一次没有
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  let shoudTrack = !dep.has(activeEffect) //去重
  if (shoudTrack) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep) // 让effect记录住对应dep 请理时会用到
  }
  // &对象 某个属性 -》多个effect
  // &map(对象：[]) 使用WeakMap进行收集
  // &WeakMap = {对象：Map{name:Set}} //key只能是对象
  // &单向性 属性记录了effect 方向记录 应该让effec也记录被那些属性收集过，这样做是为了可以请理
}

export function trigger(target, type, key, value, oldValue) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return // 触发的值不在模板中
  let effects = depsMap.get(key) // 找到了属性对应的effect
  if (effects) {
    effects = new Set(effects)
    effects.forEach((effect) => {
      // 在执行effect时， 又执行自己 需要屏蔽掉自己 不要无限调用
      if (effect !== activeEffect) {
        if (effect.scheduler) {
          effect.scheduler() // 如果用户传入了调度函数，则用用户的
        } else {
          effect.run() // 否则默认刷新视图
        }
      }
    })
  }
}
