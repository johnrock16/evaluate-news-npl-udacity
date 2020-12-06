export const verifyUrl=(url)=>{
    const regexUrl=/^(ftp|http):\/\/[^ "]+$/
    return regexUrl.test(url)
}