<template>
  <div class="test">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-input
          :placeholder="elselect != ''?'根据完整的'+elselect+'查询':'请先选择根据什么内容再查询'"
          v-model="value"
          class="input-with-select"
        >
          <el-select v-model="elselect" slot="prepend" :placeholder="elselect">
            <el-option label="type" value="type"></el-option>
            <el-option label="name" value="name"></el-option>
          </el-select>
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          <el-button @click="searchReset" slot="append" icon="el-icon-refresh"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="thisList" stripe style="width: 100%">
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
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="total,prev, pager, next"
        :total="searchList.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getintroduceList } from "@/api/homepage";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      searchList: [],
      thisList: null,
      elselect: "",
      value: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getintroduceList().then(response => {
        this.list = response.data.items;
        this.searchList = response.data.items;
        this.listLoading = false;
        this.handleCurrentChange(1);
      });
    },

    handleCurrentChange(val) {
      let allList = this.searchList;
      let showList = [];
      showList = allList.filter(function(value, index, array) {
        return index < val * 10 && index >= (val - 1) * 10;
      });
      this.thisList = showList;
    },
    search() {
      let allList = this.list;
      let select = this.elselect;
      let search = this.value;
      let newList = allList.filter(function(value) {
        if (select === "type") {
          return value.type === search;
        } else if (select === "name") {
          return value.name === search;
        }
      });
      this.searchList = newList;
      this.handleCurrentChange(1);
    },
    searchReset() {
      this.searchList = this.list;
      this.handleCurrentChange(1);
      this.elselect = "";
      this.value = "";
    }
  }
};
</script>
