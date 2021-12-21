<template>
  <layout-container
    ref="commonMain"
    :default-style="{ padding: '0px' }"
  >
    <section class="home-page">
      <div
        id="banner"
        ref="banner"
        class="banner"
      >
        <point-canvas v-if="device !== 'mobile'" />
        <div class="banner-container">
          <div class="banner-top">
            <div class="title-text">
              <div class="hello pi">
                Hello,&lt;Block&gt;PI&lt;/Block&gt;
              </div>
              <vue-typed-js
                :strings="words"
                :loop="true"
                :back-speed="50"
                :back-delay="1000"
                cursor-char="_"
              >
                <div><span class="pi">PI<br v-hide-dom></span> For <br v-hide-dom><span class="typing" /></div>
              </vue-typed-js>
            </div>
            <div class="desciption">
              A Distributed multi-chain acceleration layer, solving the RPC requests congestion problem with infinite scalability
            </div>
          </div>
          <div class="banner-bottom">
            <el-row class="networks">
              <el-col
                v-for="item in networks"
                ref="networkItem"
                :key="item.name"
                class="network-item"
                :lg="3"
                :sm="6"
                :xs="12"
              >
                <img
                  :src="require(`@/assets/images/chain/${item.name}.png`)"
                  alt="Pic"
                >
              </el-col>
              <div style="clear: both;" />
            </el-row>
          </div>
        </div>
      </div>
      <feature-area
        ref="featureArea"
      />

      <div class="get-start">
        <div class="next">
          <i class="iconfont icon-arrow" />
        </div>
        <div class="get-start__main">
          <h2>Wanna Try <br v-hide-dom="750"><span class="attention">BlockPI</span> Now ?</h2>
          <p class="descrip">
            Get started with few clicks
          </p>
          <el-button
            class="build-btn"
            type="primary"
            @click="goToRpc"
          >
            Try public RPC for free
          </el-button>
        </div>
      </div>
      <app-footer />
    </section>
  </layout-container>
</template>

