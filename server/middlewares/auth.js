import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next) => {
  try {
    const token =
      req.headers.token ||
      req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized. Login Again' })
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

    if (!tokenDecode?.id) {
      return res.json({ success: false, message: 'Not Authorized. Login Again' })
    }

    req.userId = tokenDecode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default userAuth