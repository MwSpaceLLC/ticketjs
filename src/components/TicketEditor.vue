<template>
    <tinymce-editor :api-key="apikey" :init="config" v-model="content"></tinymce-editor>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue';

    export default {
        data() {
            return {
                apikey: process.env.VUE_APP_TINYMCE,
                content: '',
                config: {
                    plugins: 'paste',
                    paste_data_images: true,
                    height: "450px",
                    resize: false
                }
            }
        },
        components: {
            'tinymce-editor': Editor // <- Important part
        },
        mounted() {
            //
        }
    }
</script>