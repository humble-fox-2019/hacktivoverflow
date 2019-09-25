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
        tags: String (separated by comma)
    }
    ```

  ### _Response_ :

  - 201 (Created)

    ```javascript
    {
        "message": "Question added succesfully",
        "question": {
            "tags": [
                "sejarah",
                "dunia",
                "alam"
            ],
            "upvotes": [],
            "downvotes": [],
            "_id": "5d8b0a8836cc863fe4b6e9d5",
            "title": "kapan hujan pertama kali turun?",
            "description": "ada kah yang tau?",
            "__v": 0
        }
    }
    ```

  - 400 (Bad Request)

    ```javascript
    {
        errors: [
            "Title field is required", 
            "Description field is required", 
            "Tags must be filled min 1"
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
    [
        {
            "tags": [
                "alam"
            ],
            "upvotes": [],
            "downvotes": [],
            "_id": "5d8b0a6036cc863fe4b6e9d4",
            "title": "Berapa kali bumi berputar",
            "description": "Selama 200 tahun, berapa kali bumi berputar?",
            "__v": 0
        },
        {
            "tags": [
                "sejarah",
                "dunia",
                "alam"
            ],
            "upvotes": [],
            "downvotes": [],
            "_id": "5d8b0a8836cc863fe4b6e9d5",
            "title": "kapan hujan pertama kali turun?",
            "description": "ada kah yang tau?",
            "__v": 0
        }
    ]
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



- ### Up Vote

  Method : `POST`<br>Endpoint: `/questions/:questionId/upvote`

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
        "message": "Update upvote success",
        "question": {
            "tags": [
                "sejarah",
                "dunia",
                "alam"
            ],
            "upvotes": [
                "5d8aed788c293b30d3b0e248"
            ],
            "downvotes": [],
            "answers": [
                "5d8b632ab0c0071b8a4d7a94"
            ],
            "_id": "5d8b2a9dfff384555cfe5990",
            "title": "kapan hujan pertama kali turun?",
            "description": "ada kah yang tau?",
            "user": "5d8aed788c293b30d3b0e248",
            "createdAt": "2019-09-25T08:51:41.827Z",
            "updatedAt": "2019-09-25T13:06:53.591Z",
            "__v": 23
        }
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

  Method : `POST`<br>Endpoint: `/questions/:id/downvote`

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
        "message": "Update downvote success",
        "question": {
            "tags": [
              "sejarah",
                "dunia",
              "alam"
            ],
            "upvotes": [],
            "downvotes": [
                "5d8aed788c293b30d3b0e248"
            ],
            "answers": [
                "5d8b632ab0c0071b8a4d7a94"
            ],
            "_id": "5d8b2a9dfff384555cfe5990",
            "title": "kapan hujan pertama kali turun?",
            "description": "ada kah yang tau?",
            "user": "5d8aed788c293b30d3b0e248",
            "createdAt": "2019-09-25T08:51:41.827Z",
            "updatedAt": "2019-09-25T13:10:08.532Z",
            "__v": 25
        }
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
    [
        {
            "upvotes": [],
            "downvotes": [],
          "_id": "5d8b632ab0c0071b8a4d7a94",
            "description": "kagak tau lahh guaa",
          "createdAt": "2019-09-25T12:52:58.142Z",
            "updatedAt": "2019-09-25T13:12:09.480Z",
            "__v": 8
        }
    ]
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

  Method : `PATCH`<br>Endpoint: `/answers/:id`

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
        message: 'Answer deleted successfully'
    }
    ```

  - 401 (Not Authorize)

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



- ### Up Vote

  Method : `POST`<br>Endpoint: `/answers/:id/upvote`

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
        "message": "Update upvote success",
        "answer": {
            "upvotes": [
                "5d8aed788c293b30d3b0e248"
            ],
            "downvotes": [],
            "_id": "5d8b632ab0c0071b8a4d7a94",
            "description": "kagak tau lahh guaa",
            "createdAt": "2019-09-25T12:52:58.142Z",
            "updatedAt": "2019-09-25T13:11:29.078Z",
            "__v": 7
        }
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

  Method : `POST`<br>Endpoint: `/answers/:id/downvote`

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
        "message": "Update downvote success",
        "answer": {
            "upvotes": [],
          "downvotes": [
                "5d8aed788c293b30d3b0e248"
          ],
            "_id": "5d8b632ab0c0071b8a4d7a94",
            "description": "kagak tau lahh guaa",
            "createdAt": "2019-09-25T12:52:58.142Z",
            "updatedAt": "2019-09-25T13:12:09.480Z",
            "__v": 8
        }
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

  

