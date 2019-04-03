// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Array.prototype.addall = function (val) {
  if (val == null)
    return;
  var l = val.length;
  if (l != null && l > 0) {
    for (var i = 0; i < l; i++) {
      this[this.length] = val[i];
    }
  }
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
