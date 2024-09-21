<template>
    <div class="card my-2">
      <div class="card-body">
        <h2 class="card-title">Division</h2>
        <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
              <!-- Add other columns as needed -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="division in divisions" :key="division.id">
              <td>{{ division.label }}</td>
              <td>{{ division.description }}</td>
              <td>
                <router-link :to="`/division/${ division.id }`" class="btn btn-outline-primary btn-sm">Details</router-link>
              </td>
              <!-- Display other division properties accordingly -->
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
  name: 'DivisionTable',
  expose: ['fetchDivisions'],
  data() {
    return {
      divisions: [],
    };
  },
  mounted() {
    this.fetchDivisions(); // Fetch divisions when the component is mounted
  },
  methods: {
    async fetchDivisions() {
      try {
        const response = await axios.get(`${ process.env.VUE_APP_API_URL }/divisions`);
        this.divisions = response.data; // Assign the fetched data to the divisions array
      } catch (error) {
        console.error('Error fetching divisions:', error);
        // Handle error if necessary
      }
    },
  },
};
</script>