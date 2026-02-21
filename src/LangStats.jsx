import styled from "styled-components";

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

const BarContainer = styled.div`
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  gap: 2px;
`;

const Bar = styled.div`
  height: 100%;
  background: ${({ color }) => color || "#ccc"};
  border-radius: 4px;
  width: ${({ pct }) => pct}%;
  transition: width 0.5s ease;
`;

const LangDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color || "#ccc"};
  flex-shrink: 0;
`;

const LangStats = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  const counts = {};
  repos.forEach((repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="mt-3 mb-2">
      <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Languages</p>
      <BarContainer>
        {sorted.map(([lang, count]) => (
          <Bar
            key={lang}
            color={LANG_COLORS[lang] || "#ccc"}
            pct={(count / total) * 100}
            title={`${lang}: ${Math.round((count / total) * 100)}%`}
          />
        ))}
      </BarContainer>
      <div className="d-flex flex-wrap mt-2" style={{ gap: "10px" }}>
        {sorted.map(([lang, count]) => (
          <span
            key={lang}
            style={{ fontSize: "11px", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <LangDot color={LANG_COLORS[lang] || "#ccc"} />
            {lang} {Math.round((count / total) * 100)}%
          </span>
        ))}
      </div>
    </div>
  );
};

export default LangStats;
