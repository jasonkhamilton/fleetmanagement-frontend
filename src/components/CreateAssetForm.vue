<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h2>Create Asset</h2>
    </div>
    <div class="panel-body">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Unique Reference:</label>
          <input class="form-control" type="text" v-model="reference" placeholder="Unique Reference*" />
        </div>
        
        <div class="form-group">
          <label>Registration Number:</label>
          <input class="form-control" type="text" v-model="registrationNumber" placeholder="Registraton Number" />
        </div>
        
        <div class="form-group">
          <label>Make:</label>
          <input class="form-control" type="text" v-model="make" placeholder="Make" />
        </div>
        
        <div class="form-group">
          <label>Model:</label>
          <input class="form-control" type="text" v-model="model" placeholder="Model" />
        </div>
        
        <div class="form-group">
          <label>Year:</label>
          <input class="form-control" type="text" v-model="year" placeholder="Year" />
        </div>

        <div class="form-group">
          <label>Type:</label>
          <input class="form-control" type="text" v-model="type" placeholder="Type" />
        </div>
        <button class="btn btn-default" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateAssetForm',
  data() {
    return {
        reference: '',
        registrationNumber: '',
        make: '',
        model: '',
        year: '',
        type: ''
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
            type: this.type
        };

        const response = await axios.post('http://localhost:3000/assets', formData);
        console.log('Form submitted!', response.data);
        // Handle success (if needed)
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error (if needed)
      }
    },
  }
}
</script>
