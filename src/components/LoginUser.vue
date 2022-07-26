<template>
  <div class="login-form-container">
    <div class="login-form">
      <div>
        <label class="lbl-email">E-mail address</label>
      </div>
      <div class="input-group input-group-sm">
        <input type="text" class="form-control" id="input-user" placeholder="Enter e-mail" />
      </div>
      <button type="button" class="btn btn-primary btn-sm next-btn">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginUser',
}
</script>

<style scoped>
.login-form-container {
  width: 100%;
}

.lbl-email {
  color: #606266;
  width: 100%;
  text-align: left;
  font-size: 14px;
}

.login-form {
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
}

.next-btn {
  width: 100%;
  margin-top: 38px;
  background-color: #007dbb;
}

.next-btn:hover, .next-btn:focus {
  background-color: #006496;
}
</style> 