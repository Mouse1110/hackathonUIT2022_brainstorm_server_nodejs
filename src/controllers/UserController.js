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
        try {
            // let newUser = new User(req.body);
            if (!req.body.name || !req.body.phone || !req.body.address || !req.body.pass || !req.body.permission) {
                res.json({ ketqua: 0, maloi: "Truyen thieu tham so" })
            } else {
                // await newUser.save();
                res.json({
                    "name": "A",
                    "phone": "0382292563",
                    "address": "Ho Chi Minh",
                    "permission": 1,
                    "product": [],
                });
            }

        }
        catch (e) {
            res.json({ success: false, message: e.message });
        }
    }

    async sign_in(req, res, next) {
        try {
            if (!req.body.phone || !req.body.pass){
                res.json({ ketqua: 0, maloi: "truyen thieu tham so"})
            } else {
                res.json({
                    "name": "A",
                    "phone": "0382292563",
                    "address": "Ho Chi Minh",
                    "permission": 1,
                    "product": [
                        {
                            "name": "A",
                            "image": "/file/321321.png",
                            "type": "ABC",
                            "time_receive": 1667260800
                        }
                    ]
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