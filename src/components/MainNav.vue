<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Fleet Management</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/assets" class="nav-link">Assets</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/servicing" class="nav-link">Servicing</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/workorders" class="nav-link">Work Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/divisions" class="nav-link">Divisions</router-link>
        </li>
        <!-- <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Inventory</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Analytics</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Communications</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Safety</a> -->
        </ul>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainNav'
}
</script>
