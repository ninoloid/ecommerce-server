# ECOMMERCE SERVER #

## TESTING ##
    NODE_ENV=testing ('template for config.json included')
      
      export NODE_ENV=testing

      sequelize db:create

      sequelize db:migrate
    
      sequelize db:seed:all (this seeding is for input the product category)
    
      npm run test

## Base URL : ##
    https://whispering-fortress-65821.herokuapp.com
    localhost:3000

## USER ROUTE ## 

    POST '/register'

    Data :
      username : string
      email : string
      password : string

    Response :
      201 : Token, Username
      400 : Validation Error
      500 : Internal Server Error


    LOGIN '/login'

    Data :
      userIdentification (username or email) : string
      password : string

    Response :
      200 : Token, Username
      400 : Validation Error
      400 : Invalid Username, Email, or Password
      500 : Internal Server Error


    GET '/showUsers'
    
    Response :
      200 : User list
      500 : Internal Server Error

    
    PATCH '/updateAdmin/:id

    Params :
      Admin ID : integer
    
    Data :
      isActivated : boolean

    Headers :
      access_token

    Response :
      200 : 'Admin account updated successfully'
      403 : 'This page can only be accessed by registered users, please login first'
      403 : 'This page can only be accessed by super admin. You're not!'
      500 : Internal Server Error
    

    DELETE '/deleteAdmin/:id

    Params :
      Admin ID : integer

    Headers :
      access_token

    Response :
      200 : 'Admin account deleted successfully'
      403 : 'This page can only be accessed by registered users, please login first'
      403 : 'This page can only be accessed by super admin. You're not!'
      500 : Internal Server Error


    PATCH '/updateUserPassword/:id

    Params :
      User ID : integer
    
    Data :
      newPassword : string

    Headers :
      access_token

    Response :
      200 : 'User password updated successfully'
      403 : 'This page can only be accessed by registered users, please login first'
      403 : 'Sorry, your admin account isn't activated yet'
      500 : Internal Server Error
    

    DELETE '/deleteUser/:id

    Params :
      User ID : integer

    Headers :
      access_token

    Response :
      200 : 'User deleted successfully'
      403 : 'This page can only be accessed by registered users, please login first'
      403 : 'Sorry, your admin account isn't activated yet'
      500 : Internal Server Error

<br>

## PRODUCT ROUTE ##

    POST '/product'

    Data :
      name : string
      description : string
      CategoryId : integer
      price : integer
      stock : integer
      imageUrl : string, get url from aws upload middleware and multer

    Headers :
      access_token

    Response :
      201 : 'Product added to the database'
      403 : 'This page can only be accessed by registered users, please login first'
      403 : 'Sorry, your admin account isn't activated yet'
      500 : Internal Server Error

      
    GET '/product'

    Response :
      200 : Product list
      500 : Internal Server Error


    GET '/product/:id'

    Params :
      Product ID

    Response :
      200 : A single product
      500 : Internal Server Error


    PUT '/product/:id'

    Data :
      name : string
      description : string
      CategoryId : integer
      price : integer
      stock : integer
      imageUrl : string, get url from aws upload middleware and multer

    Params :
      Product ID
      
    Header :
      access_token
    
    Response :
      200 : 'Product updated successfully'
      403 : 'This page can only be accessed by registered users, please login first'
      403 : 'Sorry, your admin account isn't activated yet'
      500 : Internal Server Error


    DELETE '/product/:id'

    Params :
      Product ID
      
    Header :
      access_token
    
    Response :
      200 : 'Product updated successfully'
      403 : 'This page can only be accessed by registered users, please login first'
      403 : 'Sorry, your admin account isn't activated yet'
      500 : Internal Server Error

<br>

## CART ROUTE ##

    POST '/cart'

      Data :
        UserId : integer
        ProductOd : integer
        quantity : integer

      Headers :
        access_token

      Response :
        200 : 'Product added to cart successfully'
        403 : 'This page can only be accessed by registered users, please login first'
        500 : Internal Server Error

      
    GET '/cart/:id'

      Params :
        User ID

      Headers :
        access_token

      Response :
        200 : List of product on the cart
        403 : 'This page can only be accessed by registered users, please login first'
        500 : Internal Server Error

    DELETE '/cart/:id'

      Params :
        User ID

      Headers :
        access_token

      Response :
        200 : List of product on the cart
        403 : 'This page can only be accessed by registered users, please login first'
        500 : Internal Server Error