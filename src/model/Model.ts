import Mysql2 from "mysql2/promise";
const Mysql = Mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "esomaz",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const query = async (query: string) => {
  try {
    const q = await Mysql.query(query);
    if (q.length > 0) {
      return q[0];
    } else {
      return undefined;
    }
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};
const prepare = async (query: string, values: any[]) => {
  try {
    const q = await Mysql.execute(query, values);
    if (q.length > 0) {
      return q[0];
    } else {
      return undefined;
    }
  } catch (error: any) {
    return error.message;
  }
};

const Model = {
  query,
  prepare,
};

export default Model;
