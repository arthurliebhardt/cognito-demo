import Vue from 'vue'
import App from './App.vue'
import VueAuthenticate from "vue-authenticate";
import VueAxios from "vue-axios";
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

function isUndefined(value) {
    return typeof value === 'undefined'
}

export function getRedirectUri(uri) {
    try {
        return (!isUndefined(uri))
            ? `${window.location.origin}${uri}`
            : `${window.location.origin}/`
    } catch (e) {
      // Do nothing
    }

    return uri || null;
}

Vue.use(BootstrapVue);

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
    tokenName: 'access_token',
    baseUrl: 'http://localhost:8080',
    storageType: 'cookieStorage',
    providers: {
        cognito: {
            name: 'cognito',
            authorizationEndpoint: 'https://DOMAIN.auth.REGION.amazoncognito.com/oauth2/authorize',
            clientId: 'CLIENTID',
            url: '/auth/cognito',
            redirectUri: getRedirectUri(),
            requiredUrlParams: ['scope'],
            optionalUrlParams: [],
            scope: [],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            oauthType: '2.0',
            responseType: 'token',
            popupOptions: {width: 452, height: 633}
        }
    }
})

new Vue({
    render: h => h(App)
}).$mount('#app')