const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const cookieParser = require('cookie-parser')

//App Integration
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret', //Assign and encrytion of session cookie
    resave: false,//Save Storage
    saveUninitialized: false, //Increase Performance
    cookie: {
        secure: false, //Https not used
        maxAge: 1000 * 60 * 60 * 24 //Limit of the cookie
    }
}))

//Connection to Database
mongoose.connect("mongodb://localhost:27017/ResturantSystem")
    .then(() => { console.log("Connected to DataBase") })
    .catch((err) => { crossOriginIsolated.log("Error connecting: " + err) })

//Schema Creation (Structure) and model making
const UserSchema = mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Username: { type: String, unique: true, required: true },
    Email: { type: String, required: true },
    Phone: String,
    Password: { type: String, required: true }

})
const UserModel = mongoose.model('registeruser', UserSchema)

app.post('/registeruser', async (req, res) => {
    const { FirstName, LastName, Username, Email, Phone, Password } = req.body;

    const NewUser = new UserModel({
        FirstName, LastName, Username, Email, Phone, Password
    })

    try {
        const SaveUser = await NewUser.save();
        res.status(201).json(SaveUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

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

        req.session.Email = user.Email;
        console.log(req.session.Email);
        res.status(200).json({ message: "Login successful", user: user.Email });
        // return res.json({ Login: true, Email: req.session.Email });

    } catch (err) {
        res.status(500).json({ message: "Login Issue: " + err.message });
    }
});

app.get('/athentication', (req, res) => {
    if (req.session.Email) {
        res.status(200).json({ authenticated: true })
    }
    else {
        res.status(401).json({ authenticated: false })
    }
})

app.listen(8081, () => {
    console.log('Listening')
})