import { ReactNode, createContext, useEffect, useState } from "react";
import { toastError } from "../components/Toast";
import { getWithAuth } from "../api/api";

interface User {
  token: string | null;
  id: string;
  nama: string;
  role: string;
}

export type UserTypeContext = {
  user: User | null;
};

const defaultValue = {
  user: { token: null, id: "", nama: "", role: "" },
};

export const UserContext = createContext<UserTypeContext>(defaultValue);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (user: User) => {
    setUser(user);
  };

  const token = localStorage.getItem("access_token");
  const getUser = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "user");
        const data = response.data?.data;
        updateUser({
          token: token,
          id: data.id,
          nama: data.nama,
          role: data.role,
        });
      } catch (error) {
        toastError("Get User Failed");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
