const OpenAI = require('openai');
const {Configuration, OpenAIApi} = OpenAI;

const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express();

const configuration = new Configuration({
  organization: "org-Qg3VNaibV7KVz8SHiZVx1glz",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// API middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// API routes
app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/form_post', async (req, res) => {

  const msg = req.body['chat'];
 
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Name occasion based on the following description : ${msg}`,
    max_tokens: 15,
    temperature: 0,
  });

  console.log(req.body); 
  if(response.data){
    if (response.data.choices) {
      console.log(response.data.choices[0].text);
    }
  }

  res.sendFile(__dirname + '/public/index.html')
})



app.listen(PORT, ()=> {
  console.log(`Listening on PORT : ${PORT}`);
})









