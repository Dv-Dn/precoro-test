import Vue from "vue";
import App from "./App.vue";

import VueTheMask from "vue-the-mask";
import { createPinia, PiniaVuePlugin } from "pinia";


Vue.use(VueTheMask);

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  ...App,
  pinia,
  el: "#app",
});
