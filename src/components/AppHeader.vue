<template>
  <div class="navbar">
    <div class="dropdown">
      <button class="dropbtn">Time Travel
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <router-link to="/">Default</router-link>
        <router-link to="/xmas">Christmas</router-link>
        <router-link to="/au-doodle">26 July (Hackathon)</router-link>
        <router-link to="/au-game">AU Game</router-link>
        <router-link to="/ph-doodle">PH Doodle</router-link>
        <router-link to="/ph-game">PH Game</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style scoped>
/* Navbar container */
.navbar {
  overflow: hidden;
  background-color: #f8f9fa;
  font-family: Arial;
}

/* Links inside the navbar */
.navbar a {
  float: left;
  font-size: 16px;
  color: #333;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* The dropdown container */
.dropdown {
  float: left;
  overflow: hidden;
}

/* Dropdown button */
.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: #333;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */
  cursor: pointer;
  min-width: 120px;
}

/* Add a red background color to navbar links on hover */
.navbar a:hover, .dropdown:hover .dropbtn {
  background-color: rgb(227, 220, 220);
}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Add a grey background color to dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>