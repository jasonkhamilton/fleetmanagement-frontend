<template>
    <div>
        <ServicesTable/>
        <CreateServiceForm/>
    </div>
</template>

<script>
import ServicesTable from './ServicesTable.vue';
import CreateServiceForm from './CreateServiceForm.vue';

export default {
    name: 'ServicingSummary',
    components: {
        ServicesTable,
        CreateServiceForm
    }
}
</script>