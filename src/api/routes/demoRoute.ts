import { Router } from "express"
import controllers from '../controllers'

const router = Router();
router.get('/demo',controllers.demoController.getDemo)

export default router