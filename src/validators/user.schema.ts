const signup = {
    body: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 3, maxLength: 20 },
            name: { type: 'string' }
        }
    }
}

const login = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
        }
    }
}

const update = {
    body: {
        type: 'object',
        required: [],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 3, maxLength: 20 },
            name: { type: 'string' }
        }
    }
}

export { signup, login, update }