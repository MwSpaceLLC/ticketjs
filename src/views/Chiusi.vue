<template>
    <div>
        <header-stats/>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <tickets-table search="closed" title="Ticket Chiusi"></tickets-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import TicketsTable from './Tables/TicketsTable'
  import HeaderStats from "../components/HeaderStats";
  export default {
    name: 'chiusi',
    components: {
        HeaderStats,
        TicketsTable
    }
  };
</script>
<style></style>
