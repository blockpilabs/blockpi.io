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
    window.addEventListener('orientationchange', this.reload);
    this.$once('hook:beforeDestory', () => {
      window.removeEventListener('orientationchange', this.reload);
    });
  },
  methods: {
    reload() {
      this.showView = false;
      setTimeout(() => {
        this.showView = true;
      }, 1000 / 60);
    }
  }
};
</script>
