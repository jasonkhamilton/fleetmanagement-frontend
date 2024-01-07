<template>
  <div>
    <AssetTable/>
    <CreateAssetForm/>
  </div>
</template>
<script>
import AssetTable from '@/components/Assets/AssetTable.vue';
import CreateAssetForm from '@/components/Assets/CreateAssetForm.vue';

// import { AssetTable, CreateAssetForm } from '@/components/Assets';

export default {
  name: 'AssetSummary',
  components: {
    AssetTable,
    CreateAssetForm
  }
}
</script>