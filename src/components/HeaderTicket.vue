<template>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        <!-- Card stats -->
        <div class="row">
            <div class="col-xl-3 col-lg-6">
                <stats-card title="Total traffic"
                            type="gradient-red"
                            sub-title="350,897"
                            icon="ni ni-active-40"
                            class="mb-4 mb-xl-0"
                >

                    <template slot="footer">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6">
                <stats-card title="Total traffic"
                            type="gradient-orange"
                            sub-title="2,356"
                            icon="ni ni-chart-pie-35"
                            class="mb-4 mb-xl-0"
                >

                    <template slot="footer">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6">
                <stats-card title="Sales"
                            type="gradient-green"
                            sub-title="924"
                            icon="ni ni-money-coins"
                            class="mb-4 mb-xl-0"
                >

                    <template slot="footer">
                        <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>

            </div>
            <div class="col-xl-3 col-lg-6">
                <stats-card title="Tempo di risposta"
                            type="gradient-info"
                            sub-title="49,65%"
                            icon="ni ni-curved-next"
                            class="mb-4 mb-xl-0">

                    <template slot="icon">
                        <base-button @click="openTicket()"
                                     class="btn-tooltip" type="success">
                            Rispondi
                            <i class="ni ni-chat-round"></i>
                        </base-button>
                    </template>

                    <template slot="footer">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>
            </div>
        </div>
    </base-header>
</template>
<script>
    export default {
        name: "header-ticket",
        props: {
            ticket_id: String
        },
        methods: {
            openTicket() {
                console.log(this.ticket_id)
                this.$ticketEditorActive = !this.$ticketEditorActive;

                if (this.$ticketEditorActive)
                    document.getElementById('reply-editor').classList.add('active');
                else
                    document.getElementById('reply-editor').classList.remove('active');
            }
        }
    };
</script>
<style>

</style>
