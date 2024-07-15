Food Delivery Application

Problem Statement:
    "FOODIEDELIGHT" is a food delivery application. As part of this app, you need to build functionalities
    that help manage different restaurants and their menus. This will require a frontend/backend solution.

Requirements:
    Functional requirement:
        1. Restaurant admin can log in to the portal.
        2. Add a new restaurant to the platform.
        3. Modify a restaurant's details on the platform.
        4. Delete a restaurant from the platform.
        5. List the restaurants on the platform.

    Non functional requirement:
        1. The app should be responsive.
        2. Implement required validations.
        3. Able to handle errors properly.
        4. The UI should look simple.

HLD
    Frontend: 
        React + TypeScript for building UI components.
    Backend: 
        JSON mock server for mock API.
    Authentication and Authorization: 
        JWT token-based system.
LLD
    User Authentication:
        Admin can log in with valid credentials.
        Use JWT tokens for authentication and authorization.
    Dashboard:
        Admin can see the number of restaurants and their details.
    Restaurant Management:
        Add Restaurant: 
            Admin can add new restaurants with all the required details.
        List Restaurants: 
            Admin can view a list of all restaurants.
        Update Restaurant: 
            Admin can update details of existing restaurants.
        Delete Restaurant: 
            Admin can remove a restaurant from the platform.

Schema
    cuisine
        id (primary key)
        name
        createdAt
        updatedAt

    foodType
        id (primary key)
        name
        createdAt
        updatedAt

    restuarant:
        name
        description
        cuisine
        location
            latitude, longitude
            address
                street name,
                city,
                state,
                country,
                zipcode        
        contacts
            primary
                mobile,
                email
            secondary
                mobile,
                email
            website
        menuItems
            menu
                name,
                description,
                cuisine,
                type,
                price,
                tags
        status
        tags
        createdAt
        updatedAt

Sequence:
    Admin -> React Frontend -> Authentication -> Restaurant Service -> JSON Mock API -> Database

                

        