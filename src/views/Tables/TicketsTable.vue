<template>
    <div class="card shadow"
         :class="type === 'dark' ? 'bg-default': ''">
        <div class="card-header border-0"
             :class="type === 'dark' ? 'bg-transparent': ''">
            <div class="row align-items-center">
                <div class="col">
                    <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                        {{title}}
                    </h3>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <base-table class="table align-items-center table-flush"
                        :class="type === 'dark' ? 'table-dark': ''"
                        :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                        tbody-classes="list"
                        :data="tableData">
                <template slot="columns">
                    <th>Info</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Ultima Risposta</th>
                </template>

                <template slot-scope="{row}">
                    <th scope="row" @click="openTicket(row.id)">
                        <div class="media align-items-center">
                            <span class="avatar rounded-circle mr-3">
                                {{row.img}}
                            </span>
                            <div class="media-body">
                                <span class="name mb-0 text-sm clickable">{{row.title}}</span>
                            </div>
                        </div>
                    </th>
                    <td class="budget" @click="openTicket(row.id)">
                        {{row.budget}}
                    </td>
                    <td @click="openTicket(row.id)">
                        <badge class="badge-dot mr-4" :type="row.statusType">
                            <i :class="`bg-${row.statusType}`"></i>
                            <span class="status">{{row.status}}</span>
                        </badge>
                    </td>
                    <td @click="openTicket(row.id)">
                        <div class="avatar-group">
                            <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                               data-original-title="Ryan Tompson">
                                <img alt="Image placeholder" src="/img/theme/team-1-800x800.jpg">
                            </a>
                            <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                               data-original-title="Romina Hadid">
                                <img alt="Image placeholder" src="img/theme/team-2-800x800.jpg">
                            </a>
                            <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                               data-original-title="Alexander Smith">
                                <img alt="Image placeholder" src="img/theme/team-3-800x800.jpg">
                            </a>
                            <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                               data-original-title="Jessica Doe">
                                <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">
                            </a>
                        </div>
                    </td>
                    <td @click="openTicket(row.id)">
                        <div class="d-flex align-items-center">
                            <span class="completion mr-2">{{row.completion}}%</span>
                            <div>
                                <base-progress :type="row.statusType"
                                               :show-percentage="false"
                                               class="pt-0"
                                               :value="row.completion"/>
                            </div>
                        </div>
                    </td>
                </template>

            </base-table>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'projects-table',
        props: {
            type: {
                type: String
            },
            title: String,

            search: String
        },
        methods: {
            openTicket(id) {
                this.$router.push(`/ticket/${id}`)
            }
        },

        mounted() {
            console.log('search GET/: ' + this.search)
        },

        data() {
            return {
                tableData: [
                    {
                        id: 1,
                        img: 'CM',
                        title: 'Argon Design System',
                        budget: '$2500 USD',
                        status: 'pending',
                        statusType: 'warning',
                        completion: 60
                    },
                    {
                        id: 2,
                        img: 'CB',
                        title: 'Angular Now UI Kit PRO',
                        budget: '$1800 USD',
                        status: 'completed',
                        statusType: 'success',
                        completion: 100
                    },
                    {
                        id: 3,
                        img: 'MA',
                        title: 'Black Dashboard',
                        budget: '$3150 USD',
                        status: 'delayed',
                        statusType: 'danger',
                        completion: 72
                    },
                    {
                        id: 4,
                        img: 'AI',
                        title: 'React Material Dashboard',
                        budget: '$4400 USD',
                        status: 'on schedule',
                        statusType: 'info',
                        completion: 90
                    },
                    {
                        id: 5,
                        img: 'PB',
                        title: 'Vue Paper UI Kit PRO',
                        budget: '$2200 USD',
                        status: 'completed',
                        statusType: 'success',
                        completion: 100
                    },
                    {
                        id: 6,
                        img: 'PB',
                        title: 'Vue Paper UI Kit PRO',
                        budget: '$2200 USD',
                        status: 'completed',
                        statusType: 'success',
                        completion: 100
                    },
                    {
                        id: 7,
                        img: 'PB',
                        title: 'Vue Paper UI Kit PRO',
                        budget: '$2200 USD',
                        status: 'completed',
                        statusType: 'success',
                        completion: 100
                    },
                    {
                        id: 8,
                        img: 'PB',
                        title: 'Vue Paper UI Kit PRO',
                        budget: '$2200 USD',
                        status: 'completed',
                        statusType: 'success',
                        completion: 100
                    }
                ]
            }
        }
    }
</script>
<style lang="scss">
    .list > tr {
        cursor: pointer;
        transition: .2s;

        &:hover {
            box-shadow: 0 25px 55px rgba(0, 0, 0, .2), 0 16px 28px rgba(0, 0, 0, .24);
        }
    }

    .card .table td, .card .table th {
        border: unset;
    }
</style>
