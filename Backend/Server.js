const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
const jwt = require('jsonwebtoken');

//App Integration
const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5175'], // Allow both ports
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

// JWT Secret
const JWT_SECRET = "restaurant-admin-secret-key";

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

// Admin Schema
const AdminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' }
});
const AdminModel = mongoose.model('admin', AdminSchema);

// Create default admin if not exists
const createDefaultAdmin = async () => {
    try {
        const adminExists = await AdminModel.findOne({ email: 'admin@restaurant.com' });
        if (!adminExists) {
            const defaultAdmin = new AdminModel({
                name: 'Admin',
                email: 'admin@restaurant.com',
                password: 'admin123', // In a real app, this should be hashed
                role: 'admin'
            });
            await defaultAdmin.save();
            console.log('Default admin created');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
};
createDefaultAdmin();

// Admin Authentication Middleware
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Admin Login
app.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await AdminModel.findOne({ email });
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        
        // In a real app, you would compare hashed passwords
        if (admin.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        res.status(200).json({
            message: 'Login successful',
            token,
            name: admin.name
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Verify Admin Token
app.get('/admin/verify', authenticateAdmin, (req, res) => {
    res.status(200).json({ valid: true, admin: req.admin });
});

// Get all users (admin only)
app.get('/admin/users', authenticateAdmin, async (req, res) => {
    try {
        const users = await UserModel.find({}, '-Password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Delete user (admin only)
app.delete('/admin/users/:userId', authenticateAdmin, async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Get all orders (admin only)
app.get('/admin/orders', authenticateAdmin, async (req, res) => {
    try {
        const orders = await OrderModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Update order status (admin only)
app.put('/admin/orders/:orderId/status', authenticateAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await OrderModel.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
});

// Get all reviews (admin only)
app.get('/admin/reviews', authenticateAdmin, async (req, res) => {
    try {
        const reviews = await ReviewModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// Delete review (admin only)
app.delete('/admin/reviews/:reviewId', authenticateAdmin, async (req, res) => {
    try {
        await ReviewModel.findByIdAndDelete(req.params.reviewId);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
});

// Get all contact submissions (admin only)
app.get('/admin/contacts', authenticateAdmin, async (req, res) => {
    try {
        const contacts = await ContactModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
});

// Get all blog posts (admin only)
app.get('/admin/blog', authenticateAdmin, async (req, res) => {
    try {
        const posts = await BlogPostModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog posts', error: error.message });
    }
});

// Create blog post (admin only)
app.post('/admin/blog', authenticateAdmin, async (req, res) => {
    try {
        const { title, content, author, image } = req.body;
        const newPost = new BlogPostModel({
            title,
            content,
            author,
            image
        });
        
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog post', error: error.message });
    }
});

// Update blog post (admin only)
app.put('/admin/blog/:postId', authenticateAdmin, async (req, res) => {
    try {
        const { title, content, author, image } = req.body;
        const post = await BlogPostModel.findByIdAndUpdate(
            req.params.postId,
            { title, content, author, image },
            { new: true }
        );
        
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog post', error: error.message });
    }
});

// Delete blog post (admin only)
app.delete('/admin/blog/:postId', authenticateAdmin, async (req, res) => {
    try {
        await BlogPostModel.findByIdAndDelete(req.params.postId);
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog post', error: error.message });
    }
});

// Get analytics data (admin only)
app.get('/admin/analytics', authenticateAdmin, async (req, res) => {
    try {
        // In a real app, you would calculate these from your database
        const analytics = {
            totalOrders: await OrderModel.countDocuments(),
            totalRevenue: await OrderModel.aggregate([
                { $group: { _id: null, total: { $sum: "$totalAmount" } } }
            ]).then(result => result[0]?.total || 0),
            totalUsers: await UserModel.countDocuments(),
            totalProducts: await ProductModel.countDocuments(),
            pendingOrders: await OrderModel.countDocuments({ status: "Processing" }),
            // Sample data for charts
            salesByDay: [
                { day: "Monday", sales: 750 },
                { day: "Tuesday", sales: 820 },
                { day: "Wednesday", sales: 930 },
                { day: "Thursday", sales: 880 },
                { day: "Friday", sales: 1200 },
                { day: "Saturday", sales: 1450 },
                { day: "Sunday", sales: 1100 }
            ],
            salesByCategory: [
                { category: "Breakfast", sales: 3200 },
                { category: "MainDishes", sales: 4500 },
                { category: "Desserts", sales: 2800 },
                { category: "Drinks", sales: 1900 }
            ]
        };
        
        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics', error: error.message });
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
                firstname_session: user.FirstName,
                lastname_session: user.LastName,
                username_session: user.Username,
                email_session: user.Email,
                phone_session: user.Phone,
            }

            console.log(req.session.Userdata)
            req.session.Authenticate = true; // Store the email in session
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ message: "Session save error: " + err.message });
                }
                console.log("Session ID:", req.sessionID);
                console.log('Session initialized:', req.session.Authenticate);
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
        res.status(500).json({ message: "Error adding product", error: err.message });
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
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
})

app.get('/breakfast', async (req, res) => {
    try {
        const product = await ProductModel.find({ Category: "Breakfast" })
        console.log(product);
        res.json(product);
    }
    catch (err) {
        console.log("Cannot get Breakfast from DB: ", err)
        res.status(500).json({ message: "Error fetching breakfast products", error: err.message });
    }
})
app.get('/maindishes', async (req, res) => {
    try {
        const product = await ProductModel.find({ Category: "MainDishes" })
        console.log(product);
        res.json(product);
    }
    catch (err) {
        console.log("Cannot get MainDishes from DB: ", err)
        res.status(500).json({ message: "Error fetching main dishes", error: err.message });
    }
})
app.get('/drinks', async (req, res) => {
    try {
        const product = await ProductModel.find({ Category: "Drinks" })
        console.log(product);
        res.json(product);
    }
    catch (err) {
        console.log("Cannot get Drinks from DB: ", err)
        res.status(500).json({ message: "Error fetching drinks", error: err.message });
    }
})
app.get('/desserts', async (req, res) => {
    try {
        const product = await ProductModel.find({ Category: "Desserts" })
        console.log(product);
        res.json(product);
    }
    catch (err) {
        console.log("Cannot get Desserts from DB: ", err)
        res.status(500).json({ message: "Error fetching desserts", error: err.message });
    }
})

app.get('/product/:ProductID', async (req, res) => {
    const { ProductID } = req.params;
    try {
        const product = await ProductModel.findOne({ ID: ProductID });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.log("Error fetching product: ", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add PUT endpoint to update a product
app.put('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { Name, Description, Price, Category, Mainimage } = req.body;
    
    try {
        const product = await ProductModel.findOne({ ID: parseInt(productId) });
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Update product fields
        product.Name = Name;
        product.Description = Description;
        product.Price = Price;
        product.Category = Category;
        if (Mainimage) {
            product.Mainimage = Mainimage;
        }
        
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log("Error updating product: ", err);
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
});

// Add DELETE endpoint to delete a product
app.delete('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    
    try {
        const product = await ProductModel.findOne({ ID: parseInt(productId) });
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        await ProductModel.deleteOne({ ID: parseInt(productId) });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.log("Error deleting product: ", err);
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
});

app.get('/getuserdata', async (req, res) => {
    if (req.session.Authenticate == true) {
        console.log("get user data : " + req.session.Userdata.username_session)
        res.status(201).json(req.session.Userdata)
    } else {
        res.status(401).json({ message: 'User not authenticated' });
    }
})

// Contact Schema and Model
const ContactSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('contacts', ContactSchema);

// Contact form submission
app.post('/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    
    try {
        const newContact = new ContactModel({
            name,
            email,
            phone,
            subject,
            message
        });
        
        await newContact.save();
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Error saving contact form:', error);
        res.status(500).json({ message: 'Error submitting contact form', error: error.message });
    }
});

// Review Schema and Model
const ReviewSchema = mongoose.Schema({
    productId: { type: Number, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ReviewModel = mongoose.model('reviews', ReviewSchema);

// Create a new review
app.post('/reviews', async (req, res) => {
    if (!req.session.Authenticate) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    
    try {
        const { productId, rating, comment } = req.body;
        
        // Check if product exists
        const product = await ProductModel.findOne({ ID: productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Check if user has already reviewed this product
        const existingReview = await ReviewModel.findOne({
            productId,
            userId: req.session.Userdata.email_session
        });
        
        if (existingReview) {
            // Update existing review
            existingReview.rating = rating;
            existingReview.comment = comment;
            existingReview.createdAt = Date.now();
            
            const updatedReview = await existingReview.save();
            return res.status(200).json(updatedReview);
        }
        
        // Create new review
        const newReview = new ReviewModel({
            productId,
            userId: req.session.Userdata.email_session,
            userName: `${req.session.Userdata.firstname_session} ${req.session.Userdata.lastname_session}`,
            rating,
            comment
        });
        
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ message: 'Error creating review', error: err.message });
    }
});

// Get all reviews for a product
app.get('/reviews/product/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await ReviewModel.find({ productId }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Error fetching reviews', error: err.message });
    }
});

// Get all reviews by a user
app.get('/reviews/user', async (req, res) => {
    if (!req.session.Authenticate) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    
    try {
        const userId = req.session.Userdata.email_session;
        const reviews = await ReviewModel.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching user reviews:', err);
        res.status(500).json({ message: 'Error fetching user reviews', error: err.message });
    }
});

// Order Schema and Model
const OrderSchema = mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    user: { 
        email: { type: String, required: true },
        name: { type: String, required: true }
    },
    items: [{
        productId: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 }
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    createdAt: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model('orders', OrderSchema);

// Create a new order
app.post('/orders', async (req, res) => {
    if (!req.session.Authenticate) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    
    try {
        const { 
            items, 
            totalAmount, 
            shippingAddress, 
            paymentMethod 
        } = req.body;
        
        // Generate a random order number
        const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
        
        const newOrder = new OrderModel({
            orderNumber,
            user: {
                email: req.session.Userdata.email_session,
                name: `${req.session.Userdata.firstname_session} ${req.session.Userdata.lastname_session}`
            },
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            status: 'Processing'
        });
        
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Error creating order', error: err.message });
    }
});

// Get all orders for the current user
app.get('/orders', async (req, res) => {
    if (!req.session.Authenticate) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    
    try {
        const userEmail = req.session.Userdata.email_session;
        const orders = await OrderModel.find({ 'user.email': userEmail }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Error fetching orders', error: err.message });
    }
});

// Get a specific order by ID
app.get('/orders/:orderId', async (req, res) => {
    if (!req.session.Authenticate) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    
    try {
        const { orderId } = req.params;
        const userEmail = req.session.Userdata.email_session;
        
        const order = await OrderModel.findOne({ 
            _id: orderId,
            'user.email': userEmail
        });
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(order);
    } catch (err) {
        console.error('Error fetching order:', err);
        res.status(500).json({ message: 'Error fetching order', error: err.message });
    }
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});
