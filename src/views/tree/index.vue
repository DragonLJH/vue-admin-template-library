<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Computer">
        <el-table :data="ComputerList" stripe style="width: 100%">
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
      </el-tab-pane>
      <el-tab-pane label="SEM">
        <el-table :data="SEMList" stripe style="width: 100%">
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
      </el-tab-pane>
      <el-tab-pane label="Communication">
        <el-table :data="CommunicationList" stripe style="width: 100%">
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
      </el-tab-pane>
      <el-tab-pane label="Other">
        <el-table :data="OtherList" stripe style="width: 100%">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getintroduceList } from "@/api/homepage";
export default {
  data() {
    return {
      ComputerList: [],
      SEMList: [],
      CommunicationList: [],
      OtherList: [],
      AllList: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getintroduceList().then(response => {
        this.AllList = response.data.items;
        this.ComputerList = response.data.items.filter(function(val) {
          return val.type === "Computer";
        });
        this.SEMList = response.data.items.filter(function(val) {
          return val.type === "SEM";
        });
        this.CommunicationList = response.data.items.filter(function(val) {
          return val.type === "Communication";
        });
        this.OtherList = response.data.items.filter(function(val) {
          return val.type === "Other";
        });
      });
    }
  }
};
</script>

