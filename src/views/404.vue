<template>
  <div class="http404-container">
    <div class="http404">
      <div class="pic-404">
        <img
          class="pic-404__number"
          src="@/assets/404_images/404-number.svg"
          alt="404"
        >
        <div class="desc">
          {{ $t("L_found.desc") }}
        </div>
        <el-button
          type="primary"
          style="width:130px;"
          @click="back"
        >
          {{ $t("L_found.back") }}
        </el-button>
      </div>
      <div class="bullshit">
        <img
          class="pic-404__image"
          src="@/assets/404_images/404-image.svg"
          alt="404"
        >
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.http404-container{
  transform: translate(-50%,-50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
.http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .pic-404 {
    position: relative;
    width: 230px;
    text-align: center;
    overflow: hidden;
    margin-right: 150px;
    &__parent {
      width: 100%;
    }
    .desc {
      color: #152339;
      margin: 50px 0px;
    }
  }
  .bullshit {
    position: relative;
    width: 574px;
    padding: 30px 0;
    overflow: hidden;

  }
}
</style>
