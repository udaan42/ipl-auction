import express from 'express';
import * as testCtrl from '../controllers/test.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: test
 *     description: prints hello world
 */

/**
 * @swagger
 * definitions:
 *   Message:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       content:
 *         type: string
 */

router.route('/')

/**
 * @swagger
 * /test:
 *   get:
 *     tags:
 *       - test
 *     summary: "Test java endpoint"
 *     operationId: testEndpoint
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Message"
 */
    .get( (req, res) => {
        testCtrl.sayHelloRequest(req, res);
    });

export default router;