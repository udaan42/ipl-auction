import express from 'express';

const router = express.Router();

router.route('/:id').get((req, res) => {
    console.log(req.params);
    console.log(req);
    return res.json({
        "data": "Test"
    });
})

router.route('/:id').post((req, res) => {
    console.log(req.body);
    console.log('Store room creation details');
    res.sendStatus(201);
});
export default router;