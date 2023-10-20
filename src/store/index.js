import { createStore } from "vuex";

export default createStore({
  state: {
    cartList: [], //购物车列表数据
    orderList: [], //生成订单列表数据
    orderListed: [], //生成订单后列表数据
    edit: true, //编辑的状态
    userAddress:[
      {
        id: 1001,
        name: '小杨',
        tel: '17316144278',
        province: '重庆',
        city: '重庆市',
        county: '巴南区',
        addressDetail: '重庆工程学院',
        isDefault: true,
        areaCode: '110102',
      },
      {
        id: 1002,
        name: '小露',
        tel: '13896411919',
        province: '重庆',
        city: '重庆市',
        county: '巴南区',
        addressDetail: '重庆工程学院',
        isDefault: false,
        areaCode: '110102',
      },
    ],//地址信息
  },
  mutations: {
    // 添加购物车
    ADDCART(state, value) {
      state.cartList = value;
    },
    // 结算按钮
    PAY(state, value) {
      state.orderList = value;
    },
    //删除
    DELETE(state, value) {
      state.cartList = value;
    },
    //生成订单
    UPDATEORDER(state) {
      state.orderListed = state.orderListed.concat(state.orderList);
    },
    //编辑的按钮
    EDIT(state, value) {
      if (value === 'delete') {
        state.edit = true;
      } else {
        state.edit = !state.edit;
      }
    },
    //新增地址
    ADDADDRESS(state, value) {
      state.userAddress.map((item) => {
        if (value.isDefault) {
          item.isDefault = false;
        }
      });
      state.userAddress.push(value);
    },
    //编辑地址
    CHANGEADDRESS(state, value) {
      state.userAddress = state.userAddress.map((item) => {
        if (value.isDefault) {
          item.isDefault = false;
        }
        return item.id === value.id ? value : item;
      });
    },
    //地址删除按钮
    DELETEADDRESS(state, value) {
      state.userAddress = state.userAddress.filter((item) => {
        return !(value.id === item.id);
      });
      if (value.isDefault && state.userAddress.length) {
        state.userAddress[0].isDefault = true;
      }
    },
  },
  actions: {},
});