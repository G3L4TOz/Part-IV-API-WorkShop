
---

### API ไม่มี path หรือเป็น /

|  Title |   |
|---|---|
|  Full URL | http://localhost:3000/  |
|  Request Method | GET |

---
### API มี parameter ชื่อ message = ข้อความ

|  Title |   |
|---|---|
|  Full URL | http://localhost:3000/?message=abc |
|  Request Method | GET |

#### Query Parameter

| Key name | Description | Sample |
|---|---|---|
|message|ระบุข้อความ| abc |

---

### API มี path เป็น /api/sayhi และ body เป็น { “name”: “John” } 

|  Title |   |
|---|---|
|  Path | /api/sayhi |
|  Full URL | http://localhost:3000/api/sayhi |
|  Request Method | POST |

#### Request Body (JSON)

| Key name | Description | Sample |
|---|---|---|
|name|ระบุชื่อ| { "name": "John" } |