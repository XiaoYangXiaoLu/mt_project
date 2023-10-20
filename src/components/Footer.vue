<template>
  <div class="footer">
    <div class="item">
      <router-link to="/home" class="nav_item" active-class="nav_color">
        <van-icon name="wap-home-o" size="30" />
        首页
      </router-link>
    </div>
    <div class="item">
      <router-link to="/cart" class="nav_item" active-class="nav_color">
        <van-icon name="cart-o" size="30" />
        购物车
      </router-link>
    </div>
    <div class="item">
      <router-link to="/order" class="nav_item" active-class="nav_color">
        <van-icon name="notes-o" size="30" />
        订单
      </router-link>
    </div>
    <div class="item">
      <router-link to="/mine" class="nav_item" active-class="nav_color">
        <van-icon name="user-circle-o" size="30" />
        我的
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer{
  display: flex;
  font-size: 12px;
  background-color: #fff;
  border-top: 0.5px solid #eee;
  .item{
    flex: 1;
    display: flex;
    justify-content: center;
    .nav_item{
      display: flex;
      flex-flow: column;
      align-items: center;
    }
    .nav_color{
      color: #ffc400;
    }
  }
}
</style>