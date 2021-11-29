<template>
  <div class="feature-area">
    <div class="feature-boxer">
      <div class="feature-box">
        <feature-one class="feature-item" />
      </div>
      <div class="feature-box">
        <feature-two class="feature-item" />
      </div>
      <div class="feature-box">
        <feature-three class="feature-item" />
      </div>
      <div class="feature-box">
        <feature-four class="feature-item" />
      </div>
    </div>
  </div>
</template>

<script>
import FeatureOne from './components/FeatureOne';
import FeatureTwo from './components/FeatureTwo';
import FeatureThree from './components/FeatureThree';
import FeatureFour from './components/FeatureFour';

export default {
  name: 'FeatureArea',
  components: {
    FeatureOne,
    FeatureTwo,
    FeatureThree,
    FeatureFour
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.feature-area {
  position: relative;
  // margin-top: 100px;
  width: 100%;
  // height: 400vh;
  .feature-boxer {
    // position: sticky;
    top: 0;
    // height: 400vh;
    overflow: hidden;
  }
  .feature-box {
    // height: 100vh;
    width: 100%;
    z-index: 1;

    .feature-item {
      max-width: 1280px;
      padding: 0 20px;
      width: 100%;
      margin: 100px auto;
      // height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
@media screen and (max-width: 1024px) {
  .feature-area {
    .feature-box {
      .feature-item {
        padding: 0 30px;
        width: 100%;
        margin: 120px auto;
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
        margin: 90px auto;
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
    .feature-box {
      .feature-item {
        padding: 0 20px;
        margin: 70px auto;
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
</style>
