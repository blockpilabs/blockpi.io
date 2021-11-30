<template>
  <div class="app-footer">
    <div class="footer-main">
      <div class="footer-left">
        <div class="logo" />
        <div class="contact">
          <a
            v-for="item in list"
            :key="item.icon"
            :href="item.url"
            class="contact-link"
            target="_blank"
          >
            <i
              class="iconfont"
              :class="item.icon"
            />
          </a>
        </div>
      </div>
      <div class="footer-right">
        <el-input
          v-model="mail"
          placeholder="Enter email for the latest news"
          @keydown.enter.native="getLatest"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-right"
            @click="getLatest"
          />
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/api/request';
export default {
  name: 'AppFooter',
  data() {
    return {
      list: [
        { icon: 'icon-telegram', url: 'https://t.me/blockpidaily' },
        { icon: 'icon-twitter', url: 'https://twitter.com/RealBlockPI' },
        // { icon: 'icon-medium-square', url: 'https://medium.com/@blockpi' },
        { icon: 'icon-discord', url: 'https://discord.gg/xTvGVrGVZv' }
      ],
      mail: ''
    };
  },
  methods: {
    getLatest() {
      const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      if (!reg.test(this.mail)) {
        this.$message.error('Please enter a valid email');
        return;
      };
      request.post('https://chains.blockpi.io/api/subscribe', { email: this.mail }).then(res => {
        this.$message.info(res.data.code);
        this.mail = '';
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-footer {
  position: relative;
  width: 100%;
  .footer-main {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    padding: 28px 20px 25px;
    border-top: 1px solid #1c2724;
    display: flex;
    align-items: center;
    color: #fff;
    .logo {
      width: 170px;
      height: 35px;
      margin-right: 40px;
      font-weight: bold;
      background: url("~@/assets/images/BlockPI-logo.svg") no-repeat center;
    }
    .footer-left {
      display: flex;
      align-items: center;
    }
    .footer-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      ::v-deep .el-input__inner {
        width: 390px;
        height: 60px;
        background-color: #1f2a27;
        border: solid 1px #5d6d69;
        color: #fff;
        &::-webkit-input-placeholder {
            color: #5d6d69;
          }
        &:-moz-placeholder {
            color: #5d6d69;
          }
        &:-ms-input-placeholder {
            color: #5d6d69;
        }
        &:focus {
          border: solid 1px #16c79a;
        }
        &:focus + .el-input__suffix .el-input__icon {
          color: #16c79a;
        }
      }
      ::v-deep .el-input__icon {
        cursor: pointer;
        color: #5a6972;
        font-size: 18px;
      }
    }
    .contact {
      &-link {
        margin: 0 12px;
        color: #16c79a;
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .app-footer {
    .footer-main {
      padding: 30px;
      .footer-right {
        ::v-deep .el-input__inner {
          width: 480px;
          height: 80px;
          font-size: 18px;
        }
        ::v-deep .el-input__icon {
          font-size: 24px;
        }
      }
      .contact {
        &-link {
          margin: 0 20px;
        }
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  .app-footer {
    .footer-main {
      padding: 20px;
      .logo {
        width: 128px;
        height: 26px;
        margin-right: 12px;
      }
      .footer-right {
        ::v-deep .el-input__inner {
          width: 400px;
          height: 64px;
          font-size: 20px;
        }
        ::v-deep .el-input__icon {
          font-size: 18px;
        }
      }
      .contact {
        &-link {
          margin: 0 15px;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .app-footer {
    .footer-main {
      padding: 14px 20px;
      flex-direction: column-reverse;
      align-items: center;
      .logo {
        width: 120px;
        height: 24px;
        margin-right: 12px;
      }
      .footer-left {
        margin-top: 50px;
        width: 100%;
        justify-content: space-between;
      }
      .footer-right {
        width: 100%;
        margin-left: 0px;
        ::v-deep .el-input__inner {
          width: 100%;
          height: 56px;
          font-size: 15px;
        }
        ::v-deep .el-input__icon {
          font-size: 16px;
        }
      }
      .contact {
        &-link {
          margin: 0px 0px 0px 27px;
        }
      }
    }
  }
}
</style>
