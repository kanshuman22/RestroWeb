const exp=require("express");
const bodyparser=require("body-parser");
var _=require('lodash');
const mongoose=require("mongoose");
const request = require('request');
require('dotenv').config();


mongoose.connect("mongodb://127.0.0.1:27017/RestroWebdb", { useNewUrlParser: true });

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session=require("express-session");

const apikey=process.env.APIKEY;


//Database collections

OrdersSchema=new mongoose.Schema({
    Id:Number,
    customerId:Number,
    items:[{
        foodid:Number,
        quantity:Number
    }],
    table:Number,
    amount:Number,
    address:String,
    attended:Boolean,
    paid:Boolean
});

Orders=new mongoose.model("Order",OrdersSchema);


CustomersSchema=new mongoose.Schema({
    Id:Number,
    type:String,
    name:String,
    phone:String,
    address:String,
    password:String
});


CustomersSchema.methods.validPassword = function (password) {
    return this.password === password;
};

Customers=new mongoose.model("Customer",CustomersSchema);

MenuSchema=new mongoose.Schema({
    Id:Number,
    name:String,
    price:Number,
    type:String,
    cuisine:String
});

Menu=new mongoose.model("Menu",MenuSchema);

TicketSchema=new mongoose.Schema({
    id:Number,
    issue:String,
    status:Boolean
});

Ticket=new mongoose.model("Ticket",TicketSchema);

ReviewsSchema=new mongoose.Schema({
    data:String,
    userid:Number,
    userName:String
});

Reviews=new mongoose.model("Reviews",ReviewsSchema );


app=exp();

//session setup

app.use(
    session({
        secret: '1234', // Replace with your own secret key
        resave: false,
        saveUninitialized: true
    })
);

const Authcode="45a67";   //can be changed accordingly,to ensure staff account authentication
app.set('view engine', 'ejs' );
app.use(exp.static("public"));

app.use(bodyparser.urlencoded({extended:true}));

passport.use(new LocalStrategy(
    {
        usernameField: 'Id', 
        passwordField: 'password' 
    },
    async function (Id, password, done) {
        
        try {
            const customer = await Customers.findOne({ Id: Id });

            if (!customer) {
                return done(null, false, { message: 'Incorrect Id.' });
            }

            
            if (!customer.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, customer);
        } catch (err) {
            return done(err);
        }
    }
));


passport.serializeUser(function (customer, done) {
    done(null, customer.Id);
});

// Deserialize user data from session
passport.deserializeUser(function (Id, done) {
    Customers.findOne({ Id: Id }).then(function (customer) {
        done(null, customer);
    }).catch(function (err) {
        done(err, null);
    });
});



app.use(passport.initialize());
app.use(passport.session());


//login and signup functions

app.get("/login",function(req,res)
{
    res.render('login');
});

app.post("/login", passport.authenticate('local', {
    successRedirect: '/', // Redirect  on successful login
    failureRedirect: '/login?error=1',     // Redirect back to login page on authentication failure
}));

app.post("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err); // Handle any errors
            return;
        }
        res.redirect("/login"); // Redirect the user to the login page after successful logout
    });
});


//new accounts
app.get("/signup",function(req,res)
{
    res.render('signup');
});

app.post("/signup",async (req,res)=>{
    console.log(req.body);
    if(req.body.code!=Authcode && req.body.type=="staff")
    {
        let message="Wrong Code";
        res.render('message',{ message});
    }
    else 
    {
        try {
            const usid=await Customers.countDocuments() + 1;
                const newuser = new Customers({
                Id:usid,                                    //saving the details to the database
                name: req.body.name,
                type:req.body.type,
                password: req.body.password,
                phone:req.body.phone,
                address:req.body.address,
                password:req.body.password
            });
            console.log(newuser);
            
            // Save the new user to the database
            await newuser.save();
            const sendconfirm="Account Successfully created,Your User ID is   "+ usid;
            res.render('message',{message:sendconfirm}); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }    
    }

});



function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // If the user is authenticated, continue to the next 
    }
    res.redirect('/login'); // If not authenticated, redirect to the login page
}


app.get("/",ensureAuthenticated,function(req,res)
{
    console.log(req.user.type);
    if(req.user.type=="user")
    {
        res.redirect('/uadd');          //default pages for staff and normal user
    }
    else 
    {
    res.redirect("/orders");
    }
});

