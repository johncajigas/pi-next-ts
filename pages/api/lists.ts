import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function lists(req,res){
    const {accessToken} = await getAccessToken(req,res);
    fetch('http://localhost:8001/task-invoicer/lists',{
      headers:{
        authorization:`Bearer ${accessToken}`
      }
    }).then(async response => {
      const lists = await response.json();
      res.status(200).json(lists);
  })

});