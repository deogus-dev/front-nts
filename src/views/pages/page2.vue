<template>
  <div class="fs-1 h-100">
    <select v-model="search.date" @change="getAttends(search.date)">
      <option
        v-for="mon in monthList"
        :key="mon.val"
        :selected="mon.val === search.date"
        :value="mon.val"
      >
        {{ mon.text }}
      </option>
    </select>
    <div>{{ attendList }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      monthList: [],
      search: {
        date: "",
      },
      attendList: [],
    };
  },
  created() {
    this.search.date = this.$moment().format("YYYYMM");
    this.getAttends(this.$moment().format("YYYYMM"));

    for (var i = 0; i < 10; i++) {
      var date = this.$moment().add(i - 9, "month");
      this.monthList.push({
        val: date.format("YYYYMM"),
        text: date.format("YYYY년 MM월"),
      });
    }
  },
  methods: {
    async getAttends(date) {
      const result = await this.$axios.get("/attends/" + date);
      if (result.status === 200) {
        this.attendList = result.data.attendList;
      }
    },
  },
};
</script>
