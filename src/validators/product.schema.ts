const createProduct = {
    body: {
        type: 'object',
        required: ['name', 'description', 'price'],
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'integer' }
        }
    }
}

const updateProduct = {
    body: {
        type: 'object',
        required: [],
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'integer' }
        }
    }
}

export { createProduct, updateProduct }