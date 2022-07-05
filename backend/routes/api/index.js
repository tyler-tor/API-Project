const router = require('express').Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.use(restoreUser);

router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
})

router.get('/restore-user', (req, res) => {
    return res.json(req.user);
})

router.get('/set-token-cookie', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(req, user);
    return res.json({ user });
});

router.post('/test', (req, res) => {
    res.json({
        requestBody: req.body
    });
});

module.exports = router;
