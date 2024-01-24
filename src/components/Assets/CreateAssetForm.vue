<template>
  <div class="card my-2">
    <div class="card-body">
      <h2 class="card-title">Create Asset</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Unique Reference:</label>
          <input class="form-control" type="text" v-model="reference" placeholder="Unique Reference*" />
        </div>
        
        <div class="mb-3">
          <label class="form-label">Registration Number:</label>
          <input class="form-control" type="text" v-model="registrationNumber" placeholder="Registraton Number" />
        </div>
        
        <div class="mb-3">
          <label class="form-label">Make:</label>
          <input class="form-control" type="text" v-model="make" placeholder="Make" />
        </div>
        
        <div class="mb-3">
          <label class="form-label">Model:</label>
          <input class="form-control" type="text" v-model="model" placeholder="Model" />
        </div>
        
        <div class="mb-3">
          <label class="form-label">Year:</label>
          <input class="form-control" type="text" v-model="year" placeholder="Year" />
        </div>

        <div class="mb-3">
          <label class="form-label">Type:</label>
          <input class="form-control" type="text" v-model="type" placeholder="Type" />
        </div>

        <div class="mb-3">
          <label class="form-label">Serial:</label>
          <input class="form-control" type="text" v-model="serial" placeholder="Serial" />
        </div>

        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateAssetForm',
  emits: ['reloadAssetTable'],
  data() {
    return {
        reference: '',
        registrationNumber: '',
        make: '',
        model: '',
        year: '',
        type: '',
        serial: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const formData = {
            reference: this.reference,
            registrationNumber: this.registrationNumber,
            make: this.make,
            model: this.model,
            year: this.year,
            type: this.type,
            serial: this.serial
        };

        const response = await axios.post(`${ process.env.VUE_APP_API_URL }/assets`, formData);
        // Handle success (if needed)
        this.$emit('reloadAssetTable');
        alert(response.data.message);
      } catch (error) {
        alert('Error creating Asset.');
        console.log(error);
        // Handle error (if needed)
      }
    },
  }
}
</script>
