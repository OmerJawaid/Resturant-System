const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session)

//App Integration
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
const uriMongodb = "mongodb://localhost:27017/ResturantSystem"

const store = new MongoDBSession({
    uri: uriMongodb,
    collection: "session",
})
app.use(express.urlencoded({ extended: true }));
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


const UserSchema = mongoose.Schema({

    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Username: { type: String, unique: true, required: true },
    Email: { type: String, required: true },
    Phone: String,
    Password: { type: String, required: true }
});

const UserModel = mongoose.model('registeruser', UserSchema);

const CartSchema = mongoose.Schema({
    CustomerID: { type: mongoose.Schema.Types.ObjectId, required: true },
    Creation_Date: { type: Date, required: true },
    Total_Amount: { type: Number, required: false, default: 0 }
})

const CartModel = mongoose.model("carts", CartSchema);

app.get('/getuserdata', (req, res) => {
    if (req.session && req.session.Userdata) {
        console.log("Session Data: ", req.session.Userdata);
        res.json("Hello" + req.session.Userdata._id);
        res.json(req.session.Userdata);

    } else {
        res.status(404).json({ message: "No user data found in session" });
    }
});

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



    const user = await UserModel.findOne({ Email });
    const CustomerID = user._id;
    const Creation_Date = new Date();
    const NewCart = new CartModel({ CustomerID, Creation_Date })
    try {
        const SaveCart = await NewCart.save();
        console.log("Sucessfully added cart to db");
    }
    catch (err) {
        console.log("Error: " + err.message);
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
        try {
            req.session.Userdata = {
                _id_session: user._id,
                firstname_session: user.FirstName,
                lastname_session: user.LastName,
                username_session: user.Username,
                email_session: user.Email,
                phone_session: user.Phone,
            }

            req.session.Authenticate = true; // Store the email in session
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ message: "Session save error: " + err.message });
                }
                res.status(200).json({ message: "Login successful", user: user.Email });
            });
        }
        catch (err) {
            res.status(500).json({ message: "Login Issue: " + err.message });
        }
    } catch (err) {
        res.status(500).json({ message: "Login Issue: " + err.message });
    }
});

app.get('/authentication', (req, res) => {

    if (req.session.Authenticate) {

        res.status(200).json({ Authenticate: true });
    } else {

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

app.get('/breakfast', async (req, res) => {
    try {
        const product = await ProductModel.find({ Category: "Breakfast" })
        console.log(product);
        res.json(product);
    }
    catch (err) {
        console.log("Cannot get  Breakfast from DB: ", err)
    }
})
app.get('/maindishes', async (req, res) => {
    try {
        const product = await ProductModel.find({ Category: "MainDishes" })
        console.log(product);
        res.json(product);
    }
    catch (err) {
        console.log("Cannot get  Breakfast from DB: ", err)
    }
})
app.get('/drinks', async (req, res) => {
    try {
        const product = await ProductModel.find({ Category: "Drinks" })
        console.log(product);
        res.json(product);
    }
    catch (err) {
        console.log("Cannot get  Breakfast from DB: ", err)
    }
})
app.get('/desserts', async (req, res) => {
    try {
        const product = await ProductModel.find({ Category: "Desserts" })
        console.log(product);
        res.json(product);
    }
    catch (err) {
        console.log("Cannot get  Breakfast from DB: ", err)
    }
})

app.get('/product/:ProductID', async (req, res) => {
    const { ProductID } = req.params;
    try {
        const product = await ProductModel.findOne({ ID: ProductID }); // Adjust based on your schema
        if (!product) {
            return res.status(404).json({ error: 'Product not found' }); // Return JSON response
        }
        res.json(product); // Send JSON response if product exists
    } catch (err) {
        console.log("Error fetching product: ", err);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle server errors with JSON
    }
});


//Cart
const CartItemSchema = mongoose.Schema({
    CartID: { type: mongoose.Schema.Types.ObjectId, required: true },
    ItemID: { type: Number, required: true },
})
const Cart_Item_Model = mongoose.model('cartitem', CartItemSchema);

app.post('/addtocart', async (req, res) => {
    const { ItemID } = req.body;
    const Customer_ID = req.session._id;
    const Cart_Info = await CartModel.findOne({ Customer_ID });
    const CartID = Cart_Info._id;
    const NewCartItem = new Cart_Item_Model({ CartID, ItemID })
    res.Customer_ID;
    try {
        const SaveCartItem = await NewCartItem.save();
        console.log("Cart item : " + SaveCartItem + "  Sucessfully Saved");

    }
    catch (err) {
        console.log("Error In CartItemData Saving:  " + err.message);
    }

})


app.listen(8081, () => {
    console.log('Listening');
});
