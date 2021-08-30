import Vue from "vue";
import App from "./App.vue";
import rutDirective from "./directives/rutDirective";
import ThousandsDirective from "./directives/ThousandSeparatorDirective";
import { extend, ValidationProvider } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import rutValidNumber from "./validators/rutValidatorNumber";
import rutValid from "./validators/rutValidator";
Object.keys(rules).forEach((rule) => {
  if (rule === "required") {
    extend(rule, {
      ...rules[rule],
      message: "{_field_} is required"
    });
  } else {
    extend(rule, rules[rule]);
  }
});

extend("rut-valid-number", rutValidNumber);
extend("rut-valid", rutValid);

Vue.component("ValidationProvider", ValidationProvider);
Vue.config.productionTip = false;
Vue.directive("rut", rutDirective);
Vue.directive("thousands", ThousandsDirective);

new Vue({
  render: (h) => h(App)
}).$mount("#app");
