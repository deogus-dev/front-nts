<template>
  <section class='vh-100 bg-image'>
    <div class='mask d-flex align-items-center h-100 gradient-custom-3'>
      <div class='container h-100' style="text-align: start">
        <div class='row d-flex justify-content-center align-items-center h-100'>
          <div class='col-12 col-md-9 col-lg-7 col-xl-6'>
            <div class='card' style='border-radius: 15px;'>
              <div class='card-body p-5'>
                <h2 class='text-uppercase mb-5'>본인 확인을 위해 이메일 주소를 입력해 주세요.</h2>
                <form name='signup' class="needs-validation" novalidate>
                  <div v-if="!isFirstStepSign">
                    <ul class='checkbox-info'>
                      <li>
                        <input type='checkbox' id='personalInfo' v-model="isPersonalInfoCheck"/>
                        <label for='personalInfo'>[필수] 본인 인증 이용약관 동의 <span></span></label>
                        <div class="invalid-feedback" id="personalInfo" v-if="errors[2]">
                          {{ errors[2].message }}
                        </div>
                      </li>
                    </ul>
                    <div class='input-group form-outline mb-4'>
                      <input type='email' v-model='email' v-bind:class="{ 'is-invalid': emailError }" id='email'
                             placeholder="it1234@gsitm.com" class='form-control form-control-lg sign-input'/>
                      <div class='input-group-append' style='margin-top:10px;'>
                        <button class='btn btn-outline-secondary' id='verify-btn' @click='verify()' type='button'>
                          인증번호발송
                        </button>
                        <input type='hidden' name='isVerify' v-model='isVerify'/>
                      </div>
                      <div class="invalid-feedback" id="email-feedback" v-if="errors[0]">
                        {{ errors[0].message }}
                      </div>
                    </div>

                    <div class='form-outline mb-4'>
                      <input type='number' id='verify-code' v-model="verifyCode" placeholder='인증번호를 입력해주세요.'
                             v-bind:class="{ 'is-invalid': verifyCodeError }"
                             class='sign-input form-control form-control-lg'/>
                    </div>
                    <div class="invalid-feedback" id="verify-feedback" v-if="errors[1]">
                      {{ errors[1].message }}
                    </div>
                    <div class='d-flex justify-content-center'>
                      <button type='button' @click='sendNext()' :disabled='isVerify === false'
                              class='btn btn-secondary btn-block btn-lg gradient-custom-4 text-body next-btn'>다음1
                      </button>
                    </div>
                  </div>
                  <div v-if="isFirstStepSign">
                    <div class='form-outline mb-4'>
                      <label class="form-label" for="password" required>비밀번호 입력</label>
                      <input type='password' id='password' class='sign-input form-control form-control-lg'/>
                      <div class="invalid-tooltip">{{ pwdText }}</div>
                    </div>

                    <div class='form-outline mb-4'>
                      <label class="form-label" for="check-password" required>비밀번호 재입력</label>
                      <input type='password' id='check-password' class='sign-input form-control form-control-lg'/>
                      <p>{{ pwdText }}</p>
                    </div>

                    <div class='d-flex justify-content-center'>
                      <button type='button' @click='sendForm()' :disabled='isVerify === false'
                              class='btn btn-secondary btn-block btn-lg gradient-custom-4 text-body next-btn'>다음
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>
  </section>
</template>

<script>
//import prevBtn from '@/components/button/prevBtn.vue';


export default {
  name: 'signUp',
  components: {
//    prevBtn,
  },
  data() {
    return {
      email: '',
      isVerify: false,
      isPersonalInfoCheck: false,
      isFirstStepSign: false,
      pwdText: '숫자,영문,특수문자 혼합하여 8자리 이상 입력해주세요.',
      errors: [],
      verifyCode: '',
      emailError: false,
      verifyCodeError: false,
      personalInfoError: false,
    };
  },
  created() {
  },
  watch: {
    email: function () {
      console.log(this.isVerify)
    }
  },

  methods: {
    toggleOnOff: function () {
      this.isFirstStepSign = !this.isFirstStepSign;
    },
    verify: function () {
      console.log(this.email)
      this.errors = [];
      // TODO 인증번호 구현 전이기에 인증여부 값으로 진행 / 인증 후 남은 시간 체크

      // 이메일 검증
      if (this.email.length < 10 || this.email.search('@') === -1) {
        this.emailError = true;
        this.errors.push({
          'message': '올바른 이메일 주소를 입력해주세요.'
        });
      } else {
        document.getElementById('email').className = "form-control is-valid";
        this.errors.push({
          'message': '발송되었습니다.'
        });
        this.isVerify = true;
        // document.getElementById('email-feedback').className = "valid-feedback";
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    sendNext: function () {
      this.errors = [];
      // 이용약관 동의 체크
      if (!this.isPersonalInfoCheck) {
        this.personalInfoError = true;
        this.errors.push({
          'message': '인증체크하셈여.'
        });
        console.log("동의체크안함")
      }

      // TODO 인증번호 검증
      if (this.verifyCode.length < 6) {
        this.verifyCodeError = true;
        this.errors.push({
          'message': '인증번호는 6자리입니다.'
        });
        console.log("6자리미만")
      } else {
        // TODO 상상코딩함 인증코드 우선 123123
        //const resultCode = this.$store.dispatch('verify-code', {code: this.verifyCode})
        const resultCode = '123123';
        console.log("ddd")
        if (this.verifyCode != resultCode) {
          this.errors.push({
            'message': '인증번호가 틀렸습니다.'
          });
          console.log("인증틀림")
        } else {
          document.getElementById('verify-code').className = "form-control is-valid";
          this.errors.push({
            'message': '이상없음.'
          });
          document.getElementById('verify-code').disabled = true;
          console.log("인증성공")
        }
      }
    },
    sendForm: function () {
      if (this.isVerify === true && this.isFirstStepSign === true) {
        console.log("start")
      }
      /*
      const signForm = document.forms.namedItem('signup');
      const data = new FormData(signForm)
      try {
        const response = await this.$store.dispatch('signup', {
          data
        });
        console.log('response ===>', response)
        await this.$router.push('/');
      } catch (err) {
        // this.loginError = true;
        // this.error = true;
        throw new Error(err)
      }
      */
    },
//test
  },
}
;
</script>
<style>
@import '../assets/css/signup.css';
</style>