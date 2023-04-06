const jwt = require('jsonwebtoken')

const userMiddleware = (req, resp, next) => {
    const token = req.headers.authorization

    if (token) {
        try {
            const { _id } = jwt.verify(token, "secretKey")
            if (_id) {
                req.user = _id
               // console.log(req.user)
                next()
            }
        }

        catch (err) {
            console.log('something went wrong', err)
        }
    }
    if (!token) {
        return resp.json({ message: 'Access denied. No token' })
    }
}

module.exports = userMiddleware