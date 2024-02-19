const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Array to store product details
let products = [];

// Route to display the form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission and display product details
app.post('/addProduct', (req, res) => {
    const { productName, price, productURL } = req.body;
    products.push({ productName, price, productURL });
    res.redirect('/products');
});

// Route to display product details with images
app.get('/products', (req, res) => {
    res.render('products', { products });
});

// Route to delete a product
app.get('/delete/:index', (req, res) => {
    const { index } = req.params;
    products.splice(index, 1);
    res.redirect('/products');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
