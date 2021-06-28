import Loading from './loading'
import {createApp} from 'vue'

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if(binding.value) {
      append(el)
    }
    
  },
  updated(el, binding) {
    console.log(binding.value, binding.oldValue)
    if(binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  },
}

function append(el) {
  el.appendChild(el.instance.$el)
}
function remove(el) {
  el.removeChild(el.instance.$el)
}

export default loadingDirective