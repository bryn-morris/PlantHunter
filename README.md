/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
///////////////////////              Phase 4 ReadMe Template
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////



# PlantHunter

## Introduction
This is a full-stack React Native application that I started development of in Phase-5 of Flatiron School's Full Stack Software Engineering Program.

This program is designed to help users identify and record the various plants that they come across, and share those comments with each other! 

Basic user stories include:
1. View plant information associated with a user in the PlantIndex
2. Taking photos of and leaving comments on plants 
3. View comments that other users have left on plants
4. Creat, update, read, and delete observations that a user has made
5. Earn Badges based on a variety of different conditions around the observations that users make **

##################################################################################################################################


## Languages & Frameworks
Python
SQLAlchemy, Flask
JavaScript
React Native

##################################################################################################################################

Python
SQL

## Component Hierarchy

### App
### Main
### Loggies -> Login -> Signup
### Opening Page
### App Container
#### IndexStack
##### 
#### Profile Stack
##### My Profile
##### New Observation
#### Compendium
<!-- => The following section describes each program component and its functionality

This project was created with Create React App.
To start the app in development mode, run npm start. Then open http://localhost:4000 in your browser.
After starting the app, you will be taken to the login page. -->

##################################################################################################################################

<!-- Users can "log in" to the program by entering their cAsE SeNsItIvE information upon entering the program

Users are given a main menu from which to execute three main actions:
Booking a new vacation, viewing/managing current vacations and profile, and exploring.

1. Booking a vacation
   User is able to enter their desired start and end dates, and are presented with all properties available during the desired dates. User can choose to view any property in greater detail before deciding to book. User can decide to book the vacation, and will sign a "log" with the reason for their stay. Vacation will persist to database, and the user can view their newly booked vacation in their personal profile.

2. Browse/ Explore
   User may choose to explore all the different properties that out service currently has available to customers! User may browse and gain inspiration for a trip prior to booking their own travel plans. User can look at previous traveler's that have stayed in a particular domicile, and their reason for their stay.

3. View / Update
   User may manage their own personal information and manage travel plans. User name and/or location may be changed at any time. They can also view all travel reservations that have been booked through Flats after Flatiron, both previous and future reservations.

Life happens! We do allow users to reschedule or cancel plans if the need arises. However, reservations are first-come first-serve. If someone else already has a reservation for a particular domicile, those dates are unavailable. The user may instead choose a different date OR perhaps another domicile might be available.

We also offer free cancellation. Users may need to cancel their travel plans. If the need arises, we understand.

=> The following section describes each program component and its functionality -->

#### CLI FUNCTIONS

<!-- def START()

Our start() function is called at the instantiation of a new instance of the CLI class. It displays a main menu, welcoming the user to our program and displaying ASCII art of one of our properties. Moreover, it prompts the user to either book, view/update their profile, or browse the list of properties. It also contains functionality to allow our user to return to the title menu(where they can log in as a different user) or navigate back to the main menu.

def TRAVELER()

This function serves as our basic login validation. It checks to see if the user is already in our database (requiring the exact name and city), and assigns the instance of our CLI class an attribute associated with that traveler in the database. If the user's information does not appear in the database, we create a new instance of the Traveler class and commit it to our database.

def BOOK()

The book() function in our CLI file allows a user to book a new vacation. Upon being called, it prompts the user to enter a start and end date for their new trip. The function has validation in place to ensure that the dates are valid and that their end date is after the start date. Based on their entries, we then display a list of domiciles that are available in their time range. We then allow the user to see the details of an available property by prompting them to enter the number of a property in the enumerated list. Once the details are displayed, the user is asked whether or not they would like to book their reservation. If they decide to book, the user signs the log book for the property and prompts them to give a reason for the visit. Once this is completed, they receive a confirmation message and their new vacation is added to the database. Otherwise, they are sent back to the list of properties where they can choose another or return to the main menu.

def VIEW_UPDATE()

Our view_update() function is a way for the user to see the information about their profile. It displays they entered at the start of the program as well as any vacations associated with that user. Provided the user has vacations to edit, we then prompt the user for input asking them whether or not they would like to edit a vacation. If the user agrees to edit, we allow them to specify which vacation they would like to update or delete. We then prompt them to enter 'U' to update said vacation, or 'D' to delete. If the user decides to update, we prompt them to enter 1, 2, or 3 to update the start date, end date, or domicile of their chosen vacation. If the user would like to edit a date, we have date validation in place to ensure that their new date does not conflict with any existing vacations for that domicile. If the user decides to edit a domicile, we display a list of domiciles that have availability during their current vacation dates and prompt them to enter the number of a domicile they would like to visit instead.

def BROWSE()

Upon being called, our CLI Browse() function will display a list of all the properties in the database. The function will then prompt the user for input, asking them to specify the number of a property in the enumerated list. Depending on their selection, they will be able to see the details of that property. The function then asks for more user input, asking them to enter 'B' to display past bookings for the property or 'M' to return to the main menu. -->

### Authentication:
<!-- Enter your username and password to access the home page.
If you need to sign up, click "Don't have an account? Create one!" on the home page to open the sign-up form. -->

##################################################################################################################################

### Navbar
<!-- There is a navbar at the top of the page that allows users to easily switch between each feature on the application. -->

##################################################################################################################################

