<template>
  <nav class="bottom-navbar">
    <ul class="p-0">
      <li>
        <router-link to="/" class="menu-home is-active">
          <span class="menu-text">메인</span></router-link
        >
      </li>
      <li>
        <router-link to="/attendhistory" class="menu-home">
          <span class="menu-text">기록</span></router-link
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
