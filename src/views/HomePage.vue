<script>
import InfoTable from "@/components/InfoTable.vue";
import axios from "@/axios";

export default {
  name: "HomePage",
  components: {
    InfoTable,
  },
  data() {
    return {
      msg: [],
      filter: {},
      filter_list: {},
      r_msg: [],
    };
  },
  methods: {
    updateInfo() {
      axios.get("/get_info").then((res) => {
        this.msg = res.data;
        // 获取所有可能的location筛选条件
        this.filter_list = { location: [] };
        for (let i of this.msg) {
          if (!this.filter_list.location.includes(i.location)) {
            this.filter_list.location.push(i.location);
          }
        }
      });
    },
    handleClick(type, key) {
      this.filter[type] = key;
      this.r_msg = this.msg.filter((i) => {
        return (
          (this.filter.location === undefined ||
            i.location === this.filter.location) &&
          (this.filter.type === undefined || i.type === this.filter.type)
        );
      });
    },
  },
  beforeMount() {
    this.updateInfo();
    setInterval(this.updateInfo, 2000);
  },
};
</script>

<template>
  <div class="tmp">
    <div>警告</div>
    <div>有2条未处理预警信息！</div>
    <div>查看</div>
  </div>
  <div class="main">
    <div class="title">
      <img src="/logo.png" />
      <h1 style="line-height: 60px; height: 40px">预警信息查询</h1>
    </div>
    <div class="info">
      <!-- 筛选 -->
      <div style="margin: 20px">筛选器</div>

      <div style="display: flex; flex-direction: row">
        <a-dropdown>
          <a-button> {{ filter.location || "地点" }} </a-button>
          <template #overlay>
            <a-menu @click="handleClick('location', $event.key)">
              <a-menu-item
                v-for="i in filter_list.location"
                :key="i"
                :value="i"
                >{{ i }}</a-menu-item
              >
            </a-menu>
          </template>
        </a-dropdown>
        <a-dropdown>
          <a-button style="margin-left: 10px">
            {{ filter.type || "类型" }}
          </a-button>
          <template #overlay>
            <a-menu @click="handleClick('type', $event.key)">
              <a-menu-item key="1" :value="1">类型1</a-menu-item>
              <a-menu-item key="2" :value="2">类型2</a-menu-item>
              <a-menu-item key="3" :value="3">类型3</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a-time-picker
          style="margin-left: 10px"
          placeholder="选择时间范围"
          @change="handleClick('time', $event)"
        ></a-time-picker>
      </div>
      <template v-for="i in msg" :key="i.id">
        <InfoTable :msg="i" class="item" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.tmp {
  position: fixed;
  top: 200px;
  right: 10px;
  width: 250px;
  height: 130px;
  background-color: red;
  border-radius: 10px;
  color: #e3e3e3;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.tmp div:first-child {
  font-size: 1.5em;
  width: 90%;
  text-align: center;
  margin-top: 10px;
  border-bottom: 1px solid #e3e3e3;
}

.tmp div:nth-child(2) {
  font-size: 1.1em;
  text-align: center;
  margin-top: 10px;
}

.tmp div:last-child {
  font-size: 1.1em;
  text-align: center;
  width: 25%;
  margin-top: 10px;
  color: #3e3e3e;
  background-color: #e3e3e3;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.main {
  position: relative;
  width: 100%;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  position: relative;
  top: 60px;
}

.title {
  display: flex;
  flex-direction: row;
  line-height: 60px;
  height: 60px;
  z-index: 2;
  font-size: 1em;
  font-weight: bold;
  position: fixed;
  background-color: #e3e3e3;
  width: 100%;
  padding-left: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  top: 0;
  align-items: center;
}

.title img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.item {
  margin-top: 20px;
  width: 80%;
  max-width: 800px;
  min-width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s;
}
</style>
