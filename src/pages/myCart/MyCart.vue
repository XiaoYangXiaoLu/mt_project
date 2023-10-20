<template>
  <div class="cart">
    <Header title="购物车" :edit="true"/>
    <CartDetail v-if="isShow" :changeShow="changeShow"/>
    <Blank v-else />
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Blank from "../../components/Blank.vue";
import Header from "../../components/Header.vue";
import CartDetail from "./components/CartDetail.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Footer,
    Blank,
    Header,
    CartDetail,
  },
  setup() {
    const store = useStore();
    let isShow = ref(true);
    //初始化兜底样式展示与否
    const init = () => {
      if (store.state.cartList.length === 0) {
        isShow.value = false;
      }
    };
    onMounted(() => {
      init();
    });

    const changeShow=()=>{
      isShow.value=false
    }

    return {
      isShow,
      changeShow
    };
  },
};
</script>

<style lang="less" scoped>
.cart {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>