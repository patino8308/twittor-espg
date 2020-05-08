import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";

import { values, size } from "lodash";
import { toast } from "react-toastify";

import { isEmailValid } from "../../utils/validation";
import { signUpApi } from "../../api/auth";

import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setShowModal } = props;
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
      } else if (formData.password !== formData.repeatPassword) {
        toast.warning("Las contraseñas deben ser iguales");
      } else if (size(formData.password) < 6) {
        toast.warning("Las contraseñas debe tener almenos 6 caracteres");
      } else {
        setSignUpLoading(true);
        signUpApi(formData)
          .then((response) => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              toast.success("El registro ha sido correcto");
              setShowModal(false);
              setFormData(initialFormValue());
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
    <div className="sing-up-from">
      <h2>Crea tu Cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="nombre"
                defaultValue={formData.nombre}
                placeholder="Nombre"
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="apellidos"
                defaultValue={formData.apellidos}
                placeholder="Apellidos"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            name="email"
            defaultValue={formData.email}
            placeholder="Correo Electronico"
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                name="password"
                defaultValue={formData.password}
                placeholder="Contraseña"
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                name="repeatPassword"
                defaultValue={formData.repeatPassword}
                placeholder="Repetir Contraseña"
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signUpLoading ? "Registrarse" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
