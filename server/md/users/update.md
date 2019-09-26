# Update User Information

Used to update single User's detail if current User has access permissions to it.

**URL** : `/users/:id/`

**URL Parameters** : `:id` is the ID of the User on the server.

**Method** : `PUT`

**Data constraints**

```json
{
  "username": "[unicode 24 chars max]",
  "email": "[valid email address]",
  "password": "[unicode 6 - 18 chars]"
}
```

**Data example**

```json
{
  "username": "buzzy",
  "email": "buzz@gmail.com",
  "password": "123456"
}
```



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "username": "buzzy",
    "email": "buzz@gmail.com",
    "password": ""
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