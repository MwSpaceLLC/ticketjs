<template>
    <div id="app">
        <server-alert/>
        <notifications/>
        <router-view/>
    </div>
</template>

<script>
    import ServerAlert from "./components/ServerAlert";

    export default {
        name: 'app',
        components: {ServerAlert},
    }
</script>