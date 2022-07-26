<template>
  <div class="login-form-container">
    <p class="welcome-title">Welcome!</p>
    <p class="welcome-subtitle">Please, log in to your account below.</p>
    <div class="login-form">
      <div>
        <label class="lbl-email">E-mail address <span>*</span></label>
        <input class="email-input" type="text" placeholder="Enter e-mail" />
        <span class="remember">
          <label class="remember-me" for="remember-me">Remember e-mail</label>
          <input type="checkbox" class="remember-me" name="remember-me">
        </span>
      </div>
      <button type="button" class="next-btn">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginUser',
}
</script>

<style scoped>
.welcome-title {
  font-size: 24px;
  margin: 0;
  font-weight: 800;
}
.welcome-subtitle {
  font-size: 16px;
  margin: 0;
}

.login-form-container {
  padding-top: 30px;
  width: 100%;
}

.login-form {
  padding-top: 80px;
}

.remember {
  display: flex;
  flex-direction: row-reverse;
  padding: 8px;
  gap: 5px;
}

.remember-me {
  display: inline;
}

.lbl-email {
  color: black;
  margin-bottom: 5px;
  width: 100%;
  text-align: left;
  font-size: 14px;
  display: block;
}

.lbl-email span {
  color: red;
}

.login-form {
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
}

.login-form .email-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px 10px 15px;
}

.login-form .email-input::placeholder {
  color: #acacac;
}

.next-btn {
  width: 100%;
  margin-top: 38px;
  background-color: #007dbb;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.next-btn:hover, .next-btn:focus {
  background-color: #006496;
}
</style>