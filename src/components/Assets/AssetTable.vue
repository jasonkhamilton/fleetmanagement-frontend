<template>
  <div class="card my-2">
    <div class="card-body">
      <h2 class="card-title">Assets</h2>
      <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Ref.</th>
            <th scope="col">Registration Number</th>
            <th scope="col">Make & Model</th>
            <th scope="col">Type</th>
            <th scope="col"></th>
            <!-- Add other columns as needed -->
          </tr>
        </thead>
        <tbody>
          <tr v-if="!loaded">
            <td colspan="5">Loading...</td>
          </tr>
          <tr v-else v-for="asset in assets" :key="asset.id">
            <td>{{ asset.reference }}</td>
            <td>{{ asset.registration_number }}</td>
            <td>{{ asset.make }} {{ asset.model }}</td>
            <td>{{ asset.type }}</td>
            <td>
              <router-link :to="`/asset/${ asset.id }`" class="btn btn-outline-primary btn-sm">Details</router-link>
            </td>
            <!-- Display other asset properties accordingly -->
          </tr>
          <tr v-if="assets.length == 0 && loaded">
            <td colspan="5">No Assets to show.</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AssetTable',
    expose: ['fetchAssets'],
    data() {
      return {
        loaded: false,
        assets: [],
      };
    },
    mounted() {
      this.fetchAssets(); // Fetch assets when the component is mounted
    },
    methods: {
      async fetchAssets() {
        try {
          const response = await axios.get(`${ process.env.VUE_APP_API_URL }/assets`);
          this.assets = response.data; // Assign the fetched data to the assets array
          this.loaded = true;
        } catch (error) {
          console.error('Error fetching assets:', error);
          // Handle error if necessary
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add your table styling here */
  </style>
  