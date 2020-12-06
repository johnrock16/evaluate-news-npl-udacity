
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
let FormData = require('form-data')
const API_NPL='https://api.meaningcloud.com'

const app = express();
const port = 3000;

dotenv.config();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    // methods: "GET"
}
app.use(cors(corsOptions));

app.use(express.static('dist'))

app.get('/',(req,res)=>{
    res.sendFile('../../dist/index.html');
})

app.post('/analizeNews', async (req, res) => {
    const {url} = req.body
    const urlFetch=`${API_NPL}/sentiment-2.1?${new URLSearchParams({
        key:process.env.API_KEY,
        of:'json',
        txt:url,
        lang:'en'
    })}`
    fetch(urlFetch,{
        method:'POST',
    }).then((resolve)=>{
        if(resolve.status===200){
            return resolve.json();
        }
    }).then((result)=>{
        res.send(result)
    })

});

app.listen(port, () => {
    console.log(`Server is running`);
});