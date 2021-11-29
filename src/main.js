import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import ElementUI from 'element-ui';
import '@/assets/font-montserrat/font-montserrat.css';
import '@/assets/font-sourceCodePro/font-sourceCodePro.css';
import App from './App';
import store from './store';
import router from './router';

import '@/icons'; // icon
import '@/iconfont/iconfont.css';

import LayoutContainer from '@/layout/pageContainer';

import '@/styles/index.scss'; // global css
import 'animate.css';
import '@/utils/permission';
import xss from 'xss';
import VueTypedJs from 'vue-typed-js';
import '@/utils/orientation';
import lazyStart from '@/directives/lazyStart';
import hideDom from '@/directives/hideDom';
import vueTouch from '@/directives/vueTouch';
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();
Vue.use(vueTouch);
Vue.use(lazyStart);
Vue.use(hideDom);
Vue.use(VueTypedJs);
Vue.prototype.xss = xss;

Vue.component('LayoutContainer', LayoutContainer);
Vue.use(ElementUI, { size: 'medium' });
Vue.config.productionTip = false;
const app = new Vue({
  name: 'App',
  router,
  store,
  render: h => h(App)
});
app.$mount('#app');
