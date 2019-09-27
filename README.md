# hacktivoverflow

# rest-api

# HACKTIVOVERFLOW


  #### REST API built Express and Mongoose
 

##### List of user Routes

### POST user/register
***
to register new User
#### URL
http://34.87.7.44/user/register

#### METHOD
POST
#### URL PARAMS
none
#### data 
	username : STRING (required)
	email : STRING (required)
	password : STRING (required)
#### Succes Response
	{
		token : '<your token>',
		user : {
		"_id": "5d8067d979d2453f9d4e08b6",
        "username": "ando5",
        "password": "$2a$10$FKUNaNVmJrEfMia3usm4.uiP7eu61vaqZ9pShy.5g1UUnTR..vNie",
        "email": "ando5@mail.com",
        "watchedTag" : []
        "__v": 0
		}
	}
#### Error Response


		 {
		    "message": ""User validation failed: username: Path `username` is required",
		    "data": ""User validation failed: username: Path `username` is required"
		 }	
		status : 400 (Bad Request)
.
	
	   {
			"message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)

### POST user/login
***
to login User
#### URL
http://34.87.7.44/user/login

#### METHOD
POST
#### URL PARAMS
none
#### data 
	email : STRING (required)
	password : STRING (required)
#### Succes Response
	{
		token : '<your token>',
		user : {
		"_id": "5d8067d979d2453f9d4e08b6",
        "username": "ando5",
        "password": "$2a$10$FKUNaNVmJrEfMia3usm4.uiP7eu61vaqZ9pShy.5g1UUnTR..vNie",
        "email": "ando5@mail.com",
        "__v": 0
		}
	}
#### Error Response

	
		{
		    "message": "Email or Password NOT FOUND!!!!!"
		}	
		status : 400 (Bad Request)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)

### GET /Question
***
get all question list
#### URL
http://34.87.7.44/question

#### METHOD
GET
#### URL PARAMS
none
#### data 
none
####  headers
	token : ''
#### Succes Response
		[	
			{
				title : "string",
				description : "",
				voter :  [],
				votes : 0,
				tags : [],
				Answer : [],	
				User : {
					 "_id": "5d8067d979d2453f9d4e08b6",
			         "username": "ando5",
			         "password": "$2a$10$FKUNaNVmJrEfMia3usm4.uiP7eu61vaqZ9pShy.5g1UUnTR..vNie",
			         "email": "ando5@mail.com",
			           "watchedTag": [
				                "lol",
					             "",
					             ]
			         "__v": 0
				}
			 }				       
		]
#### Error Response

	
		{
		    "message": "anda tidak memilik akses"
		}	
		status : 403 (Forbidden)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)
			
### POST Question
***
Create New Question
#### URL
http://34.87.7.44/question

#### METHOD
POST
#### URL PARAMS
none
#### data 
	{
		title : String, 
		description : String, 
		tags : Array
	}
####  headers
	token : ''
#### Succes Response
		{
			title : "string",
			description : "",
			voter :  [],
			votes : 0,
			tags : [],
			Answer : [],	
			User : {
				 "_id": "5d8067d979d2453f9d4e08b6",
		         "username": "ando5",
		         "password": "$2a$10$FKUNaNVmJrEfMia3usm4.uiP7eu61vaqZ9pShy.5g1UUnTR..vNie",
		         "email": "ando5@mail.com",
		           "watchedTag": [
			                "lol",
				             "",
				             ]
		         "__v": 0
			}
		 }				       
#### Error Response

	
		{
		    "message": "anda tidak memilik akses"
		}	
		status : 403 (Forbidden)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)
	

### PUT/ Question
***
get all question list
#### URL
http://34.87.7.44/question/:id

#### METHOD
PUT
#### URL PARAMS
none
#### data 
none
####  headers
	token : ''
#### Succes Response
		<Message Sukses>
#### Error Response
		{
		    "message": "anda tidak memilik akses"
		}	
		status : 403 (Forbidden)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)
	   
### DELETE / Question
***
delete a question
#### URL
http://34.87.7.44/question/:id

#### METHOD
DELETE
#### URL PARAMS
none
#### data 
none
####  headers
	token : ''
#### Succes Response
	  <Message Sukses>
#### Error Response

	
		{
		    "message": "anda tidak memilik akses"
		}	
		status : 403 (Forbidden)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)
   

### GET Answer
***
get answer by question
#### URL
http://34.87.7.44/answer/:id

#### METHOD
GET
#### URL PARAMS
id Question (params)
#### data 
none
####  headers
	token : ''
#### Succes Response
		[	
			{
				title : "string",
				description : "",
				voter :  [],
				votes : 0,
				tags : [],
				question : [],	
				User : {
					 "_id": "5d8067d979d2453f9d4e08b6",
			         "username": "ando5",
			         "password": "$2a$10$FKUNaNVmJrEfMia3usm4.uiP7eu61vaqZ9pShy.5g1UUnTR..vNie",
			         "email": "ando5@mail.com",
			           "watchedTag": [
				                "lol",
					             "",
					             ]
			         "__v": 0
				}
			 }				       
		]
#### Error Response

	
		{
		    "message": "anda tidak memilik akses"
		}	
		status : 403 (Forbidden)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)
	   
### POST/ Answer
***
Create New Question
#### URL
http://34.87.7.44/answer

#### METHOD
PUT
#### URL PARAMS
none
#### data 
	{	
		question2 : String, 
		title : String, 
		description : String
	}
####  headers
	token : ''
#### Succes Response
		[	
			{
				title : "string",
				description : "",
				voter :  [],
				votes : 0,
				tags : [],
				question : [],	
				User : {
					 "_id": "5d8067d979d2453f9d4e08b6",
			         "username": "ando5",
			         "password": "$2a$10$FKUNaNVmJrEfMia3usm4.uiP7eu61vaqZ9pShy.5g1UUnTR..vNie",
			         "email": "ando5@mail.com",
			           "watchedTag": [
				                "lol",
					             "",
					             ]
			         "__v": 0
				}
			 }				       
		]
#### Error Response

	
		{
		    "message": "anda tidak memilik akses"
		}	
		status : 403 (Forbidden)

.
	
	   {
		 "message": "internal server error",
	   }	
	   status : 500 (INTERNAL SERVER ERROR)


  




