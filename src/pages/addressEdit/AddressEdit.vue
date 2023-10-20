<template>
  <Header :title="address" />
  <van-address-edit
    :area-list="areaList"
    :address-info="addressInfo"
    show-delete
    show-set-default
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
  />
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import Header from "../../components/Header.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import { Toast } from "vant";

export default {
  components: { Header },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    let data = reactive({
      areaList: {
        province_list: {
          110000: "重庆",
          120000: "广东省",
          130000: "浙江省",
        },
        city_list: {
          110100: "重庆市",
          120100: "广州市",
          120200: "深圳市",
          130100: "杭州市",
          130200: "宁波市",
        },
        county_list: {
          110101: "涪陵区",
          110102: "巴南区",
          120101: "天河区",
          120201: "海珠区",
          130101: "上城区",
          130201: "下城区",
        },
      },
      addressInfo: {},
    });
    const address = computed(() => {
      return route.query.type === "add" ? "地址新增" : "地址编辑";
    });
    //数据初始化
    const init = () => {
      store.state.userAddress.forEach((item) => {
        if (item.id === Number(route.query.id)) {
          data.addressInfo = item;
        }
      });
    };
    onMounted(() => {
      init();
    });

    //保存的按钮
    const onSave = (content) => {
      if (route.query.type === "add") {
        store.commit("ADDADDRESS", content);
      } else {
        store.commit("CHANGEADDRESS", content);
      }
      Toast("保存成功");
      setTimeout(() => {
        router.back();
      }, 1000);
    };

    //删除的按钮
    const onDelete = (content) => {
      store.commit("DELETEADDRESS", content);
      Toast("删除成功");
      setTimeout(() => {
        router.back();
      }, 1000);
    };

    return {
      ...toRefs(data),
      onSave,
      onDelete,
      address,
    };
  },
};
</script>

<style lang='less' scoped>
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-switch--on {
  background-color: #ffc400;
}
</style>