# Coder Fairy

Coder Fairy adalah situs tanya jawab tentang pemrograman

# User
## Register
- Url : 'api/user/register'
- Method : 'POST'
```
Data : 
{
    "name": "admin",
    "email": "admi@mail.com",
    "password": "1234567"
}
```
```
Status : 201
Response :
{
    "message": "Welcome new user!",
    "data": {
        "_id": "5d8a3dc64d0e21236d9cc39a",
        "name": "admin",
        "email": "admi@mail.com",
        "password": "$2a$10$SkHur.L8MvBPANF543PaDe.qQrZznSaQJiFEEM1ncMcafH83diC3m",
        "createdAt": "2019-09-24T16:01:11.422Z",
        "updatedAt": "2019-09-24T16:01:11.422Z",
        "__v": 0
    }
}
```
```
Error List :
1. Validation (400)
    - Name is required
    - Email is required
    - Email include . and @
    - Password is required
    - Password minimal 8 length


```

## Login
- Url : 'api/user/login'
- Method : 'POST'
```
Data :
{
    "email": "admi@mail.com",
    "password": "1234567"
}
```
```
Status : 200
Response : 
{
    "message": "Welcome to Coder Fairy!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGEzZGM2NGQwZTIxMjM2ZDljYzM5YSIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaUBtYWlsLmNvbSIsImlhdCI6MTU2OTM0MTEyNH0.1KSHNh6QVTx8aHGjcuqgYJt22OX9-SmArCNKknDfG2M",
    "email": "admi@mail.com"
    "_id" : "D66ewewd12wq212121a"
}
```

# Question

## Create
- Url : api/question/create
- Method : 'POST'
- Authentication required
```
Headers :
{
    token : <some token>
}
```
```
Data : 
{
    "title": "does null mean false?"
    "description": "i am using javascript"
}
```
```
Status : 201
Response : 
{
    "message": "Question Successfully Created!",
    "data": {
        "likes": [],
        "dislikes": [],
        "_id": "5d8a49474ca2d92e74bdd4fc",
        "title": "does null mean false?",
        "description": "i am using javascript",
        "userId": "5d8a3dc64d0e21236d9cc39a"
        "createdAt": "2019-09-24T16:50:15.600Z",
        "updatedAt": "2019-09-24T16:50:15.600Z",
        "__v": 0
    }
}
```

## Update Question
- Url : 'api/question/:questionId
- Method : 'PUT'
- Authentication required
- Authorization required
```
Headers :
{
    token : <some token>
}
```
```
Data : 
{
    "title": "does null, false and "length == 0 "is the same thing??"
    "description": "i am using javascript"
}
```
```
Status : 200
Response :
{
    "message": "Success update your question"
}
```

## Delete Question
- Url : 'api/question/:questionId'
- Method : 'DELETE'
- Authentication required
- Authorization required
```
Headers :
{
    token : <some token>
}
```
```
Status : 200
Response :
{
    "message": "Success delete question"
}
```

## Get All Questions
- Url : 'api/question/'
- Method : 'GET
- Description : "get all question sort descending by createdAt"
```
Status : 200
Response : 
{
    "message": "Success get all questions list",
    "questions": {
        "question": [
            {
                "likes": [],
                "dislikes": [],
                "_id": "5d8a5c61f4d88540317382e8",
                "title": "What",
                "description": "help",
                "userId": {
                    "_id": "5d8a55d40f40d43afac70bd8",
                    "name": "Anna Frozen",
                    "email": "anna@mail.com"
                },
                "createdAt": "2019-09-24T18:11:45.360Z",
                "updatedAt": "2019-09-24T18:11:45.360Z",
                "__v": 0
            },
            {
                "likes": [],
                "dislikes": [
                    {
                        "userId": "5d8a55d40f40d43afac70bd8"
                    }
                ],
                "_id": "5d8a551a869d4c3a78273e76",
                "title": "how to remove object property?",
                "description": "i am using javascript",
                "userId": {
                    "_id": "5d8a3dc64d0e21236d9cc39a",
                    "name": "admin",
                    "email": "admi@mail.com"
                },
                "createdAt": "2019-09-24T17:40:42.672Z",
                "updatedAt": "2019-09-25T03:54:51.062Z",
                "__v": 0
            }, ......
        ]
    }
}
```

