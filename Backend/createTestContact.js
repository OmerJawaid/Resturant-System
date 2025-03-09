const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ResturantSystem")
    .then(() => { console.log("Connected to Database") })
    .catch((err) => { console.log("Error connecting: " + err) });

// Contact Schema
const ContactSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('contacts', ContactSchema);

// Create a test contact
const createTestContact = async () => {
    try {
        const testContact = new ContactModel({
            name: "Test User",
            email: "test@example.com",
            phone: "123-456-7890",
            subject: "Test Contact Submission",
            message: "This is a test contact submission to initialize the contacts collection in the database.",
            createdAt: new Date()
        });
        
        await testContact.save();
        console.log("Test contact created successfully!");
        
        // List all contacts to verify
        const contacts = await ContactModel.find({});
        console.log("All contacts:", contacts);
        
        mongoose.connection.close();
    } catch (error) {
        console.error("Error creating test contact:", error);
        mongoose.connection.close();
    }
};

createTestContact(); 