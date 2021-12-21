<template>
  <div
    class="app-wrapper"
  >
    <div class="full">
      <navbar>
        <horizontal-menu slot="menu" />
      </navbar>

      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import HorizontalMenu from '@/layout/components/HorizontalMenu';

export default {
  name: 'Layout',
  components: {
    HorizontalMenu,
    Navbar,
    AppMain
  },
  mixins: [ResizeMixin],
  data: () => ({ activeIndex: 0 }),
  computed: {
    device() {
      return this.$store.state.app.device;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .full {
    width: 100%;
    height: 100%;
    overflow: auto;
    // overscroll-behavior: contain;
  }
}
</style>
