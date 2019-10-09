<template>
    <base-alert class="server" v-if="!this.server_connect" type="danger" dismissible>
        <span class="alert-inner--icon"><i class="ni ni-world-2"></i></span>
        <span class="alert-inner--text">
              <strong>Attenzione!</strong> Server disconnesso. Questo applicativo potrebbe NON funzionare correttamente. Perfavore torna piu' tardi</span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </base-alert>
</template>
<script>

    export default {
        name: 'server-alert',
        data() {
            return {
                server_connect: true
            }
        },
        mounted() {
            this.$http.get(`${this.$api}/status`)
                .catch(error => {
                    if (!error.response) {
                        this.server_connect = false
                    }
                });
        }
    };
</script>
<style></style>
