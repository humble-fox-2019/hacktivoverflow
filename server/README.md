# Hacktivoverflow

## API Documentation

All endpoints can be access on:

```javascript
http://localhost:3000
```

* [User](#users)
  * [Sign Up](#sign-up)
  * [Sign in](#sign-in)
* [Question](#question)
  * [Create](#create)
  * [Read](#read)
  * [Update](#update)
  * [Delete](delete)
  * [Add Vote](#add-vote)
  * [Down Vote](#down-vote)
* [Answer](#answer)
  - [Create](#create-answer)
  - [Read](#read-answer)
  - [Update](#update-answer)
  - [Delete](delete-answer)
  - [Add Vote](#add-vote-answer)
  - [Down Vote](#down-vote-answer)
* [Another Error](#another-error)



## Users

+ ### Sign Up

  Method : `POST`<br>Endpoint: `/users/signup`

  ### _Request_ :

  * body:

    ```javascript
    {
        name: String (required),
        email: String (required, unique),
        password: String (required),
        image: Image (optional)
    }
    ```

  

  ###  _Response_ :

  - 201 (Created)

    ```javascript
    {
        token: "{your token}",
        payload: {
            _id:: "{your id}" 
            name: "{your name}",
            email: "{your email}"
        }
    }
    ```

  * 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Name field is required", 
            "Email field is required", 
            "Password field is required"
        ]
    }
    ```

    

+ ### Sign In

  Method : `POST`<br>Endpoint :  `/users/signin`

  ### _Request_ :

  * Body :

    ```javascript
    {
        email: String (required),
        password: String (required)
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        token: "{your token}",
        payload: {
            name: "{your name}",
            email: "{your email}",
        }
    }
    ```
    

    
- 400 (Bad Request)
  
  ```javascript
    {
        errors: [
            "Incorrect email or password"
        ]
    }
    ```
  



## Question

- ### Create

  Method : `POST`<br>Endpoint: `/questions`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body:

    ```javascript
    {
        title: String (required),
        description: String (required),
        tags: Array (minimal 1)
    }
    ```

  ### _Response_ :

  - 201 (Created)

    ```javascript
    {
        message: 'Qustion added successfully'
    }
    ```

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Title field is required", 
            "Description field is required", 
            "Tags must be filled minimal 1"
        ]
    }
    ```



- ### Read

  Method : `GET`<br>Endpoint: `/questions`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
    
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Update

  Method : `PUT`<br>Endpoint: `/questions/:id`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body:

    ```javascript
    {
        title: String (required),
        description: String (required),
        tags: Array (minimal 1)
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Question updated successfully'
    }
    ```

  - 401 (Not authorized)

    ```javascript
    {
        errors: [
            "You haven't authorize with this question"
        ]
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Delete

  Method : `DELETE`<br>Endpoint: `/questions/:id`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Question deleted successfully'
    }
    ```

  - 401 (Not Authorize)

    ```javascript
    {
        errors: [
            "You haven't authorize with this question"
        ]
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Add Vote

  Method : `POST`<br>Endpoint: `/questions/:id/vote`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Add vote success'
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Add Vote

  Method : `DELETE`<br>Endpoint: `/questions/:id/vote`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Down vote success'
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Create

  Method : `POST`<br>Endpoint: `/questions`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body:

    ```javascript
    {
        title: String (required),
        description: String (required),
        tags: Array (minimal 1)
    }
    ```

  ### _Response_ :

  - 201 (Created)

    ```javascript
    {
        message: 'Qustion added successfully'
    }
    ```

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Title field is required", 
            "Description field is required", 
            "Tags must be filled minimal 1"
        ]
    }
    ```



- ### Read

  Method : `GET`<br>Endpoint: `/questions`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
    
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Update

  Method : `PUT`<br>Endpoint: `/questions/:id`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body:

    ```javascript
    {
        title: String (required),
        description: String (required),
        tags: Array (minimal 1)
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Question updated successfully'
    }
    ```

  - 401 (Not authorized)

    ```javascript
    {
        errors: [
            "You haven't authorize with this question"
        ]
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Delete

  Method : `DELETE`<br>Endpoint: `/questions/:id`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Question deleted successfully'
    }
    ```

  - 401 (Not Authorize)

    ```javascript
    {
        errors: [
            "You haven't authorize with this question"
        ]
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Add Vote

  Method : `POST`<br>Endpoint: `/questions/:id/vote`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Add vote success'
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Add Vote

  Method : `DELETE`<br>Endpoint: `/questions/:id/vote`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Down vote success'
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



## Question

- ### Create

  Method : `POST`<br>Endpoint: `/questions`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body:

    ```javascript
    {
        title: String (required),
        description: String (required),
        tags: Array (minimal 1)
    }
    ```

  ### _Response_ :

  - 201 (Created)

    ```javascript
    {
        message: 'Qustion added successfully'
    }
    ```

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Title field is required", 
            "Description field is required", 
            "Tags must be filled minimal 1"
        ]
    }
    ```



- ### Read

  Method : `GET`<br>Endpoint: `/questions`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
    
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Update

  Method : `PUT`<br>Endpoint: `/questions/:id`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body:

    ```javascript
    {
        title: String (required),
        description: String (required),
        tags: Array (minimal 1)
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Question updated successfully'
    }
    ```

  - 401 (Not authorized)

    ```javascript
    {
        errors: [
            "You haven't authorize with this question"
        ]
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Delete

  Method : `DELETE`<br>Endpoint: `/questions/:id`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Question deleted successfully'
    }
    ```

  - 401 (Not Authorize)

    ```javascript
    {
        errors: [
            "You haven't authorize with this question"
        ]
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Add Vote

  Method : `POST`<br>Endpoint: `/questions/:id/vote`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Add vote success'
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Down Vote

  Method : `DELETE`<br>Endpoint: `/questions/:id/vote`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Down vote success'
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



# Answer

- ### Create

  Method : `POST`<br>Endpoint: `/answers/:questionId`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body:

    ```javascript
    {
        description: String (required),
    }
    ```

  ### _Response_ :

  - 201 (Created)

    ```javascript
    {
        message: 'Answer added successfully'
    }
    ```

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Description field is required", 
        ]
    }
    ```



- ### Read

  Method : `GET`<br>Endpoint: `/answers/:questionId`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
    
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Update

  Method : `PUT`<br>Endpoint: `/answers/:id`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  - body:

    ```javascript
    {
        description: String (required),
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Answer updated successfully'
    }
    ```

  - 401 (Not authorized)

    ```javascript
    {
        errors: [
            "You haven't authorize with this answer"
        ]
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Delete

  Method : `DELETE`<br>Endpoint: `/questions/:id`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Question deleted successfully'
    }
    ```

  - 401 (Not Authorize)

    ```javascript
    {
        errors: [
            "You haven't authorize with this question"
        ]
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



- ### Add Vote

  Method : `POST`<br>Endpoint: `/answers/:id/vote`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Add vote success'
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```

- ### Add Vote

  Method : `DELETE`<br>Endpoint: `/answers/:id/vote`

  ### _Request_ :

  - header

    ```javascript
    {
        token: "{your token}"
    }
    ```

  ### _Response_ :

  - 200 (OK)

    ```javascript
    {
        message: 'Down vote success'
    }
    ```

  - 403 (Forbidden)

    ```javascript
    {
        errors: [
            "You must login first!"
        ]
    }
    ```



## Another Error

+ 500 (Internal Server Error)

  ```javascript
  {
  	errors: [
  		"Internal Server Error"
  	]
  }
  ```

  

