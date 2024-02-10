<template>
    <div>
        <div v-if="this.workOrder != null" class="card my-2">
            <div class="card-body">
                <h2 class="card-title">Work Order #{{ this.workOrderId }}</h2>
                <h3 v-if="this.workOrder.status">Status: Open</h3>
                <h3 v-else>Status: Closed</h3>

                <!-- Description-->
                <div class="card my-2">
                    <div class="card-header">Description</div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>{{ this.workOrder.description }}</p>
                        </blockquote>
                    </div>
                </div>

                <!-- Image(s) -->
                <div class="card my-2">
                    <div class="card-header">Images</div>
                    <div class="card-body">
                        <div class="my-2">
                            <div v-if="workOrderImage">
                                <img :src="workOrderImage" style="max-width: 100%;" class="img-fluid rounded mx-auto d-block img-tumbnail"/>
                                <form @submit.prevent="deleteWorkOrderImage">
                                    <button class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
                                </form>
                            </div>
                            <p class="text-center" v-else>No image found.</p>
                        </div>
                        <div class="my-2">
                            <form @submit.prevent="uploadImage" class="row g-3">
                                <div class="col-auto">
                                    <input class="form-control" type="file" ref="fileInput"/>
                                </div>
                                <div class="col-auto">
                                    <button class="btn btn-outline-primary" type="submit">Upload Image</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Asset -->
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

                <!-- Costs -->
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
            asset: null,
            workOrderImage: null,
            workOrderImageId: null
        }
    },
    created () {
        this.workOrderId = this.$route.params.id;
        this.getWorkOrder();
        this.getWorkOrderImage();
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
            } catch (err) {
                console.error('Error fetching asset: ', err);
            }
        },
        async getWorkOrderImage () {
            try {
                const response = await axios.get(`${ process.env.VUE_APP_API_URL }/workorders/image/${ this.workOrderId }`);
                const binaryData = response.data.image_data.data;
                this.workOrderImageId = response.data.image_id;

                const base64Image = btoa(
                    new Uint8Array(binaryData).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                    )
                );
                
                // Set the image source URL for <img> tag
                this.workOrderImage = `data:image/jpeg;base64,${base64Image}`;
                
            } catch (error) {
                console.error('Error fetching work order image:', error);
            }
        },
        async uploadImage () {
            try {
                const formData = new FormData();
                
                formData.append('image', this.$refs.fileInput.files[0]);

                const response = await axios.post(`${ process.env.VUE_APP_API_URL }/workorders/image/${ this.workOrderId }`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert(response.data);
                this.getWorkOrderImage();
            } catch (error) {
                console.error('Error uploading image: ', error.response.data);
            }
        },
        async deleteWorkOrderImage () {
            try {
                const response = await axios.delete(`${ process.env.VUE_APP_API_URL }/workorders/image/${ this.workOrderImageId }`);
                this.workOrderImage = null;
                alert(response.data.message);
            } catch (error) {
                console.error('Error deleting image: ', error.response.data);
            }
        }
    }
}
</script>