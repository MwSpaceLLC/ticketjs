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
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>

                        <password class="input-group-alternative"
                                  placeholder="Password"
                                  type="password"
                                  addon-left-icon="ni ni-lock-circle-open"
                                  v-model="model.password">
                        </password>

                        <base-input class="input-group-alternative"
                                    placeholder="Confirm Password"
                                    type="text"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password_confirm">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Passcode"
                                    type="text"
                                    addon-left-icon="ni ni-key-25"
                                    v-model="model.passcode">
                        </base-input>

                        <div class="text-center">
                            <base-button @click="handleSubmit" type="primary" class="my-4">Registrati nel sistema</base-button>
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
                    name: '',
                    email: '',
                    password: '',
                    password_confirm: '',
                    passcode: ''
                }
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                if (this.password === this.password_confirm && this.password.length > 0) {

                    this.$http.post(`${this.$api}/register`, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_admin: this.is_admin
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
                            console.error(error);
                        });
                } else {
                    this.password = "";
                    this.passwordConfirm = "";

                    return alert("Passwords do not match")
                }
            }
        }
    }
</script>
<style>
</style>