### Home Page & Checking-in/out
<!-- On the home page, you can check in to the park you have arrived at by clicking the big green paw. You'll see a check-in modal with drop-downs of dog parks, dogs, and estimated length of stay. Select your choices, and you'll be checked in to the park you choose. There is also an option to cancel the check-in if it was done by mistake. Once your visit is finished, click the green paw to see the check-out modal. -->

##################################################################################################################################

### Dog Parks
<!-- In the navbar users can click on the dog parks tag to be taken to a  list of dog parks that are already registed in the app. Clicking on a dog park image will flip it to show information about the amenities and address of the dog park they are interested in. Users can also click the reviews in the bottom left hand corner of each dog park card to see a modal containing the reviews that each dog park has.
Users can also add a dog park, and add reviews. If incorrect information is entered on the image, or rating of a dog park the users will see an alert telling them what was entered wrong and the information needed to fix it. -->

##################################################################################################################################

### About Us
<!-- The About Us page contains a description of the app and our goals. If you click on the dog treat at the top of the page, you'll be redirected to dog mode. The text on the page will change so that your dog can read about the app too, and "Who Let the Dogs Out" will play. -->

##################################################################################################################################

### My Account
<!-- On the My Account page, you can see the information on the dogs you have registered on your account. You can add new dogs or edit dogs that are already registered. If you choose to add or edit a dog, you'll be presented with a modal and can choose what information you want to change or a form to add a new dog. -->

##################################################################################################################################

### MODELS
<!-- Our models file contains the following 5 models which constitute the framework for our project.db tables.
Each table in our database contains a primary key represented by an id.
The individual properties of each table are listed below:

1. User
- username: string
- image: user's avatar as string
- password: string(hashed)

2. Dog
- name: string
- breed: string
- weight: integer
- age: integer
- image: dog's photo as string
- user_id: interger, foreign key

3. Visit
- length_of_stay: (estimated by user) integer
- dogs_id: integer, foreign key
- dog_parks_id: integer, foreign key
- actual_length_of_stay: integer

4. Dog_Park
- name: string
- address: string
- rating: integer between 1-5
- amenities: string
- image: dog park photo as string

5. Reviews
- name: The start date of the vacation represented as a datetime
- comment: The end date of the vacation represented as a datetime
- rating: The reason for the vacation represented as a string
- dog_park_id: A foreign key representing the id of the traveler associated with the vacation

Dog can have many Visits and can have many DogParks through Visit. DogPark can have many Vitits and can have many Dogs through Visit. Visit belongs to both Dog and DogPark. User can have many Dogs. DogPark can have many Reviews.
    User -----< Dog -----< Vist >----- DogPark -----< Reviews -->

##################################################################################################################################

Our models file contains the following three models which constitute the framework for our project.db tables.

Each table in our database contains a primary key represented by an id and inherits from our Base class.

The individual properties of each table are listed below:

1. Domicile

- name: The name of the domicile represented as a string
- dest_location: The location of the domicile represented as a string
- sleep_capacity: The sleep capacity of the domicile represented as an integer
- local_amenities: The local amenities of the domicile represented as a string
- property_type: The property type of the domicile represented as a string

2. Travler

- first_name: The first name of the traveler represented as a string
- last_name: The last name of the traveler represented as a string
- location: The location of the traveler represented as a string

3. Vacation

- start_date: The start date of the vacation represented as a datetime
- end_date: The end date of the vacation represented as a datetime
- rsn_for_visit: The reason for the vacation represented as a string
- Traveler_id: A foreign key representing the id of the traveler associated with the vacation
- Domicile_id: A foreign key representing the id of the domicile associated with the vacation

Domiciles can have many vacations. Travelers can have many vacations. Vacation belongs to both Traveler and Domicile.

    Traveler -----< Vacation >----- Domicile


### SEED

Seed Data generated for database using Faker and Random;
Each time seed data is re-run, old data is first cleared from the database and new data is generated and populates the database.

8 Travelers: - first name: randomly generated - last name randomly generated - location: randomly generated city

8 Properties: - property type: randomly selected choice from a property list - property name: randomly selected based on random choice associated with property type - sleep capacity: randomly selected based on range associated with property type - location: randomly generated city - local amenities: randomly selected choice from an amenities list

16 Vacations: - start date: randomly selected between 2021-01-02 and 2024-12-31 - end date: corresponds to a start date, set to be a number of days after its start date, where the number of days is randomly selected from a range of 2 - 40 days. - traveler: randomly assigned to a traveler instance in the Traveler table - domicile: randomly assigned to a domicile instance in the domicile table - reason for visit: randomly selected choice from a curated reasons list

## Flask
The backend methods are built using Flask Restful. Various CRUD functionality for each class defined below. 

1. Dogs:
- create
- read
- update
- delete

2. Users:
- create

3. DogParks
- create
- read

4. Visits
- create
- update

5. Reviews
- create
- read

##################################################################################################################################

### DATABASE
We set up our datbase using SQLalchemy, Flask, and seed.py for customized data. We took advantage of SQLalchemy's relationship, backpopulates, and association_proxy to create relationships between models in our database. We used Flask-Alembic to manage our migration versions.

##################################################################################################################################

We set up our datbase using SQLalchemy and Alembic. We took advantage of SQLalchemy's relationship, backref, and association_proxy to create relationships between models in our database. We used Alembic to manage our migration versions.

### HELPERS

welcome_images = a tuple storing ASCII art representing several different domiciles st which one might choose to stay. This tuple is used in the CLI script to display one ASCII art piece at random when a user begins the program.

### DEBUG

This debug is a sandbox file used only for the purposes of debugging and query selection