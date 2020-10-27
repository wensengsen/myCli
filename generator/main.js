module.exports = function() {
  const template = `
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import EventBus from "./global/eventBus.js";
import ElementUI from "element-ui";
import Hammer from "hammerjs";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import * as cornerstoneMath from "cornerstone-math";
import * as dicomParser from "dicom-parser";
import { get, post } from "./api";
Vue.prototype.httpGet = get;
Vue.prototype.httpPost = post;

Vue.config.productionTip = false;

var wadoConfig = {
  maxWebWorkers: navigator.hardwareConcurrency || 1,
  startWebWorkersOnDemand: true,
  taskConfiguration: {
    decodeTask: {
      initializeCodecsOnStartup: false,
      usePDFJS: false,
    },
  },
};
cornerstoneWADOImageLoader.webWorkerManager.initialize(wadoConfig);

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.Hammer = Hammer;
Object.defineProperty(Vue.prototype, "$cornerstone", {
  value: cornerstone,
});
Object.defineProperty(Vue.prototype, "$cornerstoneTools", {
  value: cornerstoneTools,
});
Object.defineProperty(Vue.prototype, "$cornerstoneWADOImageLoader", {
  value: cornerstoneWADOImageLoader,
});
Vue.use(EventBus);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
  `;
  return {
    template,
    dir: "src",
    name: "main.js"
  };
};
