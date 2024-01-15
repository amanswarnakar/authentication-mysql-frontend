// Install Material-UI with: npm install @mui/material @emotion/react @emotion/styled

import React from "react";
import { Tabs, Tab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
  ];  

  return (
      <Tabs value={location.pathname}>
        {navLinks.map((link) => (
          <Tab 
          
            key={link.to}
            label={link.label}
            value={link.to}
            component={Link}
            to={link.to}
          />
        ))}
      </Tabs>
  );
};

export default Navbar;
