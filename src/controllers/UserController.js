const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { response } = require('express');

let refreshTokens = [];

//GENERATE ACCESS TOKEN
function generateAccessToken(user) {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "120s" }
    );
}

//GENERATE REFRESH TOKEN
function generateRefreshToken(user) {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "365d" }
    )
}

class UserController {
    async getAllUsers(req, res, next) {
        try {
            (async () => {
                const data = await User.find();
                res.status(200).json(data)
                // console.log(data);
            })()

        } catch (err) {
            res.status(500).json(err)
        }
    }

    async sign_up(req, res) {
        const { name, avatar, phone, address, pass, permission } = req.body;

        try {

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(pass, salt);

            // Create a new user
            const newUser = await new User({
                name: name,
                avatar: avatar,
                phone: phone,
                address: address,
                pass: hashed,
                permission: permission,
            });

            //Save to db
            const user = await newUser.save();
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    //LOGIN
    async sign_in(req, res) {
        const { phone, pass } = req.body;
        try {
            // if (!phone || !pass) {
            //     res.json({ ketqua: 0, maloi: "truyen thieu tham so" })
            // } else {
            //     let userFind = await User.findOne({ $and: [{ phone: req.body.phone }, { pass: req.body.pass }] })
            //     if (!userFind) return res.status(400).json({ success: false, message: e.message });
            //     console.log(userFind)
            //     res.json({
            //         "name": userFind.name,
            //         "avatar": userFind.avatar,
            //         "phone": userFind.phone,
            //         "address": userFind.address,
            //         "permission": userFind.permission,
            //         "product": userFind.product || [],
            //     })
            // }

            const user = await User.findOne({ phone: phone });
            if (!user) {
                res.status(404).json("Not found user, please try again")
            }
            const validPassword = await bcrypt.compare(pass, user.pass);

            if (!validPassword) {
                res.status(404).json("Wrong password")
            }
            if (user && validPassword) {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user)

                refreshTokens.push(refreshToken);

                // Save accessToken on Cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    //When dev set secure = false, deploy set true
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });


                const { pass, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    }
    //LOGOUT
    async userLogout(req, res) {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("Log out successfully");
    }

    //DELETE USER
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");
        }
        catch (err) {
            res.status(500).json(err)

        }
    }

    async findUserById(req, res) {
        try {
            let id = req.params.id;
            let user = await User.findOne({ _id: id });
            if (!user) {
                res.json({ success: false, message: "not found" });
            } else {
                res.status(200).json({ success: true, data: user })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async requestRefreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You are not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            // Clean array refreshTokens
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            // Create new accessToken, refreshToken
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            //Add new refreshToken
            refreshTokens.push(newRefreshToken);

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                //When dev set secure = false, deploy set true
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken })
        })
    }

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