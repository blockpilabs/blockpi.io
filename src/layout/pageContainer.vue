<template>
  <div class="common__wrapper">
    <div
      v-if="$slots.default"
      :style="defaultStyle"
      class="common-main__main"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutContainer',
  props: {
    /**
     * 默认内容样式
     * common-main__main
     */
    defaultStyle: {
      type: Object,
      default: () => ({})
    },
    // 是否显示返回
    showBack: {
      type: Boolean,
      default: false
    },
    // showBack 当 showBack为true时候有效  默认执行$router.back()
    backRoute: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleRouteBack() {
      const backRoute = this.backRoute || {};
      if (backRoute.name || backRoute.path) {
        this.$router.push(backRoute);
      } else {
        this.$router.back();
      }
    }
  }
};
</script>

