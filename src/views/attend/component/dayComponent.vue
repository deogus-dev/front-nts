<template>
  <div class="day-container container text-center">
    <div class="date-area row row-cols-5 rounded">
      <div class="col p-0 py-4">
        <p class="date-op py-1">{{ getDay(-2) }}</p>
        <p class="month-op py-1">{{ getMonth(-2) }}</p>
      </div>
      <div class="col p-0 py-4">
        <p class="date-op py-1">{{ getDay(-1) }}</p>
        <p class="month-op py-1">{{ getMonth(-1) }}</p>
      </div>
      <div class="col p-0 py-4">
        <p class="date-bw py-1">{{ getDay(0) }}</p>
        <p class="month-bw py-1">{{ getMonth(0) }}</p>
      </div>
      <div class="col p-0 py-4">
        <p class="date-op py-1">{{ getDay(1) }}</p>
        <p class="month-op py-1">{{ getMonth(1) }}</p>
      </div>
      <div class="col p-0 py-4">
        <p class="date-op py-1">{{ getDay(2) }}</p>
        <p class="month-op py-1">{{ getMonth(2) }}</p>
      </div>
    </div>
    <div class="time-area py-5">
      <p class="realtime">{{ time }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: null,
      time: "00:00:00",
    };
  },
  created() {
    setInterval(this.getTime, 1000);
  },
  computed: {
    getMonth() {
      return (days) => {
        return this.$moment().add("days", days).format("MM\n월");
      };
    },
    getDay() {
      return (days) => {
        return this.$moment().add("days", days).format("DD\n일");
      };
    },
  },
  methods: {
    getTime() {
      this.time = this.$moment().format("HH:mm:ss");
    },
  },
};
</script>
