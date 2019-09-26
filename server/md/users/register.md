# Register

Used to register a new User.

**URL** : `/users/register/`

**Method** : `POST`

**Data constraints**

```json
{
  "name": "[unicode 24 chars max]",
  "email": "[valid email address]",
  "password": "[unicode 6 - 18 chars]"
}
```

**Data example**

```json
{
  "name": "admin",
  "email": "admin@gmail.com",
  "password": "123456"
}
```



## Success Response

**Code** : `201 Created`

**Content example**

```json
{
  "user": {
    "name": "name",
    "email": "buzz@gmail.com",
    "password": "$2a$10$XbyD8cypfP8U.Rwnw7DW/O0Eh89gb9Ur2ZYmdhuxLwWJILekzGvdK"
  },
  "token": "[JWT Token]"
}
```



## Error Response

**Condition** : If provided data is invalid, e.g. username is too long.

**Code** : `400 Bad Request`

**Content example**

```json
{
  "message": "Username is required"
}
```

