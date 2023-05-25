<template>
  <div class="modal">
    <div class="container" style="position:relative; border-radius:20px 20px 20px 20px; width: 450px;">
    <q-btn color="black" icon="close" size="xl" flat @click="hideRegisterModal" style="position:absolute; right: 0px; top:10px;"/>
    
      <img class="center" src="../../../public/icons/mainIcon2.png" style="height:50px; width:200px; margin-top:25px;"/>
      <p class="center" style="text-align: center; margin:0px; margin-top: 5px; font-weight: 700; font-size: 15px;">Along Along에 오신 것을 환영합니다</p>
      
      
    
  <div class="row q-mt-sm" >
    <div class="col" cols="8">
      <div class="text-center" style="max-width: 40rem;" align="left">
        <form class="text-left">
          <div class="alert alert-danger" role="alert" v-if="registerError">
            아이디 또는 비밀번호를 확인하세요.
          </div>
          <p ref="alertSlot" v-text="alertMsg" style="width: 18rem; font-weight: 550; font-size: 13px; color: red;" class="center" v-if="alertMsg !=''" >
          </p>
          <div class="form-group">
            <q-input v-model="user.userid" label="ID" required @keyup.enter="register"  class="center" bg-color="grey-3" outlined
                style="
                margin-top: 5px; 
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
                <q-icon name="close" @click="user.userpwd = ''" class="cursor-pointer" ref="pwdSlot"/>
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <q-input v-model="userpwdchk" label="Password Check" required @keyup.enter="register"  class="center" bg-color="grey-3" outlined type="password"
                style="
                margin-top: 10px; 
                width: 18rem;
                ">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="userpwdchk = ''" class="cursor-pointer" />
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
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      userpwdchk: null,
      alertMsg:"",
    };
  },
  watch: {
    'user.userpwd': function(val) {
      this.checkRegistForm();
    },
    userpwdchk: function (val) { 
      this.checkRegistForm();
    },
    'user.email': function(val) {
      this.checkRegistForm();
    }, 'user.userid': function (val) {
      console.log("eeeeeeeeeee");
      this.checkRegistForm();
    },'user.username': function(val) {
      this.checkRegistForm();
    },
  },
  computed: {
    ...mapState(memberStore, ["registerSuccess", "registerError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userRegister"]),
    async goRegister() {
      if (this.alertMsg != "") {
        await this.userRegister(this.user);
        if (this.registerSuccess) {
          alert("회원가입에 성공했습니다");
          this.$parent.hideRegisterModal();
        } else {
        }
      }
    },
    hideRegisterModal() { 
      this.$parent.hideRegisterModal();
    },
    checkRegistForm() { 
      if (this.user.userpwd != "" && this.userpwdchk != "" && this.user.userpwd != null && this.userpwdchk != null && this.user.userpwd != this.userpwdchk) {
        this.alertMsg = "비밀번호와 비밀번호 확인을 일치시켜주세요";
      } else if (this.user.email != "" && this.user.email != null && !emailRegex.test(this.user.email)) {
        this.alertMsg = "이메일 형식을 일치시켜주세요";
      } else if(this.user.userid == "" || this.user.userid == null ||this.user.userpwd == "" || this.userpwdchk == "" || this.user.userpwd == null || this.userpwdchk == null || this.user.username == null || this.user.username == "" ||this.user.email == "" || this.user.email == null ){
        this.alertMsg = "모든 정보를 입력해주세요";
      } else { 
        this.alertMsg = "";
      }
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

  .center{
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  
</style>