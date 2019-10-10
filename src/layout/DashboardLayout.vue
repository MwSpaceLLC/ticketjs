<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <side-bar
                :background-color="sidebarBackground"
                short-title="ticketJs"
                title="ticketJs"
        >
            <template slot="links">
                <sidebar-item
                        :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
                />

                <sidebar-item :link="{name: 'Ricevuti', icon: 'ni ni-tag text-orange', path: '/ricevuti'}"/>
                <sidebar-item :link="{name: 'Scaduti', icon: 'ni ni-time-alarm text-yellow', path: '/scaduti'}"/>
                <sidebar-item :link="{name: 'Aperti', icon: 'ni ni-send text-blue', path: '/aperti'}"/>
                <sidebar-item :link="{name: 'Chiusi', icon: 'ni ni-bullet-list-67 text-red', path: '/chiusi'}"/>
                <sidebar-item :link="{name: 'Collezione', icon: 'ni ni-paper-diploma text-info', path: '/collezione'}"/>

            </template>
        </side-bar>
        <div class="main-content" :data="sidebarBackground">
            <dashboard-navbar></dashboard-navbar>

            <div @click="toggleSidebar">
                <fade-transition :duration="200" origin="center top" mode="out-in">
                    <!-- your content here -->
                    <router-view></router-view>
                </fade-transition>
                <content-footer v-if="!$route.meta.hideFooter"></content-footer>
            </div>
        </div>
    </div>
</template>
<script>
    import DashboardNavbar from './DashboardNavbar.vue';
    import ContentFooter from './ContentFooter.vue';
    import {FadeTransition} from 'vue2-transitions';

    export default {
        components: {
            DashboardNavbar,
            ContentFooter,
            FadeTransition
        },
        data() {
            return {
                sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
            };
        },
        methods: {
            toggleSidebar() {
                if (this.$sidebar.showSidebar) {
                    this.$sidebar.displaySidebar(false);
                }
            }
        }
    };
</script>
<style lang="scss">
</style>
