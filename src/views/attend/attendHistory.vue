<template>
  <div>
    <div class="container">
      <select
        class="form-select"
        v-model="search.date"
        @change="getAttends(search.date)"
      >
        <option
          v-for="mon in monthList"
          :key="mon.val"
          :selected="mon.val === search.date"
          :value="mon.val"
        >
          {{ mon.text }}
        </option>
      </select>
      <div class="mt-3">
        <p>{{ getName }}님</p>
        <p>
          {{ (search.date + "01") | moment("YYYY년 MM월") }} 기준
          <span class="text-primary">{{ totalWorkTime }}</span> 근무하셨어요
        </p>
      </div>
      <div>
        <p>출·퇴근 기록</p>
        <ul
          v-if="attendList.length !== 0"
          style="max-height: 580px"
          class="list-group overflow-auto"
        >
          <li
            v-for="attend in attendList"
            :key="attend.id"
            class="list-group-item list-group-item-action"
          >
            <div class="d-flex w-100 justify-content-between">
              <span>
                {{ attend.attendDate | moment("MM.DD") }} ({{
                  getDay(attend.attendDate)
                }})
              </span>

              <small class="badge text-bg-primary">{{
                attend.attendCode
              }}</small>
            </div>
            <!-- <p>
              {{ attend.attendDate | moment("MM.DD") }} ({{
                getDay(attend.attendDate)
              }})
            </p> -->
            <div class="input-group input-group-sm">
              <span
                class="input-group-text border-0 bg-transparent"
                id="inputGroup-sizing-sm"
                >출근</span
              >
              <label class="form-control text-center border-0 bg-transparent">{{
                attend.inTime | timeFormat
              }}</label>

              <span
                class="input-group-text border-0 bg-transparent"
                id="inputGroup-sizing-sm"
                >퇴근</span
              >
              <label class="form-control text-center border-0 bg-transparent">{{
                attend.outTime | timeFormat
              }}</label>
            </div>
            <p class="text-primary">{{ attend.workTime }}</p>
          </li>
        </ul>
        <div v-else>해당월에 데이터가 존재하지 않음</div>
      </div>
    </div>
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
      let totHour = 0;
      let totMin = 0;
      this.attendList.forEach((obj) => {
        if (obj.workTime) {
          totHour += parseInt(obj.workTime.substring(0, 2));
          totMin += parseInt(obj.workTime.substring(5, 7));
        }
      });

      totHour = totHour + parseInt(totMin / 60);
      totMin = totMin % 60;
      return totHour + "시간 " + totMin + "분";
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
        console.log(result.data.attendList);
      }
    },
  },
};
</script>
