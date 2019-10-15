<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Inserisci le credenziali per accedere al sistema</small>
                    </div>
                    <form role="form">
                        <base-input :disabled="this.$InLoading" class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    type="email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>

                        <base-input :disabled="this.$InLoading"
                                    class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <base-checkbox :disabled="this.$InLoading"
                                       class="custom-control-alternative">
                            <span class="text-muted">Remember me</span>
                        </base-checkbox>
                        <div class="text-center">
                            <base-button :disabled="this.$InLoading" @click="handleSubmit" type="primary" class="my-4">
                                Accedi al sistema
                            </base-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            return {
                model: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.$store.dispatch('login', {
                    email: this.model.email,
                    password: this.model.password
                })
                    .then(() => this.$router.push('/'))
                    .catch(err => {
                        console.log(err);
                        return this.$notify({
                            type: 'error',
                            text: err.message ? err.message : err,
                        });
                    })
            }
        }
    }
</script>
<style>
    html, body {
        background: #172b4d !important;
    }
</style>
