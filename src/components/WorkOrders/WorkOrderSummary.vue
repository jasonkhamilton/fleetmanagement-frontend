<template>
    <div>
        <WorkOrderTable/>
        <CreateWorkOrderForm/>
    </div>
</template>
<script>
import CreateWorkOrderForm from '@/components/WorkOrders/CreateWorkOrderForm.vue';
import WorkOrderTable from '@/components/WorkOrders/WorkOrderTable.vue';

export default {
    name: 'WorkOrderSummary',
    components: {
        CreateWorkOrderForm,
        WorkOrderTable
    }
}
</script>