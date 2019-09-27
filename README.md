## Fox-overflow
	In this time fast is everthing, we need many informations and process run fast around the globe.
	But how we get it ?. That's way Fox-overflow was born.
	Fox-overflow is a web-app that use to share any informations and knowledges about everything.
	Where you can "Ask anything", and the others will help you solve your problems.

## Link
### User Site
	http://foxoverflow.ardynn14.com
## Users
	Before can use Fox-overflow, you must create an account.
	Then login with it next time you want to open the apps.
### Customers
### register
	Method		: post
	Endpoint	: http://localhost:3000/users/register
	Requierment	: 
		2. email	: String (email format)
		3. password : String
	Responses	:
		Success	: 
			1. status   : 201
			2. token    : String
		Error	:
			1. status 	: 400
			2. message	: Array
### login
	Method		: post
	Endpoint	: http://localhost:3000/users/login
	Requierment	: 
		1. email	: String (email format)
		2. password : String
	Responses	:
		Success	: 
			1. status   : 200
			2. token    : String
		Error	:
			1. status 	: 400
			2. message	: String || `Wrong email/password`

### User Info
	Method		: get
	Endpoint	: http://localhost:3000/users
	Requierment	: 
			1. headers	: token (String) 
	Responses	:
		Success	: 
			1. status   : 200
			2. user    : Object
		Error	:
			1. status 	: 401
			2. message	: String || `You must login first`

### add watcher
	Method		: patch
	Endpoint	: http://localhost:3000/users/add
	Requierment	: 
		1. headers	: token (String) 
		2. tag	: String (email format)
	Responses	:
		Success	: 
			1. status   : 200
			2. user    : Object
		Error	:
			1. status 	: 400
			2. message	: String || `You must login first`

### login
	Method		: patch
	Endpoint	: http://localhost:3000/users/remove
	Requierment	: 
		1. headers	: token (String) 
		2. tag	: String (email format)
	Responses	:
		Success	: 
			1. status   : 200
			2. user    : Object
		Error	:
			1. status 	: 400
			2. message	: String || `You must login first`

## Question
### 	readAll
	Method		: get
	Endpoint	: http://localhost:3000/questions
	Requierment	: 
		1. headers : token (String)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : Array
		Error	:
			1. status 	: 500
			2. message	: Internal server error
### create
	Method		: post
	Endpoint	: http://localhost:3000/questions
	Requierment	: 
		1. title	: String
		2. content	: String
		3. tags 	: Array
		4. headers	: token (admin)
	Responses	:
		Success	: 
			1. status   : 201
			2. message  : Object
		Error	:
			1. status 	: 400
			2. message	: Array
### delete
	Method		: delete
	Endpoint	: http://localhost:3000/question/:id
	Requierment	: 
		1. headers	: token (admin)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : `Success delete question`
		Error	:
			1. status 	: 403
			2. message	: `Unautorized action`
### Cart
### 	readOne
	Method		: get
	Endpoint	: http://localhost:3000/questions/:id
	Requierment	: 
		1. headers : token (String)
		2. :id	   : Question Id (String)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : Question {Object}
		Error	:
			1. status 	: 500
			2. message	: Internal server error
###  read user Questions
	Method		: get
	Endpoint	: http://localhost:3000/questions/user
	Requierment	: 
		1. headers	: token
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : questions (Array)
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### read by Tag
	Method		: get
	Endpoint	: http://localhost:3000/questions/tag?tag=$tag
	Requierment	: 
		1. headers	: token
		2. ?tag		: String
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : questions (Array)
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### update questions
	Method		: patch
	Endpoint	: http://localhost:3000/questions/:id
	Requierment	: 
		1. headers : token (String)
		2. :id	   : Question Id (String)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : question (Object)
		Error	:
			1. status 	: 403
			2. message	: `Unautorized action`
### vote questions
	Method		: patch
	Endpoint	: http://localhost:3000/questions/vote/:id
	Requierment	: 
		1. headers : token (String)
		2. :id	   : Question Id (String)
		3. value   : [0, 1] (Number)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : question (Object)
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### Answer
### create
	Method		: post
	Endpoint	: http://localhost:3000/answers/:id
	Requierment	: 
		1. headers : token (String)
		2. :id	   : Question Id (String)
		3. title   : String
		4. content : String
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : answer (Object)
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### create
	Method		: get
	Endpoint	: http://localhost:3000/answers/:id
	Requierment	: 
		1. headers : token (String)
		2. :id	   : Question Id (String)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : answers (Array)
		Error	:
			1. status 	: 401
			2. message	: `please login first`
### create
	Method		: patch
	Endpoint	: http://localhost:3000/answers/vote/:id
	Requierment	: 
		1. headers : token (String)
		2. :id	   : Question Id (String)
		3. value   : [0, 1] (Number)
	Responses	:
		Success	: 
			1. status   : 200
			2. message  : answer (Object)
		Error	:
			1. status 	: 401
			2. message	: `please login first`