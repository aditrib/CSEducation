import { useEffect, useState } from "react";

import { Redirect } from "expo-router";

import db from "./../database/db";
import Loading from "./../components/Loading";
import { PaperProvider } from "react-native-paper";
import useUserData from "../utils/useUserData";
import { UserContext } from "../context/UserContext";
import Login from "../components/login/Login";

export default function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Default to true for initial load

  useEffect(() => {
    setIsLoading(true);

    db.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = db.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session) {
    return (
      <PaperProvider>
        <Redirect href="/tabs/home" />
      </PaperProvider>
    );
  } else if (isLoading) {
    return <Loading />;
  } else {
    return <Login />;
  }
}
