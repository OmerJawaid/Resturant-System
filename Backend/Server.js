const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//App Integration
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Your front-end URL
    credentials: true, // Allow credentials (cookies, etc.)
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'my-name-omer', // Replace with your secret key
    resave: false, // Do not save the session if it hasn't been modified
    saveUninitialized: true, // Save a session even if it's new and not modified
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Makes the cookie inaccessible to JavaScript on the client side
        maxAge: 1000 * 60 * 60 * 24, // Set the expiration time (e.g., 24 hours)
        sameSite: 'none', // Allow cross-site cookies
        // domain: 'localhost' // Omit this in local development
    }
}));

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

        req.session.omer = user.Email; // Store the email in session
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Session save error: " + err.message });
            }
            console.log("Session ID:", req.sessionID);
            console.log('Session initialized:', req.session.omer);
            res.status(200).json({ message: "Login successful", user: user.Email });
        });
    } catch (err) {
        res.status(500).json({ message: "Login Issue: " + err.message });
    }
});

app.get('/authentication', (req, res) => {
    console.log("Authentication route hit");
    console.log("Session ID:", req.sessionID);
    console.log("Authentication: " + req.session.omer);
    if (req.session.omer) { // Check if `req.session.omer` is set
        console.log("Authentication true");
        res.status(200).json({ Authenticate: true });
    } else {
        console.log("Authentication false");
        res.status(401).json({ Authenticate: false });
    }
});

app.listen(8081, () => {
    console.log('Listening');
});
