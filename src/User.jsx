import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { MdLocationOn, MdLink, MdContentCopy, MdShare, MdCheck } from "react-icons/md";
import { FaTwitter, FaBook, FaUsers, FaUserFriends, FaCode } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { getDateString } from "./GetDate";
import RepoList from "./RepoList";
import LangStats from "./LangStats";
import FollowerList from "./FollowerList";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  animation: ${fadeInUp} 0.4s ease;
`;

const AvatarContainer = styled.div`
  & > img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    display: flex;
    margin: auto;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.08);
    }
  }
`;

const StatBox = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  backdrop-filter: blur(6px);
  font-weight: bold;
  border-radius: 15px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  padding: 8px;
  border-radius: 10px;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $clickable, theme }) =>
      $clickable ? theme.containerBackgroundColor : "transparent"};
  }
`;

const Link = styled.div`
  & > a {
    color: ${({ theme }) => theme.fontColor};
  }
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.fontColor};
  padding: 2px 6px;
  border-radius: 6px;
  transition: background 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-family: inherit;

  &:hover {
    background: ${({ theme }) => theme.backgroundColor};
  }
`;

const User = ({ userDetails, repos }) => {
  const {
    name,
    username,
    created_at,
    bio,
    followers,
    following,
    repos: repoCount,
    gists,
    avatar,
    location,
    company,
    twitter,
    blog,
  } = userDetails;

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  const [year, monthString, day] = getDateString(created_at);

  const handleCopy = () => {
    navigator.clipboard.writeText(username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?user=${username}`;
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <>
      {showFollowers && (
        <FollowerList username={username} onClose={() => setShowFollowers(false)} />
      )}
      <Wrapper>
        <div className="row p-lg-4 p-2">
          <AvatarContainer className="col-sm-12 col-lg-3 pb-3">
            <img src={avatar} alt={username} />
          </AvatarContainer>
          <div className="d-flex flex-column col-sm-12 col-lg-9">
            <div className="row justify-content-between">
              <div className="col-sm-12 col-lg-7">
                <h4 className="full-name">{name}</h4>
                <div className="d-flex align-items-center flex-wrap" style={{ gap: "6px" }}>
                  <Link>
                    <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
                      @{username}
                    </a>
                  </Link>
                  <IconBtn onClick={handleCopy} title="Copy username">
                    {copied ? <MdCheck size="14px" /> : <MdContentCopy size="14px" />}
                    <span style={{ opacity: 0.7 }}>{copied ? "Copied!" : "Copy"}</span>
                  </IconBtn>
                  <IconBtn onClick={handleShare} title="Share profile link">
                    {shared ? <MdCheck size="14px" /> : <MdShare size="14px" />}
                    <span style={{ opacity: 0.7 }}>{shared ? "Link copied!" : "Share"}</span>
                  </IconBtn>
                </div>
              </div>
              <p className="col-sm-12 col-lg-5 pt-2">
                Joined {`${day} ${monthString} ${year}`}
              </p>
            </div>
            <div className="py-3">
              <p>{bio}</p>
              <StatBox className="p-2 text-center row justify-content-between">
                <StatItem className="col-6 col-lg-3">
                  <FaBook size="16px" style={{ opacity: 0.7, marginBottom: "4px" }} />
                  <p style={{ margin: 0, fontSize: "11px" }}>Repos</p>
                  <h5 style={{ margin: 0 }}>{repoCount}</h5>
                </StatItem>
                <StatItem
                  className="col-6 col-lg-3"
                  $clickable
                  onClick={() => setShowFollowers(true)}
                  title="Click to view followers"
                >
                  <FaUsers size="16px" style={{ opacity: 0.7, marginBottom: "4px" }} />
                  <p style={{ margin: 0, fontSize: "11px" }}>Followers</p>
                  <h5 style={{ margin: 0 }}>{followers}</h5>
                </StatItem>
                <StatItem className="col-6 col-lg-3">
                  <FaUserFriends size="16px" style={{ opacity: 0.7, marginBottom: "4px" }} />
                  <p style={{ margin: 0, fontSize: "11px" }}>Following</p>
                  <h5 style={{ margin: 0 }}>{following}</h5>
                </StatItem>
                <StatItem className="col-6 col-lg-3">
                  <FaCode size="16px" style={{ opacity: 0.7, marginBottom: "4px" }} />
                  <p style={{ margin: 0, fontSize: "11px" }}>Gists</p>
                  <h5 style={{ margin: 0 }}>{gists}</h5>
                </StatItem>
              </StatBox>
              <div className="row pt-3 justify-content-between">
                <div className="col-sm-12 col-lg-6">
                  <div className="info">
                    <MdLocationOn size="20px" />
                    {location ? <span>{location}</span> : <span>Not Given</span>}
                  </div>
                  <div className="info">
                    <BsBuilding size="20px" />
                    {company ? <span>{company}</span> : <span>Not Given</span>}
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                  <div className="info">
                    <FaTwitter size="20px" />
                    {twitter ? (
                      <Link>
                        <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
                          @{twitter}
                        </a>
                      </Link>
                    ) : (
                      <span>Not Given</span>
                    )}
                  </div>
                  <div className="info">
                    <MdLink size="20px" />
                    {blog ? (
                      <Link>
                        <a href={blog} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </Link>
                    ) : (
                      <span>Not Given</span>
                    )}
                  </div>
                </div>
              </div>
              <LangStats repos={repos} />
              <RepoList repos={repos} />
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default User;
