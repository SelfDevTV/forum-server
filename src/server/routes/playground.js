const router = require('express').Router();

router.get('/', (req, res) => {
  console.log(req.user);
  res.send('hi');
});

module.exports = router;
