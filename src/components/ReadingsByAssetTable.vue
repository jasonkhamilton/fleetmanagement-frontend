<template>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h2>Readings</h2>
      </div>
      <div class="panel-body">
        <!-- <ReadingGraph /> -->
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Reading</th>
              <th scope="col">Date</th>
              <!-- Add other columns as needed -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="reading in readings" :key="reading.id">
              <td>{{ reading.measurement }}</td>
              <td>{{ new Date(Date.parse(reading.recorded_at)) }}</td>
              <!-- Display other reading properties accordingly -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    // import ReadingGraph from './ReadingGraph.vue';
    
    export default {
      components: {
        // ReadingGraph
      },
      data() {
        return {
          readings: [],
        };
      },
      props: {
        asset: {
            type: Object,
            required: true
        }
      },
      mounted() {
        this.fetchReadings(this.asset.id); // Fetch assets when the component is mounted
      },
      methods: {
        async fetchReadings(assetId) {
          console.log(assetId);
          try {
            const response = await axios.get(`${ process.env.VUE_APP_API_URL }/readings/byAsset/${ assetId }`);
            this.readings = response.data; // Assign the fetched data to the readings array
          } catch (error) {
            console.error('Error fetching readings:', error);
            // Handle error if necessary
          }
        },
      },
    };
    </script>
    
    <style>
    /* Add your table styling here */
    </style>
    