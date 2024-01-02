<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h2>Create a Service</h2>
        </div>
        <div class="panel-body">
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label>Service Name:</label>
                    <input class="form-control" type="text" v-model="serviceName" placeholder="Service Name*" />
                </div>
                <div class="form-group">
                    <label>Interval Type:</label>
                    <select class="form-control" v-model="intervalType" placeholder="Type">
                        <option value="KM">KM</option>
                        <option value="Hours">Hours</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Interval:</label>
                    <input class="form-control" type="text" v-model="interval" placeholder="Interval*" />
                </div>
                <button class="btn btn-fault" type="submit">Submit</button>
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

                const response = await axios.post('http://localhost:3000/services', formData);
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