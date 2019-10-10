<template>
    <div>
        <header-stats/>

        <div class="container-fluid mt--7">
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
    import HeaderStats from "../components/HeaderStats";

    export default {
        name: 'ticket',
        components: {
            HeaderStats
        },
        methods: {
            class_reply(reply) {
                return reply.user_id !== this.$user.id ? 'bg-white' : 'offset-5 bg-default text-right'
            },
            class_inner(reply) {
                return reply.user_id !== this.$user.id ? '' : 'text-right  text-white'
            }
        },
        data() {
            return {
                ticket_replies: [
                    {
                        id: 1,
                        user_id: 2,
                        name: 'PH',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv  csdavjdijvodsjvoiwedhviuowedhv'
                    },
                    {
                        id: 1,
                        user_id: 2,
                        name: 'PH',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv'
                    },
                    {
                        id: 1,
                        user_id: 1,
                        name: 'AI',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv gvfbebvfd csdavjdijvodsjvoiwedhviuowedhv'
                    },
                    {
                        id: 1,
                        user_id: 2,
                        name: 'PH',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv'
                    },
                    {
                        id: 1,
                        user_id: 2,
                        name: 'PH',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv gregr csdavjdijvodsjvoiwedhviuowedhv'
                    },
                    {
                        id: 1,
                        user_id: 1,
                        name: 'AI',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv'
                    },
                    {
                        id: 1,
                        user_id: 2,
                        name: 'PH',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv'
                    },
                    {
                        id: 1,
                        user_id: 2,
                        name: 'PH',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv'
                    },
                    {
                        id: 1,
                        user_id: 1,
                        name: 'AI',
                        content: 'csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv csdavjdijvodsjvoiwedhviuowedhv'
                    },
                ]
            }
        }
    };
</script>
<style></style>
