<template>
    <div>
        <div class="tkbtn tkbutton" v-if="this.buttons">
            <base-button @click="toggleTicket" size="md" type="warning">
                <i class="ni ni-active-40"></i>
                Composizione <b>TID #<span id="tid">{{this.current_tid}}</span></b>
            </base-button>
            <base-button @click="publish" size="md" type="success">
                <i class="ni ni-send"></i> Pubblica
            </base-button>
        </div>
        <tinymce-editor :api-key="apikey" :init="config" v-model="tinymce_content"></tinymce-editor>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue';

    export default {
        name: 'ticketeditor',
        props: {
            height: String,
            buttons: true,
            model: null
        },
        data() {
            return {
                current_tid: '',
                apikey: process.env.VUE_APP_TINYMCE,
                tinymce_content: localStorage.getItem('tinymce_content') || null,
                config: {
                    plugins: 'paste',
                    paste_data_images: true,
                    height: this.height ? this.height : '780px',
                    resize: false,
                    init_instance_callback: editor => {

                        var vue = this;
                        editor.on('Change', e => {
                            vue.preventSave();
                        })
                    }
                }
            }
        },
        components: {
            'tinymce-editor': Editor // <- Important part
        },
        mounted() {
            //
        },
        watch: {},
        methods: {
            publish() {
            },
            preventSave() {
                this.$storage.setItem('tinymce_content', this.tinymce_content);
            },
            toggleTicket() {
                var teditor = document.getElementById('reply-editor');

                if (teditor.classList.contains('mni-active')) {
                    teditor.classList.remove('mni-active');
                    teditor.classList.add('active');
                } else {
                    teditor.classList.remove('active');
                    teditor.classList.add('mni-active');
                }

            }
        },
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