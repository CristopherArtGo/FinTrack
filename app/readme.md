# AJAX Sports Players

This web appication is using Node.JS with a custom Express MVC Framework and using MySQL as the database.


# Custom Express MVC

- Server file is the `app.js`
- Configurations can be found in `config.js`, the custom profiler can be turned on or off within this file
- Routes can be set up in the `routes.js`
- Libraries can be found under the *libraries* folder
- Models can be found under the *models* folder, naming convention is singular
- Views can be found under the *views* folder, naming convention is based on the controller, partials are inside a subfolder named *partials*
- Controllers can be found under the *controllers* folder
- Static files can be found under *assets* folder, usually contains the CSS, JS and images

# Features 

- The web application shows the list of players
- User can filter the players based on the categories in the form
- AJAX has been implemented for the filtering logic