app.get("/inventory", ensureAuthenticated,async (req, res) => {
    if (req.user.type == "user") {
        return res.redirect('/uadd');               //ensuring user doesnt get access to this page
    }
    try {
        const tickets = await Ticket.find(); // get all tickets
        
        res.render('inventory', { tickets }); //  render to the inventory page
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/inventory/add",ensureAuthenticated, async (req, res) => {
    const issue = req.body.issue;

    try {
        const nid=await Ticket.countDocuments() + 1;
        // Create a new ticket with the provided issue and status as false
        const newTicket = new Ticket({
            id:nid,
            issue: issue,
            status: false
        });

        // Save the new ticket to the database
        await newTicket.save();

        res.redirect("/inventory"); // Redirect to the inventory page
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/inventory/resolve/:id", ensureAuthenticated,(req, res) => {
    const ticketId = req.params.id;         //using custom routing parameters

    Ticket.findById(ticketId)
        .then(ticket => {
            if (!ticket) {
                return res.status(404).send("Ticket not found");
            }

            // Update the ticket's status to resolved
            ticket.status = true;
            return ticket.save();
        })
        .then(() => {
            res.redirect("/inventory"); // Redirect back to the inventory page
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

app.get("/add", ensureAuthenticated, async (req, res) => {
    if (req.user.type == "user") {
        return res.redirect('/uadd'); // normal user separate page
    }
    // sorted list being prepared to be rendered to the ejs template
    try {
        const menuItems = await Menu.find().sort({ type: 1, cuisine: 1 });
        //item types
        const typesOrder = ["Starter", "Main Course", "Dessert", "Other"];

        const menuItemsByType = typesOrder.map((type) => {
            const typeGroup = { type, cuisines: [] };       
            const typeCuisines = new Set();

            menuItems
                .filter((item) => item.type === type)
                .forEach((item) => typeCuisines.add(item.cuisine)); //sorting by cuisine inside a particular type

            typeCuisines.forEach((cuisine) => {
                const cuisineGroup = { cuisine, items: [] };
                const cuisineItems = menuItems.filter((item) => item.type === type && item.cuisine === cuisine);
                cuisineGroup.items = cuisineItems;
                typeGroup.cuisines.push(cuisineGroup);
            });

            return typeGroup;
        });
        console.log(menuItemsByType);
        res.render("addorder", { menuItemsByType });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/place-order',ensureAuthenticated, async (req, res) => {
    // Retrieve the order details from the form
    const orderDetails = req.body;

    // Retrieve the Customer ID and Table No fields
    const customerId = req.body.customerId;
    const tableNo = req.body.tableNo;
    const itemsArray = [];
for (const key in orderDetails) {
    if (key !== "customerId" && key !== "tableNo" && key !== "totalAmount") {
        const itemId = parseInt(key); // Convert key to an integer
        const quantity = parseInt(orderDetails[key]); // Convert value to an integer

        itemsArray.push({ foodid: itemId, quantity });
    }
}

// Log the received order details, customer ID, and table no
console.log(orderDetails);
console.log('Received order:', itemsArray);
console.log('Customer ID:', customerId);
console.log('Table No:', tableNo);
const orderentry = new Orders({
    Id: await Orders.countDocuments()+1,
    customerId: customerId,
    items: itemsArray,
    table: tableNo,
    amount: parseInt(req.body.totalAmount),
    attended: false,
    paid: false
});

    await orderentry.save();
    res.redirect("orderconfirmed");
});

app.get("/orderconfirmed",ensureAuthenticated,function(req,res){
    if (req.user.type == "user") {
        return res.redirect('/uadd'); // Redirect and finish the execution
    }

    res.render("orderconfirmed");
});

app.get("/orders",ensureAuthenticated,async (req,res)=>{
    if (req.user.type == "user") {
        return res.redirect('/uadd'); // Redirect and finish the execution
    }
    const ordersindb= await Orders.find();      //fetch orders
    res.render('existorders', {ordersindb});
});

app.post("/done/:id/attended",ensureAuthenticated,async (req,res)=>{
    orderId=req.params.id;          //marking the orders as done
    try{
    const updatedOrder = await Orders.findByIdAndUpdate(
        orderId,
        { attended: true },
        { new: true }
    );
    }
    catch(error){
        console.error(error);
    }
    res.redirect('/orders');
});

app.post("/done/:id/paid",ensureAuthenticated,async (req,res)=>{
    orderId=req.params.id;
    try{                //marking as paid
    const updatedOrder = await Orders.findByIdAndUpdate(
        orderId,
        { paid: true },
        { new: true }
    );
    }
    catch(error)
    {
        console.error(error);
    }
    res.redirect('/orders');
});

app.get("/menu", ensureAuthenticated,async (req, res) => {
    if (req.user.type == "user") {
        return res.redirect('/uadd'); // Redirect and finish the execution
    }
    try {
        const menuItemCount = await Menu.countDocuments() ;
        const items = await Menu.find(); // Retrieve all menu items
        console.log(items);
        var mx = 1;
        for (let i = 0; i < menuItemCount; i++) {
        try{
        if (items[i].Id > mx)
            mx = items[i].Id;
        }
        catch(error){
            console.error("Error accessing item at index", i);
            console.error(error);
        }
        }
        mx++;
        
        res.render('menu', { menuItemCount:mx, items });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/menu/new", ensureAuthenticated, function(req, res) {
    //adding new item to the database
    const { Id, name, price, type, cuisine } = req.body;
    const newItem = new Menu({
        Id: Id,
        name: name,
        price: price,
        type: type,
        cuisine: cuisine
    });

    newItem.save()
        .then(() => {
            res.redirect("/menu");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.post("/menu/upd", ensureAuthenticated, function(req, res) {
    //updating menu items price
    const itemId = req.body.itemId;
    const newPrice = req.body.newPrice;
    console.log("update request received");
    Menu.findOneAndUpdate({ Id: itemId }, { $set: { price: newPrice } })
        .then(updatedItem => {
            res.redirect("/menu");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.post("/menu/delete", ensureAuthenticated, function(req, res) {
    const itemId = req.body.itemId;
    //deleting menu items from database
    Menu.deleteOne({ Id: itemId })
        .then(() => {
            res.redirect("/menu");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.get("/reviews",ensureAuthenticated,async(req,res)=>{
    if (req.user.type == "user") {
        return res.redirect('/uadd'); // Redirect and finish the execution
    }
    //fetching reviews
    try {
        const reviews = await Reviews.find(); // get all  reviews
        
        res.render('postfed', { reviews }); //  render 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    

});

app.get("/postreview",ensureAuthenticated,function(req,res){
    res.render('postreview');
});

app.post("/revsend", ensureAuthenticated, async (req, res) => {
    //submitting reviews
    try {
        const userId = req.user.Id;
        const userName = req.user.name;
        const reviewText = req.body.data;

        const newReview = new Reviews({
            userid: userId,
            userName: userName,
            data: reviewText
        });

        await newReview.save();
        res.render("confirmreview"); // Redirect to the reviews page after submitting the review
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get("/userorder",ensureAuthenticated,function(req,res){
    res.render('userorder');
});


app.get("/uadd", ensureAuthenticated, async (req, res) => {
    //ordering interface at user side
    try {
        const menuItems = await Menu.find().sort({ type: 1, cuisine: 1 });

        const typesOrder = ["Starter", "Main Course", "Dessert", "Other"];

        const menuItemsByType = typesOrder.map((type) => {
            const typeGroup = { type, cuisines: [] };
            const typeCuisines = new Set();

            menuItems
                .filter((item) => item.type === type)
                .forEach((item) => typeCuisines.add(item.cuisine));

            typeCuisines.forEach((cuisine) => {
                const cuisineGroup = { cuisine, items: [] };
                const cuisineItems = menuItems.filter((item) => item.type === type && item.cuisine === cuisine);
                cuisineGroup.items = cuisineItems;
                typeGroup.cuisines.push(cuisineGroup);
            });

            return typeGroup;
        });

        res.render("userorder", { menuItemsByType });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



app.post('/place-online', ensureAuthenticated, async (req, res) => {
    // Retrieve the order details from the form
    const orderDetails = req.body;

    // Retrieve the Customer ID and Table No fields
    const customerId = req.user.Id;
    const tableNo = -1;
    const itemsArray = [];
    let deliveryAddress = '';

    // Retrieve the delivery address from the CustomerSchema
    try {
        const customer = await Customers.findOne({ Id: customerId });
        if (customer) {
            deliveryAddress = customer.address;
        }
    } catch (error) {
        console.error(error);
        // Handle error
    }

    // Parse the order details and create the itemsArray
    for (const key in orderDetails) {
        if (key !== "customerId" && key !== "tableNo" && key !== "totalAmount") {
            const itemId = parseInt(key);
            const quantity = parseInt(orderDetails[key]);
            itemsArray.push({ foodid: itemId, quantity });
        }
    }

    // Create a new order entry
    const orderentry = new Orders({
        Id: await Orders.countDocuments() + 1,
        customerId: customerId,
        items: itemsArray,
        table: tableNo,
        amount: parseInt(req.body.totalAmount),
        address:deliveryAddress,
        attended: false,
        paid: false
    });

    try {
        await orderentry.save();
        res.render("orderconuser");
    } catch (error) {
        console.error(error);
        // Handle error
    }
});


app.get("/nutrition/:food",ensureAuthenticated,function(req,res){

    //interacting with the api to get details of a food item
var query = req.params.food;
request.get({
  url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
  headers: {
    'X-Api-Key': apikey
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else {
    console.log(body);
    const data=JSON.parse(body);
    if(req.user.type=="staff")
    {
    res.render('nutrition',{ data:data });
    }
    else 
    res.render('nutritionu',{ data:data });
  }
});
});



app.get("/nutritionsearch",ensureAuthenticated,function(req,res)
{
    //tab for searching nutrition of any general dish from a search box
    console.log(req.user.type);
    if(req.user.type==="staff")
        res.render('nutritionsearch');
    else 
        res.render('nutritionsearchu');
})

app.get("/nutrition1",ensureAuthenticated,function(req,res){

    
    var query = req.query.dish;
    console.log(query);
    request.get({
      url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
      headers: {
        'X-Api-Key': apikey
      },
    }, function(error, response, body) {
      if(error) return console.error('Request failed:', error);
      else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
      else {
        console.log(body);
        const data=JSON.parse(body);
        if(req.user.type==="staff")
        {
        res.render('nutrition',{ data:data });
        }
        else 
        res.render('nutritionu',{ data:data });
      }
    });
    });

app.listen(3000,function()
{
    console.log("Server up");
});