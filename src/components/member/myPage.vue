<template>
  <div :style="{ paddingTop: '100px' }" id="myPage">
    <p>{{ userInfo.userid }}</p>
    <p>{{ userInfo.username }}</p>
    <p>{{ userInfo.email }}</p>
    <p>{{ userInfo.joindate }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const memberStore = 'memberStore'

export default {
  name: 'MyPage',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(memberStore, ['isLogin','userInfo']),
    
  },
  
  created() {

  },

  methods: {
    
  }

}
</script>

<style scope>
#tableView * {
  text-align: center;
  margin: auto;
  font-family: 'Raleway', sans-serif;
}

#tableView h1 {
  margin: 50px auto;
}

#tableView button {
  border: 2px solid grey;
  padding: 5px 8px;
  border-radius: 3px;
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin: 0;
  border-radius: 3px;
}

#tableView button:hover {
  background-color: black;
  color: white;
}

#tableView a {
  color: black;
  font-weight: bold;
  text-decoration: none;
}

#tableView p {
  margin: 30px 0px;
}

#tableView table {
  background-color: whitesmoke;
  margin: 15px auto;
  border: 1px solid black;
  border-collapse: collapse;
  font-size: 16px;
}

#tableView td {
  width: 400px;
}

#tableView tr {
  height: 40px;
  border: 2px solid black;
}

#tableView td:nth-child(1) {
  background-color: #606060;
  color: whitesmoke;
  font-weight: bold;
  border-right: 2px solid black;
  width: 35%;
}

#tableView input {
  width: 100%;
  outline: none;
  background-color: whitesmoke;
  border: none;
  text-align: left;
  padding-left: 12px;
}

#tableView #tableView textarea {
  background-color: whitesmoke;
  outline: none;
  border: none;
  font-size: 16px;
}

#buttons {
  display: flex;
  justify-content: center;
}

#buttons form,
#buttons a {
  margin: 3px;
}

#tableView .login {
  margin-top: 25px;
  margin-right: 10px;
  text-align: right;
}
</style>
