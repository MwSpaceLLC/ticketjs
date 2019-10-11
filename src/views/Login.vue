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

                if (this.model.email.length > 0 && this.model.password.length > 0) {

                    this.$InLoading = true;

                    this.$http.post(`${this.$api}/login`, {
                        email: this.model.email,
                        password: this.model.password
                    })
                        .then(response => {

                            this.$InLoading = false;

                            localStorage.setItem('user', JSON.stringify(response.data.user));
                            localStorage.setItem('jwt', response.data.token);

                            if (localStorage.getItem('jwt') != null) {

                                this.$emit('loggedIn');

                                if (this.$route.params.nextUrl != null) {
                                    this.$router.push(this.$route.params.nextUrl)
                                } else {
                                    this.$router.push('/')
                                }

                            }
                        })
                        .catch(error => {
                            this.$InLoading = false;

                            if (error.response) {
                                return this.$notify({
                                    type: 'error',
                                    title: error.response.statusText,
                                    text: error.response.data,
                                });
                            }

                            return this.$notify({
                                type: 'error',
                                text: error,
                            });

                        });
                } else {

                    this.$InLoading = false;

                    return this.$notify({
                        type: 'warn',
                        text: 'Email & Password sono obbligatorie',
                    });

                }
            }
        }
    }
</script>
<style>
    html,body {
        background: #172b4d!important;
    }
</style>
