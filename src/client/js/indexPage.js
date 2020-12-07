import {evaluateNPL} from './NplAPI';
import {verifyUrl} from './utils';

const btnEvaluate = document.getElementById('btnEvaluate');
const txtUrl = document.getElementById('txtUrl');
const lblAgreement = document.getElementById('lblAgreement');
const lblConfidence = document.getElementById('lblConfidence');
const lblIrony = document.getElementById('lblIrony');
const lblSubjectivity = document.getElementById('lblSubjectivity');

export const IndexPage=()=>{
    btnEvaluate.addEventListener('click',(event) => {
        evaluateNews(txtUrl.value)
    })

    const evaluateNews= async (url)=>{
        if(!verifyUrl(url)) return alert('Invalid Url try with http or ftp');
        const result = await evaluateNPL(url.value);
        if (result) {
            fillNewsInformation(result);
        }
    }
    

    const fillNewsInformation=({agreement,confidence,irony,subjectivity})=>{
        lblAgreement.innerHTML=agreement;
        lblConfidence.innerHTML=confidence;
        lblIrony.innerHTML=irony;
        lblSubjectivity.innerHTML=subjectivity;
    }
}

