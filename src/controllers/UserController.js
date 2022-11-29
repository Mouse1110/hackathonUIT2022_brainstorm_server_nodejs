const User = require('../models/Users');

class UserController {
    show(req, res, next) {
        try {
            (async () => {
                const data = await User.find({ IsDeleted: true }).exec()
                res.json({ success: true, data });
                console.log(data);
            })()

        } catch (e) {
            res.json({ success: false, message: e.message });
        }
    }

    async sign_up(req, res, next) {
        var avatar = req.body.avatar;
        var address = req.body.address;
        var name = req.body.name;
        var phone = req.body.phone;
        var pass = req.body.pass;
        var permission = req.body.permission;

        try {
            let newUser = new User(req.body);
            if (!avatar || !name || !phone || !address || !pass || !permission) {
                res.json({ result: 0, code: "Truyen thieu tham so" })
            } else {
                // await newUser.save();
                res.json({ success: true, data: newUser });
            }
        }
        catch (e) {
            res.status(500).send({ message: err.message });

        }
    }

    async sign_in(req, res, next) {

        try {
            if (!req.body.phone || !req.body.pass) {
                res.json({ ketqua: 0, maloi: "truyen thieu tham so" })
            } else {
                let userFind = await User.findOne({ $and: [{ phone: req.body.phone }, { pass: req.body.pass }] })
                if (!userFind) return res.status(400).json({ success: false, message: e.message });
                console.log(userFind)
                res.json({
                    "name": userFind.name,
                    "avatar": userFind.avatar,
                    "phone": userFind.phone,
                    "address": userFind.address,
                    "permission": userFind.permission,
                    "product": userFind.product || [],
                })
            }
        }
        catch (e) {
            res.json({ success: false, message: e.message });
        }
    }
    // async showOne() {
    //     try {
    //         let id = req.params.id;
    //         let user = await User.findOne({ _id: id });
    //         if (!user) {
    //             res.json({ success: false, message: "not found" });
    //         } else {
    //             res.json({ success: true, data: user });
    //         }
    //     } catch (e) {
    //         res.json({ success: false, message: e.message });
    //     }
    // }

    // async edit(req, res) {
    //     try {
    //         let id = req.params.id;
    //         let user = await User.findOne({ _id: id });
    //         if (!user) {
    //             res.json({ success: false, message: "not found" });
    //         } else {
    //             user.Name = req.body.Name;
    //             user.Price = req.body.Price;
    //             user.Amount = req.body.Amount;
    //             user.Description = req.body.Description;
    //             user.ImageUrl = req.body.ImageUrl;
    //             user.StartDate = req.body.StartDate;
    //             user.EndDate = req.body.EndDate;


    //             await user.save();

    //             res.json({ success: true, data: user });
    //         }
    //     } catch (e) {
    //         res.json({ success: false, message: e.message });
    //     }
    // }

    // async delete(req, res) {
    //     try {
    //         let id = req.params.id;
    //         let user = await User.findOne({ _id: id });
    //         if (!user) {
    //             res.json({ success: false, message: "not found" });
    //         } else {
    //             user.IsDeleted = true;
    //             await user.save();

    //             res.json({ success: true });
    //         }
    //     } catch (e) {
    //         res.json({ success: false, message: e.message });
    //     }
    // }
}

module.exports = new UserController();