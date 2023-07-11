const User = require( "../../models/user.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const userRegistretion = async (req, res) => {
    
    const { name:username, email, password } = req.body
    console.log(username, email, password, 'back');
            const user = await User.findOne({ email });

            if(user){
                return res.status(500).json({msg: 'User already exists'})
            } 

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({ password: hashedPassword, email, username })

            const {password: hashedPass, ...others} = newUser._doc

            const token = jwt.sign({id: newUser._id.toString()}, process.env.JWT_SECRET, {expiresIn: '1h'})

            return res.status(201).json({others, token})
        
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({ msg: "Email or password is wrong" })
        }
        const comparePass = await bcrypt.compare(password, user.password)
        if (!comparePass) {
            return res.status(500).json({ msg: "Email or password is wrong" })
        }
        const { password: hashedPass, ...others } = user._doc

        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({ token, others })
    } catch (error) {
        return res.status(500).json(error)
    }
};
const userLogout = async (req, res, next) => {
    try {
        const { _id } = req;
        await User.findByIdAndUpdate(_id, { token: null });
        res.status(204).json({});

    } catch (error) {
         res.status(401).json({
            "message": "Not authorized"
        })
    }
}

module.exports = {
    userRegistretion,
    userLogin,
    userLogout
}