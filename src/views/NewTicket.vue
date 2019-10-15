<template>
    <div>

        <header-stats/>

        <div class="container-fluid mt--7 table">
            <form @submit.prevent="submitForm">
                <div class="row">

                    <new-ticket-advance :progress="progress" color="warning"/>

                    <div class="col-xl-8 order-xl-1">
                        <card shadow type="secondary">
                            <div slot="header" class="bg-white border-0">
                                <div class="row align-items-center">
                                    <div class="col-8">
                                        <h3 class="mb-0">Apri una richiesta di assistenza</h3>
                                    </div>
                                    <div class="col-4 text-right">
                                        <button type="submit" class="btn btn-sm btn-outline-warning">Passo successivo
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <template>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <label class="form-control-label">
                                                Seleziona il prodotto relativo alla tua richiesta di supporto.
                                            </label>
                                            <v-select
                                                    @input="advanceProgress"
                                                    v-model="model.category"
                                                    placeholder="Scegli il prodotto / servizio di assistenza"
                                                    class="form-control form-control-alternative"
                                                    :options="categories"></v-select>
                                        </div>
                                        <div class="col-md-4">

                                            <label class="form-control-label">
                                                Data della richiesta
                                            </label>

                                            <base-input addon-left-icon="ni ni-calendar-grid-58">
                                                <flat-picker slot-scope="{focus, blur}"
                                                             @on-change="advanceProgress"
                                                             @on-open="focus"
                                                             @on-close="blur"
                                                             :config="{allowInput: true}"
                                                             class="form-control datepicker"
                                                             v-model="model.duedate">
                                                </flat-picker>
                                            </base-input>
                                        </div>
                                    </div>
                                </div>

                                <!-- Ticket Subject -->
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        @change="advanceProgress"
                                                        label="Una breve riga dell'oggetto che meglio descrive la tua richiesta."
                                                        placeholder="Database error in Web Services | page customers ~ request Forbidden"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.subject"/>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4"/>

                                <!-- Ticket First Reply -->

                                <h6 class="heading-small text-muted mb-4">
                                    Fornire una descrizione dettagliata del problema e includere le informazioni sullo
                                    stato del prodotto/servizio.
                                </h6>

                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <editor :init="config" v-model="model.body"></editor>
                                    </div>
                                </div>
                            </template>
                        </card>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import 'vue-select/dist/vue-select.css';
    import "flatpickr/dist/flatpickr.css";

    import HeaderStats from "../components/HeaderStats";
    import NewTicketAdvance from "../components/NewTicketAdvance";
    import vSelect from 'vue-select'

    import flatPicker from "vue-flatpickr-component";

    import TicketEditor from "../components/TicketEditor";
    import axios from "axios";

    import Editor from '@tinymce/tinymce-vue';

    var local_new_ticket = localStorage.getItem('local_new_ticket');
    if (local_new_ticket)
        local_new_ticket = JSON.parse(local_new_ticket);

    export default {
        name: 'new-ticket',
        components: {HeaderStats, NewTicketAdvance, vSelect, flatPicker, TicketEditor, Editor},
        data() {
            return {
                categories: [],
                model: {
                    category: local_new_ticket ? local_new_ticket.category : null,
                    subject: local_new_ticket ? local_new_ticket.subject : null,
                    duedate: local_new_ticket ? local_new_ticket.duedate : new Date().toJSON().slice(0, 10),
                    body: local_new_ticket ? local_new_ticket.body : null,
                },
                progress: 0,
                config: {
                    plugins: 'paste',
                    paste_data_images: true,
                    height: '420px',
                    resize: false,
                    init_instance_callback: editor => {
                        var vue = this;
                        editor.on('Change', e => {
                            vue.advanceProgress();
                        })
                    }
                }
            }
        },
        mounted() {
            this.getCategory();
            this.advanceProgress();
        },
        methods: {

            getCategory() {
                axios.get(`${this.$api}/categories/get`)
                    .then(resp => {
                        var vue = this;
                        resp.data.forEach(cat => {
                            vue.categories.push({
                                value: cat.id,
                                label: cat.name,
                            })
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        return this.$notify({
                            type: 'error',
                            text: err.message ? err.message : err,
                        });
                    })
            },
            postTicket() {
                var vue = this;
                axios.post(`${this.$api}/post/ticket`, {
                    ticket: {
                        user_id: vue.$user.id,
                        category_id: vue.model.category,
                        subject: vue.model.subject,
                        ticket_replies: vue.model.body,
                        duelimit: vue.model.duedate
                    }
                })
                    .then(resp => {
                        console.log(resp)
                        return this.$notify({
                            type: 'success',
                            text: 'Record inserito',
                        });
                    })
                    .catch(err => {
                        console.log(err)
                        return this.$notify({
                            type: 'error',
                            text: err.message ? err.message : err,
                        });
                    })
            },
            submitForm() {
                if (this.model.category &&
                    this.model.duedate &&
                    this.model.subject &&
                    this.model.body) {

                    /** @check max string control*/
                    if (this.model.body.length > 10000)
                        return this.$notify({
                            type: 'error',
                            text: 'Diminuisci i caratteri del tuo <b>TICKET</b>',
                        });
                    if (this.model.subject.length > 200)
                        return this.$notify({
                            type: 'error',
                            text: 'Diminuisci i caratteri del tuo <b>OGGETTO</b>',
                        });

                    /** @send max string control*/
                    this.postTicket();

                } else {
                    return this.$notify({
                        type: 'warn',
                        text: 'Impossibile proseguire, Tutti i campi sono <b>OBBLIGATORI</b> ',
                    });
                }
            },
            advanceProgress() {
                var pr = 0;
                if (this.model.category)
                    pr += 25;
                if (this.model.duedate)
                    pr += 25;
                if (this.model.subject)
                    pr += 25;
                if (this.model.body)
                    pr += 25;

                /** @update progress bar*/
                this.progress = pr;

                /** @prevent lost data of new ticket*/
                this.$storage.setItem('local_new_ticket', JSON.stringify(this.model));
            }
        }
    };
</script>
<style></style>
