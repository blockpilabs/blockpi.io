<template>
  <div
    class="public-title"
    :class="{ 'show-title': show }"
  >
    <section class="public-title__top">
      KEEP YOUR SERVICE
    </section>
    <section class="public-title__bot">
      ALWAYS ONLINE.
    </section>
  </div>
</template>

<script>
export default {
  name: 'PublicTitle',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.public-title {
  opacity: 0;
  text-align: center;
  font-weight: bold;
  &__top {
    color: #fff;
    font-size: 36px;
  }
  &__bot {
    font-size: 48px;
    color: #16c79a;
  }
  &.show-title {
    opacity: 1;
  }
}
@media screen and (max-width: 1024px) and (orientation: portrait) {
  .public-title {
    margin-top: 40px;
    margin-bottom: 80px;
    &__top {
      font-size: 60px;
    }
    &__bot {
      font-size: 72px;
    }
  }
}
@media screen and (max-width: 1023px) {
  .public-title {
    margin-top: 0px;
    margin-bottom: 60px;
    &__top {
      font-size: 44px;
    }
    &__bot {
      font-size: 54px;
    }
  }
}
@media screen and (max-width: 750px) {
  .public-title {
    height: 0px;
    margin-bottom: 0px;
    &__top {
      font-size: 24px;
    }
    &__bot {
      font-size: 30px;
    }
  }
}
@media screen and (max-height: 800px) and (min-width: 1024px) {
  .public-title {
    margin-top: 40px;
    margin-bottom: 0px;
  }
}
</style>
