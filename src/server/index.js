
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const API_NLP='https://api.meaningcloud.com'

const app = express();
const port = 3000;

dotenv.config();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(express.static('dist'))

app.get('/',(req,res)=>{
    res.sendFile('../../dist/index.html');
});

app.use('/analizeNews', function (req, res, next) {
    let isOK=false;
    if(req.body){
        const regexUrl=/^(ftp|https):\/\/[^ "]+$/;
        if(typeof req.body.url==='string' && regexUrl.test(req.body.url)){
            isOK=true;
        }
    }
    if(isOK){
        next();
    }
    else{
        res.sendStatus(400);
    }
})

app.post('/analizeNews', async (req, res) => {
    const {url} = req.body
    const urlFetch=`${API_NLP}/sentiment-2.1?${new URLSearchParams({
        key:process.env.API_KEY,
        of:'json',
        url:url,
        lang:'en'
    })}`
    fetch(urlFetch,{
        method:'POST',
    }).then((resolve)=>{
        if(resolve.status===200){
            return resolve.json();
        }
        res.sendStatus(500)
    }).then((result)=>{
        res.send(result);
    }).catch((error)=>{
        console.log(error);
    });

});

app.listen(port, () => {
    console.log(`Server is running`);
});