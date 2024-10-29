# Little URL

## Description

REST API Application made for the Epic Coding Challenge to the Backend Software Engineer position.
The goal is to receive an URL and return a shorter one, when the user fetches the shorter url, the system will redirect to the original URL.

## Features

- Expire URL’s ✅
- Add support for an API key ✅
- Input validation ✅
- A GUI to create the URL’s ✅

---

## Installation

### Prerequisites

- **Node.js** version 14 or higher
- **Docker** (optional, to run in a Docker environment)
- **MongoDB** (local or Docker)

### Installation Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Run with Docker:
   ```bash
   docker-compose up --build
   ```

3. Configure environment variables:
   - Create a `.env` file in the root of the project with the following variables:
     ```env
        DUPLICATE_RNG_INDEX_URL_MAX_ATTEMPT=3
        INITIAL_MIN_URL_SIZE=3
        PORT=3000
        MONGODB_URL_STRING=mongodb://root:password@localhost:27017/db?authSource=admin
     ```
### Obs

If you opt to use a local mongodb instance, you'll need to add the api-key manually, as the "init-api-key.js" does when the mongodb docker gets initialized.

---

## How to Run the Application

### Run Locally

1. Start the mongodb (docker or local)

2. Start the application:
   ```bash
   npm start
   ```

3. Access the application at:
   ```
   http://localhost:3000
   ```

### Run with Docker

1. Run the command:
   ```bash
   docker-compose up
   ```

2. Access the application at:
   ```
   http://localhost:3000
   ```

---

## Tests

Run tests with Jest:
```bash
npm test
```

---

## API Endpoints

### Create a Shortened URL

- **URL**: `/url`
- **Method**: `POST`
- **Authentication**: Requires API Key (`x-api-key` in the header), for the sake of this test, the default apikey will be "f26ba4a95c9aa3b60731b764ef542202" (regarding the security, this wouldnt be done this way in other environment such as production, i'm just trying to simplificate things)
- **Body**:
  ```json
  {
    "targetUrl": "https://www.example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "http://localhost:3000/abc123"
  }
  ```

### Redirect to the Original URL

- **URL**: `/{shortUrl}`
- **Method**: `GET`
- **Example**:
  ```
  http://localhost:3000/abc123
  ```

---


## Next Steps

Things that would be nicer to add to this project

1. Implement logging with Winston and save to an ELK (elasticsearch, logstash, kibana) instance
2. Create a Swagger/OpenAPI documentation
3. Generate some metrics to use at Grafana
    - request times
    - creation usage
    - read usage
    - responses (4XX, 5XX)
4. Cache with Redis (the read could be cached server side in redis.)
5. Rate Limit (to help prevent some DDOS attempt, or someone bad intentioned)
6. Authentication with JWT (so that users can view and manage their URLs)
