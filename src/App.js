import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles, { lightTheme, darkTheme } from "./themes";
import { MdLightMode, MdDarkMode, MdSearch } from "react-icons/md";
import { getUser } from "./GetUser";
import User from "./User";
import _ from "lodash";
import notfound from "./images/not-found.png";
import finduser from "./images/github-octocat.png";

const Container = styled.div`
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid ${({ theme }) => theme.fontColor};
  border-radius: 15px;
  padding: 25px;
  background-color: ${({ theme }) => theme.containerBackgroundColor};
  filter: drop-shadow(2px 2px 2px ${({ theme }) => theme.fontColor});

  @media only screen and (max-width: 600px) {
    width: 90% !important;
  }
`;

const SearchContainer = styled.div`
  & > form {
    width: 100%;
  }
  & > form input,
  form input:focus {
    color: ${({ theme }) => theme.fontColor};
    background-color: ${({ theme }) => theme.backgroundColor};
    border: none;
    outline: none;
    display: block;
    width: 100%;
  }
  border: 1px solid ${({ theme }) => theme.fontColor};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const App = () => {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({});

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };
  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const userData = await getUser(username);
    setUserDetails(userData);
  };

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container className="w-50 mx-auto my-5">
        <div className="d-flex justify-content-between">
          <h3>devfinder</h3>
          <span className="toggle-btn" onClick={() => themeToggler()}>
            {theme === "light" ? (
              <MdDarkMode size="30px" />
            ) : (
              <MdLightMode size="30px" />
            )}
          </span>
        </div>
        <SearchContainer className="search-bar d-flex my-3 p-1 justify-content-between">
          <form onSubmit={handleInputSubmit}>
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Search GitHub username.."
            />
          </form>
          <MdSearch size="30px" />
        </SearchContainer>
        {!_.isEmpty(userDetails) ? (
          userDetails.username ? (
            <User userDetails={userDetails} />
          ) : (
            <div className="d-flex justify-content-center">
              <img src={notfound} alt="not-found" className="not-found" />
            </div>
          )
        ) : (
          <div className="d-flex flex-column align-items-center">
            <h3>Find a User</h3>
            <img src={finduser} alt="find-user" className="find-user" />
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
