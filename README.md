# typescript-crud-api

## Available endpoints

All routes are mounted under `/` by default.  Example host: `http://localhost:4000`.

### Accounts / Users

- `GET  /users` – list all users
- `GET  /users/:id` – fetch single user
- `POST /users` – create new account
- `PUT  /users/:id` – update account fields
- `PUT  /users/:id/verify` – toggle verified flag
- `DELETE /users/:id` – remove account

Aliases for the same handlers are available under `/accounts`.

### Departments

- `GET  /depts`
- `GET  /depts/:id`
- `POST /depts`
- `PUT  /depts/:id`
- `DELETE /depts/:id`

### Employees

- `GET  /employees`
- `GET  /employees/:id`
- `POST /employees` – body requires `{ empId, userId, position, deptId }`
- `PUT  /employees/:id`
- `DELETE /employees/:id`
- `POST /employees/:id/transfer` – body `{ deptId }` to move employee

### Requests (user workflow)

- `GET  /requests`
- `GET  /requests/:id`
- `POST /requests` – `{ userId, type, items }`
- `PUT  /requests/:id`
- `DELETE /requests/:id`
- `PUT  /requests/:id/workflow` – body `{ status: 'Pending'|'Approved'|'Rejected' }`

### Transfers (alternative helper)

- `POST /transfers` – body `{ employeeId, deptId }` (calls same logic as `employees/:id/transfer`)

## Testing with Postman‑Echo

If you want to exercise the endpoints without a database, simply start the server and forward requests through the Postman Echo service:

```
curl -X POST http://localhost:4000/users -H "Content-Type: application/json" \
     -d '{"name":"Alice"}'
```

The server will behave normally using its own MySQL database; the Postman‑Echo mention was only for experimentation earlier.

---

Build and run using:

```bash
npm run start:dev   # development
npm run build && npm start  # production
```
mysql 

username:root
password:09278401288Ian

