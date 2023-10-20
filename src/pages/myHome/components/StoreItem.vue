<template>
  <div class="item" @click="toStore(item)">
    <img :src="`${item.pic}`" alt="" />
    <div class="item_right">
      <div class="title">{{ item.title }}</div>
      <div class="sales">价格 ￥{{ item.sales }}</div>
      <div class="price">起送费 ￥{{ item.price }} 免配送费</div>
      <div class="label">
        <div v-for="(i, index) in item.label" :key="index">
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: ["item"],
  setup() {
    const router = useRouter();
    const toStore = (item) => {
      router.push({
        path: "./store",
        query: {
          title: item.title,
        },
      });
    };
    return {
      toStore,
    };
  },
};
</script>

<style lang="less" scoped>
.item:not(:first-child) {
  margin-top: 10px;
}
.item {
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  padding: 10px;
  img {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    margin-right: 20px;
  }
  .item_right {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .title {
      font-size: 18px;
    }
    .label {
      display: flex;
      div {
        background-color: #ffc40047;
        padding: 2px 5px;
        border-radius: 5px;
      }
      div:not(:first-child) {
        margin-left: 5px;
      }
    }
  }
}
</style>