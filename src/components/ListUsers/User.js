import React, { useState, useEffect } from "react";
import { Media, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST } from "../../utils/constant";
import { getUserApi } from "../../api/user";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";

export default function User(props) {
  const { user } = props;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserApi(user.ID).then((response) => {
      setUserInfo(response);
    });
  }, [user]);
  return (
    <Media as={Link} to={`/${user.ID}`} className="list-users__user">
      <Image
        width={64}
        height={64}
        roundedCircle
        className="mr-3"
        src={
          userInfo?.Avatar
            ? `${API_HOST}/obtenerAvatar?id=${user.ID}`
            : AvatarNoFound
        }
        alt={`${user.Nombre} ${user.Apellidos}`}
      />
      <Media.Body>
        <h5>
          {user.Nombre} {user.Apellidos}
        </h5>
        <p>{userInfo?.Biografia}</p>
      </Media.Body>
    </Media>
  );
}
