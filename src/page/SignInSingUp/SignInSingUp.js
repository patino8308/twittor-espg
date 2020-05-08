import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";

import LogoWhiteTwittor from "../../assets/png/logo-white.png";
import LogoTwittor from "../../assets/png/logo.png";

import "./SignInSingUp.scss";

export default function SignInSingUp(props) {
  const { setRefresCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };

  return (
    <>
      <Container className="signin-sigup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
            openModal={openModal}
            setShowModal={setShowModal}
            setRefresCheckLogin={setRefresCheckLogin}
          />
        </Row>
      </Container>
      <BasicModal show={showModal} setShowModal={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return (
    <Col className="signin-sigup__left" xs={6}>
      <img src={LogoTwittor} alt="Twittor" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Enterate de que esta hablando la gente.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Unete a la conversación.
        </h2>
      </div>
    </Col>
  );
}

function RightComponent(props) {
  const { openModal, setShowModal, setRefresCheckLogin } = props;
  return (
    <Col className="signin-sigup__right" xs={6}>
      <div>
        <img src={LogoWhiteTwittor} alt="Twitor" />
        <h2>Mira lo que esta pasando en el mundo en este momento</h2>
        <h3>Unete a Twittor hoy Mismo</h3>
        <Button
          variant="primary"
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
        >
          Registrate
        </Button>
        <Button
          onClick={() =>
            openModal(
              <SignInForm
                setShowModal={setShowModal}
                setRefresCheckLogin={setRefresCheckLogin}
              />
            )
          }
          variant="outline-primary"
        >
          Iniciar Sesión
        </Button>
      </div>
    </Col>
  );
}
