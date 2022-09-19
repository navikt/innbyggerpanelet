import client from 'prom-client'

class Prometheus {
    public register

    constructor() {
        const { collectDefaultMetrics } = client

        this.register = new client.Registry()

        collectDefaultMetrics({
            register: this.register,
        })
    }
}

export default new Prometheus()
