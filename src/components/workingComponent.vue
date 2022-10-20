<template>
  <div class="row m-0 align-items-center h-100">
    <div class="col-12">refresh button</div>
    <div class="col-12">{{ workingTime.text }}</div>
    <div class="col-12">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          aria-label="Basic example"
          :style="'width: ' + (workingTime.hour / 8) * 100 + '%'"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inTime"],
  //   data: {
  //     return() {},
  //   },
  computed: {
    workingTime() {
      const t1 = this.$moment(this.$moment(), "YYYYMMDDHHmmss");
      const t2 = this.$moment(
        this.$moment().format("YYYYMMDD") +
          this.inTime.substring(0, 2) +
          this.inTime.substring(2, 4) +
          this.inTime.substring(4, 6),
        "YYYYMMDDHHmmss"
      );
      return {
        hour: this.$moment.utc(t1.diff(t2)).add(-1, "hours").format("H"),
        text: this.$moment
          .utc(t1.diff(t2))
          .add(-1, "hours")
          .format("HH시간 mm분째 근무중"),
      };
    },
  },
};
</script>