## Get One Question
- Url : 'api/question/:questionId'
- Method : 'GET
```
Status : 200
Response : 
{
    "message": "Successfully get a question with id 5d8a551a869d4c3a78273e76",
    "question": {
        "likes": [
            {
                "userId": "5d8a55d40f40d43afac70bd8"
            }
        ],
        "dislikes": [],
        "_id": "5d8a551a869d4c3a78273e76",
        "title": "how to remove object property?",
        "description": "i am using javascript",
        "userId": {
            "_id": "5d8a3dc64d0e21236d9cc39a",
            "name": "admin",
            "email": "admi@mail.com"
        },
        "createdAt": "2019-09-24T17:40:42.672Z",
        "updatedAt": "2019-09-25T02:25:31.019Z",
        "__v": 0
    },
    "answer": [
        {
            "likes": [],
            "dislikes": [],
            "_id": "5d8a597e0048f53e244a8bf1",
            "answer": "this i found from w3school,\n var person = {\n  firstName:\"John\",\n  lastName:\"Doe\",\n  age:50,\n  eyeColor:\"blue\"\n};\n\ndelete person.age;",
            "createdAt": "2019-09-24T17:59:26.844Z",
            "questionId": "5d8a551a869d4c3a78273e76",
            "updatedAt": "2019-09-24T17:59:26.844Z"
        }
    ]
}
```
## Get User Questions
- Method : 'GET
- Url : 'api/question/owned
- Description : 'Questions sort ascending by createdAt'
- Authentication required
```
Headers :
{
    token : <some token>
}
```
```
Status : 200
Response : 
{
    "message": "List of my questions",
    "questions": [
        {
            "likes": [],
            "dislikes": [],
            "_id": "5d8aeb4f3707ec218041747b",
            "title": "how to sort without magic?",
            "description": "i am using javascript",
            "userId": "5d8a55d40f40d43afac70bd8",
            "createdAt": "2019-09-25T04:21:35.851Z",
            "updatedAt": "2019-09-25T04:21:35.851Z",
            "__v": 0
        },
        {
            "likes": [],
            "dislikes": [],
            "_id": "5d8adeaabd495a1881a53428",
            "title": "Whaiii",
            "description": "help",
            "userId": "5d8a55d40f40d43afac70bd8",
            "createdAt": "2019-09-25T03:27:38.805Z",
            "updatedAt": "2019-09-25T03:27:38.805Z",
            "__v": 0
        }, ...
    ]
}
```

## Like Question 
- Method : 'PUT'
- Url : 'api/question/like/:questionId'
- Authentication required
```
Headers :
{
    token : <some token>
}
```
```
Status : 201
Response :
{
    "message": "Like++"
}
```
```
Error :
- Already liked (400)
{
    "message": "You already like this question!"
}
- Wrong Question Id
{
    "message" : "Data not found!"
}
```
# Disike Question 
- Method : 'PUT'
- Url : 'api/question/dislike/:questionId'
- Authentication required
```
Headers :
{
    token : <some token>
}
```
```
Status : 201
Response :
{
    "message": "Dislike++"
}
```
```
Error :
- Already liked (400)
{
    "message": "You already dislike this question!"
}
- Wrong Question Id
{
    "message" : "Data not found!"
}
```

## Remove Like and Dislike
- Method : 'PUT'
- Url : 'api/question/normalize/:questionId'
- Authentication required
```
Headers : 
{
    token : <some token>
}
```
```
Status : 200
Response : 
{
    "message": "Your opinion is updated to netral "
}
```
```
Error 

Status : 400
Response :
{
    "message": "Data Not Found"
}
```

# Answer 

