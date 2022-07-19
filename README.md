Smart To Do List
=========

The Smart To Do List is a self sorting to do list where a user can enter a keyword/task and the app will sort that keyword/task into one of 5 categroies: Restaurants/Cafes, TV and Movies, Books, Products, and Uncategorized.

The app currently does this by using the wikipeida API to return the page with the title of the keyword. It then cross references this page with a database of synonyms for each category and returns the correct category.

Users can add, complete, delete and edit tasks. They can also view tasks per category on a seperate page. 

## Login
![image](https://user-images.githubusercontent.com/80222250/139961316-9f2cf2d0-fee7-4b99-ae1b-5ba287cf6ea3.png)

## Main Page

![image](https://user-images.githubusercontent.com/80222250/139961307-75cf4db7-1851-4e8f-8f89-ae0f04325fc2.png)

## Category Page
![image](https://user-images.githubusercontent.com/80222250/139961340-be05f07e-8042-4c5e-a0f7-b9784f9fc657.png)

##Setup
Install dependencies with npm install.

### Dependencies
    "bcryptjs": "^2.4.3",
    "chalk": "^2.4.2",
    "cookie-parser": "^1.4.5",
    "cookie-session": "^1.4.0",
    "cross-fetch": "^3.1.4",
    "dotenv": "^2.0.0",
    "ejs": "^2.6.2",
    "express": "^4.17.1",
    "morgan": "^1.9.1",
    "node-fetch": "^3.0.0",
    "pg": "^8.5.0",
    "pg-native": "^3.0.0",
    "require": "^0.4.9",
    "sass": "^1.35.1"
    
    
