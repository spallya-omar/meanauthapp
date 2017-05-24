const router = require(`express`).Router();

// Register
router.post(`/register`, (req, res, next) => {
    res.send(`Register Page`)
});

// Authenticate
router.post(`/authenticate`, (req, res, next) => {
    res.send(`Authenticate Page`)
});

// Profile
router.get(`/profile`, (req, res, next) => {
    res.send(`Profile Page`)
});

module.exports = router;