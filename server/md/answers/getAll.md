# Get All Answer

Used to get all Answer from server.

**URL** : `/answers/`

**Method** : `GET`



## Success Response

**Code** : `200 OK`

**Content example**

```json
[
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
  },
	{
  "_id": ObjectId("5d8c54bbb8d8bf920b631349"),
  "upvotes": [
    ObjectId("5d8c17e297e077653a4f62b7")
  ],
  "downvotes": [ ],
  "description": "<p>Tjakeppppp</p>",
  "userId": ObjectId("5d8c17e297e077653a4f62b7"),
  "questionId": ObjectId("5d8c54b1b8d8bf920b631348"),
  "createdAt": ISODate("2019-09-26T06:03:39.996Z"),
  "updatedAt": ISODate("2019-09-26T06:37:15.498Z"),
  "__v": 1
	}
]
```