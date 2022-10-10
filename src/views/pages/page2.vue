<template>
  <div class="h-100">
    <div v-for="attend in attendList" :key="attend.id">
      <p>attend.id : {{ attend.id }}</p>
      <p>attend.attendDate : {{ attend.attendDate | monthFilter }}</p>
      <p>attend.inTime : {{ attend.inTime | timeFilter }}</p>
      <p>attend.outTime : {{ attend.outTime | timeFilter }}</p>
      <p>attend.attendCode : {{ attend.attendCode }}</p>
      <p>attend.locationCode : {{ attend.locationCode }}</p>
    </div>
    <ol class="list-group">
      <li
        v-for="attend in attendList"
        :key="attend.id"
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div class="ms-2">
          <div class="fw-bold text-start">
            {{ attend.attendDate | monthFilter }}
          </div>
          <div class="text-start">출근 : {{ attend.inTime | timeFilter }}</div>
          <div class="text-start">퇴근 : {{ attend.outTime | timeFilter }}</div>
        </div>
        <span class="badge bg-primary rounded-pill">{{
          attend.attendCode
        }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attendList: [],
    };
  },
  async created() {
    const result = await this.$axios.get(
      "/attends/" + this.$moment().format("MM")
    );
    if (result.status === 200) {
      this.attendList = result.data.attendList;
    }
  },
  filters: {
    monthFilter(val) {
      return val.substring(4, 6) + "/" + val.substring(6, 8);
    },
    timeFilter(val) {
      return (
        val.substring(0, 2) +
        ":" +
        val.substring(2, 4) +
        ":" +
        val.substring(4, 6)
      );
    },
  },
};
</script>
