import store from '@/store';
import { rotate } from '@/utils/orientation';

export default {
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler);
  },
  created() {
    const isMobile = this.$_isMobile();
    const isPad = this.$_isPad();
    if (isMobile) {
      rotate();
      store.dispatch('app/toggleDevice', 'mobile');
    }
    if (isPad) {
      store.dispatch('app/toggleDevice', 'pad');
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const ua = navigator.userAgent;
      const isMobile = /Android|iPhone/i.test(ua);
      return isMobile;
    },
    $_isPad() {
      const ua = navigator.userAgent;
      const isSafari = ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1;
      const isIphone = ua.indexOf('iPhone') !== -1 && ua.indexOf('Version') !== -1;
      const isIPad = isSafari && !isIphone && 'ontouchend' in document;
      return isIPad;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        const isPad = this.$_isPad();
        if (isMobile) {
          store.dispatch('app/toggleDevice', 'mobile');
        } else if (isPad) {
          store.dispatch('app/toggleDevice', 'pad');
        } else {
          store.dispatch('app/toggleDevice', 'desktop');
        }
      }
    }
  }
};
