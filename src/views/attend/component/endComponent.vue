<template>
  <div class="container text-center">
    <div class="workend-area">
      <span class="workend-txt">퇴근완료</span>
      <p class="workend-txt">{{ outTime | timeFormat }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inTime", "outTime"],
};
</script>
