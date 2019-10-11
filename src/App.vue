<template>
    <div id="app">
        <server-alert/>
        <notifications/>
        <router-view/>

        <div id="reply-editor" class="reply-editor card">
            <ticket-editor/>
        </div>
    </div>
</template>

<script>
    import ServerAlert from "./components/ServerAlert";
    import TicketEditor from "./components/TicketEditor";

    export default {
        name: 'app',
        components: {ServerAlert, TicketEditor},
        methods: {}
    }
</script>