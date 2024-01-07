<template>
    <div class="card my-2">
        <div class="card-body">
            <h2 class="card-title">Record Reading</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label class="form-label">Type:</label>
                    <select class="form-control" v-model="type" placeholder="Type">
                        <option value="KM">KM</option>
                        <option value="Hours">Hours</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Reading:</label>
                    <input class="form-control" type="text" v-model="reading" placeholder="Reading" />
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RecordReading',
    data () {
        return {
            type: String,
            reading: null
        }
    },
    mounted () {
        this.type = "KM"
    },
    props: {
        asset: {
            type: Object,
            required: true
        }
    },
    methods: {
        async submitForm() {
        try {
            const formData = {
                asset_id: this.asset.id,
                measurement_type: this.type,
                measurement: this.reading
            };

            const response = await axios.post(`${ process.env.VUE_APP_API_URL }/readings`, formData);
            console.log('Form submitted!', response.data);
            // Handle success (if needed)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (if needed)
        }
        }
    }
}
</script>