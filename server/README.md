# HacktivOverflow

Welcome to HacktivOverflow! All the service is running on http://localhost:3000/.

## User Endpoints

A collection of `/users/` endpoints.

#### Open Endpoints

* [Register](md/users/register.md) : `POST /users/register/`
* [Login](md/users/login.md) : `POST /users/login/`
* [Show user information](md/users/getOne.md) : `GET /users/`


## Question Endpoints

A collection of `/questions/` endpoints.

#### Endpoints that Require Authentication	

* [Create question](md/questions/create.md) : `POST /questions/`
* [Get all questions](md/questions/getAll.md) : `GET /questions/`
* [Get single question](md/questions/getOne.md) : `GET /questions/:id/`
* [Upvote question](md/questions/upvote.md) : `PATCH /questions/:id/`
* [Downvote question](md/questions/downvote.md) : `PATCH /questions/:id/`

#### Endpoints that Require Authentication and Authorization

* [Edit question](md/questions/edit.md) : `PUT /questions/:id/`
* [Delete question](md/questions/delete.md) : `DELETE /questions/:id/`



## Answer Endpoints

A collection of `/answers/` endpoints.

#### Endpoints that Require Authentication

* [Get all answers](md/answers/getAll.md) : `GET /answers/`
* [Upvote answer](md/answers/upvote.md) : `PATCH /answers/:id/`
* [Downvote answer](md/answers/downvote.md) : `PATCH /answers/:id/`

#### Endpoints that Require Authentication and Authorization

* [Get single answer](md/answers/getOne.md) : `GET /answers/:id`
* [Update single answer](md/answers/update.md) : `PUT /answers/:id`