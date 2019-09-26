# Upvote Answer

Used to update single Answer `upvote`.

**URL** : `/answers/:id/`

**URL Parameters** : `:id` is the ID of the Answers on the server.

**Method** : `PATCH`



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "_id": ObjectId("5d8c60da430cfb9a4d2560d0"),
  "upvotes": [ 
		ObjectId("5d8c17e297e077653a4f62b7")
  ],
  "downvotes": [ ],
  "description": "<p>Nice bro</p>",
  "userId": ObjectId("5d8bab191410476117af1d51"),
  "questionId": ObjectId("5d8c5dff2d38dc95f36867d2"),
  "createdAt": ISODate("2019-09-26T06:55:22.281Z"),
  "updatedAt": ISODate("2019-09-26T06:55:22.281Z"),
  "__v": 0
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