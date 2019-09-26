# Get Single Question

Used to get all questions from server.

**URL** : `/questions/:id/`

**URL Parameters** : `:id` is the ID of the Question on the server.

**Method** : `GET`



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "_id": ObjectId("5d8b0920adeb0a283a38aa46"),
  "upvotes": 0,
  "downvotes": 0,
  "answers": [ ],
  "title": "Wow",
  "description": "<p>test</p>",
  "userId": ObjectId("5d8a410136efcf1493996b23"),
  "createdAt": ISODate("2019-09-25T06:28:48.140Z"),
  "updatedAt": ISODate("2019-09-25T06:28:48.140Z"),
  "__v": 0
}
```