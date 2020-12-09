import {evaluateNPL} from './NlpAPI';
import {verifyUrl} from './utils';

export const IndexPage=()=>{
    const btnEvaluate = document.getElementById('btnEvaluate');
    const txtUrl = document.getElementById('txtUrl');
    const lblAgreement = document.getElementById('lblAgreement');
    const lblConfidence = document.getElementById('lblConfidence');
    const lblIrony = document.getElementById('lblIrony');
    const lblSubjectivity = document.getElementById('lblSubjectivity');

    btnEvaluate.addEventListener('click',async (event) => {
        const result=await evaluateNews(txtUrl.value);
        if(result){
            fillNewsInformation(result);
        }
    })
    const evaluateNews= async (url)=>{
        if(url && !verifyUrl(url)) return alert('Invalid Url try with https or ftp');
        const result = await evaluateNPL(url);
        return result;
    }
    const fillNewsInformation=({agreement,confidence,irony,subjectivity})=>{
        lblAgreement.innerHTML=agreement;
        lblConfidence.innerHTML=confidence;
        lblIrony.innerHTML=irony;
        lblSubjectivity.innerHTML=subjectivity;
    }
}