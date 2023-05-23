<template>
  <div class="modal">
    <div class="container" style="position:relative; border-radius:20px 20px 20px 20px; width: 450px;">
    <q-btn color="black" icon="close" size="xl" flat @click="hideRegisterModal" style="position:absolute; right: 0px; top:10px;"/>
    
      <img class="center" src="../../../public/icons/mainIcon2.png" style="height:50px; width:200px; margin-top:25px;"/>
      <p class="center" style="text-align: center; margin:0px; margin-top: 5px; font-weight: 700; font-size: 10px;">Along Along에 오신 것을 환영합니다</p>
    
    
  <div class="row q-mt-lg" >
    <div class="col" cols="8">
      <div class="text-center mt-3" style="max-width: 40rem;" align="left">
        <form class="text-left">
          <div class="alert alert-danger" role="alert" v-if="registerError">
            아이디 또는 비밀번호를 확인하세요.
          </div>

          <div class="form-group">
            
            <q-input v-model="user.userid" label="ID" required @keyup.enter="register"  class="center" bg-color="grey-3" outlined
                style="
                margin-top: 20px; 
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
            
            <q-input v-model="user.userpwd" label="Password" required @keyup.enter="register"  class="center" bg-color="grey-3" outlined type="password"
                style="
                margin-top: 10px; 
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
          <div class="form-group">
            <q-input v-model="user.userpwdchk" label="Password Check" required @keyup.enter="register"  class="center" bg-color="grey-3" outlined type="password"
                style="
                margin-top: 10px; 
                width: 18rem;
                ">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="user.userpwdchk = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <q-input v-model="user.username" label="Name" required @keyup.enter="register"  class="center" bg-color="grey-3" outlined
                style="
                margin-top: 10px; 
                width: 18rem;
                ">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="user.username = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <q-input v-model="user.email" label="Email" required @keyup.enter="register"  class="center" bg-color="grey-3" outlined type="email"
                style="
                margin-top: 10px; 
                width: 18rem;
                ">
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="user.email = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <q-btn color="blue-8" label="SIGN UP" class="center" size="md" padding="sm" @click="goRegister" style="margin-top: 35px; width: 18rem;"/>
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
        alert("회원가입에 성공했습니다");
        this.$parent.hideRegisterModal();
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

  .center{
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  
</style>