<template>
  <div
    ref="area"
    class="feature-area"
  >
    <div
      ref="container"
      v-swipeup="(e) => vueTouch(-1,e)"
      v-swipedown="(e) => vueTouch(1,e)"
      class="feature-container"
    >
      <public-title
        ref="stickyTitle"
        class="sticky-title"
        show
      />
      <div
        ref="boxer"
        class="feature-boxer"
      >
        <div
          v-for="item in [0, 1, 2, 3]"
          ref="item"
          :key="'feature'+ item"
          class="feature-box"
          :class="{ 'is-active': scrollCount === item }"
        >
          <feature-one
            ref="featureItem"
            class="feature-item"
            :list-index="item"
            :loop="loopIndexs.includes(item)"
            :animation-data="animationDatas[item]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureOne from './components/FeatureOne';
import PublicTitle from './components/PublicTitle';
import * as animationData0 from '@/assets/lottie/animation1.json';
import * as animationData1 from '@/assets/lottie/animation2.json';
import * as animationData2 from '@/assets/lottie/animation3.json';
import * as animationData3 from '@/assets/lottie/animation4.json';

export default {
  name: 'FeatureArea',
  components: {
    FeatureOne,
    PublicTitle
  },
  data() {
    return {
      isScrolling: false,
      timer: null,
      scrollCount: 0,
      loopIndexs: [1, 3],
      scrollTime: new Date().getTime()
    };
  },
  computed: {
    device() {
      return this.$store.getters.device;
    },
    animationDatas() {
      return [animationData0, animationData1, animationData2, animationData3];
    }
  },
  watch: {
    scrollCount(val) {
      this.handleAnim(val);
    }
  },
  mounted() {
    this.init();
    // document.addEventListener('wheel', this.handleScroll, { passive: false });
  },
  methods: {
    intoView() {
      setTimeout(() => {
        this.$refs.area.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }, 60);
    },
    init() {
      if (this.device === 'desktop') {
        this.$refs.container.addEventListener('wheel', this.handleScroll, true);
        this.$once('hook:beforeDestroy', () => {
          this.$refs.container.removeEventListener('wheel', this.handleScroll, true);
        });
      }
    },
    handleScroll(event) {
      const dom = this.$refs.container;
      const boundary = dom.getBoundingClientRect().top;
      const value = event.wheelDelta || -event.deltaY || -event.detail;
      // delta < 0 -- DOWN
      const delta = Math.max(-1, Math.min(1, value));
      const currTime = new Date().getTime();
      const during = currTime - this.scrollTime;
      console.log(during, event.deltaY, this.scrollCount, delta, this.isScrolling);
      if ((during < 400) || (Math.abs(event.deltaY) < 100)) {
        if (this.scrollCount === 0 && delta > 0) {
          if (this.isScrolling) {
            event.preventDefault();
          }
        } else {
          event.preventDefault();
          return false;
        }
      }

      this.scrollTime = currTime;
      if (boundary < 0 && this.scrollCount === 3 && !this.isScrolling) {
        if (delta > 0) {
          this.intoView();
        } else {
          this.$emit('reach-bot');
        }
      }
      if (boundary === 0) {
        if (this.scrollCount === 0 && delta > 0) {
          if (this.isScrolling) {
            event.preventDefault();
          }
        } else if (this.scrollCount === 3 && delta < 0) {
          event.preventDefault();
          if (!this.isScrolling) {
            this.$emit('reach-bot');
          }
        } else {
          event.preventDefault();
          if (!this.isScrolling) {
            this.scrollCount -= delta;
            this.isScrolling = true;
            this.timer = setTimeout(() => {
              this.isScrolling = false;
              clearTimeout(this.timer);
              this.timer = null;
            }, 800);
          }
        }
      }
    },
    handleAnim(val) {
      const unit = val;
      const boxer = this.$refs.boxer;
      const outer = document.getElementById('full');
      const areaTop = this.$refs.area.getBoundingClientRect().top;
      const item = this.$refs.item[0];
      const stickyTitle = this.$refs.stickyTitle;
      const style = getComputedStyle(stickyTitle.$el);
      const offet = unit === 0 ? (
        parseFloat(style.marginTop) + parseFloat(style.marginBottom) + parseFloat(style.height)
      ) : 0;
      outer.scrollTop = outer.scrollTop + areaTop + item.getBoundingClientRect().height * unit + offet;
      boxer.style.transform = `translateY(${-100 / 4 * unit}%)`;
      !this.loopIndexs.includes(val) && this.$refs.featureItem[val].play();
    },
    vueTouch(delta, e) {
      if (this.device !== 'pad') {
        return;
      }
      const currTime = new Date().getTime();
      if (this.scrollTime && currTime - this.scrollTime < 2000) {
        e.preventDefault();
        return;
      }
      this.scrollTime = currTime;
      const dom = this.$refs.container;
      const boundary = dom.getBoundingClientRect().top;
      if (boundary < 0 && this.scrollCount === 3 && !this.isScrolling) {
        if (delta > 0) {
          this.intoView();
        } else {
          this.$emit('reach-bot');
        }
      }
      if (boundary === 0) {
        if (this.scrollCount === 0 && delta > 0) {
          if (this.isScrolling) {
            e.preventDefault();
          }
        } else if (this.scrollCount === 3 && delta < 0) {
          e.preventDefault();
          if (!this.isScrolling) {
            this.$emit('reach-bot');
          }
        } else {
          e.preventDefault();
          if (!this.isScrolling) {
            this.scrollCount -= delta;
            this.isScrolling = true;
            this.timer = setTimeout(() => {
              this.isScrolling = false;
              clearTimeout(this.timer);
              this.timer = null;
            }, 800);
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.feature-area {
  position: relative;
  // margin-top: 100px;
  width: 100%;
  height: 400vh;
  background: #121a18;
  .feature-container {
    position: sticky;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }
  .sticky-title {
    width: 100%;
    position: absolute;
    z-index: 3;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }
  .feature-boxer {
    position: relative;
    z-index: 2;
    height: 400vh;
    width: 100%;
    transition: transform 800ms;
  }
  .feature-box {
    height: 100vh;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    transition: opacity 0.5s;
    opacity: 0;
    .feature-item {
      max-width: 1280px;
      padding: 0 20px;
      width: 100%;
      height: 100%;
      margin: 0px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
    }
    &.is-active {
      opacity: 1;
    }
    &:nth-child(2) {
      .feature-item {
        .animation-container {
          background: url('~@/assets/lottie/map.svg') no-repeat center;
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) and (orientation: portrait) {
  .feature-area {
    .feature-box {
      .feature-item {
        padding: 0 30px;
      }
      ::v-deep .feature {
        &-main {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        &-text {
          width: 75%;
          padding-left: 0px;
          margin: 0 auto;
          text-align: center;
          .title {
            position: relative;
            font-size: 40px;
            margin-bottom: 18px;
            &::before {
              display: none;
            }
            span {
              position: relative;
              &::before {
                position: absolute;
                left: -30px;
                top: 20px;
                content: '';
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: solid 1px #16c79a;
              }
            }
          }
          .descrip {
            font-size: 26px;
            line-height: 50px;
          }
        }
        &-show {
          width: 100%;
          height: auto;
          margin-top: 70px;
        }
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .feature-area {
    .sticky-title {
      top: 140px;
    }
    .feature-box {
      .feature-item {
        padding: 0 22px;
      }
      ::v-deep .feature {
        &-text {
          .title {
            font-size: 30px;
            margin-bottom: 18px;
            span {
              &::before {
                left: -24px;
                top: 15px;
                width: 8px;
                height: 8px;
              }
            }
          }
          .descrip {
            font-size: 20px;
            line-height: 36px;
          }
        }
        &-show {
          margin-top: 46px;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .feature-area {
    height: auto;
    .sticky-title {
      width: 100%;
      height: auto;
      margin-top: 0px;
      top: 40px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .feature-container {
      position: relative;
      height: auto;
    }
    .feature-boxer {
      height: auto;
    }
    .feature-box {
      opacity: 1;
      height: auto;
      .feature-item {
        padding: 0 20px;
        margin: 35px auto;
      }
      ::v-deep .feature {
        &-text {
          width: 94%;
          .title {
            font-size: 20px;
            span {
              &::before {
                left: -20px;
                top: 8px;
              }
            }
          }
          .descrip {
            font-size: 15px;
            line-height: 24px;
            color: #fff;
          }
        }
        &-show {
          margin-top: 30px;
        }
      }
    }
  }
}
@media screen and (max-height: 800px) and (min-width: 1024px) {
  .feature-area {
    .sticky-title {
      top: 100px;
      margin-top: 0px !important;
    }
  }
  .feature-box {
    ::v-deep .feature {
      &-show {
        height: 360px;
        width: 600px;
      }
    }
  }
}
</style>
