<template>
    <div>
        <header-stats/>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <tickets-table search="opened" title="Ticket Aperti"></tickets-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import TicketsTable from './Tables/TicketsTable'
    import HeaderStats from "../components/HeaderStats";

    export default {
        name: 'aperti',
        components: {
            TicketsTable,
            HeaderStats
        }
    };
</script>
<style></style>
