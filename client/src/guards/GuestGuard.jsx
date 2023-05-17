import React from "react";
import { useNavigate } from "react-router-dom";
// import useAuth from "hooks/useAuth";
// import { PATH_AUTH } from "../routes/path.js";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  // const { isLoading, isAuthenticated } = useAuth();
  const isLoading = false;

  const navigate = useNavigate();

  React.useEffect(() => {
    // if (!isAuthenticated) return;

    return navigate("/");
  }, []);

  if (isLoading) {
    return <div>loading auth login</div>;
  }
  return <>{children}</>;
}
