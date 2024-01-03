"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextData {
  user: User;
  handleSignOut: any;
}

const UserContext = React.createContext({} as UserContextData);

export const useUser = () => {
  return React.useContext(UserContext);
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = React.useState<User>({} as User);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const getUser = () => user;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  React.useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ handleSignOut, user }}>
      {children}
    </UserContext.Provider>
  );
}
