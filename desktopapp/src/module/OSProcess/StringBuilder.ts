export function removeColorCode(input: string) {
    // eslint-disable-next-line no-control-regex
    let regex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\\x1b\[[0-9;]*m/g
    return input.replace(regex, '')
}
//cut type of node in Network config etc orderer,peer,ca
export function getOrgData(input:string){
   // console.log(input)
    const regex = /[a-zA-Z0-9]*./;
    return input.replace(regex, '')
} 
export function fixOrgName(orgName:string){
    const regex = /\./g;
    return orgName.replace(regex, "-")
}