import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import useSession from "./useSession";
import db from "../database/db";

export default function useUserData() {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const fetchPosts = async () => {
    setIsLoading(true);
    // TODO
    const fetchData = async () => {
      if (session != null) {
        try {
          let userQuery = db
            .from("users")
            .select()
            .eq("email", session.user.email);
          const { data: user } = await userQuery;
          if (user) {
            setUserData(user[0]);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchData();
    setIsLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, [session]);

  return {
    userData,
    setUserData,
  };
}