## Create Answer
- Url : 'api/answer/:questionId'
- Method : 'POST'
- Authentication required
```
Headers :
{
    token : <some token>
}
```
```
Data : 
{
    "answer": "this i found from w3school,\n var person = {\n  firstName:\"John\",\n  lastName:\"Doe\",\n  age:50,\n  eyeColor:\"blue\"\n};
}
```
```
Status : 201
Response : 
{
    "message": "Answer Succesfully Created!",
    "data": {
        "likes": [],
        "dislikes": [],
        "_id": "5d8a5bdaf4d88540317382e7",
        "answer": "this i found from w3school,\n var person = {\n  firstName:\"John\",\n  lastName:\"Doe\",\n  age:50,\n  eyeColor:\"blue\"\n};\n\ndelete person.age;",
        "questionId": "5d8a551a869d4c3a78273e7",
        "userId": "5d8a55d40f40d43afac70bd8",
        "createdAt": "2019-09-24T18:09:30.473Z",
        "updatedAt": "2019-09-24T18:09:30.473Z"
    }
}
```

## Update Answer
- Method : 'PUT'
- Url : api/answer/:id
- Authentication required
- Authorization required
```
Headers :
{
    token : <some token>
}
```
```
Data : 
{
    "answer" : "t's easy... just search on w3school :)"
}
```
```
Status : 200
Response : 
{
    "message": "answer successfully updated"
}
```

## Delete Answer
- Method : 'DELETE'
- Url : api/answer/:id
- Authentication required
- Authorization required
```
{
    token : <some token>
}
```
```
Status : 200
Response : 
{
    "message": "Success delete your answer"
}
```

## Like Answer
- Method : 'PUT'
- Url : 'api/answer/like/:answerId'
- Authentication required
```
Headers :
{
    token : <some token>
}
```
```
Status: 200
Response: 
{
    "message": "Like++"
}
```
```
Error

Status : 400
Response : 
{
    "message": "Data Not Found"
}

Status: 400
Response:
{
    message: `You already like this question!`
}

Status: 400
Response: 
{
    message: "You can't like your own answer"
}
```

## Dislike Answer
- Method : 'PUT'
- Url : 'api/answer/dislike/:answerId'
- Authentication required
```
Headers :
{
    token : <some token>
}
```
```
Status: 200
Response: 
{
    "message": "Dislike++"
}
```
```
Error

Status : 400
Response : 
{
    "message": "Data Not Found"
}

Status: 400
Response:
{
    message: `You already dislike this question!`
}

Status: 400
Response: 
{
    message: "You can't dislike your own answer"
}
```

## Get One Answer 
Method : 'GET'
Url : 'api/answer/:answerId'
```
Status: 200
Response : 
{
    "message": "Success get answer with id 5d8af317b81a0e2606fc3e23",
    "data": {
        "likes": [],
        "dislikes": [
            {
                "userId": "5d8a55d40f40d43afac70bd8"
            }
        ],
        "_id": "5d8af317b81a0e2606fc3e23",
        "answer": " check here https://visualgo.net/bn/sorting?slide=1",
        "questionId": {
            "likes": [],
            "dislikes": [],
            "_id": "5d8aeb4f3707ec218041747b",
            "title": "how to sort without magic?",
            "description": "i am using javascript",
            "userId": "5d8a55d40f40d43afac70bd8",
            "createdAt": "2019-09-25T04:21:35.851Z",
            "updatedAt": "2019-09-25T04:21:35.851Z",
            "__v": 0
        },
        "userId": {
            "_id": "5d8a3dc64d0e21236d9cc39a",
            "name": "admin",
            "email": "admi@mail.com"
        },
        "createdAt": "2019-09-25T04:54:47.400Z",
        "updatedAt": "2019-09-25T05:41:23.125Z"
    }
}
```
```
Error

Status : 400
Response : 
{
    "message" :  "Data Not Found"
}
```

## Remove Like and Dislike
- Method : 'PUT'
- Url : 'api/answer/normalize/:answerId'
- Authentication required

```
Headers : 
{
    token : <some token>
}
```
```
Status : 200
Response :
{
    "message": "Your opinion is updated to netral"
}

```
```
Error 

Status : 400
Response : 
{
    "message" : "Data Not Found"
}
```