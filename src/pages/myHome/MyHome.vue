<template>
  <div class="home">
    <div class="content">
      <!-- 头部 -->
      <div class="header">
        <div class="text">外卖</div>
        <div class="location">
          <van-icon name="location" />
          <span>重庆工程学院</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 主要内容 -->
      <div class="main">
        <div class="main_bg">
          <div class="search">
            <input type="text" />
            <div class="search_text">搜索</div>
          </div>
          <div class="classify">
            <div class="big_classify">
              <div v-for="(i, index) in homeData.big_classify" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${i.icon}`"></use>
                </svg>
                {{ i.name }}
              </div>
            </div>
            <div class="small_classify">
              <div v-for="(i, index) in homeData.small_classify" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${i.icon}`"></use>
                </svg>
                {{ i.name }}
              </div>
            </div>
          </div>
        </div>
        <van-tabs class="van-tabs selectTab" color="#ffc400">
          <van-tab
            v-for="(i, index) in homeData.centent_nav_list"
            :title="i.tab"
            :key="index"
          >
            <Store :store_list="i.data" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- <Test :names="i"/> -->
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import { onMounted, reactive, toRefs } from "vue";
import Store from "./components/Store.vue";
import { getHomeData } from "../../request/api";
// import Test from "../../components/test.vue"

export default {
  components: {
    Footer,
    Store,
    // Test,
  },
  data() {
    return {
      i: "liulu",
    };
  },
  setup() {
    let data = reactive({
      homeData: {},
    });

    //数据请求
    const getHome = async () => {
      const res = await getHomeData();
      if (res.status === 200 && res.data.code === 0) {
        data.homeData = res.data.data;
      }
    };
    onMounted(() => {
      getHome();
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-tabs__wrap {
  border-radius: 10px;
}
.home {
  display: flex;
  flex-flow: column;
  height: 100%;
  font-size: 12px;

  .content {
    flex: 1;
    overflow-y: auto;

    .header {
      background-image: linear-gradient(#ffc400, #fff);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 40px 20px;

      .text {
        font-size: 20px;
        font-weight: 600;
      }

      .location {
        span {
          margin: 0 5px;
        }

        font-size: 14px;
      }
    }

    .main {
      margin-top: -30px;

      .main_bg {
        background-image: linear-gradient(#fff, #f5f5f5);
        padding: 10px 20px 0 20px;
        border-radius: 30px 30px 0 0;
        position: relative;

        .search {
          position: relative;

          .search_text {
            position: absolute;
            background-color: #ffc400;
            right: 0px;
            top: 1px;
            width: 50px;
            height: 32px;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
          }

          input {
            width: 100%;
            border: 1px solid #ffc400;
            border-radius: 20px;
            height: 33px;
            padding: 0 15px;
            box-sizing: border-box;
          }
        }

        .classify {
          padding: 20px 0;

          .big_classify {
            display: flex;

            div {
              flex: 1;
              display: flex;
              justify-content: center;
              flex-flow: column;
              align-items: center;

              .icon {
                width: 50px;
                height: 50px;
                margin-bottom: 5px;
              }
            }
          }

          .small_classify {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;

            div {
              display: flex;
              justify-content: center;
              flex-flow: column;
              align-items: center;
              width: 20%;
            }

            .icon {
              width: 30px;
              height: 30px;
              margin: 10px;
            }
          }
        }
      }

      .van-tabs {
        padding: 0 20px 10px;
      }
    }
  }
}
</style>