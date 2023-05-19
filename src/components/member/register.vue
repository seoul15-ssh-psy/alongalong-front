<template>
  <div class="modal">
  <div class="container mt-3">
  <div class="row">
    <div class="col">
      <div class="alert alert-secondary" role="alert">
        <h3>회원가입</h3>
        <button class="btn" @click="hideRegisterModal">취소</button>

      </div>
    </div>
  </div>
  <div class="row">
    <div class="col" cols="8">
      <div class="text-center mt-3" style="max-width: 40rem;" align="left">
        <form class="text-left">
          <div class="alert alert-danger" role="alert" v-if="registerError">
            아이디 또는 비밀번호를 확인하세요.
          </div>
          <div class="form-group">
            <label for="userid">아이디:</label>
            <input
              id="userid"
              type="text"
              v-model="user.userid"
              required
              placeholder="아이디 입력...."
              @keyup.enter="register"
            />
          </div>
          <div class="form-group">
            <label for="userpwd">비밀번호:</label> 
            <input
              id="userpwd"
              type="password"
              v-model="user.userpwd"
              required
              placeholder="비밀번호 입력...."
              @keyup.enter="register"
            />
          </div>
          <div class="form-group">
            <label for="userpwdchk">비밀번호 확인:</label> 
            <input
              id="userpwdchk"
              type="password"
              v-model="user.userpwdchk"
              required
              placeholder="비밀번호 확인...."
              @keyup.enter="register"
            />
          </div>
          <div class="form-group">
            <label for="username">이름:</label>
            <input
              id="username"
              type="text"
              v-model="user.username"
              required
              placeholder="이름 입력...."
              @keyup.enter="register"
            />
          </div>
          <div class="form-group">
            <label for="email">이메일:</label>
            <input
              id="email"
              type="text"
              v-model="user.email"
              required
              placeholder="이메일입력...."
              @keyup.enter="register"
            />
          </div>
          <button class="btn" @click="goRegister">로그인</button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "registerD",
  data() {
    return {
      // isLoginError: false,
      user: {
        userid: null,
        userpwd: null,
        username: null,
        email: null,
      },
      userpwdchk:null,
    };
  },
  
  computed: {
    ...mapState(memberStore, ["registerSuccess", "registerError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userRegister"]),
    async goRegister() {
      await this.userRegister(this.user);
      if (this.registerSuccess) {
        this.$parent.hideLogInModal();
      } else { 

      }
    },
    hideRegisterModal() { 
      this.$parent.hideRegisterModal();
    },
  },
};

</script>
<style scoped>
  .container{
    background-color: white;
    width: 400px;
    padding-bottom: 50px;
    padding-left: 50px;
    padding-right: 50px;

  }

  
</style>