import { response, Router } from 'express'
import { checkAuth } from './middleware/authentication'

const router = Router()

router.use(checkAuth).get('/authenticated', (_, response, next) => {
    try {
        return response.json()
    } catch (error) {
        next(error)
    }
})

export default router
