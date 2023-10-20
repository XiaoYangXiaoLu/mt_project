<template>
  <div class="hello">
    <div>vue3仿美团项目</div>
    <van-button type="primary" v-on:click="dj()">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button loading type="primary" />
    <van-button loading type="primary" loading-type="spinner" />
    <van-button loading type="success" loading-text="加载中..." />
    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">
      渐变色按钮
    </van-button>
    <van-cell title="选择多个日期" :value="text" v-on:click="show = true" />
    <van-calendar v-model:show="show" type="multiple" v-on:confirm="onConfirm" />
    <van-date-picker
      v-model="currentDate"
      title="选择日期"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-sousuo1"></use>
    </svg>
  </div>
</template>

<script>
// import 'vant/lib/button/style';
// import 'vant/lib/calendar/style';
import { ref } from 'vue';
import { Calendar,Cell } from 'vant';

export default {
  name: 'HelloWorld',
  // components: {
  //   'van-calendar': Calendar,
  //   'van-cell': Cell,
  // },
  setup(){
    const dj = ()=>{
      console.log("111")
    }

    const text = ref('');
    const show = ref(false);

    const onConfirm = (dates) => {
      show.value = false;
      text.value = `选择了 ${dates.length} 个日期`;
    };

    const currentDate = ref(['2021', '01', '01']);

    return{
      dj,
      text,
      show,
      onConfirm,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 5, 1),
      currentDate,
    }
  },
}

</script>

<style lang="less" scoped>
.hello{
  font-size: 20px;
  div{
    color: red;
  }
  button{
    height: 100px;
  }
}
</style>
