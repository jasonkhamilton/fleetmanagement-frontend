<template>
<html id="app">
    <body>
    <MainNav/>
    <router-view class="container"></router-view>
    </body>
</html>
</template>

<script>
import MainNav from './components/MainNav.vue';

export default {
    name: 'App',
    components: {
        MainNav
    }
};
</script>
