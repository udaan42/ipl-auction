import express from 'express';

const router = express.Router();


router.route('/:id').get( (req, res) => {
    console.log(req.params);
    console.log(req);
    return res.json({
        "data": "Test"
    });
})

router.route('/').post( (req, res) => {
    console.log(req.params);
    return res.json({
        "data": "Test"
    });
})
export default router;