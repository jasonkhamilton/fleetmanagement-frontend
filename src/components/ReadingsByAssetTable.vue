<template>
    <div class="card my-2">
      <div class="card-body">
        <h2 class="card-title">Readings</h2>
        <!-- <ReadingGraph /> -->
        <div class="table-responsive">
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
    