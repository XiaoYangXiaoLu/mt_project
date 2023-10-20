<template>
  <div class="food_list" v-if="index === 0">
    <van-tree-select
      height="88vw"
      :items="items"
      :main-active-index.sync="active"
      @click-nav="navClick"
    >
      <template #content>
        <div v-for="(i, index) in subItem" class="item_bg">
          <FoodAdd
            :item="i"
            :showAdd="true"
            :addClick="addClick"
            :onChange="onChange"
          />
        </div>
      </template>
    </van-tree-select>
  </div>
  <div v-else>{{ foodData.content }}</div>
</template>

<script>
import { reactive, toRefs } from "vue";
import FoodAdd from "../../../components/FoodAdd.vue";
export default {
  props: ["index", "foodData"],
  components: {
    FoodAdd,
  },
  setup(props) {
    let data = reactive({
      active: 0,
      items: [],
      subItem: [],
    });

    // 数据的初始化
    const init = () => {
      let newList = [];
      props.foodData?.items?.map((i, index) => {
        newList.push({ text: i.text });
        if (data.active === index) {
          data.subItem = i.children;
        }
      });
      data.items = newList;
    };
    init();

    // 点击左侧的导航
    const navClick = (i) => {
      data.active = i;
      init();
    };

    // 切换步进器
    const addClick = (i) => {
      data.subItem.forEach((item) => {
        if (item.id === i) {
          item.add = false;
          item.num += 1;
        }
      });
    };

    // 步进器增加触发事件
    const onChange = (value, detail) => {
      data.subItem.forEach((item) => {
        if (item.id === detail.bame) {
          item.name = value;
        }
      });
      console.log(data.subItem)
    };

    return {
      ...toRefs(data),
      navClick,
      addClick,
      onChange,
    };
  },
};
</script>

<style lang='less' scoped>
.food_list {
  margin-top: 20px;
  .item_bg {
    padding: 10px;
  }
}

/deep/ .van-tree-select__item--active {
  color: #ffc400;
}
/deep/ .van-sidebar-item--select::before {
  background-color: #ffc400;
}
</style>