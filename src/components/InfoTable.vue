<script>
export default {
  name: "InfoTable",
  props: {
    msg: Object,
  },
  methods: {
    handleClick(id) {
      this.$router.push(`/info/${id}`);
    },
  },
  computed: {
    probability() {
      return `${this.msg.probability * 100}%`;
    },
    time() {
      const date = new Date(this.msg.time);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
  },
};
</script>

<template>
  <div class="body" @click="handleClick(msg.id)">
    <a-descriptions title="备案信息">
      <a-descriptions-item label="备案时间">{{ time }}</a-descriptions-item>
      <a-descriptions-item label="备案位置">{{
        msg.location
      }}</a-descriptions-item>
      <a-descriptions-item label="掉落层数（预测）">{{
        msg.floor
      }}</a-descriptions-item>
      <a-descriptions-item label="危险等级">{{
        msg.level
      }}</a-descriptions-item>
      <a-descriptions-item label="预警概率">{{
        probability
      }}</a-descriptions-item>
    </a-descriptions>
    <div class="more">
      <a-button type="link">More >></a-button>
    </div>
  </div>
</template>

<style scoped>
.body {
  padding: 24px;
  background: #fafafa;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.more {
  text-align: right;
}
</style>

curl -X POST -H "Content-Type: application/json" -d '{ "location":
"脏泽园家","floor": 1, "level": 1, "probability": 0.3,
"photos":["data:image/png;base64,xxxxxx", "data:image/png;base64,xxxxxx"]
}'http://10.29.75.44:3000/raspberry/submit
