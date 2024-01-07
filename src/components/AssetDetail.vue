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
                    <div class="row">
                        <div class="col-md-4 my-2">
                            <img src="https://c8.alamy.com/comp/2E3KNXX/2017-white-australian-holden-ute-vehicle-parked-in-sydneyaustralia-2E3KNXX.jpg" style="max-width: 100%;" class="img-fluid rounded mx-auto d-block"/>
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
                <RecordReading :asset="asset"/>
                <ReadingsByAssetTable :asset="asset"/>
                <ServicesByAssetTable :asset="asset"/>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import RecordReading from './RecordReading.vue';
import ReadingsByAssetTable from './ReadingsByAssetTable.vue';
import ServicesByAssetTable from './ServicesByAssetTable.vue';

export default {
    data () {
        return {
            assetId: null,
            asset: null
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