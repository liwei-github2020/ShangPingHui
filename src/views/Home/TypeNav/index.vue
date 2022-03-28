<template>
  <div class="type-nav">
    <div class="container">
      <h2 class="all" @mouseenter="mouseenter">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="isShow" @mouseleave="mouseleave">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(item, index) in categoryList"
              :key="item.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="mouseChange(index)">
                <a
                  :data-categoryName="item.categoryName"
                  :data-cate1="item.categoryId"
                  >{{ item.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="item2 in item.categoryChild"
                  :key="item2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="item2.categoryName"
                        :data-cate2="item2.categoryId"
                        >{{ item2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="i3 in item2.categoryChild"
                        :key="i3.categoryId"
                      >
                        <a
                          :data-categoryName="i3.categoryName"
                          :data-cate3="i3.categoryId"
                          >{{ i3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
// 引入节流函数
import { throttle } from "@/utils/func";

import { mapState } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  mounted() {
    
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  methods: {
    mouseChange: throttle(function (index) {
      this.currentIndex = index;
    }, 20),

    mouseenter() {
      if (this.$route.path != "/home") {
        this.isShow = true;
      }
    },

    mouseleave() {
      this.currentIndex = -2;

      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },

    goSearch(e) {
      let element = e.target;
      let { categoryname, cate1, cate2, cate3 } = element.dataset;

      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (cate1) {
          query.categoryId = cate1;
        } else if (cate2) {
          query.categoryId = cate2;
        } else {
          query.categoryId = cate3;
        }
        location.query = query;
        this.$router.push(location);
      }
    },
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.Home.categoryList,
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
