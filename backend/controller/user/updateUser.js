const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const { userId, email, name, streetAddress, zipCode, phoneNumber } = req.body;

        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(streetAddress && { streetAddress }),
            ...(zipCode && { zipCode }),
            ...(phoneNumber && { phoneNumber }),
        };

        const updateUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        if (!updateUser) {
            throw new Error("User not found");
        }

        res.json({
            data: updateUser,
            message: "User Updated Successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
