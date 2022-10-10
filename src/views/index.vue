<template>
  <!-- <div class="card h-100 border-0">
    <div class="card-body h-100 py-5">
      <h1>0918</h1>
      <p>간편한 출퇴근의 시작</p>
    </div>
    <div class="card-body h-100">
      <router-link
        :to="{ name: 'login' }"
        class="btn btn-primary form-control py-3 my-1"
        >로그인 후 이용하기</router-link
      >
      <router-link
        :to="{ name: 'signup' }"
        class="btn btn-secondary form-control py-3 my-1"
        >회원가입</router-link
      >
    </div>
  </div> -->
  <div>
    <h1>0918</h1>
    <p>간편한 출퇴근의 시작</p>
    <router-link
      :to="{ name: 'login' }"
      class="btn btn-primary form-control py-3 mt-5"
      >로그인 후 이용하기</router-link
    >
    <router-link
      :to="{ name: 'signup' }"
      class="btn btn-secondary form-control py-3 mt-1"
      >회원가입</router-link
    >
  </div>
</template>
