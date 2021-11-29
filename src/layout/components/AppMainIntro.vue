<template>
  <section
    class="app-container"
    :class="{ 'is-home': isHome }"
  >
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
</template>

<script>

export default {
  name: 'AppMainIntro',
  computed: {
    isHome() {
      return this.$route.name === 'HOME-INDEX';
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
}
</style>
