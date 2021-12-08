<template>
  <div id="app">
    <router-view v-if="showView" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return { showView: true };
  },
  provide() {
    return { appReload: this.reload };
  },
  created() {
    this.handleChange(false);
    window.addEventListener('orientationchange', this.handleChange);
    this.$once('hook:beforeDestory', () => {
      window.removeEventListener('orientationchange', this.handleChange);
    });
  },
  methods: {
    handleChange(reload = true) {
      this.$store.commit('app/SET_ORIENTATION', (screen.orientation.angle === 0 || screen.orientation.angle === 180) ? 'portrait' : 'landscape');
      reload && this.reload();
    },
    reload() {
      this.showView = false;
      setTimeout(() => {
        this.showView = true;
      }, 1000 / 60);
    }
  }
};
</script>
