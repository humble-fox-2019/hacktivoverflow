# Upvote Answer

Used to update single Answer's detail  if current User has access permissions to it.

**URL** : `/answers/:id/`

**URL Parameters** : `:id` is the ID of the Answers on the server.

**Method** : `PUT`

**Data example**

```json
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
```



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "",
    "answer": "Try to use console.log('Hello World!')!!",
    "questionId": "",
    "userId": "",
    "upvote": 1, // increased by 1
    "downvote": 0,
    "timestamps": {
      createdAt: "",
      updatedAt: ""
    }
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