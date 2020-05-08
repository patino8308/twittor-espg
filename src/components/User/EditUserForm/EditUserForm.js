import React, { useState, useCallback } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

import es from "date-fns/locale/es";
import { useDropzone } from "react-dropzone";

import { Camara } from "../../../utils/icons";
import { API_HOST } from "../../../utils/constant";
import { uploadBannerApi } from "../../../api/user";
import { uploadAvatarApi } from "../../../api/user";
import { updatedInfoApi } from "../../../api/user";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialValue(user));
  const [bannerUrl, setBannerUrl] = useState(
    user?.Banner ? `${API_HOST}/obtenerBanner?id=${user.ID}` : null
  );
  const [avatarUrl, setAvatarUrl] = useState(
    user?.Banner ? `${API_HOST}/obtenerAvatar?id=${user.ID}` : null
  );
  const [bannerFile, setBannerFile] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDropBanner = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
  });
  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyBoard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });
  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyBoard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (bannerFile) {
      await uploadBannerApi(bannerFile).catch(() => {
        toast.error("Error al subir el nuevo Banner");
      });
    }
    if (avatarFile) {
      await uploadAvatarApi(avatarFile).catch(() => {
        toast.error("Error al subir el nuevo Avatar");
      });
    }
    await updatedInfoApi(formData)
      .then(() => {
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Error al actualizar");
      });
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="edit-user-form">
      <div
        className="banner"
        style={{ backgroundImage: `url('${bannerUrl}')` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <Camara />
      </div>
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
        {...getRootAvatarProps()}
      >
        <input {...getInputAvatarProps()} />
        <Camara />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                defaultValue={formData.nombre}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                defaultValue={formData.apellidos}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            row="3"
            placeholder="Biografia"
            type="text"
            name="biografia"
            defaultValue={formData.biografia}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Sitio Web"
            name="sitioweb"
            defaultValue={formData.sitioweb}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <DatePicker
            placeholder="Fecha de Nacimiento"
            locale={es}
            selected={new Date(formData.fechaNacimiento)}
            onChange={(value) =>
              setFormData({ ...formData, fechaNacimiento: value })
            }
          />
        </Form.Group>
        <Button className="btn-submit" variant="primary" type="submit">
          {loading && <Spinner animation="border" size="sm" />}Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValue(user) {
  return {
    nombre: user.Nombre || "",
    apellidos: user.Apellidos || "",
    biografia: user.Biografia || "",
    sitioweb: user.SitioWeb || "",
    fechaNacimiento: user.FechaNacimiento || "",
  };
}
