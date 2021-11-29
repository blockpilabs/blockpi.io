import Vue from 'vue';
export default () => {
  Vue.directive('lazy-start', {
    bind(el, binding, vnode) {
      const ratio = binding.value !== undefined ? binding.value : 1;
      const lazyAnimObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const lazyAnim = entry.target;
          var eventName = 'shouldPlay';
          // 相交率，默认是相对于浏览器视窗
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            if (vnode.componentInstance) {
              vnode.componentInstance.$emit(eventName);
            } else {
              vnode.elm.dispatchEvent(new CustomEvent(eventName));
            }
            // 当前图片加载完之后需要去掉监听
            lazyAnimObserver.unobserve(lazyAnim);
          }
        });
      }, { threshold: [ratio] });
      lazyAnimObserver.observe(el);
    }
  });
};
