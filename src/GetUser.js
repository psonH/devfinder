export const getUser = async (user) => {
  let userData = {};
  const url = `https://api.github.com/users/${user}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      userData = {
        name: data.name,
        username: data.login,
        created_at: data.created_at,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        repos: data.public_repos,
        avatar: data.avatar_url,
        location: data.location,
        company: data.company,
        twitter: data.twitter_username,
        blog: data.blog,
      };
    })
    .catch((error) => {
      console.log(error);
    });
  return userData;
};
