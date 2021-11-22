import React from "react";
import styled from "styled-components";
import { MdLocationOn, MdLink } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { getDateString } from "./GetDate";

const AvatarContainer = styled.div`
  & > img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    filter: drop-shadow(2px 2px 2px ${({ theme }) => theme.fontColor});
    display: flex;
    margin: auto;
  }
`;

const StatBox = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  font-weight: bold;
  border-radius: 15px;
`;

const Link = styled.div`
  & > a {
    color: ${({ theme }) => theme.fontColor};
  }
`;

const User = ({ userDetails }) => {
  const {
    name,
    username,
    created_at,
    bio,
    followers,
    following,
    repos,
    avatar,
    location,
    company,
    twitter,
    blog,
  } = userDetails;
  const [year, monthString, day] = getDateString(created_at);
  return (
    <>
      <div className="row p-lg-4 p-2">
        <AvatarContainer className="col-sm-12 col-lg-3 pb-3">
          <img src={avatar} alt={username} />
        </AvatarContainer>
        <div className="d-flex flex-column col-sm-12 col-lg-9">
          <div className="row justify-content-between">
            <div className="col-sm-12 col-lg-7">
              <h4 className="full-name">{name}</h4>
              <Link>
                <a href={`https://github.com/${username}`} target="__blank">
                  @{username}
                </a>
              </Link>
            </div>
            <p className="col-sm-12 col-lg-5 pt-2">
              Joined {`${day} ${monthString} ${year}`}
            </p>
          </div>
          <div className="py-3">
            <p>{bio}</p>
            <StatBox className="p-2 text-center row justify-content-between">
              <div className="d-flex flex-column col-sm-12 col-lg-4">
                <p>Repos</p>
                <h5>{repos}</h5>
              </div>
              <div className="d-flex flex-column col-sm-12 col-lg-4">
                <p>Followers</p>
                <h5>{followers}</h5>
              </div>
              <div className="d-flex flex-column col-sm-12 col-lg-4">
                <p>Following</p>
                <h5>{following}</h5>
              </div>
            </StatBox>
            <div className="row pt-4 justify-content-between">
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
                  {twitter ? <span>{twitter}</span> : <span>Not Given</span>}
                </div>
                <div className="info d-flex">
                  <MdLink size="20px" />
                  {blog ? (
                    <Link>
                      <a href={blog} target="__blank">
                        Visit Website
                      </a>
                    </Link>
                  ) : (
                    <span>Not Given</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
