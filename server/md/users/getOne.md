# Show User Information

Used to show single User's detail if current User has access permissions to it.

**URL** : `/users/`

**Method** : `GET`

**Headers** : `JWT Token`



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "name": "admin",
  "email": "admin@gmail.com",
  "password": "$2a$10$XbyD8cypfP8U.Rwnw7DW/O0Eh89gb9Ur2ZYmdhuxLwWJILekzGvdK"
}
```



## Error Response

**Code** : `400 Bad Request`

**Content example**

```json
{
  "message": "Unauthorized"
}
```

