<template>
    <div class="card my-2">
      <div class="card-body">
        <h2 class="card-title">Services</h2>
        <div class="table-responsive" v-if="services.length > 0">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Interval</th>
                <!-- Add other columns as needed -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="service in services" :key="service.id">
                <td>{{ service.service_id }}</td>
                <td>{{ service.service_name }}</td>
                <td>{{ service.interval_type }}</td>
                <td>{{ service.interval }}</td>
                <!-- Display other service properties accordingly -->
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else>There are no services set for this asset.</p>
        <router-link to="/servicing" class="btn btn-primary">Add a Service</router-link>
      </div>
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    
    export default {
      name: 'ServicesByAssetTable',
      data() {
        return {
          services: [],
        };
      },
      props: {
        asset: {
            type: Object,
            required: true
        }
      },
      mounted() {
        this.fetchServices(this.asset.id); // Fetch services when the component is mounted
      },
      methods: {
        async fetchServices(assetId) {
          try {
            const response = await axios.get(`${ process.env.VUE_APP_API_URL }/services/byAsset/${ assetId }`);
            this.services = response.data; // Assign the fetched data to the services array
          } catch (error) {
            if (error.response.status == 404) {
              console.log('No services found.');
            } else {
              console.error('Error fetching services:', error);
            }
            // Handle error if necessary
          }
        },
      },
    };
    </script>
    
    <style>
    /* Add your table styling here */
    </style>
    