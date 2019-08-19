import React, { useState } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const Navbar=()=> {
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);

  const [current, setCurrent] = useState(path);

  const handleClick = ({ key }) => {
    console.log("click ", key);
    setCurrent(key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">
          <Icon type="home" />
          Home
        </Link>
      </Menu.Item>

      <Menu.Item key="login">
        <Link to="/login">Login</Link>
      </Menu.Item>

      <Menu.Item key="register">
        <Link to="/register">Register</Link>
      </Menu.Item>
    </Menu>
  );
}
export default Navbar;
