<template>
    <div class="inner">

        <header-stats/>

        <div class="container-fluid table mt--7">
            <div class="row">
                <div class="col">
                    <tickets-table search="received" title="Ticket Ricevuti"></tickets-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import TicketsTable from './Tables/TicketsTable'
    import HeaderStats from "../components/HeaderStats";

    export default {
        name: 'ricevuti',
        components: {
            TicketsTable,
            HeaderStats
        }
    };
</script>
<style></style>
