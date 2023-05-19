<template>
  <div class="modal">
  <div class="container mt-3">
  <div class="row">
    <div class="col">
      <div class="alert alert-secondary" role="alert">
        <h3>로그인</h3>
        <button class="btn" @click="hideLogInModal">취소</button>

      </div>
    </div>
  </div>
  <div class="row">
    <div class="col" cols="8">
      <div class="text-center mt-3" style="max-width: 40rem;" align="left">
        <form class="text-left">
          <div class="alert alert-danger" role="alert" v-if="isLoginError">
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
              @keyup.enter="confirm"
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
              @keyup.enter="confirm"
            />
          </div>
          <button class="btn" @click="confirm">로그인</button>
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
  name: "logIn",
  data() {
    return {
      // isLoginError: false,
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$parent.hideLogInModal();
      }
    },
    hideLogInModal() { 
      this.$parent.hideLogInModal();
    }
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