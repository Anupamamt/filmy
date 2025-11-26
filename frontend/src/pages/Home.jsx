import { useEffect, useState } from "react";
import Header from "../components/Header";
import Listing from "../components/Listing";
import { categories } from "../api/api";
import {Box} from '@mui/material'
export default function Home() {
  const [cats, setCategories] = useState([]);

  const fetchCats = async () => {
    try {
      const data = await categories();
      setCategories(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <>
      <Header />

      <Box sx={{padding:'10px', marginTop: "100px"}}>

        {cats.map((cat) => (
          <Listing key={cat.id} category={cat} />
        ))}

      </Box>

    </>
  );
}
