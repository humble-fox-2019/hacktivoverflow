# hacktivoverflow

## Getting Started
```
Client
===================
1. npm install
2. npm run serve

Server
===================
1. npm install 
2. npm run test

Cron
===================
1. node cron.js

```
Website : http://askoverflow.cado.store/questions     
Postman : https://documenter.getpostman.com/view/6836981/SVn2QcEG  

# 
## User
### Login
Route : `/login`  
Method : `POST`  
Headers : -   
Body : 
```
{
    "email" : "johnDoe@email.com",
    "password" : "johnDoe123"
}
```
Response : 

```
Success :
{
    "token": <TOKEN>,
    "user": Object
}
Error : 
{
    "status" : 400,
    "message" : []
}
```
# 

### Register
Route : `/register`  
Method : `POST`  
Headers : -   
Body : 
```
{
    "username" : "johnDoe",
    "email" : "johnDoe@email.com",
    "password" : "johnDoe123"
}
```
Response : 
```
Success :
{
    "createdUser"
}
Error :
{
    "status": 401,
    "message": "User already registered"
}
```

# Question
## Get all Question  
Route : `/questions`  
Method : `GET`  
Headers : -   
Body : -  
Response : 
```
Success :
{
    "questions"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```

## Get Question by ID  
Route : `/questions/detail/:id`  
Method : `GET`  
Headers : -   
Body : -  
Response : 
```
Success :
{
    "questions"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```

## Ask Question
Route : `/questions/user`
Method : `GET`  
Headers : `<TOKEN>`     
Body :   
```
{
	"title": "how to eat",
	"description" : "i have been trying for these past year, and i don't know how to eat in proper way, can somebody tell me how?"de
}
```  
Response : 
```
Success :
{
    "questions"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```

## Update Question
Route : `/questions/:id`
Method : `GET`  
Headers : `<TOKEN>`     
Body :   
```
{
	"title": "how to eat",
	"description" : "i have been trying for these past year, and i don't know how to eat in proper way, can somebody tell me how?"de
}
```  
Response : 
```
Success :
{
    "questions"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```

## Delete Question
Route : `/questions/:id`
Method : `DELETE`  
Headers : `<TOKEN>`     
Body : -  
Response : 
```
Success :
{
    "questions"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```


## UpVote Question
Route : `/questions/:id/up`
Method : `PATCH`  
Headers : `<TOKEN>`     
Body : -  
Response : 
```
Success :
{
    "questions"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```


## DownVote Question
Route : `/questions/:id/down`
Method : `PATCH`  
Headers : `<TOKEN>`     
Body : -  
Response : 
```
Success :
{
    "questions"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```

# Answer
## Get answer by ID 
Route : `/answers/detail/:id`
Method : `GET`  
Headers : `<TOKEN>`     
Body : -  
Response : 
```
Success :
{
    "answer"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```

## Answer Question
Route : `/answers`
Method : `POST`  
Headers : `<TOKEN>`     
Body :  
```
{
	"questionId" : "5d8adfdaa28a5936c76ab147",
	"title" : "COba jawab ya",
	"description" : "1. cuci tangan , 2. Buka mulut , 3. Makan"
}
```  
Response : 
```
Success :
{
    "answer"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```

##  Delete Own Answer
Route : `/answers/:id`
Method : `DELETE`  
Headers : `<TOKEN>`     
Body : -  
Response : 
```
Success :
{
    "answer"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```


##  Update Answer
Route : `/answers/:id`
Method : `PUT`  
Headers : `<TOKEN>`     
Body :   
```
{
	"title" :"Update ah",
	"description" : "bner"
}
```
Response : 
```
Success :
{
    "answer"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```

## Vote Up Answer
Route : `/answers/:id/up`
Method : `PATCH`  
Headers : `<TOKEN>`     
Body : -  
Response : 
```
Success :
{
    "answer"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```
## Vote Down Answer
Route : `/answers/:id/down`
Method : `PATCH`  
Headers : `<TOKEN>`     
Body : -  
Response : 
```
Success :
{
    "answer"
}
Error :
{
    "status": 500,
    "message": "Internal Server Error"
}
```