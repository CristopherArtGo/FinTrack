# FinTrack

# Description

This is a desktop application that serves as a personal finance tracker. It is my final capstone project during my training at Village88. It was build on Electron JS with a separate Ruby on Rails backend API. Project was finished in 7 days.

Video Demo: https://www.youtube.com/watch?v=y7Z_bEhuMwk

# Tools and Technologies
* Bootstrap
* NodeJS
* ExpressJS
* ElectronJS
* Ruby on Rails
* SQLite
* AJAX

# Features
1. Users can register and login to the application
2. Users dashboard
4. Users can create accounts and wallets
5. Users can create transactions with categories
6. Users can create budget for each category
7. Users have a personal calendar to track financial events

# Database Design:
![Thumbnail](https://github.com/CristopherArtGo/FinTrack/blob/main/Initial%20ERD.png)

# Clickable Prototype
Start Here --> https://htmlpreview.github.io/?https://raw.githubusercontent.com/CristopherArtGo/FinTrack/main/clickable_prototype/register.html

## Installation

1. Clone the project to local device
2. In the terminal, start the node server by running the following:
```
    cd node_server
    nodemon app.js
```
3. On a separate terminal, start the rails server by running the following:
```
    cd rails_server
    rails s
```
4. Finally run the FinTrack app by openning another terminal and run the following:
```
    cd FinTrack_app/src
    npx electronmon index.js
```

## Contributors

[//]: contributor-faces

<a href="https://github.com/CristopherArtGo"><img src="https://avatars.githubusercontent.com/u/83489224?v=4" title="Cristopher Art Go" width="80" height="80"></a>

[//]: contributor-faces