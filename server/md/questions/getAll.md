# Get All Questions

Used to get all questions from server.

**URL** : `/questions/`

**Method** : `GET`



## Success Response

**Code** : `200 OK`

**Content example**

```json
[
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
  },
  {
    "_id": ObjectId("5d8b136fadeb0a283a38aa47"),
    "upvotes": [ ],
    "downvotes": [ ],
    "answers": [ ],
    "title": "How to use v-html?",
    "description": "<p>I can't make it span. Please help me!</p>",
    "userId": ObjectId("5d8b6647d343a34f32102e4a"),
    "createdAt": ISODate("2019-09-25T07:12:47.695Z"),
    "updatedAt": ISODate("2019-09-25T07:12:47.695Z"),
    "__v": 0
  }
]
```