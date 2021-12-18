const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const cors = require('cors');
const Cryptr = require('cryptr');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

const User = require('./Models/User');
const Product = require('./Models/Product');
const parseJSON = bodyParser.json();
const cryptr = new Cryptr(process.env.C_SECRET);

mongoose.connect(process.env.DB_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('> Connected to mongo');
    })
    .catch(err => {
        console.log('connection error');
        console.log(err);
    })

const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})
app.get('/api/getcart', async (req, res) => {
    const curUser = await User.find({ _id: req.session.user_id });
    res.send(curUser[0].cart);
})

app.post('/api/addcookies', parseJSON, async (req, res) => {
    const newCart = [];
    const curUser = await User.find({ _id: req.session.user_id });

    for (let item of req.body.cart) {
        //check if any of items from cookie data are already in the cart
        const itemInCart = curUser[0].cart.find(i => i._id === item._id);
        if (itemInCart) {
            //if they are increase the quantity and push into newCart
            item.quantity += itemInCart.quantity;
            newCart.push(item);

        } else {
            newCart.push(item);
        }
    }
    for (let item of curUser[0].cart) {
        const cartItem = newCart.find(i => i._id === item._id);
        if (!cartItem) {
            newCart.push(item);
        }
    }
    await User.findOneAndUpdate({ _id: req.session.user_id },
        {
            $set: { cart: newCart }
        })
    const updatedCart = await User.find({ _id: req.session.user_id });
    res.send(updatedCart[0].cart);
})
app.post('/api/additem', parseJSON, async (req, res) => {
    if (!req.body.quantity) { req.body.quantity = 1 };
    const item = await User.findOne({ '_id': req.session.user_id, 'cart._id': req.body._id })
    if (item) {
        await User.findOneAndUpdate({ '_id': req.session.user_id, 'cart._id': req.body._id },
            {
                $inc: { 'cart.$.quantity': 1 }
            })
    } else {
        await User.findOneAndUpdate({ '_id': req.session.user_id }, {
            $push: { cart: req.body }
        })
    }
    const curCart = await User.find({ _id: req.session.user_id });
    res.send(curCart[0].cart)
})
app.post('/api/increment', parseJSON, async (req, res) => {
    if (req.body.plus) {
        await User.findOneAndUpdate({ '_id': req.session.user_id, 'cart._id': req.body._id },
            {
                $inc: { 'cart.$.quantity': 1 }
            })
    } else {
        await User.findOneAndUpdate({ '_id': req.session.user_id, 'cart._id': req.body._id },
            {
                $inc: { 'cart.$.quantity': -1 }
            })
    }
    const curCart = await User.find({ _id: req.session.user_id });
    res.send(curCart[0].cart)
})
app.post('/api/details', parseJSON, async (req, res) => {
    const info = await Product.find({ _id: req.body.id })
    res.send(info[0]);
})
app.post('/api/register', parseJSON, async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 12);
    const isMade = await User.find({ username })
    if (isMade.length < 1) {
        const newUser = new User({
            username,
            password: hashed,
            cart: [],
            pastOrders: [],
            userInfo: {
                S_info: {
                    address: "",
                    address2: "",
                    city: "",
                    state: "",
                    zipcode: "",
                },
                B_info: {
                    address: "",
                    address2: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    name: "",
                    cardNum: "",
                    exp: "",
                    ccv: "",
                }
            }
        })
        await newUser.save();
        res.send('success');
    } else {
        res.send('username');
    }
})
app.post('/api/islogged', (req, res) => {
    if (req.session.user_id) {
        res.send(true);

    } else {
        res.send(false);
    }
})
app.post('/api/logout', (req, res) => {
    req.session.user_id = null;
    req.session.destroy();
})
app.post('/api/login', parseJSON, async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const curUser = await User.findOne({ username });
        if (curUser) {
            const isValid = await bcrypt.compare(password, curUser.password);
            if (isValid) {
                req.session.user_id = curUser._id;
                res.send('success')
            } else {
                res.send('wrong')
            }
        } else {
            res.send('wrong')
        }
    } else {
        res.send('fail')
    }
})
app.post('/api/filter', parseJSON, async (req, res) => {
    const { brand, flex, size, price } = req.body;
    const filter = {
        brand: [],
        flex: [],
        size: [],
        price: []
    };
    for (let item in req.body) {

        if (req.body[item].length < 1) {
            filter[item].push({});
        } else {
            const curItemArr = req.body[item];
            for (let curItem of curItemArr) {
                if (item === 'brand') {
                    filter[item].push({ brand: curItem })
                } else {
                    filter[item].push({ [item]: JSON.parse(curItem) })
                }
            }
        }
    }
    const filteredArray = await Product.find({
        $and: [
            {
                $or: filter.flex
            },
            {
                $or: filter.brand
            },
            {
                $or: filter.size
            },
            {
                $or: filter.price
            }
        ]
    })
    res.send(filteredArray);
})
app.post('/api/clearCart', parseJSON, async (req, res) => {
    console.log(req.body.cart)
    const newPastOrder = {
        date: getDate(),
        order: req.body.cart
    };
    await User.findOneAndUpdate({ _id: req.session.user_id }, {
        $set: {
            cart: []
        },
        $push: {
            pastOrders: newPastOrder
        }
    });

})
app.post('/api/getpastorders', async (req, res) => {
    const curUser = await User.findOne({ _id: req.session.user_id });
    if (curUser.pastOrders) {
        res.send(curUser.pastOrders);
    } else {
        res.send([]);
    }
})
app.post('/api/getinfo', async (req, res) => {
    const curUser = await User.findOne({ '_id': req.session.user_id });

    if (curUser.userInfo) {
        const infoToSend = curUser.userInfo;
        if (curUser.userInfo.B_info.cardNum) curUser.userInfo.B_info.cardNum = cryptr.decrypt(curUser.userInfo.B_info.cardNum);
        if (curUser.userInfo.B_info.exp) curUser.userInfo.B_info.exp = cryptr.decrypt(curUser.userInfo.B_info.exp);
        if (curUser.userInfo.B_info.ccv) curUser.userInfo.B_info.ccv = cryptr.decrypt(curUser.userInfo.B_info.ccv);
        res.send(curUser.userInfo);
    } else {
        res.send({
            S_info: {
                address: "",
                address2: "",
                city: "",
                state: "",
                zipcode: "",
            },
            B_info: {
                address: "",
                address2: "",
                city: "",
                state: "",
                zipcode: "",
                name: "",
                cardNum: "",
                exp: "",
                ccv: "",
            }
        })
    }
})
app.post('/api/saveinfo', parseJSON, async (req, res) => {
    const { userInfo } = req.body;
    if (userInfo.B_info.cardNum) userInfo.B_info.cardNum = cryptr.encrypt(userInfo.B_info.cardNum);
    if (userInfo.B_info.exp) userInfo.B_info.exp = cryptr.encrypt(userInfo.B_info.exp);
    if (userInfo.B_info.ccv) userInfo.B_info.ccv = cryptr.encrypt(userInfo.B_info.ccv);
    await User.findOneAndUpdate({ _id: req.session.user_id }, {
        $set: {
            'userInfo.S_info': userInfo.S_info,
            'userInfo.B_info': userInfo.B_info
        }
    })
})
const randomArray = (length) => {
    arr = [];
    while (arr.length < 3) {
        let n = Math.floor(Math.random() * length);
        if (arr.indexOf(n) === -1) arr.push(n);
    }
    return arr;
}
app.post('/api/getrandomimg', async (req, res) => {
    const arr = [];
    const products = await Product.find({});
    randArray = randomArray(products.length);
    for (let n of randArray) {
        arr.push(products[n])
    }
    res.send(arr);
})

app.delete('/api/deleteitem', parseJSON, async (req, res) => {
    await User.findOneAndUpdate({ '_id': req.session.user_id, 'cart._id': req.body._id },
        {
            $pull: { cart: { _id: req.body._id } }
        }, { new: true })
    const curCart = await User.find({ _id: req.session.user_id });
    res.send(curCart[0].cart)
})

//
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    // app.use(express.static(path.join(__dirname, '../client/build')));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}
const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, err => {
    if (err) throw err;
    console.log('> Connected on 3000 :)');
})
