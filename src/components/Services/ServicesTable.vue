<template>
  <div class="card my-2">
    <div class="card-body">
      <h2 class="card-title">Services</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Interval</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in services" :key="service.id">
              <td>{{ service.service_id }}</td>
              <td>{{ service.service_name }}</td>
              <td>{{ service.interval_type }}</td>
              <td>{{ service.interval_days }}</td>
              <td>
                <router-link :to="`/service/${ service.id }`" class="btn btn-outline-primary btn-sm">Details</router-link>
              </td>
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
    data() {
      return {
        services: [],
      };
    },
    mounted() {
      this.fetchServices(); // Fetch services when the component is mounted
    },
    methods: {
      async fetchServices() {
        try {
          const response = await axios.get(`${ process.env.VUE_APP_API_URL }/services`);
          this.services = response.data; // Assign the fetched data to the services array
        } catch (error) {
          console.error('Error fetching services:', error);
          // Handle error if necessary
        }
      },
    },
  };
</script>