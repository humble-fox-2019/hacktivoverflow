# Get All Answer

Used to get all Answer from server.

**URL** : `/answers/:id`

**Method** : `GET`



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "_id": ObjectId("5d8c60da430cfb9a4d2560d0"),
  "upvotes": [ ],
  "downvotes": [ ],
  "description": "<p>Nice bro</p>",
  "userId": ObjectId("5d8bab191410476117af1d51"),
  "questionId": ObjectId("5d8c5dff2d38dc95f36867d2"),
  "createdAt": ISODate("2019-09-26T06:55:22.281Z"),
  "updatedAt": ISODate("2019-09-26T06:55:22.281Z"),
  "__v": 0
}
```