<template>
    <div>
        <div v-if="this.asset != null" class="card my-2">
            <div class="card-body">
                <h2 class="card-title">{{ this.asset.reference }} - {{ this.asset.make }} {{ this.asset.model }}</h2>
                <form @submit.prevent="deleteAsset">
                    <div class="mb-3">
                        <button class="btn btn-outline-warning btn-sm" type="submit">Edit</button>
                        <button class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
                    </div>
                </form>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-4 my-2">
                            <img :src="assetImage" style="max-width: 100%;" class="img-fluid rounded mx-auto d-block" v-if="assetImage"/>
                            <p class="text-center" v-else>No image found.</p>
                        </div>
                        <div class="col-md-8 my-2">
                            <table class="table table-bordered">
                                <tbody>
                                <tr>
                                    <th scope="col">Ref.</th>
                                    <td>{{ asset.reference }}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Make & Model</th>
                                    <td>{{ asset.make }} {{ asset.model }}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Registration</th>
                                    <td>{{ asset.registration_number }}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Type</th>
                                    <td>{{ asset.type }}</td>
                                </tr>
                                <tr v-if="asset.serial_number != null">
                                    <th scope="col">VIN / Serial</th>
                                    <td>{{ asset.serial_number }}</td>
                                </tr>
                                <tr v-if="asset.engine_number != null">
                                    <th scope="col">Engine Number</th>
                                    <td>{{ asset.engine_number }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <form @submit.prevent="uploadImage" class="row g-3">
                        <div class="col-auto">
                            <input class="form-control" type="file" ref="fileInput"/>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-outline-primary" type="submit">Upload Image</button>
                        </div>
                    </form>
                </div>
                <RecordReading :asset="asset"/>
                <ReadingsByAssetTable :asset="asset"/>
                <ServicesByAssetTable :asset="asset"/>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { RecordReading, ReadingsByAssetTable } from '../Readings';
import { ServicesByAssetTable } from '../Services';

export default {
    data () {
        return {
            assetId: null,
            asset: null,
            assetImage: null
        }
    },
    created () {
        this.assetId = this.$route.params.id;
        this.getAsset();
    },
    methods: {
        async getAsset() {
            try {
                const response = await axios.get(`${ process.env.VUE_APP_API_URL }/assets/${ this.assetId }`);
                this.asset = response.data;
                this.getAssetImage();
            } catch (error) {
                console.error('Error fetching asset:', error);
            }
        },
        async deleteAsset() {
            try {
                const response = await axios.delete(`${ process.env.VUE_APP_API_URL }/assets/${ this.assetId }`);
                alert(response.message);
            } catch (error) {
                console.error('Error deleting asset:', error);
            }
        },
        async uploadImage() {
            try {
                const formData = new FormData();
                
                formData.append('image', this.$refs.fileInput.files[0]);

                const response = await axios.post(`${ process.env.VUE_APP_API_URL }/assets/image/${ this.assetId }`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert(response.data);
                this.getAssetImage();
            } catch (error) {
                console.error('Error uploading image: ', error.response.data);
            }
        },
        async getAssetImage() {
            try {
                const response = await axios.get(`${ process.env.VUE_APP_API_URL }/assets/image/${ this.assetId }`);
                const binaryData = response.data.image_data.data;

                const base64Image = btoa(
                    new Uint8Array(binaryData).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                    )
                );
                
                // Set the image source URL for <img> tag
                this.assetImage = `data:image/jpeg;base64,${base64Image}`;
                
            } catch (error) {
                console.error('Error fetching asset image:', error);
            }
        }
    },
    name: 'AssetDetail',
    components: {
        RecordReading,
        ReadingsByAssetTable,
        ServicesByAssetTable
    }
}
</script>