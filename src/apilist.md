# Devtinder APIS

authRouter

- POST /signup
- POST /login
- POST /logout

profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/passwor d

connectionRequestRouter

- POST /request/send/:status/:userId

- POST /request/send/intereted/:userId
- POST /request/send/ignored/:userId

- POST /request/review/:status/:requestId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed

Status: ignore (pass), interested (like), accepted, rejected
