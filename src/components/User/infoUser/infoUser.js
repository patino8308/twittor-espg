import React from "react";
import moment from "moment";
import localization from "moment/locale/es";

import { Link, DateBirth } from "../../../utils/icons";

import "./infoUser.scss";

export default function infoUser(props) {
  const { user } = props;

  return (
    <div className="info-user">
      <h2 className="name">
        {user?.Nombre}
        {user?.Apellidos}
      </h2>
      <p className="email">{user?.Email}</p>
      {user?.Biografia && <div className="description">{user.Biografia}</div>}
      <div className="more-info">
        {user?.SitioWeb && (
          <a
            href={user.SitioWeb}
            alt={user.SitioWeb}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link />
            {user.SitioWeb}
          </a>
        )}
        {user?.FechaNacimiento && (
          <p>
            <DateBirth />
            {moment(user.FechaNacimiento)
              .locale("es", localization)
              .format("LL")}
          </p>
        )}
      </div>
    </div>
  );
}
