<template>
  <div>
    <div class="card my-2" v-if="division != null">
      <div class="card-body">
        <h2 class="card-title">Division {{ division.label }} - {{ division.description }}</h2>
        <table class="table table-bordered">
            <tbody>
              <tr>
                  <th scope="col">Label</th>
                  <td>{{ division.label }}</td>
              </tr>
              <tr>
                  <th scope="col">Description</th>
                  <td>{{ division.description }}</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
    <div class="card my-2">
      <div class="card-body">
        <h2 class="card-title">Assets in Division</h2>
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
          <tbody v-if="assets.length > 0">
            <tr v-for="asset in assets" :key="asset.id">
              <td>{{ asset.reference }}</td>
              <td>{{ asset.registration_number }}</td>
              <td>{{ asset.make }} {{ asset.model }}</td>
              <td>{{ asset.type }}</td>
              <td>
                <router-link :to="`/asset/${ asset.id }`" class="btn btn-outline-primary btn-sm">Details</router-link>
              </td>
              <!-- Display other asset properties accordingly -->
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4" class="text-center">No Assets Found.</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </div>
  </template>
  <script>

  import axios from 'axios';
  
  export default {
    name: 'AssetsByDivision',
    data() {
        return {
            division: null,
            divisionId: null,
            assets: [],
        }
    },
    mounted() {
        this.divisionId = this.$route.params.id;
        this.getDivision();
        this.fetchAssetsByDivision();
    },
    methods: {
        async getDivision() {
            try {
                const response = await axios.get(`${ process.env.VUE_APP_API_URL}/divisions/${ this.divisionId }`);
                this.division = response.data;
            } catch (error) {
                console.error('Error fetching division. ', error);
            }
        },
        async fetchAssetsByDivision() {
            try {
                const response = await axios.get(`${ process.env.VUE_APP_API_URL}/divisions/assets/${ this.divisionId }`);
                this.assets = response.data;
            } catch (error) {
                console.error('Error fetching assets by division. ', error);
            }
        }
    }
  }
  </script>