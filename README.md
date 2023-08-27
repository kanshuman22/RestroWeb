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

## PROJECT REPORT
## RestroWeb- by Anshuman Kumar
## PROBLEM STATEMENT:
The food and hospitality industry is increasing at a tremendous speed. As a result restaurants are witnessing an increase in the no. of customers. Online  modes are important but a flawless dine in experience is also something which customers lookout for. Restaurants have food delivery apps to help them somewhat create an online presence but as the business gets bigger ,things become harder to manage . Especially out of the online world , in the real world also  restaurant operations face challenges like keeping record of the orders, billing errors, misplaced orders , menu management , staff co-ordination and inventory issues management .RestroWeb addresses these problems along with online functions .especially it addresses the real world problems which makes it standout as this space is where its innovation lies as this space has not been addressed before.

## PROJECT GOALS:
The project aims to provide a powerful platform for restaurants to scale up their efficiency and performance thereby leading them to increase their revenues .
<br/>More specifically it helps by :-
<br/>Providing easy and efficient way of noting orders for waiters
<br/>Keeping record of orders
<br/>Providing forum for posting inventory shortcomings
<br/>Management of the menu and the item prices
<br/>Improvement by enabling customers to post reviews
<br/>Providing platform for Online orders
<br/>★ Providing nutrition details of the dishes in just a click , a feature that will attract today’s increasing health savyy audience and also helps customers who don’t know about a particular item in menu.
## METHODOLOGY:
<br/>RestroWeb has two types of accounts :normal user and staff
<br/>The staff will use the website to enchance the workflow in restaurants.
<br/>The waiter can use the website to note orders , by going  to the note an order tab . Here a very user friendly interface is provided similar to apps like Zomato etc. here he enters the table no. and enters the order easily after which the order is registered in the system with automatic billing. Also the interface includes an innovative feature which with just one click the nutritional values can be accessed and shared with customer. 
<br/>The existing orders tab can be used to track the orders, which provides user friendly interface to see the unattended , attended, unpaid or paid orders  with the details and mark them paid or attended when done so.
<br/>The  inventory tab provides a forum for all the staff to post any shortcomings observed by them ,like a chef may post that a stove is not working etc. It also provides option to mark the posts as resolved and keeps a history of resolved and unresolved issues.
<br/>Reviews tab can be used to assess the reviews by customers.
<br/>The nutrition tab to search any dish for its nutritional values.
<br/>For a normal customer, three tabs are provided one is to enable them post an order and the user friendly interface includes a check nutrition feature(stated earlier), a tab to post their reviews and the nutrition tab similar to the previous one mentioned.

## TECHNICAL DETAILS:
<br/>Bootstrap,MongoDb , Express , Node js , ejs templating ,  mongoose  and other libraries were used.
<br/>The project is a full stack project  with API also being used in it.
<br/>Embedded Javascript templating was used to manage the frontend.
<br/>Node js was used for backend. POST and GET requests were used to communicate to the server according to the functionality. Server would reply back with the data or perform any needed operations.
<br/>Custom routing parameters were also used for various operations.
<br/>MongoDB was used for database. Four tables were used :
<br/>Database name : RestroWebdb
<br/>Menu : To store the items and the details
<br/>Reviews :To  store the details of the reviews posted by the customers
<br/>Orders: To store the order details
<br/>Customers: This was used to store the details of the users( 2 types of users distinguished by the attribute:type  - “staff” or “user”)
<br/>User Authentication and session also integrated with the help of Passport js.
<br/>It was ensure through it that the normal accounts don’t get access to pages for staff.
<br/>Mostly Bootstrap was used for designing the webpages and giving it user friendly interface.
<br/>A very interactive interface was created instead of the conventional enter id etc…
<br/>API  was used for the nutrition details

## CHALLENGES FACED
<br/>One of the big challenges faced were the note an order page( “staff” accounts) and order page(“user” accounts).
The challenge mainly lied in ensuring that I display the items sorted in types(ex. Starters, dessert, etc.) and within the type  the items are sorted according to the cuisines ,along with it the interface including +/- buttons to adjust the quantities. To make things more complex the automatic cost totalling feature also had to be implemented. Then It was also needed to create an array of pairs to be sent to the server to register the order which also made it more challenging.
<br/>However this challenge was overcome by complex code on server side and on the frontend .The DOM was used on frontend to solve problems like totalling. 
On server side items were divided and sorted according to their groups and sub groups. These were however bit tricky to implement. Basically I assigned preference in the usual order( ex. Starter first) and then grouped them then I used the Filter function .





 

