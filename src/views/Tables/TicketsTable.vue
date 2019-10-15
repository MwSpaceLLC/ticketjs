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
                    <th scope="row" @click="viewTicket(row.id)">
                        <div class="media align-items-center">
                            <span class="avatar rounded-circle mr-3">
                                {{row.img}}
                            </span>
                            <div class="media-body">
                                <span class="name mb-0 text-sm clickable">{{row.title}}</span>
                            </div>
                        </div>
                    </th>
                    <td class="budget" @click="viewTicket(row.id)">
                        {{row.budget}}
                    </td>
                    <td @click="viewTicket(row.id)">
                        <badge class="badge-dot mr-4" :type="row.statusType">
                            <i :class="`bg-${row.statusType}`"></i>
                            <span class="status">{{row.status}}</span>
                        </badge>
                    </td>
                    <td @click="viewTicket(row.id)">
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
                    <td @click="viewTicket(row.id)">
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
    import axios from 'axios'

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
            viewTicket(id) {
                this.$router.push(`/ticket/${id}`)
            }
        },
        data() {
            return {
                tableData: []
            }
        },
        mounted() {

            // TODO implement method get axoix to download correct dataset
            console.log('search GET/: ' + this.search);

            axios.get(`${this.$api}/ticket/` + this.search)
                .then(resp => {
                    this.tableData = resp.data
                })
                .catch(err => {
                    console.log(err)
                })

        },
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
