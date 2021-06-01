import ChainCode  from "./ChainCode";
class ArgsCCWrapper {

    argsCCWrapper(args: any) {
        //TODO is window data type add linux case
        let newArgs:any = []
        let parameterArg = ""
        args.forEach((res: any, index:number) => {
            if (index != args.length - 1)
                parameterArg += "\"" + res + "\","
            else
                parameterArg += "\"" + res + "\""
        });
        newArgs.push("-p")
        newArgs.push(parameterArg)
        ///to do marbel json object data
        return newArgs
    }
    basicCCWrapper(args:any,ccObj: ChainCode,org:string) {
        let newArgs = []
        // cc name
        newArgs.push("-n")
        newArgs.push(ccObj.name)
        //cc language
        newArgs.push("-l")
        newArgs.push(ccObj.type)
        //cc version
        newArgs.push("-v")
        newArgs.push(ccObj.version)
        //cc channel
        newArgs.push("-c")
        newArgs.push(ccObj.channel)
        //cc channel
        newArgs.push("-o")
        newArgs.push(org)
        //set to minifab output
        return args.concat(newArgs)
    }


}





export default new ArgsCCWrapper()