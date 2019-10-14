'use strict'

const {Client} = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true
  })

  router.get("/search", function(request, response){
      client.search({
          index:'assessment_forms',
          body: {
              query:{
                  match:{"name": query}
              }
          }
      }, function(error, data, status){
          if(error){
              return console.log(error)
          }
          else{
              response.send(data)
          }
      })
  })

  module.exports = router;