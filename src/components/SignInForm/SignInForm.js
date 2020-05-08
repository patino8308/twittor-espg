import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

import { values, size } from "lodash";
import { toast } from "react-toastify";

import { isEmailValid } from "../../utils/validation";
import { signInApi, setTokenApi } from "../../api/auth";
import "./SignInForm.scss";

export default function SignInForm(props) {
  const { setRefresCheckLogin } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos del formulario");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Email Invalido");
      } else {
        setSignUpLoading(true);
        signInApi(formData)
          .then((response) => {
            if (response.message) {
              toast.warning(response.message);
            } else {
              setTokenApi(response.token);
              setRefresCheckLogin(true);
              //   setShowModal(false);
              //   setFormData(initialFormValue());
            }
          })
          .catch(() => {
            toast.error("Error del servidor, intentelo mas tarde");
          })
          .finally(() => {
            setSignUpLoading(false);
          });
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-in-form">
      <h2>Entrar</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Form.Control
            type="email"
            name="email"
            placeholder="Correo Electronico"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            name="password"
            placeholder="Contraseña"
            defaultValue={formData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signUpLoading ? "Iniciar Sesión" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    email: "",
    password: "",
  };
}
