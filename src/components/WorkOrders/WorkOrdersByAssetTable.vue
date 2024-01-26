<template>
    <div class="card my-2">
      <div class="card-body">
        <h2 class="card-title">Work Orders</h2>
        <div class="table-responsive" v-if="workOrders.length > 0">
          <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th scope="col">WO #</th>
                    <th scope="col">Description</th>
                    <th scope="col">Time</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="workOrder in workOrders" :key="workOrder.work_order_id">
                    <td>{{ workOrder.work_order_id }}</td>
                    <td>{{ workOrder.description }}</td>
                    <td>{{ workOrder.time_in_hours }}</td>
                    <td>${{ parseInt(workOrder.cost_parts, 10) + parseInt(workOrder.cost_labor, 10) }}</td>
                    <td v-if="workOrder.status">Open</td>
                    <td v-else>Closed</td>
                    <td>
                    <router-link :to="`/workorder/${ workOrder.work_order_id }`" class="btn btn-outline-primary btn-sm">Details</router-link>
                    </td>
                    <!-- Display other WorkOrder properties accordingly -->
                </tr>
            </tbody>
          </table>
        </div>
        <p v-else>There are no work orders set for this asset.</p>
        <router-link to="/workorders" class="btn btn-primary">Add a Work Order</router-link>
      </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'WorkOrdersByAssetTable',
    data () {
        return {
            workOrders: []
        }
    },
    props: {
        asset: {
            type: Object,
            required: true
        }
    },
    mounted () {
        this.fetchWorkOrders(this.asset.id);
    },
    methods: {
        async fetchWorkOrders (assetId) {
            try {
                const response = await axios.get(`${ process.env.VUE_APP_API_URL }/workOrders/byAsset/${ assetId }`);
                this.workOrders = response.data;
            } catch (err) {
                console.error('Error fetching work orders: ', err);
            }
        }
    }
}

</script>