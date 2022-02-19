# Description

Bidify is an online auction platform where users can buy antiques by participating in bids. Participants bid openly against one another, with each subsequent bid required to be higher than the previous bid and the minimum bid amount. Participants have the option to configure an auto bidding bot and enable auto bidding on a particular item or multiple items to carry out bids in their favour whenever another user outbids them.


# Project goal
Build a high-performance, smooth-running online bidding platform for convenient bidding of antiques.


# Project timeframe
48 to 72hrs


# Technology Stacks

* React Js
* Node Js
* JavaScript
* MongoDB
* Express


# Libraries

* Axios - Making HTTP requests
* Formik and yup - form validation
* Material UI - Icons
* React countdown timer - Implementing a countdown for each listed item
* React router dom - routing in between components
* Socket.io - real-time notification alert whenever a user reaches auto-bidding limit
* Cors – resource sharing across different domains
* Helmet – secure your Express apps by setting various HTTP headers
* Morgan - simplifies the process of logging requests to the application
* Dotenv – storing sensitive information before committing to github


# Project tasks

### Home Page
The first page the user is navigated to after logging in to the system. The user can see the list of  existing antiques displayed for auction 
  
  
### Item Details Page
The Item Details page gives a brief description of the item and displays a countdown timer showing  how much time is left before the bidding is closed
  
  
### An auto-bidding feature
The ability to activate auto-bidding. The next time someone else makes a bid on the marked item, the  bot should auto outbid them +1.
  
  
### Auto bidding configuration page
A user can configure a maximum amount and a percentage threshold, i.e., a percentage of the  maximum amount at which, auto-bidding stops, and a notification alert 		 is sent to the user.



# Solution



# Backend Process
* Initializing express server
* Connecting to MonogoDB
* Importing all third party libraries and configuring routes
* For Routing, see server-side/Routes

![Screenshot (81)](https://user-images.githubusercontent.com/93955657/154769720-0cf0278f-4b84-49f4-bba1-1bc9197d2684.png)


# Defining the Structure of Bidify Database (Schema)

* Product Schema alias ListedPrductSchema

![Screenshot (83)](https://user-images.githubusercontent.com/93955657/154770010-5399632b-b6cb-484b-a1e2-05ed3087d5b9.png)


* Configuration Schema  alias AutoBids

![Screenshot (82)](https://user-images.githubusercontent.com/93955657/154769411-fbe8d0d5-e5dc-4512-8568-3ac024b582cc.png)


# Pages

## Simple Login Page
This login page has 3 login options;

* Login with your fullname and a dummy password
* Login as Jon Snow (hard coded)
* Login as Jane Doe (hard coded)

Once a user logs in, the users information is stored in the localStorage and later accessed in multiple components with localStorage.getItem() method



![Screenshot (91)](https://user-images.githubusercontent.com/93955657/154771697-9b753df2-3a5c-4501-81d1-7b19472cb3f8.png)




## Homepage

Displays items in auction


![Screenshot (84)](https://user-images.githubusercontent.com/93955657/154770438-3a4a9f51-1e39-4dfd-8d49-1cf0ca330324.png)



## Notification Tab

Displays notification alert


![Screenshot (98)](https://user-images.githubusercontent.com/93955657/154775720-185e7917-ae78-42df-8a5a-3800f90c9b4e.png)




## Product Detail Page


![Screenshot (87)](https://user-images.githubusercontent.com/93955657/154771053-524acb53-bc24-4e33-a902-e68b850bf9c0.png)




## Submit Bid Amount Page

* Verifies the bid amount exceeds the previous bid or minium bid amount
* If condition is not met, a UI will be rendered. Displaying Error


![Screenshot (93)](https://user-images.githubusercontent.com/93955657/154774821-763f9a0b-62ba-4606-8548-c7a5730a32ca.png)



## Enable Auto Bid Check Box

* If checked , the bot verifies that auto-bid is configured for the User
* If auto-bid is configured, 
* The check box thicks blue, indicating auto-bid is configured
* Else if auto-bid is not configured, User is redirected to the auto-bid configuration settings page
* After setting and saving configuration, User is redirected back to the product detail page where User can check the box


![Screenshot (96)](https://user-images.githubusercontent.com/93955657/154775218-5b1b5e06-500c-4873-8b8b-d7ed01547271.png)



## Auto Bidding Configuration Page

### Attributes

* Maximum bid amount
* percentage of the maximum bid amount at which auto-bidding stops and user gets notified



![Screenshot (89)](https://user-images.githubusercontent.com/93955657/154771261-18ba7925-0ba0-4e11-b189-3d8961123d6e.png)





# How the auto-bidding bot works

### Given User1 = Jon Snow and User2 = Jane Doe

### Lets assume User1 has configured auto-bidding setting and enabled auto-bidding on a particular Item or multiple items

### Whenever User2 places a bid,

* The bot makes a GET request to our database and fetches all configurations/Autobids
* Then it filters User2's configuration out of the response
* The bot iterates through the result and verifies that User1 has "deductible" left or "deductible" > 0

## NB: Deductible = Minimum percentage configured X Maximum amount configured

### If there are still some deductible

* Continue the iteration and get the fullname of User1 
* Add +1 to the previous bid amount and Update the array of bidders in the product object

### Else if deductible < 0

* The bot stops auto bidding and sends a notification to User1



# Deployment

Application is hosted by heroku at https://bidify-auction-hub.herokuapp.com/











