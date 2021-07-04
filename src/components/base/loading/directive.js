import Loading from './index'
import {createApp} from 'vue'
import {addClass, removeClass} from '@/assets/js/dom'
const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    const title = binding.arg
    // console.log(binding.arg)
    if(typeof title !== 'undefined') {
      // 调用实例方法 类似ref
      instance.setTitle(title)
    }
    if(binding.value) {
      append(el)
    }
    
  },
  updated(el, binding) {
    const title = binding.arg
    if(typeof title !== 'undefined') {
      // 调用实例方法 类似ref
      el.instance.setTitle(title)
    }
    if(binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  },
}

const relativeCls = 'g-relative'

function append(el) {
  const style = getComputedStyle(el)
  if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
    addClass(el, relativeCls)
  }
  el.appendChild(el.instance.$el)
}
function remove(el) {
  removeClass(el, relativeCls)
  el.removeChild(el.instance.$el)
}

export default loadingDirective