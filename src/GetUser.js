export const getRepos = async (user) => {
  const url = `https://api.github.com/users/${user}/repos?sort=stars&per_page=12`;
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFollowers = async (user) => {
  const url = `https://api.github.com/users/${user}/followers?per_page=10`;
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const searchUsers = async (query) => {
  if (!query || query.length < 2) return [];
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=5`;
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUser = async (user) => {
  const url = `https://api.github.com/users/${user}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return {};
    const data = await response.json();
    return {
      name: data.name,
      username: data.login,
      created_at: data.created_at,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      repos: data.public_repos,
      gists: data.public_gists,
      avatar: data.avatar_url,
      location: data.location,
      company: data.company,
      twitter: data.twitter_username,
      blog: data.blog,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};
