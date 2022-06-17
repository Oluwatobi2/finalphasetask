var express = require('express');
var router = express.Router();
const { create, edit, handleDelete, fetchAll, fetch, distBtwnLocation} = require('../controller/indexcontroller')

/* GET home page. */
router.post('/add_location', create);

router.patch('/:id', edit);

router.delete('/:id', handleDelete);

router.get('/get_all_location', fetchAll )

router.get('/:id', fetch);

router.get('/distance', distBtwnLocation)

module.exports = router;
