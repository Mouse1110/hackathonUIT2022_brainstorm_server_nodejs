const Product = require('../models/Products');

class ProductController {

    show(req, res, next) {
        try {
            (async () => {
                const data = await Product.find({ IsDeleted: true }).exec()
                res.json({ success: true, data });
                console.log(data);
            })()

        } catch (e) {
            res.json({ success: false, message: e.message });
        }
    }
    // index(req, res, next) {
    //     // res.render('courses/create')
    //     res.json([{
    //         "name": "A",
    //         "image": "/file/321321.png",
    //         "type": "ABC",
    //         "time_receive": 1667260800
    //     }])
    // }

    category(req, res, next) {
        res.json([
            "Danh mục A",
            "Danh mục B",
            "Danh mục C",
        ]
        )
    }

    user_near(req, res, next) {
        res.json({

            "name": "Nguyễn Văn A",
            "phone": "0382292563",
            "address": "Hồ Chí Minh",
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

    async create_product(req, res, next) {

        if (!req.body.image || !req.body.name || !req.body.type || !req.body.time_receive) {
            res.json({ ketqua: 0, maloi: "Truyen thieu tham so" })
        } else {
            let newProduct = new Product(req.body);
            await newProduct.save();
            res.json({ success: true, data: newProduct });
        }
    }

    async buy_product(req, res, next) {

        if (!req.body.phone || !req.body.id || !req.body.time_period) {
            res.json({ ketqua: 0, maloi: "Truyen thieu tham so" })
        } else {
            // let buyProduct = new buyProduct(req.body);
            // await buyProduct.save();
            res.status(200).json('ketqua 1, thanh cong');
        }
    }

    async list_buy_product(req, res, next) {
        try {
            // let newUser = new User(req.body);
            if (!req.body.phone || !req.body.idProduct) {
                res.json({ ketqua: 0, maloi: "Truyen thieu tham so" })
            } else {
                // await newUser.save();
                res.json([
                    {
                        "id_user": "3213",
                        "name": "A",
                        "phone": "0382292563",
                        "address": "Hồ Chí Minh",
                        "time_period": 1669852800
                    }
                ]);
            }

        }
        catch (e) {
            res.json({ success: false, message: e.message });
        }
    }

    async buy_accept(req, res, next) {

        if (!req.body.phone || !req.body.idUser || !req.body.idProduct) {
            res.json({ ketqua: 0, maloi: "Truyen thieu tham so" })
        } else {
            // let buyProduct = new buyProduct(req.body);
            // await buyProduct.save();
            res.status(200).json('ketqua 1, thanh cong');
        }
    }


}

module.exports = new ProductController();