<template>
    <div>
        <ServicesTable/>
        <CreateServiceForm/>
    </div>
</template>

<script>
import ServicesTable from '@/components/Services/ServicesTable.vue';
import CreateServiceForm from '@/components/Services/CreateServiceForm.vue';

export default {
    name: 'ServicingSummary',
    components: {
        ServicesTable,
        CreateServiceForm
    }
}
</script>