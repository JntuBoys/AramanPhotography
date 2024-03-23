const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());
const {
    testController,
    photographerLogin,
    photographerRegister,
} = require('../controllers/photographerControllers')

router.route('/photographer').get(testController)
router.route('/login').post(photographerLogin)
router.route('/register').post(photographerRegister)

module.exports = router
