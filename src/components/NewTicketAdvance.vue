<template>
    <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
        <div class="card card-profile shadow">
            <div class="card-body pt-0">

                <div class="row">
                    <div class="col">
                        <div class="card-profile-stats justify-content-center">
                            <base-progress :type="color" :height="8" :value="progress"
                                           label="Modulo di richiesta di supporto"></base-progress>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <h3 v-if="category">
                        {{category.name}} <span class="font-weight-light">@{{category.slug}}</span>
                    </h3>
                    <div v-if="category.phone" class="h5 mt-4">
                        <i class="ni business_briefcase-24 mr-2"></i>{{category.phone}}
                    </div>
                    <div v-if="category.email">
                        <i class="ni education_hat mr-2"></i>{{category.email}}
                    </div>
                    <hr v-if="category.blockinfo" class="my-4"/>
                    <q v-if="category.blockinfo">{{category.blockinfo}}</q>
                </div>

                <base-alert v-if="category.danger" type="warning" class="mt-3">
                    <span v-html="category.danger"></span>
                </base-alert>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'NewTicketAdvance',
        props: {
            progress: Number,
            color: String
        },
        data() {
            return {
                category: Object
            }
        },
        components: {},
        mounted() {

            axios.get(`${this.$api}/categories/default`)
                .then(resp => {
                    this.category = resp.data
                })
                .catch(err => {
                    console.log(err)
                    return this.$notify({
                        type: 'error',
                        text: err.message ? err.message : err,
                    });
                })
        },
        watch: {},
        methods: {},
    }
</script>


<style scoped>
    .tkbutton {
        position: absolute;
        right: 0;
        z-index: 99;
        top: -20px;
    }
</style>