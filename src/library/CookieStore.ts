import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const setState = (key: string, value: any, maxAge = 0) => {
  const encodedValue = jwt.sign({ value }, "Dollars$Dollars2025");
  cookies().set(key, encodedValue, { maxAge: maxAge });
};

const getState = (key: string): any => {
  try {
    const getToken: any = cookies().get(key)?.value;
    if (getToken) {
      const decodedValue: any = jwt.verify(getToken, "Dollars$Dollars2025");
      return decodedValue?.value;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};
const deleteState = (key: string) => {
  cookies().delete(key);
};

const CookieStore = {
  setState,
  getState,
  deleteState,
};

export default CookieStore;
