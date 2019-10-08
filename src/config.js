var config = {
    SRV_PORT: 3010,
    SSL: process.env.VUE_APP_SSL,

    DENY: process.env.VUE_APP_ALLOWDENY,
    IP_ALLOWED: Array.isArray( process.env.VUE_APP_IPS )?
        process.env.VUE_APP_IPS.explode():
        process.env.VUE_APP_IPS
};

export default config