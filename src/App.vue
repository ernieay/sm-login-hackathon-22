<template>
  <nav>
    <AppHeader />
  </nav>
  <router-view/>
  <LoginUser />
</template>


<script>
// @ is an alias to /src
import AppHeader from '@/components/AppHeader.vue'
import LoginUser from '@/components/LoginUser.vue'

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    LoginUser,
  },
  setup: () => {
    const doABarrelRoll = function(){var a="-webkit-",b='transform:rotate(1turn);',c='transition:4s;';document.head.innerHTML+='<style>body{'+a+b+a+c+b+c}

    const allowedKeys = {
      68: 'd',
      69: 'e',
      73: 'i',
      77: 'm',
      78: 'n',
      82: 'r',
      83: 's',
      84: 't',
    }

    const cheatCode = ['s', 'i', 't', 'e', 'm', 'i', 'n', 'd', 'e', 'r']

    let keysPosition = 0;

    // add keydown event listener
    window.addEventListener('keydown', function(e) {

      const key = allowedKeys[e.keyCode];
      const requiredKey = cheatCode[keysPosition];

      // compare the key with the required key
      if (key == requiredKey) {

        keysPosition++;

        if (keysPosition == cheatCode.length) {
          doABarrelRoll();
          keysPosition = 0;
        }
      } else {
        keysPosition = 0;
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

.workspace {
  margin: 120px auto 0;
  max-height: 225px;
  max-width: 400px;
}
</style>