<script>
import AppFooter from '@/components/Footer';
import FeatureArea from './components/FeatureArea/index-new.vue';
import PointCanvas from '@/components/PointCanvas';
export default {
  name: 'HomeIntroduce',
  components: {
    AppFooter,
    FeatureArea,
    PointCanvas
  },
  data() {
    return {
      networks: [
        { name: 'flow' },
        { name: 'huobi' },
        { name: 'kcc' },
        { name: 'near' },
        { name: 'solana' },
        { name: 'polygon' },
        { name: 'polkadot' },
        { name: 'kusama' }
      ]
    };
  },
  computed: {
    words() {
      return ['Infinite^500', 'Performance^500', 'Future^500', 'Intelligence^500', 'Distribution^500', 'Scalability^500'];
    },
    device() {
      return this.$store.getters.device;
    }
  },
  methods: {
    goToRpc() {
      window.open('https://chains.blockpi.io/#/');
    }
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  position: relative;
  .banner {
    position: relative;
    background: #121a18;
    z-index: 2;
    width: 100%;
    height: calc(100vh - 100px);
    &-container {
      position: relative;
      z-index: 3;
      max-width: 1280px;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 100px 20px 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-top {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .title-text {
        color: #fff;
        font-size: 60px;
        font-family: SourceCodePro !important;
        font-weight: bold;
        .hello {
          font-size: 30px;
          line-height: 1;
          margin-bottom: 20px;
        }
        .pi {
          color: #16c79a;
        }
        .typed-element {
          letter-spacing: -3px;
        }
      }
      .desciption {
        width: 350px;
        margin-top: 40px;
        color: #fff;
        font-size: 16px;
        line-height: 28px;
      }
    }
    &-bottom {
      position: relative;
      z-index: 1;
      width: 100%;
      margin-top: auto;
      &::before {
        content: '';
        position: absolute;
        z-index: 3;
        left: 50%;
        transform: translateX(-50%);
        bottom: -8px;
        width: 0;
        height: 0;
        border: 5px solid;
        border-color: #121a18 transparent transparent;
      }
      &::after {
        content: '';
        z-index: 2;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -10px;
        width: 0;
        height: 0;
        border: 5px solid;
        border-color: #3e4b48 transparent transparent;
      }
      .networks {
        position: relative;
        padding-bottom: 40px;
        border-bottom: 1px solid #3e4b48;
        .network-item {
          margin-top: 40px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &::before {
          content: '';
          position: absolute;
          left: -6px;
          bottom: -3px;
          width: 6px;
          height: 6px;
          border: solid 1px #3e4b48;
          border-radius: 50%;
        }
        &::after {
          content: '';
          position: absolute;
          right: -6px;
          bottom: -3px;
          width: 6px;
          height: 6px;
          border: solid 1px #3e4b48;
          border-radius: 50%;
        }
      }
    }
  }
  .get-start {
    background: url('~@/assets/images/try-bg.jpg') no-repeat center;
    background-size: contain;
    position: relative;
    padding-top: 150px;
    padding-bottom: 200px;
    width: 100%;
    .next {
      position: absolute;
      left: 50%;
      top: 100px;
      transform: translateX(-50%);
      .iconfont {
        color: #1a4642;
        font-size: 30px;
      }
    }
    &__main {
      max-width: 1280px;
      width: 100%;
      margin: 0 auto;
      padding: 110px 20px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      h2 {
        font-size: 40px;
        .attention {
          color: #16c79a;
        }
      }
      .descrip {
        font-weight: 500;
        margin-top: 10px;
        font-size: 30px;
        text-align: center;
        color: #5d6d69;
      }
      .build-btn {
        border: 2px solid #00ffd8;
        box-shadow: 0px 8px 16px 0px rgba($color: #16c79a, $alpha: 0.38);
        margin-top: 50px;
        font-size: 16px;
        height: 52px;
      }
    }
  }
}
@media screen and (max-width: 1024px) and (orientation: portrait) {
  .home-page {
    .banner {
      &-container {
        padding: 80px 30px 40px;
      }
      &-top {
        .title-text {
          font-size: 120px;
          line-height: 110px;
          .hello {
            font-size: 48px;
          }
        }
        .desciption {
          width: 574px;
          font-size: 26px;
          line-height: 50px;
        }
      }
      &-bottom {
        margin-top: 60px;
      }
    }
    .get-start {
      padding-bottom: 230px;
      .next {
        .iconfont {
          font-size: 40px;
        }
      }
      &__main {
        h2 {
          font-size: 54px;
        }
        .descrip {
          font-size: 40px;
        }
        .build-btn {
          margin-top: 100px;
          font-size: 22px;
          height: 60px;
          padding: 10px 35px;
        }
      }
    }
  }
}
@media screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)  {
  .home-page {
    .get-start {
      margin-top: 300px;
    }
  }
}
@media screen and (max-width: 1023px) {
  .home-page {
    .banner {
      &-container {
        padding: 30px 20px 40px;
      }
      &-top {
        .title-text {
          font-size: 90px;
          line-height: 100px;
          .hello {
            font-size: 36px;
          }
        }
        .desciption {
          width: 442px;
          font-size: 20px;
          line-height: 38px;
        }
      }
      &-bottom {
        margin-top: 40px;
      }
    }
    .get-start {
      padding-bottom: 160px;
      &__main {
        h2 {
          font-size: 40px;
        }
        .descrip {
          font-size: 30px;
        }
        .build-btn {
          margin-top: 70px;
          font-size: 20px;
          height: 60px;
          padding: 10px 30px;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .home-page {
    .banner {
      height: auto;
      ::v-deep {
        .point-canvas {
          display: none;
        }
      }
      &-container {
        background: url('~@/assets/images/banner.jpg') no-repeat center;
        background-size: contain;
        background-position: center 16%;
      }
      &-top {
        .title-text {
          font-size: 44px;
          line-height: 50px;
          .hello {
            font-size: 18px;
          }
        }
        .desciption {
          width: 100%;
          font-size: 15px;
          line-height: 30px;
        }
      }
      &-bottom {
        margin-top: 0px;
      }
    }
    .get-start {
      padding-bottom: 90px;
      &__main {
        padding-top: 50px;
        text-align: center;
        h2 {
          font-size: 30px;
        }
        .descrip {
          font-size: 18px;
        }
        .build-btn {
          margin-top: 40px;
          font-size: 15px;
          height: 42px;
          padding: 10px 25px;
        }
      }
    }
  }
}
</style>
