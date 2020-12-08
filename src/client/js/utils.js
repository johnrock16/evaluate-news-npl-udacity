export const verifyUrl=(url)=>{
    const regexUrl=/^(ftp|https):\/\/[^ "]+$/
    return regexUrl.test(url)
}