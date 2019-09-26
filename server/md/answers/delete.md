# Upvote Answer

Used to delete single Answer from server,  if current User has access permissions to it..

**URL** : `/answers/:id/`

**URL Parameters** : `:id` is the ID of the Answers on the server.

**Method** : `DELETE`



## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "",
    "answer": "Try to use console.log('Hello World!')",
    "questionId": "",
    "userId": "",
    "upvote": 1, // increased by 1
    "downvote": 0,
    "timestamps": {
      createdAt: "",
      updatedAt: ""
    },
  	"message": "Deleted succesfully"
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