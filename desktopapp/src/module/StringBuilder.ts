<<<<<<< Updated upstream
export function removeColorCode(input: string) {
    // eslint-disable-next-line no-control-regex
    let colorCodeRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\\x1b\[[0-9;]*m/g
    return input.replace(colorCodeRegex, '')
=======
export function removeColorCode(input: string) {
    // eslint-disable-next-line no-control-regex
    let colorCodeRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\\x1b\[[0-9;]*m/g
    return input.replace(colorCodeRegex, '')
>>>>>>> Stashed changes
}