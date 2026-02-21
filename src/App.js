import { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles, { lightTheme, darkTheme } from "./themes";
import { MdLightMode, MdDarkMode, MdSearch } from "react-icons/md";
import { getUser, getRepos, searchUsers } from "./GetUser";
import User from "./User";
import Skeleton from "./Skeleton";
import notfound from "./images/not-found.png";
import finduser from "./images/github-octocat.png";

const Container = styled.div`
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 25px;
  background: ${({ theme }) => theme.containerBackgroundColor};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, color 0.3s ease;

  @media only screen and (max-width: 576px) {
    width: 95% !important;
    padding: 15px;
  }

  @media only screen and (min-width: 577px) and (max-width: 992px) {
    width: 75% !important;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.fontColor}40;
  border-radius: 15px;
  background: ${({ theme }) => theme.backgroundColor};
  backdrop-filter: blur(6px);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;

  &:focus-within {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.glowColor};
    border-color: transparent;
  }

  & input {
    color: ${({ theme }) => theme.fontColor};
    background: transparent;
    border: none;
    outline: none;
    display: block;
    width: 100%;
    padding: 8px 12px;
    font-family: inherit;
  }
`;

const SuggestionsBox = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.containerBackgroundColor};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 50;
`;

const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.15s ease;
  color: ${({ theme }) => theme.fontColor};

  &:hover {
    background: ${({ theme }) => theme.backgroundColor};
  }

  & > img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`;

const RecentChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid ${({ theme }) => theme.fontColor}40;
  border-radius: 20px;
  padding: 2px 4px 2px 12px;
  font-size: 12px;
  font-family: inherit;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.containerBackgroundColor};
  }
`;

const ChipLabel = styled.span`
  cursor: pointer;
`;

const ChipRemove = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.5;
  font-size: 14px;
  line-height: 1;
  padding: 0 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  transition: opacity 0.15s ease, background 0.15s ease;

  &:hover {
    opacity: 1;
    background: ${({ theme }) => theme.fontColor}20;
  }
`;

const GradientTitle = styled.h3`
  background: linear-gradient(90deg, #74b9ff, #a29bfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
  margin: 0;
`;

const App = () => {
  const [theme, setTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedName, setSearchedName] = useState("");
  const [recentSearches, setRecentSearches] = useState(
    () => JSON.parse(localStorage.getItem("devfinder-searches") || "[]")
  );

  const saveRecentSearches = (updated) => {
    setRecentSearches(updated);
    localStorage.setItem("devfinder-searches", JSON.stringify(updated));
  };

  const removeSearch = (name, e) => {
    e.stopPropagation();
    saveRecentSearches(recentSearches.filter((s) => s !== name));
  };
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [toggling, setToggling] = useState(false);
  const searchRef = useRef(null);

  // URL deep linking on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");
    if (user) {
      setUsername(user);
      doSearch(user);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Live search suggestions with debounce
  useEffect(() => {
    if (username.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const timer = setTimeout(async () => {
      const results = await searchUsers(username);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }, 400);
    return () => clearTimeout(timer);
  }, [username]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const doSearch = async (name) => {
    if (!name.trim()) return;
    setShowSuggestions(false);
    setSearchedName(name.trim());
    setLoading(true);
    const [userData, repoData] = await Promise.all([
      getUser(name.trim()),
      getRepos(name.trim()),
    ]);
    setUserDetails(userData);
    setRepos(repoData);
    setLoading(false);

    const url = new URL(window.location);
    url.searchParams.set("user", name.trim());
    window.history.pushState({}, "", url);

    const updated = [
      name.trim(),
      ...recentSearches.filter((s) => s !== name.trim()),
    ].slice(0, 5);
    saveRecentSearches(updated);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    doSearch(username);
  };

  const themeToggler = () => {
    setToggling(true);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setTimeout(() => setToggling(false), 400);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container className="w-50 mx-auto my-5">
        <div className="d-flex justify-content-between align-items-center">
          <GradientTitle>devfinder</GradientTitle>
          <span
            className={`toggle-btn ${toggling ? "toggle-spin" : ""}`}
            onClick={themeToggler}
          >
            {theme === "light" ? (
              <MdDarkMode size="30px" />
            ) : (
              <MdLightMode size="30px" />
            )}
          </span>
        </div>

        <SearchWrapper className="my-3" ref={searchRef}>
          <SearchContainer className="p-1">
            <form
              onSubmit={handleInputSubmit}
              className="d-flex w-100 align-items-center"
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Search GitHub username.."
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              />
              <button
                type="submit"
                style={{ background: "none", border: "none", cursor: "pointer", padding: "0 4px", display: "flex" }}
              >
                <MdSearch size="28px" />
              </button>
            </form>
          </SearchContainer>
          {showSuggestions && (
            <SuggestionsBox>
              {suggestions.map((s) => (
                <SuggestionItem
                  key={s.id}
                  onClick={() => { setUsername(s.login); doSearch(s.login); }}
                >
                  <img src={s.avatar_url} alt={s.login} />
                  <span>{s.login}</span>
                </SuggestionItem>
              ))}
            </SuggestionsBox>
          )}
        </SearchWrapper>

        {recentSearches.length > 0 && (
          <div className="d-flex flex-wrap mb-3" style={{ gap: "6px" }}>
            {recentSearches.map((s) => (
              <RecentChip key={s}>
                <ChipLabel onClick={() => { setUsername(s); doSearch(s); }}>{s}</ChipLabel>
                <ChipRemove onClick={(e) => removeSearch(s, e)}>×</ChipRemove>
              </RecentChip>
            ))}
          </div>
        )}

        {loading ? (
          <Skeleton />
        ) : Object.keys(userDetails).length > 0 ? (
          userDetails.username ? (
            <User userDetails={userDetails} repos={repos} />
          ) : (
            <div className="d-flex flex-column align-items-center py-3">
              <img src={notfound} alt="not-found" className="not-found" />
              <p className="mt-2 text-center">
                No user found for <strong>@{searchedName}</strong>
              </p>
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
