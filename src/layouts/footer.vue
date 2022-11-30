<template>
  <nav class="bottom-navbar w-100 rounded-top">
    <ul class="p-0">
      <li class="py-2">
        <router-link to="/" class="menu-home is-active">
          <i class="fa-solid fa-house m-1"></i
          ><span class="menu-text">메인</span></router-link
        >
      </li>
      <li>
        <router-link to="/attendhistory" class="menu-home">
          <i class="fa-solid fa-rectangle-history m-1"></i
          ><span class="menu-text">기록</span></router-link
        >
      </li>
      <li>
        <button
          class="menu-home"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasHoly"
          aria-controls="offcanvasHoly"
          to="/"
        >
          <span class="menu-text">휴가</span>
        </button>
      </li>
      <li>
        <router-link to="/mypage" class="menu-home">
          <span class="menu-text">설정</span></router-link
        >
      </li>
    </ul>
  </nav>
</template>
