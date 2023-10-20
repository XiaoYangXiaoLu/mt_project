<template>
  <div class="storeDetails">
    <Header title="店铺" />
    <div class="content">
      <div class="img" />
      <div class="foodClassify">
        <div class="name">
          {{ title }}
          <img :src="img" class="store_img" alt="" />
        </div>
        <div class="classify">
          <van-tabs color="#ffc400">
            <van-tab v-for="(i, index) in storeData" :title="i.name">
              <FoodList :index="index" :foodData="i.data" />
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>

    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" @click="service" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="store.state.cartList.length"
        @click="toCart"
      />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="handleAddCart"
      />
      <van-action-bar-button type="danger" text="立即购买" @click="clickBuy" />
    </van-action-bar>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import { onMounted, reactive, toRefs } from "vue";
import FoodList from "./components/FoodList";
import { Toast } from "vant";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getStoreData } from "../../request/api";

export default {
  components: {
    Header,
    FoodList,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let data = reactive({
      storeData: [],
      title: "",
      img: "",
    });

    //数据的请求
    const getStore = () => {
      getStoreData().then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          res.data.data.forEach((i) => {
            if (i.title === route.query.title) {
              data.title = i.title;
              data.img = i.img;
              data.storeData = i.storeData;
            }
          });
        }
      });
    };
    onMounted(()=>{
      getStore()
    })

    // 客服的点击
    const service = () => {
      Toast.fail("敬请期待...");
    };

    // 跳转购物车
    const toCart = () => {
      router.push("./cart");
    };

    // 加入购物车
    const handleAddCart = (type) => {
      let newList = [];
      data.storeData.forEach((item) => {
        item.data.items?.forEach((items) => {
          items.children.forEach((itemss) => {
            if (itemss.num > 0) {
              newList.push(itemss);
            }
          });
        });
      });
      if (newList.length === 0) {
        Toast("请选择商品");
        return;
      }
      store.commit("ADDCART", newList);
      type === "buy" ? toCart() : "";
    };

    // 立即购买点击
    const clickBuy = () => {
      handleAddCart("buy");
    };

    return {
      ...toRefs(data),
      service,
      handleAddCart,
      store,
      clickBuy,
      toCart,
    };
  },
};
</script>

<style lang='less' scoped>
.storeDetails {
  height: 100%;
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    overflow-y: auto;
    .img {
      background: url("../../assets/yuna.jpg") no-repeat center/cover;
      width: 100%;
      height: 150px;
    }
    .foodClassify {
      height: 500px;
      background-color: #fff;
      margin-top: -30px;
      border-radius: 20px 20px 0 0;

      .classify {
        margin-top: 10px;
      }
      .name {
        display: flex;
        padding: 20px;
        justify-content: space-between;
        .store_img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          margin-top: -30px;
        }
      }
    }
  }
}
</style>