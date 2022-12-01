<template>
  <div class="container text-center">
    <p class="my-3 worktime-txt">{{ workText }}째<br />근무중</p>
    <div class="progress my-3">
      <div
        class="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="'width: ' + (workHour / 8) * 100 + '%;'"
      ></div>
    </div>
    <p class="my-3">
      <span
        >출근시간 : <strong>{{ inTime | timeFormat }}</strong></span
      >
    </p>
  </div>
</template>

<script>
export default {
  props: ["inTime"],
  data() {
    return {
      workHour: null,
      workText: null,
    };
  },
  created() {
    setInterval(this.workingTime, 10000);
    this.workingTime();
  },
  filters: {
    timeFormat: function (val) {
      return (
        val.substring(0, 2) +
        ":" +
        val.substring(2, 4) +
        ":" +
        val.substring(4, 6)
      );
    },
  },
  methods: {
    workingTime() {
      const t1 = this.$moment(this.$moment(), "YYYYMMDDHHmmss");
      const t2 = this.$moment(
        this.$moment().format("YYYYMMDD") +
          this.inTime.substring(0, 2) +
          this.inTime.substring(2, 4) +
          this.inTime.substring(4, 6),
        "YYYYMMDDHHmmss"
      );
      // alert(t1.format("YYYY-MM-DD HH:mm:ss"));
      // alert(t2.format("YYYY-MM-DD HH:mm:ss"));
      const workTime = this.$moment.utc(t1.diff(t2));
      this.workHour = workTime.format("H");
      this.workText = workTime.format("HH시간 mm분");
      //   return {
      //     hour: this.$moment.utc(t1.diff(t2)).add(-1, "hours").format("H"),
      //     text: this.$moment
      //       .utc(t1.diff(t2))
      //       .add(-1, "hours")
      //       .format("HH시간 mm분째 근무중"),
      //   };
    },
  },
};
</script>
