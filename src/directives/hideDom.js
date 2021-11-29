import Vue from 'vue';
export default () => {
  Vue.directive('hide-dom', {
    inserted(el, binding) {
      const { value } = binding;
      const { body } = document;
      const WIDTH = value || 1024;
      if (body.getBoundingClientRect().width > WIDTH) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
};
