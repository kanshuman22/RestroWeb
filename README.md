# RestroWeb
This is a full stack web application designed by me to manage the day to day operations efficiently in a restaurant . This application also has provision for online booking and interaction between and customers and restaurants , also it concentrates on dine in experience.

Instructions to run the project:

System should have MongoDB installed locally

1)Download the project maintaining the same directory structure <br/>
2)Open the folder in terminal <br/>
3) Run npm install <br/>
4) Run npm i ejs <br/>

**Pre populated database**
You can use this option if you want :You can run the command " mongosh additem.js " to populate the menu and tickets table **Use this only once or else it will lead to multiple items with same id**

4)Run  node app.js <br/>
5)switch to the browser and use the url: localhost:3000  <br/>
6)You can now use the website <br/>
<br/>

# RestroWeb - by Anshuman Kumar

## Problem Statement

The food and hospitality industry is on a rapid growth trajectory, resulting in a surge of customers at restaurants. While online platforms have facilitated a digital presence, delivering a seamless dine-in experience remains crucial. Restaurants, as they expand, face challenges in managing both their online and real-world operations. Real-world issues include order recording, billing errors, misplaced orders, menu management, staff coordination, and inventory management. RestroWeb addresses these challenges, offering innovative solutions for both online and offline operations.

## Project Goals

RestroWeb is designed to provide a comprehensive platform that enhances restaurant efficiency, thereby driving increased revenue. The project seeks to achieve the following goals:

- Efficient order taking for waitstaff.
- Accurate and organized order record-keeping.
- A forum for staff to report inventory issues.
- Streamlined menu management, including item prices.
- Customer feedback and improvement through reviews.
- Effective online order management.
- Quick access to nutritional information for dishes.

## Methodology

RestroWeb serves two types of accounts: normal users and staff members. Staff members use the platform to streamline restaurant operations. Waitstaff use the "Note an Order" tab to easily record orders. The intuitive interface resembles popular food delivery apps, allowing waitstaff to input table numbers and order details for automatic billing. An innovative feature enables one-click access to nutritional information for dishes. The "Existing Orders" tab enables efficient tracking of orders and their statuses. The "Inventory" tab provides a space for staff to report and resolve issues. Customers can post reviews through the "Reviews" tab. The "Nutrition" tab offers nutritional information for each dish.

## Technical Details

Technologies utilized in RestroWeb:

- Frontend: Bootstrap, EJS templating
- Backend: Node.js, Express
- Database: MongoDB
- Libraries: Mongoose, Passport.js for authentication

RestroWeb is a full-stack application with integrated APIs. The frontend employs Embedded JavaScript templating for user interfaces, while the backend is built on Node.js. GET and POST requests facilitate communication between the server and client. Custom routing parameters are used for various operations. MongoDB stores data across four tables: Menu, Reviews, Orders, and Customers. User authentication and sessions are handled through Passport.js.

## Challenges Faced

Designing the "Note an Order" and "Order" pages posed significant challenges. The objective was to display items sorted by type (e.g., Starters, Desserts), with further sorting by cuisine within each type. The interface required +/- buttons for adjusting quantities and automatic cost calculations. Creating an array of order details for server submission added complexity.

These challenges were overcome through complex coding on both the server and frontend. The frontend involved DOM manipulation to achieve features like automatic cost calculation. On the server side, items were grouped and sorted based on their types and subtypes using filters.

---

