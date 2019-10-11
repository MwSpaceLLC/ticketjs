<template>
    <tinymce-editor :init="config" v-model="content"></tinymce-editor>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue';

    export default {
        data() {
            return {
                content: '',
                config:{
                    plugins: 'paste',
                    paste_data_images: true,
                    height : "450px",
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