import Vue from 'vue'
import Router from 'vue-router'
import imgShow from '@/components/imgShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'imgShow',
      component: imgShow
    }
  ]
})
