import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/?scroll=book-section', { replace: true });
  }, [navigate]);

  return null;
};

export default Book;
