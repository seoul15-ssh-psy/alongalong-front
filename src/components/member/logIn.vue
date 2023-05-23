<template>
  <div class="modal">
  <div class="container" style="position:relative; border-radius:20px 20px 20px 20px; width: 450px;">
    <q-btn color="black" icon="close" size="xl" flat @click="hideLogInModal" style="position:absolute; right: 0px; top:10px;"/>
    <div class="alert alert-secondary" role="alert">
    <img class="center" src="../../../public/icons/mainIcon2.png" style="height:50px; width:200px; margin-top:25px;"/>
  </div>
  
  <div class="row">
    <div class="col" cols="8">
      <div class="text-center mt-3" style="max-width: 40rem;" align="left">
        <form class="text-left">
          <div class="alert alert-danger" role="alert" v-if="isLoginError">
            아이디 또는 비밀번호를 확인하세요.
          </div>
          <div class="form-group">
            
            <q-input v-model="user.userid" label="ID" required @keyup.enter="confirm"  class="center" bg-color="grey-3" outlined
                style="
                margin-top: 50px; 
                width: 18rem;
                
                ">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>

              <template v-slot:append>
                <q-icon name="close" @click="user.userid = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="form-group">
            

            <q-input v-model="user.userpwd" label="Password" required @keyup.enter="confirm" class="center" bg-color="grey-3" outlined type="password"
                style="
                margin-top: 20px; 
                width: 18rem; 
                ">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="user.userpwd = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <q-btn color="blue-8" label="SIGN IN" class="center" size="md" padding="sm" @click="confirm" style="margin-top: 30px; width: 18rem;"/>
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
      console.log(this.isLogin)
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        console.log("after" + this.isLogin);
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
    padding-top: 10px;
    padding-bottom: 50px;
    padding-left: 50px;
    padding-right: 50px;

  }

  .center{
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  
</style>