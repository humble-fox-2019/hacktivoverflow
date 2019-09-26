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
    "_id": "",
    "question": "How to do Hello World in python?",
    "voteUp": 0,
    "voteDown": 0,
    "timestamps": {
      createdAt: "",
      updatedAt: ""
    },
  	"errors": "Succesfully deleted"
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