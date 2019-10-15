var config = {
    SRV_PORT: process.env.VUE_APP_SRVPORT,
    SSL: process.env.VUE_APP_SSL,
    API: (process.env.VUE_APP_SSL === 'true' ? 'https' : 'http') + (`://${window.location.hostname}:${process.env.VUE_APP_SRVPORT}`),

    DENY: process.env.VUE_APP_ALLOWDENY,
    IP_ALLOWED: Array.isArray(process.env.VUE_APP_IPS) ?
        process.env.VUE_APP_IPS.explode() :
        process.env.VUE_APP_IPS
};

export default config