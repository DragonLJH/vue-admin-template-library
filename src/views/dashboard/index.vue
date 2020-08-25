<template>
  <div class="dashboard-container">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-carousel trigger="click" height="300px" type="card">
          <el-carousel-item v-for="(item,i) in carousel" :key="i">
            <el-row type="flex" class="row-bg" justify="center" :gutter="50">
              <el-image :xs="16" :sm="16" :md="16" :lg="16" :xl="16" :src="item.image"></el-image>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <h3>{{item.msg}}</h3>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <div>
      <h1>推荐1</h1>

      <div
        style="overflow-x:scroll;display: flex;"
        @scroll="showScroll"
        infinite-scroll-disabled="disabled"
      >
        <div class="vForClass" v-for="(item,index) in showintroduce" :key="index">
          <el-card shadow="hover">
            <div>
              <el-image :src="item.image" fit="cover"></el-image>
            </div>
            <div>{{item.type}}</div>
            <div>{{item.name}}</div>
            <div>{{item.msg}}</div>
            <div>{{item.number}}</div>
            <div>
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="success" icon="el-icon-check" circle></el-button>
              <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            </div>
          </el-card>
        </div>
        <div v-loading="flag">没有更多了</div>
      </div>
    </div>

    <div>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <h1>推荐2</h1>
          <div style="overflow:auto;height:800px">
            <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
              <el-table :data="showintroduce" stripe style="width: 100%">
                <el-table-column label="#" min-width="150">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">
                      <img :src="scope.row.image" />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="type" min-width="150"></el-table-column>
                <el-table-column prop="name" label="name" min-width="150"></el-table-column>
                <el-table-column prop="msg" label="msg" min-width="150"></el-table-column>
                <el-table-column prop="number" label="number" min-width="150"></el-table-column>
                <el-table-column label="操作" min-width="150">
                  <el-button type="primary" icon="el-icon-edit" circle></el-button>
                  <el-button type="success" icon="el-icon-check" circle></el-button>
                  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                </el-table-column>
              </el-table>
            </ul>
            <p v-if="loading">
              <el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="showintroduce.length"
              ></el-progress>
            </p>
            <p v-if="noMore">
              <el-progress
                :text-inside="true"
                :stroke-width="24"
                :percentage="100"
                status="success"
              ></el-progress>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { getcarouselList, getintroduceList } from "@/api/homepage";

export default {
  name: "homepage",
  data() {
    return {
      carousel: [],
      introduce: [],
      showintroduce: [],
      total: 10,
      scrollWidth: 0,
      loading: false,
      flag: false
    };
  },
  methods: {
    fetchData() {
      getcarouselList().then(response => {
        this.carousel = response.data.items;
      });
      getintroduceList().then(response => {
        this.introduce = response.data.items;
        this.total = response.data.total;
        let showIntroduceList = [];
        showIntroduceList = response.data.items.filter(function(vlue, index) {
          return index < 10;
        });
        console.log(showIntroduceList);
        this.showintroduce = showIntroduceList;
      });
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        let list = this.showintroduce;
        console.log(list.length);
        let newList = this.introduce.filter(function(vlue, index) {
          return list.length < index && index < list.length + 2;
        });
        this.showintroduce.push(newList[0]);
        this.loading = false;
      }, 1000);
    },
    showScroll(e) {
      var width = e.target.clientWidth;
      var scrollLeft = e.target.scrollLeft;
      var scrollWidth = e.target.scrollWidth;

      if (
        (this.introduce.length > this.showintroduce.length) &
        (scrollWidth - (width + scrollLeft) < 10)
      ) {
        this.flag = true;

        setTimeout(() => {
          let list = this.showintroduce;
          let newList = this.introduce.filter(function(vlue, index) {
            return list.length < index && index < list.length + 2;
          });
          this.showintroduce.push(newList[0]);
          this.flag = false;
        }, 1000);
      }
    }
  },
  computed: {
    ...mapGetters(["name"]),
    noMore() {
      return this.showintroduce.length >= this.total;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}

.vForClass {
  div {
    display: inline-block;
    width: 200px;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
