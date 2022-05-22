import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function createBookmark(req, res) {

  const { accessToken } = await getAccessToken(req, res);
  const apiResponse = await fetch(`http://localhost:8001/bookmarks/create`, {
    method: "POST",

    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      
    },
    body: req.body,
  }).then((response) => response.json());
  res.status(200).json(apiResponse);
});
