<template>
    <div>
        <header-stats/>

        <div class="container-fluid table mt--7">
            <div class="row">
                <div class="col">
                    <tickets-table search="expired" title="Ticket Scaduti"></tickets-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import TicketsTable from './Tables/TicketsTable'
    import HeaderStats from "../components/HeaderStats";

    export default {
        name: 'scaduti',
        components: {
            HeaderStats,
            TicketsTable
        }
    };
</script>
<style></style>
