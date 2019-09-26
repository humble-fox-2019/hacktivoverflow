# Add Answer

And an answer into question's `answers`.

**URL** : `/questions/:id/add-answer`

**Method** : `POST`

**Data example**

```json
{
    "description": "<p>test</p>"
}
```



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "_id": ObjectId("5d8b19beadeb0a283a38aa48"),
  "upvotes": 0,
  "downvotes": 0,
  "answers": [ ],
  "title": "How to use Vuex to cooking pasta?",
  "description": "<p>Random question bro.</p>",
  "userId": ObjectId("5d8a410136efcf1493996b23"),
  "createdAt": ISODate("2019-09-25T07:39:42.111Z"),
  "updatedAt": ISODate("2019-09-25T07:39:42.111Z"),
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