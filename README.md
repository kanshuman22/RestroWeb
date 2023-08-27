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

The project aims to provide a powerful platform for restaurants to scale up their efficiency and performance thereby leading them to increase their revenues .
More specifically it helps by :-
Providing easy and efficient way of noting orders for waiters
Keeping record of orders
Providing forum for posting inventory shortcomings
Management of the menu and the item prices
Improvement by enabling customers to post reviews
Providing platform for Online orders
★ Providing nutrition details of the dishes in just a click , a feature that will attract today’s increasing health savyy audience and also helps customers who don’t know about a particular item in menu.
WORKING:
RestroWeb has two types of accounts :normal user and staff
The staff will use the website to enchance the workflow in restaurants.
The waiter can use the website to note orders , by going  to the note an order tab . Here a very user friendly interface is provided similar to apps like Zomato etc. here he enters the table no. and enters the order easily after which the order is registered in the system with automatic billing. Also the interface includes an innovative feature which with just one click the nutritional values can be accessed and shared with customer. 
The existing orders tab can be used to track the orders, which provides user friendly interface to see the unattended , attended, unpaid or paid orders  with the details and mark them paid or attended when done so.
The  inventory tab provides a forum for all the staff to post any shortcomings observed by them ,like a chef may post that a stove is not working etc. It also provides option to mark the posts as resolved and keeps a history of resolved and unresolved issues.
Reviews tab can be used to assess the reviews by customers.
The nutrition tab to search any dish for its nutritional values.
For a normal customer, three tabs are provided one is to enable them post an order and the user friendly interface includes a check nutrition feature(stated earlier), a tab to post their reviews and the nutrition tab similar to the previous one mentioned.

TECHNICAL DETAILS:
Bootstrap,MongoDb , Express , Node js , ejs templating ,  mongoose  and other libraries were used.
The project is a full stack project  with API also being used in it.
Embedded Javascript templating was used to manage the frontend.
Node js was used for backend. POST and GET requests were used to communicate to the server according to the functionality. Server would reply back with the data or perform any needed operations.
Custom routing parameters were also used for various operations.
MongoDB was used for database. Four tables were used :
Database name : RestroWebdb
Menu : To store the items and the details
Reviews :To  store the details of the reviews posted by the customers
Orders: To store the order details
Customers: This was used to store the details of the users( 2 types of users distinguished by the attribute:type  - “staff” or “user”)
User Authentication and session also integrated with the help of Passport js.
It was ensure through it that the normal accounts don’t get access to pages for staff.
Mostly Bootstap was used for designing the webpages and giving it user friendly interface.
A very interactive interface was created instead of the conventional enter id etc…
API  was used for the nutrition details


