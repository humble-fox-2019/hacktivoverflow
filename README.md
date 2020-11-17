# hacktivoverflow

## database schema

- User
  ```
  name: string
  email: string
  password: string
  ```

- Question
  ```
  title: string
  description: string
  upvotes: [UserId],
  downvotes: [UserId],
  answers: [AnswersId]
  tags: array
  user: UserId
  ```

- Answer
  ```
  description: string,
  upvotes: [UserId],
  downvotes: [UserId],
  question: QuestionId
  user: UserId  
  ```

