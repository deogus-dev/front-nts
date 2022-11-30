<template>
  <div class="fs-1 h-100">
    <!-- 헤더 공통 레이아웃 (뒤로가기) -->
    <back-component :title="'출퇴근 기록'" :toPath="'/'" />

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
      <span class="text-primary"
        >{{ totalWorkTime("Hour") }}시간 {{ totalWorkTime("Min") }}분</span
      >
      근무하셨어요
    </div>
    <ul v-if="attendList.length !== 0">
      <li v-for="attend in attendList" :key="attend.id" class="my-3">
        <p>
          {{ attend.attendDate | moment("MM.DD") }} ({{
            getDay(attend.attendDate)
          }})
        </p>
        <p>{{ attend.inTime }}</p>
        <p>{{ attend.outTime }}</p>
        <p>{{ attend.attendCode }}</p>
        <p>{{ attend.workTime }}</p>
      </li>
    </ul>
    <div v-else>해당월에 데이터가 존재하지 않음</div>
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
    totalWorkTime() {
      return (type) => {
        let workTime = 0;
        this.attendList.forEach((obj) => {
          if (obj.workTime) {
            workTime += parseInt(
              type === "Hour"
                ? obj.workTime.substring(0, 2)
                : obj.workTime.substring(5, 7)
            );
          }
        });
        return workTime;
      };
    },
    getDay() {
      return (val) => {
        return this.$dateUtil.DAY[this.$moment(val).day()];
      };
    },
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
