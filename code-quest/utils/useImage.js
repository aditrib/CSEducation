import { useState, useEffect } from "react";
import db from "../database/db";

export default function useImage({ path }) {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImageUri = async () => {
    setLoading(true);
    const fetchImageUri = async () => {
      try {
        const { data } = db.storage.from("images").getPublicUrl(path);
        if (data) {
          setImageUri(data["publicUrl"]);
        }
      } catch (error) {
        console.error("Error fetchig image URI:", error);
      }
    };
    fetchImageUri();
    setLoading(false);
  };

  useEffect(() => {
    fetchImageUri();
  }, []);
  return { imageUri, loading };
}
