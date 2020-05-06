Tools and Dependancies for documentation:
---
* HTML
* CSS
* BootStrap
* Node Pakage Manager(npm)
* JavaScript
* TypeScript
* Git
* GitHub
* MongoDB
* Express
* Heroku 


Front-end Implementation:
---

All of our front-end code is located in the folder client. With in the Client folder, we created a sub folder, Assets, in which we kept our CSS and images. We also created all of the neccessary HTML files with in the Asset folder. The first file created was index.html. This file is the main page and holds link to all of the other necessary pages. We have used bootstrap so that our application is mobile friendly. We also created home.css that holds additional styling for the home page. This file is imported in the link tag in the beggining of index.html. This home page has links to the different restaurents. 

Similarly we have created three additional pages gss.html,ssb.html and sam.html. These file have similar functionalities to the index.html. We have used bootsrap as well as css code located in the assests/css folder. 

Each of these three files have links to it's staff.html whiich hold functionality of input text with buttons. 

Lastly we have created cliendSsb.js file which interacts with the HTML, and using the id's to connect the back-end functionaly to out front end.



Back-end Implementation:
---

Our back-end code is located in the folder server. We are using express for our routing. In the myserver-routing.ts has all of the routings and the necessary functionality of the CRUD fundtions. Like how to read, write, update and delete from our database. We are using the helper funtions from the mongo-database.ts to achive our CRUD funtionalities. 


Database Implementation:
---

We are using mongo data-base. We created our database and stored the password in secure.json. We add secure.json to the .gitignore file in order to keep our password secure. Ths database is used by the server in myserver-routing.ts. We handle all of our collections in this file. Like adding items to our restaurents, updating and deleting. We used functionalities such as isFound in order to avoid duplication when getting or deleting an item.


Deployment:
---

We have deployed our app to Heroku. We created an account with Heruku. Then we created a URL that we host our application.  First we have to convert all of the typescript to javascript. Then we added all of our files to Heroku. 

