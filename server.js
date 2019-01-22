const app = require('express')()
const { WebhookClient } = require('discord.js')
const Hook = new WebhookClient(process.env.ID, process.env.TOKEN)
const https = require('https')

app.post('/', (req,res) => {
  const auth = req.body.auth
  
  if (auth) {
    if (auth == process.env.AUTH) {
      console.log(`POST request from ROBLOX game ${req.body.name}`)
      Hook.send({username: "Support", embeds: [{title: req.body.reportType, description: req.body.userMsg, footer: `Requested by ${req.body.user}`}]})
    } else {
      res
      .status(401)
      .send({ code: 401, msg: "Authorization invalid." })
    }
  }
})

app.get('/', (req, res) => {
  res.status(405);
  res.send({ code: 405, msg: "Method not allowed." });
})

function launch() {
  https.createServer(app).listen(5000)
  app.listen(4500)
}
