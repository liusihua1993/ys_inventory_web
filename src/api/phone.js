export function isvalidPhone (str) {
    const reg = /^1[3|4|5|7|8]\d{9}$/;
    return reg.test(str)
}