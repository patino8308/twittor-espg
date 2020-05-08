import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { API_HOST } from "../../../utils/constant";
import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../../User/EditUserForm";
import {
  checkFollowApi,
  followUserApi,
  unFollowUserApi,
} from "../../../api/follow";
import AvatarNoFound from "../../../assets/png/avatar-no-found.png";
import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);

  const bannerUrl = user?.Banner
    ? `${API_HOST}/obtenerBanner?id=${user.ID}`
    : null;

  const avatarUrl = user?.Avatar
    ? `${API_HOST}/obtenerAvatar?id=${user.ID}`
    : AvatarNoFound;

  useEffect(() => {
    if (user) {
      checkFollowApi(user?.ID).then((response) => {
        if (response?.status) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
    setReloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    followUserApi(user.ID).then(() => {
      setReloadFollow(true);
    });
  };
  const onUnFollow = () => {
    unFollowUserApi(user.ID).then(() => {
      setReloadFollow(true);
    });
  };

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
      {user && (
        <div className="options">
          {loggedUser._id === user.ID && (
            <Button onClick={() => setShowModal(true)}>Editar Perfil</Button>
          )}

          {loggedUser._id !== user.ID &&
            following !== null &&
            (following ? (
              <Button onClick={onUnFollow} className="unfollow">
                <span>Siguiendo</span>
              </Button>
            ) : (
              <Button onClick={onFollow}>Seguir</Button>
            ))}
        </div>
      )}
      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="editar perfil"
      >
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>
    </div>
  );
}
