<template>
    <div>
      <DivisionTable ref="divisionTableRef"/>
      <CreateDivisionForm @reloadDivisionTable="handleReloadDivisionTable"/>
    </div>
  </template>
  <script>
  import DivisionTable from '@/components/Divisions/DivisionTable.vue';
  import CreateDivisionForm from '@/components/Divisions/CreateDivisionForm.vue';
  
  // import axios from 'axios';
  
  export default {
    name: 'DivisionSummary',
    components: {
      DivisionTable,
      CreateDivisionForm
    },
    methods: {
      handleReloadDivisionTable () {
        this.$refs.divisionTableRef.fetchDivisions();
      }
    }
  }
  </script>