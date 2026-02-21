import { useState, useEffect } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { getFollowers } from "./GetUser";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(4px);
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.containerBackgroundColor};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  max-width: 380px;
  max-height: 480px;
  overflow-y: auto;
  color: ${({ theme }) => theme.fontColor};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const FollowerCard = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 10px;
  text-decoration: none !important;
  color: ${({ theme }) => theme.fontColor} !important;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundColor};
  }

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const FollowerList = ({ username, onClose }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFollowers(username).then((data) => {
      setFollowers(data);
      setLoading(false);
    });
  }, [username]);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p style={{ fontWeight: "bold", margin: 0 }}>Followers of @{username}</p>
          <MdClose size="22px" style={{ cursor: "pointer" }} onClick={onClose} />
        </div>
        {loading ? (
          <p style={{ textAlign: "center", opacity: 0.7 }}>Loading...</p>
        ) : followers.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.7 }}>No followers found.</p>
        ) : (
          followers.map((f) => (
            <FollowerCard
              key={f.id}
              href={`https://github.com/${f.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={f.avatar_url} alt={f.login} />
              <span>@{f.login}</span>
            </FollowerCard>
          ))
        )}
      </Modal>
    </Overlay>
  );
};

export default FollowerList;
