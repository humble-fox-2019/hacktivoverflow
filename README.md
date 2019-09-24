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
    "token2": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGEzZGM2NGQwZTIxMjM2ZDljYzM5YSIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaUBtYWlsLmNvbSIsImlhdCI6MTU2OTM0MTEyNH0.1KSHNh6QVTx8aHGjcuqgYJt22OX9-SmArCNKknDfG2M,5d8a3dc64d0e21236d9cc39a",
    "email": "admi@mail.com"
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
- Url : 'api/question/:questionId
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

# Answer 

## Create Answer
- Url : 'api/answer/create
- Method : 'POST'
- Authentication required
```
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