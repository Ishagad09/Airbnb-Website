exports.register = async (req, res) => {
    try {
        const {
            name, email, password
        } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        });
    }
}