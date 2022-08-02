<template>
    <div class="card h-100">
        <div class="card-header">
            <h1>0918</h1>
            <p>간편한 출퇴근의 시작-</p>
        </div>
        <div class="card-body h-100 bg-light">
            <router-link :to="{name:'login'}" class="btn btn-primary form-control">로그인 후 이용하기</router-link>
            <router-link :to="{name:'signup'}" class="btn btn-secondary form-control">회원가입</router-link>
        </div>
    </div>
</template>