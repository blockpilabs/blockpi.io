<template>
  <div
    ref="container"
    class="technological-features"
  >
    <div class="title">
      <span>Technological </span>
      <br v-hide-dom="750">
      <span class="attention">Features</span>
    </div>
    <div class="main">
      <div class="main-left">
        <div
          ref="featureList"
          class="feature-list"
        >
          <div
            v-for="(item,index) in features"
            :key="index"
            ref="featureItem"
            class="feature-item"
            :class="{ active: index + 4 === scrollCount }"
          >
            <div class="feature-item__icon">
              <i :class="item.icon" />
            </div>
            <div class="feature-item__title attention">
              {{ item.title }}
              <span v-hide-dom="750">{{ item.sub }}</span>
            </div>
            <div class="feature-item__sub attention">
              {{ item.sub }}
            </div>
            <div class="feature-item__content">
              {{ item.content }}
            </div>
          </div>
        </div>
        <div class="feature-mask" />
      </div>
      <div class="main-right">
        <div
          ref="svgContainer"
          class="animation-container"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Technologics } from '@/assets/libs/enum';
import lottie from 'lottie-web';
import * as animationData from '@/assets/lottie/animation5.json';
export default {
  name: 'TechnologicalFeatures',
  props: {
    scrollCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      features: Technologics,
      animObj: {}
    };
  },
  computed: {
    device() {
      return this.$store.getters.device;
    }
  },
  watch: {
    scrollCount(val) {
      this.handleAnim(val);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.animObj = lottie.loadAnimation({
        container: this.$refs.svgContainer,
        animationData: animationData.default,
        autoplay: this.device !== 'desktop',
        renderer: 'svg',
        loop: this.device !== 'desktop'
      });
    },
    // control the animation
    handleAnim(val) {
      if (this.device !== 'desktop') {
        return;
      }
      const featureList = this.$refs.featureList;
      const featureItem = this.$refs.featureItem[0];
      const unitHeight = featureItem.scrollHeight;
      const unit = (val - 3) < 0 ? 0 : val - 4;
      featureList.style.transform = `translateY(${-unitHeight * unit}px)`;
      switch (unit) {
        case 0:
          this.animObj.playSegments([0, 130], true);
          break;
        case 1:
          this.animObj.playSegments([131, 270], true);
          break;
        case 2:
          this.animObj.playSegments([271, 450], true);
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.technological-features {
  padding-top: 100px;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('~@/assets/images/tech-bg.jpg') no-repeat top left;
  .title {
    font-size: 36px;
    font-weight: bold;
    line-height: 60px;
    color: #fff;
    .attention {
      color: #16c79a;
    }
  }
  .main {
    max-width: 1280px;
    padding: 0 20px;
    width: 100%;
    margin-top: 70px;
    display: flex;
    align-items: center;

    &-left {
      position: relative;
      width: 180px;
      height: 366px;
      overflow: hidden;
      .feature-list {
        width: 100%;
        transition: all 800ms;
        .feature-item {
          height: 260px;
          color: #fff;
          &__icon {
            .iconfont {
              font-size: 26px;
            }
          }
          .attention {
            font-size: 24px;
            font-weight: bold;
            line-height: 30px;
          }
          &__content {
            font-size: 16px;
            line-height: 28px;
          }
          &.active {
            .attention {
              color: #16c79a;
            }
          }
        }
      }
      .feature-mask {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background: linear-gradient(to bottom, rgba(#121a18, 0), rgba(#121a18, 0.8));
      }
    }
    &-right {
      height: 480px;
      width: 840px;
      margin-left: 100px;
    }
  }

}

@media screen and (max-width: 1024px) {
  .technological-features {
    height: auto;
    position: relative;
    .title {
      font-size: 54px;
    }
    .main {
      padding: 0 30px;
      margin-top: 160px;
      flex-direction: column;
      &-left {
        width: 100%;
        height: 300px;
        overflow: hidden;
        .feature-list {
          width: 100%;
          display: flex;
          justify-content: space-around;
          transition: all 1s;
          .feature-item {
            width: 180px;
            display: flex;
            flex-direction: column;
            &__icon {
              margin-bottom: 10px;
              .iconfont {
                font-size: 40px;
              }
            }
            .attention {
              font-size: 30px;
              line-height: 40px;
              color: #16c79a;
            }
            &__content {
              margin-top: 16px;
              font-size: 24px;
              line-height: 30px;
              color: #5d6d69;
            }
          }
        }
        .feature-mask {
          display: none;
        }
      }
      &-right {
        height: auto;
        width: 100%;
        margin-left: 0px;
      }
    }
  }
}
@media screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)  {
  .technological-features {
    height: auto;
    position: relative;
    .title {
      font-size: 54px;
    }
    .main {
      padding: 0 30px;
      margin-top: 0px;
      flex-direction: column;
      &-left {
        width: 100%;
        height: 300px;
        overflow: hidden;
        .feature-list {
          width: 100%;
          display: flex;
          justify-content: space-around;
          transition: all 1s;
          .feature-item {
            width: 180px;
            display: flex;
            flex-direction: column;
            &__icon {
              margin-bottom: 10px;
              .iconfont {
                font-size: 40px;
              }
            }
            .attention {
              font-size: 30px;
              line-height: 40px;
              color: #16c79a;
            }
            &__content {
              margin-top: 16px;
              font-size: 24px;
              line-height: 30px;
              color: #5d6d69;
            }
          }
        }
        .feature-mask {
          display: none;
        }
      }
      &-right {
        height: auto;
        width: 100%;
        margin-left: 0px;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .technological-features {
    .title {
      font-size: 40px;
    }
    .main {
      padding: 0 22px;
      margin-top: 120px;
      &-left {
        height: 230px;
        .feature-list {
          .feature-item {
            width: 142px;
            &__icon {
              .iconfont {
                font-size: 30px;
              }
            }
            .attention {
              font-size: 24px;
              line-height: 36px;
            }
            &__content {
              margin-top: 10px;
              font-size: 18px;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .technological-features {
    .title {
      font-size: 30px;
      line-height: 40px;
      text-align: center;
    }
    .main {
      padding: 0 22px;
      margin: 90px auto;
      &-left {
        height: auto;
        .feature-list {
          flex-direction: column;
          align-items: center;
          .feature-item {
            align-items: center;
            width: 100%;
            height: auto;
            &__icon {
              .iconfont {
                font-size: 36px;
              }
            }
            &__sub {
              display: none;
            }
            .attention {
              font-size: 24px;
              line-height: 36px;
            }
            &__content {
              margin-top: 10px;
              margin-bottom: 70px;
              font-size: 18px;
              line-height: 24px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-height: 800px) and (min-width: 1025px) {
  .technological-features{
    padding-top: 90px;
    .main {
      margin: 0px auto;
    }
  }
}
</style>
