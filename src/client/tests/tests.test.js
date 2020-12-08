import {verifyUrl} from '../js/utils';
import {evaluateNPL} from '../js/NlpAPI';


describe("test url",()=>{
    test('valid url https', () => {
        expect(verifyUrl('https://www.google.com')).toEqual(true);
    });
    test('valid url ftp', () => {
        expect(verifyUrl('ftp://www.google.com')).toEqual(true);
    });
    test('invalid url http', () => {
        expect(verifyUrl('http://www.google.com')).toEqual(false);
    });
    test('invalid url any text', () => {
        expect(verifyUrl('anyTest.com')).toEqual(false);
    });
})

describe("Request Evaluate NLP",()=>{
    beforeEach(()=>{
        global.fetch = jest.fn().mockImplementation(()=> {
            const p = new Promise((resolve, reject) => {
              resolve({
                status:200,
                json: ()=>{ 
                  return {confidenty: 100}
                }
              });
            });
            return p;
        });
    });
    it("fetch sucessfully", async ()=>{
        const response = await evaluateNPL("url");
        expect(response.confidenty).toBe(100); 
    });
});