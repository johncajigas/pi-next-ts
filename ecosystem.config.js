
module.exports = {
    apps:[
        {
            name:'cajigasdev2',
            script: 'yarn start',
            ignore_watch:["node_modules"],
            env:{
                "NODE_ENV":"production"
            }
        }
    ]
}