# Delete Question

Used to delete single Question from the server, if current User has access permissions to it.

**URL** : `/questions/:id/`

**URL Parameters** : `:id` is the ID of the Question on the server.

**Method** : `PUT`




## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "_id": ObjectId("5d8b740a708781569159e5af"),
  "upvotes": [
    ObjectId("5d8b6647d343a34f32102e4a")
  ],
  "downvotes": [ ],
  "answers": [
    ObjectId("5d8b756fed775c56edde2daa")
  ],
  "title": "Test",
  "description": "<p>Wow</p>",
  "userId": ObjectId("5d8b6647d343a34f32102e4a"),
  "createdAt": ISODate("2019-09-25T14:04:58.775Z"),
  "updatedAt": ISODate("2019-09-25T14:10:55.481Z"),
  "__v": 5
}
```



## Error Response

**Code** : `400 Bad Request`

**Content example**

```json
{
  "errors": "Unauthorized"
}
```