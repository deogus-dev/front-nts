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
    <div>
      {{ getName }}님 {{ (search.date + "01") | moment("YYYY년 MM월") }}기준
      <span class="text-primary">???? 시간 ????분</span> 근무하셨어요
    </div>
    <ul v-if="attendList.length !== 0">
      <li v-for="attend in attendList" :key="attend.id" class="my-3">
        <p>{{ attend.attendDate }}</p>
        <p>{{ attend.inTime }}</p>
        <p>{{ attend.outTime }}</p>
        <p>{{ attend.attendCode }}</p>
      </li>
    </ul>
    <div v-else>해당월에 데이터가 존재하지 않음</div>
    <!-- <div class="list-group">
      <a class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">List group item heading</h5>

          <span class="badge rounded-pill text-bg-primary">Primary</span>
        </div>
        <p class="mb-1">Some placeholder content in a paragraph.</p>
        <small>And some small print.</small>
      </a>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["getName"]),
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
