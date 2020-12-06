const btnEvaluate = document.getElementById('btnEvaluate');
const txtUrl = document.getElementById('txtUrl');
const lblAgreement = document.getElementById('lblAgreement');
const lblConfidence = document.getElementById('lblConfidence');
const lblIrony = document.getElementById('lblIrony');
const lblSubjectivity = document.getElementById('lblSubjectivity');


btnEvaluate.addEventListener('click', async (event) => {
    const resolve = await fetch('http://localhost:3000/analizeNews', {
        method: 'POST',
        body: {
            url: txtUrl.value
        }
    });
    console.log(resolve.status)
    if (resolve && resolve.status === 200) {
        try {
            const result = await resolve.json();
            if (result) {
                console.log('aqui',result)
                lblAgreement.innerHTML=result.agreement;
                lblConfidence.innerHTML=result.confidence;
                lblIrony.innerHTML=result.irony;
                lblSubjectivity.innerHTML=result.subjectivity;
            }
        } catch (error) {
            console.log(error)
        }
    }
})