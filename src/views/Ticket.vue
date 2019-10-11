<template>
    <div>
        <header-ticket :ticket_id="this.ticket_id"/>

        <div class="container-fluid table mt--7">
            <div class="row">
                <div v-for="reply in this.ticket_replies"
                     :class="class_reply(reply)"
                     class="col-md-7 ticket-reply shadow p-3 mb-3">
                    <span class="avatar rounded-circle mr-3">CM</span>
                    <div class="row m-2" :class="class_inner(reply)">
                        {{reply.content}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import HeaderTicket from "../components/HeaderTicket";

    export default {
        name: 'ticket',
        props: {
            ticket_id: String
        },
        components: {
            HeaderTicket
        },
        mounted() {
            window.scroll({
                top: window.document.body.scrollHeight
            });
        },
        methods: {
            class_reply(reply) {
                return reply.user_id !== this.$user.id ? 'bg-white' : 'offset-5 bg-default text-right'
            },
            class_inner(reply) {
                return reply.user_id !== this.$user.id ? '' : 'text-right  text-white'
            },
            saveTicket() {
                console.log(TicketEditor.data().htmlContent)
            }
        },
        data() {
            return {
                modals: {
                    modal2: false
                },
                editor: null,

                ticket_replies: [
                    {
                        id: 1,
                        user_id: 2,
                        name: 'PH',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv  csdavjdijvodsjvoiwedhviuowedhv'
                    },
                    {
                        id: 1,
                        user_id: 1,
                        name: 'AI',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv gvfbebvfd csdavjdijvodsjvoiwedhviuowedhv'
                    },

                ]
            }
        }
    };
</script>
<style></style>
