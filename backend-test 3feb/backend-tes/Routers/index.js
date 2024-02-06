import { Router } from "express";
 import Routes from './AuthRoutes.js'

const router=Router()

router.use('/auth',Routes)


export default router;