import { Router } from "express";
const router = Router();

//TESTING
router.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from iCoremar API." })
})

export default router;