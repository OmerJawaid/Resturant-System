const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)

//App Integration
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Your front-end URL
    credentials: true, // Allow credentials (cookies, etc.)
}));
const uriMongodb = "mongodb://localhost:27017/ResturantSystem"
app.use(express.json());
const store = new MongoDBSession({
    uri: uriMongodb,
    collection: "session",
})

app.use(session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 86400000
    }
}))

// Connection to Database
mongoose.connect("mongodb://localhost:27017/ResturantSystem")
    .then(() => { console.log("Connected to DataBase") })
    .catch((err) => { console.log("Error connecting: " + err) });

// Schema Creation (Structure) and model making
const UserSchema = mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Username: { type: String, unique: true, required: true },
    Email: { type: String, required: true },
    Phone: String,
    Password: { type: String, required: true }
});
const UserModel = mongoose.model('registeruser', UserSchema);



app.post('/registeruser', async (req, res) => {
    const { FirstName, LastName, Username, Email, Phone, Password } = req.body;

    const NewUser = new UserModel({
        FirstName, LastName, Username, Email, Phone, Password
    });

    try {
        const SaveUser = await NewUser.save();
        res.status(201).json(SaveUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const user = await UserModel.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = user.Password === Password;
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        req.session.Authenticate = true; // Store the email in session
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Session save error: " + err.message });
            }
            console.log("Session ID:", req.sessionID);
            console.log('Session initialized:', req.session.Authenticate);
            res.status(200).json({ message: "Login successful", user: user.Email });
        });
    } catch (err) {
        res.status(500).json({ message: "Login Issue: " + err.message });
    }
});

app.get('/authentication', (req, res) => {
    console.log("Authentication route hit");
    console.log("Session ID:", req.sessionID);
    console.log("Session Data:", req.session);
    console.log("Authentication: " + req.session.Authenticate);
    if (req.session.Authenticate) {
        console.log("Authentication true");
        res.status(200).json({ Authenticate: true });
    } else {
        console.log("Authentication false");
        res.status(401).json({ Authenticate: false });
    }
});

app.post('/destroy', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Cannot destroy session:", err);
            return res.status(500).json({ message: "Error destroying session" });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: "Session destroyed and cookie cleared" });
    });
});


const ProductSchema = mongoose.Schema({
    ID: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Price: { type: Number, required: true },
    Category: { type: String, required: true },
    Mainimage: { type: String, required: true },
})
const ProductModel = mongoose.model("products", ProductSchema);

app.post('/products', async (req, res) => {
    const { ID, Name, Description, Price, Category, Mainimage } = req.body;
    const Products = new ProductModel({
        ID, Name, Description, Price, Category, Mainimage
    })
    try {
        const SaveProduct = await Products.save();
        res.status(201).json(SaveProduct)
    }
    catch (err) {
        console.log("Error in Adding Product: " + err);
    }
})
app.get('/allproductshow', async (req, res) => {
    try {
        const product = await ProductModel.find({});
        console.log(product)
        res.json(product);
    }
    catch (err) {
        console.log("Cannot get product from DB: ", err)
    }
})

app.listen(8081, () => {
    console.log('Listening');
});
