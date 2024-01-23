<template>
    <div>
        <div v-if="this.workOrder != null" class="card my-2">
            <div class="card-body">
                <h2 class="card-title">Work Order #{{ this.workOrderId }}</h2>
                <h3 v-if="this.workOrder.status">Open</h3>
                <h3 v-else>Closed</h3>
                <div class="card my-2">
                    <div class="card-header">Description</div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>{{ this.workOrder.description }}</p>
                        </blockquote>
                    </div>
                </div>
                <div class="card my-2">
                    <div class="card-header">Asset</div>
                    <div v-if="this.asset == null" class="card-body">
                        <p>{{ this.workOrder.asset_id }}</p>
                    </div>
                    <div v-else class="card-body">
                        <h4>{{ this.asset.reference }} - {{ this.asset.make }} {{ this.asset.model }}</h4>
                        <button class="btn btn-primary btn-sm" type="submit" @click="$router.push(`/asset/${ this.asset.id}`)">View</button>
                    </div>
                </div>
                <div class="card my-2">
                    <div class="card-header">Costs</div>
                    <div class="card-body">
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="col">Parts</th>
                                    <td>${{ this.workOrder.cost_parts }}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Labour</th>
                                    <td>${{ this.workOrder.cost_labor }}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Total</th>
                                    <td>${{ parseInt(workOrder.cost_parts, 10) + parseInt(workOrder.cost_labor, 10) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'WorkOrderDetail',
    data () {
        return {
            workOrderId: null,
            workOrder: null,
            asset: null
        }
    },
    created () {
        this.workOrderId = this.$route.params.id;
        this.getWorkOrder();
    },
    methods: {
        async getWorkOrder () {
            try {
                 const response = await axios.get(`${ process.env.VUE_APP_API_URL }/workorders/${ this.workOrderId}`);
                 this.workOrder = response.data;
                 this.getWorkOrderAsset(this.workOrder.asset_id);
            } catch (err) {
                console.error('Error fetching work order: ', err);
            }
        },
        async getWorkOrderAsset (id) {
            try {
                const response = await axios.get(`${ process.env.VUE_APP_API_URL}/assets/${ id }`);
                this.asset = response.data;
                console.log(this.asset);
            } catch (err) {
                console.error('Error fetching asset: ', err);
            }
        }
    }
}
</script>