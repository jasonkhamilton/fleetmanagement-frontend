<template>
    <div class="card my-2">
      <div class="card-body">
        <h2 class="card-title">Create Division</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label class="form-label">Unique Label:</label>
            <input class="form-control" type="text" v-model="label" placeholder="Unique Label*" />
          </div>
          
          <div class="mb-3">
            <label class="form-label">Description:</label>
            <input class="form-control" type="text" v-model="description" placeholder="Description" />
          </div>
  
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: 'CreateDivisionFrom',
    emits: ['reloadDivisionTable'],
    data() {
      return {
          label: '',
          description: ''
      };
    },
    methods: {
      async submitForm() {
        try {
          const formData = {
              label: this.label,
              description: this.description
          };
  
          const response = await axios.post(`${ process.env.VUE_APP_API_URL }/divisions`, formData);
          // Handle success (if needed)
          this.$emit('reloadDivisionTable');
          alert(response.data.message);
        } catch (error) {
          alert('Error creating Division.');
          console.log(error);
          // Handle error (if needed)
        }
      },
    }
  }
  </script>
  