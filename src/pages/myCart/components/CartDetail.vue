<template>
  <div class="cartDetails">
    <!-- 商品的列表 -->
    <div class="content">
      <van-checkbox-group v-model="result" @change="groupChange">
        <div v-for="(i, index) in store.state.cartList">
          <FoodAdd :item="i" :showCheckbox="true" :onChange="onChange" />
        </div>
      </van-checkbox-group>
    </div>
    <!-- 结算 -->
    <van-submit-bar
      :price="allPrice * 100"
      button-text="结算"
      @submit="onSubmit"
      button-color="#ffc400"
      class="submit-all"
      v-if="isDelete"
    >
      <van-checkbox v-model="checked" checked-color="#ffc400" @click="choseAll"
        >全选</van-checkbox
      >
      <template #tip>
        你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
      </template>
    </van-submit-bar>

    <!-- 删除 -->
    <div class="buy" v-else>
      <div class="left">
        <van-checkbox
          v-model="checked"
          checked-color="#ffc400"
          @click="choseAll"
          >全选</van-checkbox
        >
      </div>
      <div class="delete" @click="deteleClick">删除</div>
    </div>
  </div>
</template>
  
  <script>
import { computed, reactive, toRefs, onMounted, isShallow } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import FoodAdd from "../../../components/FoodAdd.vue";
import emitter from "../../../common/js/eventbus.js";

export default {
  components: { FoodAdd },
  props:["changeShow"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    let data = reactive({
      result: [],
      checked: true,
      isDelete: true,
    });

    //商品默认选中初始化
    const init = () => {
      data.result = store.state.cartList.map((item) => item.id);
    };
    onMounted(() => {
      init();
    });

    //商品的个数同步
    const onChange = (value, detail) => {
      store.state.cartList.map((item) => {
        if (item.id === detail.name) {
          item.name = value;
        }
      });
    };

    //全选或者取消全选
    const choseAll = () => {
      if (data.result.length != store.state.cartList.length) {
        init();
      } else {
        data.result = [];
      }
    };

    //更新数据
    const updata = (type) => {
      return store.state.cartList.filter((item) => {
        return type === 2
          ? data.result.includes(item.id)
          : !data.result.includes(item.id);
      });
    };

    //结算按钮
    const onSubmit = () => {
      if (data.result.length != 0) {
        store.commit("PAY", updata(2));
        router.push({
          path:"./createorder",
          query:{
            list:data.result
          }
        })
      } else {
        Toast.fail("请选择要结算的商品");
      }
    };

    //每个复选框的点击事件触发
    const groupChange = (result) => {
      if (result.length === store.state.cartList.length) {
        data.checked = true;
      } else {
        data.checked = false;
      }
      data.result = result;
    };

    //总价
    const allPrice = computed(() => {
      let countList = updata(2);
      let sum = 0;
      countList.forEach((item) => {
        sum += item.num * item.price;
      });
      return sum;
    });

    //监听编辑的点击
    emitter.on("edit", () => {
      data.isDelete = !data.isDelete;
    });

    //从购物车删除
    const deteleClick = () => {
      if (data.result.length) {
        //更新删除后的购物车的数据
        store.commit("DELETE", updata(1));

        //删除后的选择
        data.result = []

        //购物车无数据时展示兜底
        if(store.state.cartList.length ===0){
          store.commit("EDIT","delete")
          props.changeShow();
        }
      } else {
        Toast.fail("请选择要删除的商品");
      }
    };

    return {
      ...toRefs(data),
      store,
      onChange,
      choseAll,
      onSubmit,
      groupChange,
      allPrice,
      deteleClick,
    };
  },
};
</script>
  
  <style lang='less' scoped>
.cartDetails {
  font-size: 14px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 20px 20px 55px;
  .submit-all {
    position: fixed;
    bottom: 48px;
  }

  .buy {
    position: fixed;
    bottom: 48px;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    height: 50px;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
    }
    .delete {
      color: #fff;
      background-color: #ffc400;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }

  .content {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>