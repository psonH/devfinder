import { useState } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { BiGitRepoForked } from "react-icons/bi";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
};

const RepoCard = styled.a`
  display: block;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  padding: 12px;
  text-decoration: none !important;
  color: ${({ theme }) => theme.fontColor} !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const LangDot = styled.span`
  display: inline-block;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: ${({ color }) => color || "#ccc"};
  margin-right: 4px;
  vertical-align: middle;
`;

const RepoName = styled.p`
  font-weight: bold;
  font-size: 13px !important;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RepoDesc = styled.p`
  font-size: 11px !important;
  opacity: 0.75;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RepoMeta = styled.div`
  display: flex;
  gap: 12px;
  font-size: 11px !important;
  align-items: center;
`;

const FilterBtn = styled.button`
  background: ${({ $active, theme }) => $active ? theme.glowColor : theme.backgroundColor};
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid ${({ theme }) => theme.fontColor}40;
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.glowColor};
  }
`;

const RepoList = ({ repos }) => {
  const [sort, setSort] = useState("stars");
  const [langFilter, setLangFilter] = useState("all");

  if (!repos || repos.length === 0) return null;

  const languages = ["all", ...new Set(repos.filter((r) => r.language).map((r) => r.language))];

  const displayed = [...repos]
    .filter((r) => langFilter === "all" || r.language === langFilter)
    .sort((a, b) => {
      if (sort === "stars") return b.stargazers_count - a.stargazers_count;
      if (sort === "forks") return b.forks_count - a.forks_count;
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    })
    .slice(0, 6);

  return (
    <div className="mt-4">
      <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Top Repositories</p>
      <div className="d-flex flex-wrap mb-2" style={{ gap: "6px" }}>
        <span style={{ fontSize: "11px", opacity: 0.7, alignSelf: "center" }}>Sort:</span>
        {["stars", "forks", "newest"].map((s) => (
          <FilterBtn key={s} $active={sort === s} onClick={() => setSort(s)}>
            {s}
          </FilterBtn>
        ))}
        {languages.length > 2 && (
          <>
            <span style={{ fontSize: "11px", opacity: 0.7, alignSelf: "center", marginLeft: "4px" }}>
              Lang:
            </span>
            {languages.map((l) => (
              <FilterBtn key={l} $active={langFilter === l} onClick={() => setLangFilter(l)}>
                {l}
              </FilterBtn>
            ))}
          </>
        )}
      </div>
      <div className="row g-2">
        {displayed.length === 0 ? (
          <p style={{ opacity: 0.7, fontSize: "13px" }}>No repos match this filter.</p>
        ) : (
          displayed.map((repo) => (
            <div key={repo.id} className="col-sm-12 col-md-6">
              <RepoCard href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <RepoName>{repo.name}</RepoName>
                {repo.description && <RepoDesc>{repo.description}</RepoDesc>}
                <RepoMeta>
                  {repo.language && (
                    <span>
                      <LangDot color={LANG_COLORS[repo.language]} />
                      {repo.language}
                    </span>
                  )}
                  <span><AiFillStar /> {repo.stargazers_count}</span>
                  <span><BiGitRepoForked /> {repo.forks_count}</span>
                </RepoMeta>
              </RepoCard>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RepoList;
