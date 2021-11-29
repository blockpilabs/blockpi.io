<template>
  <div class="feature-three">
    <public-title />
    <div class="feature-main">
      <div class="feature-text">
        <div class="title">
          <span>{{ title }}</span>
        </div>
        <div class="descrip">
          {{ descrip }}
        </div>
      </div>
      <div
        v-lazy-start
        class="feature-show"
        @shouldPlay="init"
      >
        <div
          ref="svgContainer"
          class="animation-container"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PublicTitle from './PublicTitle';
import { FeaturesInfo } from '@/assets/libs/enum';
import lottie from 'lottie-web';
import * as animationData from '@/assets/lottie/animation3.json';
export default {
  name: 'FeatureThree',
  components: { PublicTitle },
  data() {
    return {
      title: FeaturesInfo[2].title,
      descrip: FeaturesInfo[2].content
    };
  },
  methods: {
    init() {
      this.animObj = lottie.loadAnimation({
        container: this.$refs.svgContainer,
        animationData: animationData.default,
        autoplay: false,
        renderer: 'svg',
        loop: false
      });
      this.$refs.svgContainer.style.opacity = 1;
      this.animObj.play();
    }
  }

};
</script>

<style lang="scss" scoped>
.feature {
  &-main {
    width: 100%;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  &-text {
    width: 325px;
    padding-left: 24px;
    .title {
      position: relative;
      font-size: 24px;
      font-weight: bold;
      color: #16c79a;
      margin-bottom: 18px;
      &::before {
        position: absolute;
        left: -20px;
        top: 15px;
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: solid 1px #16c79a;
      }
    }
    .descrip {
      color: #5d6d69;
      font-size: 16px;
      line-height: 28px;
    }
  }
  &-show {
    width: 750px;
    height: 450px;
    border-radius: 4px;
    border: solid 1px #1c2724;
    .animation-container {
      opacity: 0;
      transition: opacity 0.5s;
    }
  }
}
</style>
