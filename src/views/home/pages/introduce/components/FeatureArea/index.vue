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
          ref="item"
          class="feature-box"
          :class="{ 'is-active': scrollCount === 0 }"
        >
          <feature-one class="feature-item" />
        </div>
        <div
          class="feature-box"
          :class="{ 'is-active': scrollCount === 1 }"
        >
          <feature-two class="feature-item" />
        </div>
        <div
          class="feature-box"
          :class="{ 'is-active': scrollCount === 2 }"
        >
          <feature-three class="feature-item" />
        </div>
        <div
          class="feature-box"
          :class="{ 'is-active': scrollCount === 3 }"
        >
          <feature-four class="feature-item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureOne from './components/FeatureOne';
import FeatureTwo from './components/FeatureTwo';
import FeatureThree from './components/FeatureThree';
import FeatureFour from './components/FeatureFour';
import PublicTitle from './components/PublicTitle';

export default {
  name: 'FeatureArea',
  components: {
    FeatureOne,
    FeatureTwo,
    FeatureThree,
    FeatureFour,
    PublicTitle
  },
  data() {
    return {
      isScrolling: false,
      timer: null,
      scrollCount: 0
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
    intoView() {
      setTimeout(() => {
        this.$refs.area.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }, 100);
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
            }, 1500);
          }
        }
      }
    },
    handleAnim(val) {
      const unit = val;
      const boxer = this.$refs.boxer;
      const outer = document.getElementById('full');
      const areaTop = this.$refs.area.getBoundingClientRect().top;
      const item = this.$refs.item;
      const stickyTitle = this.$refs.stickyTitle;
      const style = getComputedStyle(stickyTitle.$el);
      const offet = unit === 0 ? (
        parseFloat(style.marginTop) + parseFloat(style.marginBottom) + parseFloat(style.height)
      ) : 0;
      outer.scrollTop = outer.scrollTop + areaTop + item.getBoundingClientRect().height * unit + offet;
      boxer.style.transform = `translateY(${-100 / 4 * unit}%)`;
    },
    vueTouch(delta, e) {
      if (this.device !== 'pad') {
        return;
      }
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
          if (this.isScrolling) {
            e.preventDefault();
          } else {
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
            }, 1500);
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
    transition: transform 1s;
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
      // height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
    }
    &.is-active {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 1024px) {
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
      top: 50px;
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
