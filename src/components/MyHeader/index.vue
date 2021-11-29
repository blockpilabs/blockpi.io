<template>
  <div class="custom-header">
    <div
      class="logo"
      @click.stop="clickHome"
    />
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data() {
    return {};
  },
  methods: {
    clickHome() {
      this.$router.push({ name: 'HOME-INDEX' });
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-header {
  position: relative;
  z-index: 2;
  height: 36px;
  display: flex;
  align-items: center;
  .logo {
    width: 170px;
    height: 36px;
    background: url("~@/assets/images/BlockPI-logo.svg") no-repeat center;
    cursor: pointer;
  }
}
@media screen and (max-width: 750px) {
  .custom-header {
    height: 24px;
    .logo {
      width: 120px;
      height: 24px;
    }
  }
}
</style>
