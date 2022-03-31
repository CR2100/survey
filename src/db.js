import { createConnection } from 'mysql';
const db = createConnection({
  host: "localhost",
  user: "group3",
  password: "olemiss2022",
  database:"survey_maker"
})

export default db;