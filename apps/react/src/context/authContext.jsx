import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ isLogin: false });

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
