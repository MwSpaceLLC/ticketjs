<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">

                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Registrati al sistema di Ticketjs</small>
                    </div>
                    <form role="form">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    type="email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>

                        <password id="password" class="input-group-alternative"
                                  placeholder="Password"
                                  type="password"
                                  addon-left-icon="ni ni-lock-circle-open"
                                  v-model="model.password">
                        </password>

                        <base-input class="input-group-alternative"
                                    placeholder="Confirm Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password_confirm">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Passcode"
                                    type="text"
                                    addon-left-icon="ni ni-key-25"
                                    v-model="model.passcode">
                        </base-input>

                        <div class="row">
                            <base-button @click="switchHide" type="success" class="col-md-8">
                                Mostra / Nascondi
                                <i class="ni ni-lock-circle-open"></i>
                            </base-button>
                            <base-button @click="handleSubmit" type="primary" class="col">
                                Registrati
                            </base-button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import Password from 'vue-password-strength-meter'

    export default {
        name: 'register',
        components: {Password},
        data() {
            return {
                model: {
                    email: '',
                    password: '',
                    password_confirm: '',
                    passcode: ''
                }
            }
        },
        methods: {
            switchHide() {
                var item = document.getElementById('password');
                item.getAttribute('type') === 'password' ?
                    item.setAttribute('type', 'text') : item.setAttribute('type', 'password');
            },
            handleSubmit(e) {
                e.preventDefault();

                if (this.model.email.length > 0 &&
                    this.model.password.length > 0 &&
                    this.model.password_confirm.length > 0 &&
                    this.model.passcode.length > 0) {

                    if (this.model.password !== this.model.password_confirm) {
                        return this.$notify({
                            type: 'warn',
                            text: 'Le password non combaciano',
                        });
                    }

                    this.$InLoading = true;

                    this.$http.post(`${this.$api}/register`, {
                        name: this.model.name,
                        email: this.model.email,
                        password: this.model.password,
                        passcode: this.model.passcode
                    })
                        .then(response => {
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

                            if(error.response){
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
                    this.password = "";
                    this.passwordConfirm = "";

                    this.$InLoading = false;

                    return this.$notify({
                        type: 'warn',
                        text: 'I campi sono obbligatori',
                    });

                }
            }
        }
    }
</script>
<style>
</style>
