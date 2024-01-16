<template>
  <div>
    <AssetTable ref="assetTableRef"/>
    <CreateAssetForm @reloadAssetTable="handleReloadAssetTable"/>
  </div>
</template>
<script>
import AssetTable from '@/components/Assets/AssetTable.vue';
import CreateAssetForm from '@/components/Assets/CreateAssetForm.vue';

export default {
  name: 'AssetSummary',
  components: {
    AssetTable,
    CreateAssetForm
  },
  methods: {
    handleReloadAssetTable () {
      this.$refs.assetTableRef.fetchAssets();
    }
  }
}
</script>