<template>
    <div id="app">
        <server-alert/>
        <notifications/>
        <router-view/>

        <div id="reply-editor" class="reply-editor card resized">
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
        mounted() {
            // var reply_tid = localStorage.getItem('reply_tid');
            //
            // var teditor = document.getElementById('reply-editor');
            //
            // if (this.$user && reply_tid) {
            //     teditor.classList.remove('active');
            //     teditor.classList.remove('mni-active');
            //     teditor.classList.add('mni-active');
            // }
        },
        created: function () {
            this.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch(logout)
                    }
                    throw err;
                });
            });
        }
    }
</script>