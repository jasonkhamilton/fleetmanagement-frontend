<template>
    <div class="card my-2">
        <div class="card-body">
            <h2 class="card-title">Create Work Order</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label class="form-label">Asset:</label>
                    <input class="form-control" type="text" v-model="assetId" placeholder="Asset"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Description:</label>
                    <textarea class="form-control" v-model="description" placeholder="Tell a story."></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Time Spent:</label>
                    <input class="form-control" type="text" v-model="time" placeholder="0h"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Cost in Parts:</label>
                    <input class="form-control" type="text" v-model="costParts" placeholder="$0"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Cost in Labour:</label>
                    <input class="form-control" type="text" v-model="costLabour" placeholder="$0"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Open or Closed:</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="isOpen" value="true">
                        <label class="form-check-label">Open</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="isOpen" value="false">
                        <label class="form-check-label">Closed</label>
                    </div>
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'CreatWorkOrderForm',
    emits: ['reloadWorkOrderTable'],
    data () {
        return {
            assetId: null,
            description: '',
            time: 0,
            costParts: 0,
            costLabour: 0,
            isOpen: true 
        };
    },
    methods: {
        async submitForm() {
            try {
                const formData = {
                    assetId: this.assetId,
                    description: this.description,
                    time: this.time,
                    costParts: this.costParts,
                    costLabour: this.costLabour,
                    isOpen: this.isOpen
                };

                const response = await axios.post(`${ process.env.VUE_APP_API_URL }/workorders`, formData);
                // Handle success (if needed)
                this.$emit('reloadWorkOrderTable');
                alert(response.data.message);
            } catch (error) {
                alert('Error creating Workorder.');
                console.log(error);
                // Handle error (if needed)
            }
        },
    }
}

</script>