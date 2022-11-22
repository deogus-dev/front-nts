<template>
  <div class="row m-0 align-items-center h-100">
    <div class="col-12">
      <!-- <button><i class="bi-arrow-clockwise"></i></button> -->
      출근시간 : {{ inTime | timeFormat }}
    </div>
    <div class="col-12">{{ workText }}</div>
    <div class="col-12">
      <div class="progress">
        <!-- <div
          class="progress-bar"
          role="progressbar"
          aria-label="Basic example"
          :style="'width: ' + (workingTime.hour / 8) * 100 + '%'"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div> -->
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-label="Animated striped example"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="'width: ' + (workHour / 8) * 100 + '%'"
        ></div>
      </div>
    </div>
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
      this.workText = workTime.format("HH시간 mm분째 근무중");
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
