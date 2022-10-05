<template>
  <div class="h-100">
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        A list item
        <span class="badge bg-primary rounded-pill">14</span>
      </li>
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        A second list item
        <span class="badge bg-primary rounded-pill">2</span>
      </li>
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        A third list item
        <span class="badge bg-primary rounded-pill">1</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      attendList: [],
    };
  },
  async created() {
    try {
      const result = await this.$axios.get(
        "/attends/" + this.$moment().format("mm")
      );
      if (result.status === 200) {
        console.log(result.data);
      }
    } catch {}
  },
};
</script>
