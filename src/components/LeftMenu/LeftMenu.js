import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faUser,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import TweetModal from "../Modal/TweetModal";
import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import LogoWhite from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const { setRefresCheckLogin } = props;

  const [showModal, setShowModal] = useState(false);
  const user = useAuth();

  const logout = () => {
    logoutApi();
    setRefresCheckLogin(true);
  };

  return (
    <div className="left-menu">
      <img className="logo" src={LogoWhite} alt="Twittor" />

      <Link to="/">
        {" "}
        <FontAwesomeIcon icon={faHome} /> Inicio
      </Link>
      <Link to="/users">
        {" "}
        <FontAwesomeIcon icon={faUsers} /> Usuarios
      </Link>
      <Link to={`/${user?._id}`}>
        {" "}
        <FontAwesomeIcon icon={faUser} /> Perfil
      </Link>
      <Link to="" onClick={logout}>
        {" "}
        <FontAwesomeIcon icon={faPowerOff} /> Salir
      </Link>

      <Button onClick={() => setShowModal(true)}>Twittoar</Button>

      <TweetModal show={showModal} setShow={setShowModal} />
    </div>
  );
}
