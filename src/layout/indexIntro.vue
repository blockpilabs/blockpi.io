<template>
  <div
    class="app-wrapper"
  >
    <div
      id="full"
      class="full"
    >
      <navbar-intro>
        <div
          slot="menu"
          class="links"
        >
          <a
            v-for="item in menus"
            :key="item.label"
            class="link-item"
            :href="item.url"
            target="_blank"
          >
            {{ item.label }}
          </a>
        </div>
      </navbar-intro>

      <app-main-intro />
    </div>
  </div>
</template>

<script>
import { NavbarIntro, AppMainIntro } from './components';
import ResizeMixin from './mixin/ResizeHandler';

export default {
  name: 'LayoutIntro',
  components: {
    NavbarIntro,
    AppMainIntro
  },
  mixins: [ResizeMixin],
  data() {
    return {
      menus: [
        {
          label: 'Public RPC',
          url: 'https://chains.blockpi.io/#/'
        },
        {
          label: 'Near DRPC',
          url: 'https://near-drpc.blockpi.io/'
        },
        {
          label: 'Solana DRPC',
          url: 'https://solana-drpc.blockpi.io/'
        },
        {
          label: 'Docs',
          url: 'https://docs.blockpi.io/'
        }
      ]
    };
  },
  computed: {
    device() {
      return this.$store.state.app.device;
    }
  },
  mounted() {

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
  background: #121a18;
  .full {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .links {
    display: flex;
    .link-item {
      white-space: nowrap;
      margin: 0 30px;
      color: #fff;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 1024px) {
    .links {
      flex-direction: column;
      .link-item {
        white-space: nowrap;
        margin: 20px 0px;
        color: #fff;
      }
    }
  }
}

</style>
