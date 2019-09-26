# Login

Used to collect a Token from registered User.

**URL** : `/users/login/`

**Method** : `POST`

**Data constraints**

```json
{
  	"email": "[valid email address]",
  	"password": "[password in plain text]"
}
```

**Data example**

```json
{
  	"email": "admin@gmail.com",
  	"password": "123456"
}
```



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "user": {
    "name": "admin",
    "email": "admin@gmail.com",
    "password": "$2a$10$XbyD8cypfP8U.Rwnw7DW/O0Eh89gb9Ur2ZYmdhuxLwWJILekzGvdK"
  },
  "token": "[JWT Token]"
}
```



## Error Response

**Condition** : If provided data is invalid, e.g. email is blank.

**Code** : `400 Bad Request`

**Content example**

```json
{
  "message": "Email is required"
}
```


