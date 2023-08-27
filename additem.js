// MongoDB connection details
const MongoDBHost = "localhost";
const MongoDBPort = 27017;
const MongoDBDatabase = "RestroWebdb";

// Menu items to insert
const menuItems = [
    { Id: 1, name: "Chicken Tikka", price: 100, type: "Starter", cuisine: "Indian" },
    { Id: 2, name: "Fried Chicken", price: 200, type: "Starter", cuisine: "American" },
    { Id: 3, name: "Gulab Jamun", price: 50, type: "Dessert", cuisine: "Indian" },
    { Id: 4, name: "Paneer Butter Masala", price: 120, type: "Main Course", cuisine: "Indian" },
    { Id: 5, name: "Paneer Butter Masala", price: 120, type: "Main Course", cuisine: "Indian" },
    { Id: 6, name: "Noodles", price: 110, type: "Main Course", cuisine: "Chinese" },
    { Id: 7, name: "Chocolate Brownie", price: 50, type: "Dessert", cuisine: "American" }
    
    
    
];

const ticketItems = [
    {
        issue: 'Exhaust Fan in the kitchen not working properly',
        status: true
    },
    {
        id: 2,
        issue: 'Table 20 broken',
        status: true
    },
    {
        id: 3,
        issue: 'New microwave needed',
        status: true
    },
    {
        id: 4,
        issue: 'Wheat stock finishing soon',
        status: false
    },
    {
        id: 5,
        issue: 'Need new Pans',
        status: false
    },
    {
        id: 6,
        issue: 'AC near Table 5 not working',
        status: true
    }
];

// Connect to MongoDB
const connectionStr = `${MongoDBHost}:${MongoDBPort}/${MongoDBDatabase}`;
const db = connect(connectionStr);

// Insert menu items
try {
    db.menus.insertMany(menuItems);
    print("Menu items added successfully.");
} catch (error) {
    print("Error: Failed to add menu items.");
    printjson(error);
}

try {
    db.tickets.insertMany(ticketItems);
    print("Ticket items added successfully.");
} catch (error) {
    print("Error: Failed to add ticket items.");
    printjson(error);
}

// Exit
quit();
