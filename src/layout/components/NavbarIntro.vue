<template>
  <div
    class="navbar"
  >
    <div class="bar-content">
      <my-header class="my-header" />
      <div
        class="menu__wrapper"
      >
        <slot name="menu" />
      </div>
      <div class="navbar-right">
        <a
          v-for="item in contacts"
          :key="item.type"
          class="contact-item"
          :href="item.url"
          target="_blank"
        >
          <i
            class="iconfont"
            :class="'icon-'+item.type"
          />
        </a>
      </div>
      <i
        class="mini-menu iconfont icon-navi"
        @click="drawer = true"
      />
    </div>
    <el-drawer
      title="MENU"
      :visible.sync="drawer"
      :with-header="false"
      custom-class="menu-drawer"
      :size="228"
      :append-to-body="true"
    >
      <div class="menu-list">
        <slot name="menu" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader';

export default {
  name: 'NavbarIntro',
  components: { MyHeader },
  data() {
    return {
      contacts: [
        { url: 'https://twitter.com/RealBlockPI', type: 'twitter' },
        { url: 'https://t.me/blockpidaily', type: 'telegram' },
        { url: 'https://discord.gg/xTvGVrGVZv', type: 'discord' }
      ],
      drawer: false
    };
  },
  computed: {
    device() {
      return this.$store.getters.device;
    },
    showMiniNav() {
      return this.device !== 'desktop' || window.innerWidth <= 1024;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 100px;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #121a18;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .bar-content {
    position: relative;
    padding: 0 20px;
    height: 100px;
    margin: 0 auto;
    max-width: 1280px;
    width: 100%;
    flex: 0 1 auto;
    align-items: center;
    display: flex;
    .menu__wrapper {
      flex: 1 1 0%;
      display: flex;
      justify-content: flex-end;
    }
    .navbar-right {
      flex: 0 1 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .contact-item {
        margin-left: 30px;
        color: #16c79a;
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .navbar {
    .bar-content {
      padding: 0 30px;
      justify-content: space-between;
      .menu__wrapper {
        display: none;
      }
      .navbar-right {
        position: absolute;
        z-index: 1;
        width: 100%;
        justify-content: center;
        .contact-item {
          margin: 0 18px;
        }
      }
      .mini-menu {
        display: inline-block;
        position: relative;
        z-index: 2;
        margin-right: 30px;
        color: #ffffff;
        font-size: 20px;
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  .navbar {
    .bar-content {
      padding: 0 20px;
    }
  }
}
@media screen and (max-width: 750px) {
  .navbar {
    .bar-content {
      .navbar-right {
        .contact-item {
          margin: 0 14px;
        }
      }
      .mini-menu {
        margin-right: 0px;
      }
    }
  }
}
</style>

<style lang="scss">

@media screen and (max-width: 1024px) {
  .el-drawer.menu-drawer {
    background: #172320;
    .menu-list {
      padding: 90px 25px 25px 50px;
      .links {
        display: flex;
        flex-direction: column;
      }
      .link-item {
        white-space: nowrap;
        margin: 20px 0px;
        color: #fff;
      }
    }
  }
}
</style>
