<template>
  <div>
    <AssetTable ref="assetTableRef"/>
    <CreateAssetForm @reloadAssetTable="handleReloadAssetTable"/>
    <div class="card my-2">
      <div class="card-body">
        <h2 class="card-title">Upload Assets from File</h2>
        <form @submit.prevent="uploadCSV" class="row g-3">
            <div class="col-auto">
                <input class="form-control" type="file" ref="fileInput"/>
            </div>
            <div class="col-auto">
                <button class="btn btn-outline-primary" type="submit">Upload CSV</button>
            </div>
        </form>
      </div>
    </div>
    <div class="card my-2">
      <div class="card-body">
        <h2 class="card-title">Delete All Assets</h2>
        <form @submit.prevent="deleteAssets">
          <div class="mb-3">
            <button class="btn btn-outline-danger btn-sm" type="submit">Delete All!</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import AssetTable from '@/components/Assets/AssetTable.vue';
import CreateAssetForm from '@/components/Assets/CreateAssetForm.vue';

import axios from 'axios';

export default {
  name: 'AssetSummary',
  components: {
    AssetTable,
    CreateAssetForm
  },
  methods: {
    handleReloadAssetTable () {
      this.$refs.assetTableRef.fetchAssets();
    },
    async uploadCSV () {
      try {
          const formData = new FormData();
          
          formData.append('csvFile', this.$refs.fileInput.files[0]);

          const response = await axios.post(`${ process.env.VUE_APP_API_URL }/assets/upload`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          alert(response.data.message);
      } catch (error) {
          console.error('Error uploading csv: ', error);
      }
    },
    async deleteAssets() {
        try {
            const response = await axios.delete(`${ process.env.VUE_APP_API_URL }/assets/deleteall`);
            alert(response.data.message);
            this.$router.push('/assets');
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    }
  }
}
</script>