<template>
  <div class="content_item">
    <div class="left">
      <van-checkbox :name="item.id" v-if="showCheckbox" checked-color="#ffc400"/>
      <img :src="item.pic" />
      <div class="text">
        <div class="title">{{ item.title }}</div>
        <van-icon
          name="add-o"
          class="van-icon"
          v-if="item.add && showAdd"
          @click="addClick(item.id)"
        />
        <van-stepper
          v-model="item.num"
          v-else
          :min="1"
          :name="item.id"
          @change="onChange"
        />
      </div>
    </div>
    <div class="price">￥{{ item.price }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["item", "showAdd", "addClick","onChange","showCheckbox"],
  setup() {
    const value = ref(1);
    return { value };
  },
};
</script>

<style lang='less' scoped>
.content_item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .price {
    font-size: 16px;
    font-weight: 600;
  }
  .left {
    display: flex;
    align-items: center;
    flex: 1;
    img {
      margin-left: 10px;
      width: 60px;
      height: 60px;
      margin-right: 10px;
      border-radius: 10px;
    }
    .text {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      height: 100%;
      position: relative;
      flex: 1;
      .title {
        font-size: 16px;
      }
      .van-icon {
        color: red;
        font-size: 20px;
        position: absolute;
        right: 4px;
        bottom: 4px;
      }
    }
  }
}
</style>