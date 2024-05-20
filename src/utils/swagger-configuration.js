export const swaggerConfiguration = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación API de e-commerce',
            description: 'e-Commerce de venta de productos'
        }
    },
    apis: ['src/docs/**/*.yaml']
}