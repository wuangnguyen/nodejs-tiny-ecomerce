const express = require('express');
const DiContainer = require('../../container');

const router = express.Router();
const container = DiContainer.getInstance();
const colorController = container.get('ColorController');

router.route('/').get(colorController.find);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Colors
 *   description: Color management and retrieval
 */

/**
 * @swagger
 * /colors:
 *   get:
 *     summary: Get colors match search/filter conditions and apply sorting
 *     description: Get colors match search/filter conditions and apply sorting.
 *     tags: [Colors]
 *     parameters:
 *       - in: query
 *         name: seach/filter
 *         schema:
 *           type: string
 *         description: seach/filter conditions
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Color'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */
