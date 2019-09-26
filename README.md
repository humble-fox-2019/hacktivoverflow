# Hacktivoverflow

**User API**

|      ROUTE      | HTTP | HEADERS |                             BODY                             | DESCRIPTION | ADDITIONAL INFO |
| :-------------: | :--: | :-----: | :----------------------------------------------------------: | :---------: | :-------------: |
| /users/register | POST |    -    | email:String(required)<br />username:String(required)<br />password:String(required) |  register   |        -        |

Response:
200

```
{
    "username": "test",
    "email": "test@test.com"
}
```

400

```
{
    "message": "Your password needs to be at least 5 letters"
}
```



|    ROUTE     | HTTP | HEADERS |                         BODY                          | DESCRIPTION | ADDITIONAL INFO |
| :----------: | :--: | :-----: | :---------------------------------------------------: | :---------: | :-------------: |
| /users/login | POST |    -    | email:String(required)<br />password:String(required) |    login    |        -        |

Response:
200

```
{
"token":     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVkOGFlMDA4NjUyN2RmMDkxOGJlNzEzMCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJuYW1lIjoidGVzdCJ9LCJpYXQiOjE1NjkzODI0NjUsImV4cCI6MTU2OTM4NjA2NX0.eoUIWhJzjmKiPb7QNHOs5EHG50eg0pGA6Yh5IChzLxg",
    "username": "test"
}
```

400

```
{
    "message": "Invalid password"
}
```



### Question API

|     ROUTE      | HTTP | HEADERS | BODY |    DESCRIPTION     | ADDITIONAL INFO |
| :------------: | :--: | :-----: | :--: | :----------------: | :-------------: |
| /questions/all | GET  |    -    |  -   | Find All Questions |        -        |

Response:
200

```
[
    {
        "upvotes": 0,
        "downvotes": 0,
        "answers": [],
        "_id": "5d8ae0f16527df0918be7131",
        "title": "how to how",
        "description": "gini cara nya",
        "user": "5d8ae0086527df0918be7130",
        "__v": 0
    }
]
```

500

```

```



|   ROUTE    | HTTP | HEADERS |                           BODY                           |     DESCRIPTION     | ADDITIONAL INFO |
| :--------: | :--: | :-----: | :------------------------------------------------------: | :-----------------: | :-------------: |
| /questions | POST |  token  | title:String(required)<br />description:String(required) | Register a question |  authenticated  |

Response:
201

```
{
    "upvotes": 0,
    "downvotes": 0,
    "answers": [],
    "_id": "5d8ae0f16527df0918be7131",
    "title": "how to how",
    "description": "gini cara nya",
    "user": "5d8ae0086527df0918be7130",
    "__v": 0
}
```

400

```
{
    "message": "Title must be filled"
}
```



|   ROUTE    | HTTP | HEADERS | BODY |     DESCRIPTION     | ADDITIONAL INFO |
| :--------: | :--: | :-----: | :--: | :-----------------: | :-------------: |
| /questions | GET  |  token  |  -   | Get user's question |  authenticated  |

Response:
200

```
[
    {
        "upvotes": 0,
        "downvotes": 0,
        "answers": [],
        "_id": "5d8ae0f16527df0918be7131",
        "title": "how to how",
        "description": "gini cara nya",
        "user": "5d8ae0086527df0918be7130",
        "__v": 0
    }
]
```

401

```
{
    "message": "You need to login first"
}
```



|         ROUTE         | HTTP  | HEADERS | BODY |    DESCRIPTION    | ADDITIONAL INFO |
| :-------------------: | :---: | :-----: | :--: | :---------------: | :-------------: |
| /questions/upvote/:id | PATCH |  token  |  -   | upvote a question |  authenticate   |

Response:
200

```

    "upvotes": [
        "5d8b707ffbb4cc15be820f15"
    ],
    "downvotes": [],
    "answers": [
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5d8ba8c860999c2b4755006c",
            "description": "bau",
            "user": "5d8b1362fab52211c169dffc",
            "__v": 0
        }
    ],
    "_id": "5d8ba8c260999c2b4755006b",
    "title": "telolet",
    "description": "uizeeee",
    "user": "5d8b1362fab52211c169dffc",
    "__v": 0
}
```

400

```
{
    "message": "You already upvoted this question"
}
```



|          ROUTE          | HTTP  | HEADERS | BODY |     DESCRIPTION     | ADDITIONAL INFO |
| :---------------------: | :---: | :-----: | :--: | :-----------------: | :-------------: |
| /questions/downvote/:id | PATCH |  token  |  -   | downvote a question |  authenticate   |

Response:
200

```

    "upvotes": [],
    "downvotes": [
    	"5d8b707ffbb4cc15be820f15"
    ],
    "answers": [
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5d8ba8c860999c2b4755006c",
            "description": "bau",
            "user": "5d8b1362fab52211c169dffc",
            "__v": 0
        }
    ],
    "_id": "5d8ba8c260999c2b4755006b",
    "title": "telolet",
    "description": "uizeeee",
    "user": "5d8b1362fab52211c169dffc",
    "__v": 0
}
```

400

```
{
    "message": "You already downvoted this question"
}
```



|     ROUTE      |  HTTP  | HEADERS | BODY |    DESCRIPTION    | ADDITIONAL INFO |
| :------------: | :----: | :-----: | :--: | :---------------: | :-------------: |
| /questions/:id | DELETE |  token  |  -   | delete a question |  authenticate   |

Response:
200

```
{
    "message": "Deleted!"
}
```

401

```
{
    "message": "You need to login first"
}
```

**Answer API**



|        ROUTE         | HTTP | HEADERS |             BODY             |    DESCRIPTION     | ADDITIONAL INFO |
| :------------------: | :--: | :-----: | :--------------------------: | :----------------: | :-------------: |
| /answers/:questionId | POST |  token  | description:String(required) | Register an answer |  authenticated  |

Response:
201

```
{
    "upvotes": 0,
    "downvotes": 0,
    "answers": [
        "5d8ae7cc9176260a83d3b0db",
        "5d8ae93ca51a3d0a998ff898"
    ],
    "_id": "5d8ae44dec787a09e75aefcd",
    "title": "gini ya",
    "description": "gini cara nya",
    "user": "5d8ae0086527df0918be7130",
    "__v": 2
}
```

400

```
{
    "message": "Description must be filled"
}
```



|        ROUTE        | HTTP  | HEADERS | BODY |   DESCRIPTION    | ADDITIONAL INFO |
| :-----------------: | :---: | :-----: | :--: | :--------------: | :-------------: |
| /answers/upvote/:id | PATCH |  token  |  -   | upvote an answer |  authenticate   |

Response:
200

```

```

401

```

```





|         ROUTE         | HTTP  | HEADERS | BODY |    DESCRIPTION     | ADDITIONAL INFO |
| :-------------------: | :---: | :-----: | :--: | :----------------: | :-------------: |
| /answers/downvote/:id | PATCH |  token  |  -   | downvote an answer |  authenticate   |

Response:
200

```

```

401

```

```

