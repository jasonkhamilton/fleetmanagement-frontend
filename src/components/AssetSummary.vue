<template>
  <div>
    <AssetTable/>
    <CreateAssetForm/>
  </div>
</template>
<script>
import AssetTable from './AssetTable.vue';
import CreateAssetForm from './CreateAssetForm.vue';

export default {
  name: 'AssetSummary',
  components: {
    AssetTable,
    CreateAssetForm
  }
}
</script>