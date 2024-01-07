<template>
    <div class="card my-2">
        <div class="card-body">
            <h2 class="card-title">Create a Service</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label class="form-label">Service Name:</label>
                    <input class="form-control" type="text" v-model="serviceName" placeholder="Service Name*" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Interval Type:</label>
                    <select class="form-control" v-model="intervalType" placeholder="Type">
                        <option value="KM">KM</option>
                        <option value="Hours">Hours</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Interval:</label>
                    <input class="form-control" type="text" v-model="interval" placeholder="Interval*" />
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CreateServiceForm',
    data () {
        return {
            serviceName: '',
            intervalType: 'KM',
            interval: 0
        }
    },
    methods: {
        async submitForm() {
            try {
                const formData = {
                    serviceName: this.serviceName,
                    intervalType: this.intervalType,
                    intervalDays: this.interval,
                };

                const response = await axios.post(`${ process.env.VUE_APP_API_URL }/services`, formData);
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