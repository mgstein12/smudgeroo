import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Gallery from '@/components/Gallery'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-792636.okta.com/oauth2/default',
  client_id: '0oagxhf4qPYZzKEWi356',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
