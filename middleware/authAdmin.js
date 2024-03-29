import userModel from '../models/userModel.js'

const authAdmin = async (req, res, next) => {
    try {
        //Get user information
        const user = await userModel.findOne({
            _id: req.user.id
        })
        if (user.role === 0) {
            return res.status(400).json({ msg: 'Admin resources access denied' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export default authAdmin