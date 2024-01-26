<template>
    <div class="card my-2">
        <div class="card-body">
            <h2 class="card-title">Work Orders</h2>
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th scope="col">WO #</th>
                        <th scope="col">Asset</th>
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
                        <td v-if="this.assetReference">{{ workOrder.asset_id }}</td>
                        <td v-else>{{ workOrder.assetReference }}</td>
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
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'WorkOrderTable',
    expose: ['fetchWorkOrders'],
    data() {
      return {
        workOrders: [],
      };
    },
    mounted() {
      this.fetchWorkOrders(); // Fetch work orders when the component is mounted
    },
    methods: {
      async fetchWorkOrders() {
        try {
          const response = await axios.get(`${ process.env.VUE_APP_API_URL }/workorders`);
          this.workOrders = response.data; // Assign the fetched data to the work orders array
          for(var i = 0; i < this.workOrders.length; i++) {
            this.workOrders[i].assetReference = await this.getAssetReferences(this.workOrders[i].asset_id);
          }
        } catch (error) {
          console.error('Error fetching work orders:', error);
          // Handle error if necessary
        }
      },
      async getAssetReferences (id) {
        try {
          const response = await axios.get(`${ process.env.VUE_APP_API_URL }/assets/${ id }`);
          return response.data.reference;
        } catch (err) {
          console.log('Error fetching asset details: ', err);
        }
      }
    },
}
</script>