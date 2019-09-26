# Edit Question

Used to update single Question's detail if current User has access permissions to it.

**URL** : `/questions/:id/`

**URL Parameters** : `:id` is the ID of the Question on the server.

**Method** : `PUT`

**Data example**

```json
{
  "title": "Wow",
  "description": "<p>test</p>",
}
```



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "_id": ObjectId("5d8b0920adeb0a283a38aa46"),
  "upvotes": [ ],
  "downvotes": [ ],
  "answers": [ ],
  "title": "Wow",
  "description": "<p>test</p>",
  "userId": ObjectId("5d8a410136efcf1493996b23"),
  "createdAt": ISODate("2019-09-25T06:28:48.140Z"),
  "updatedAt": ISODate("2019-09-25T06:28:48.140Z"),
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