'use strict'
const Redis = use('Redis')
const Format = use('date-fns/format')

class UserController {
    async login({ auth, request }) {
        const { email, password } = request.all()
        let user = await auth.validate(email, password, true)

        const jwt = await auth.generate(user)

        return {
            success: true,
            ...jwt,
            message: 'Logged in successfully'
        }
    }

    async register({ auth, request }) {
        const user = request.all()
      
        const jwt = await auth.generate(user)

        return {
            success: true,
            ...jwt,
            message: 'Account Created'
        }
    }
}

module.exports = UserController
