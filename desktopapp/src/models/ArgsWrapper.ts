import { ChainCode } from "./ChainCode";



class ArgsCCWrapper {

    argsCCWrapper(args: any) {
        let newArgs = []
        let parameterArg = ""
        args.forEach((res: any, index) => {
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
    basicCCWrapper(args:any,ccObj: ChainCode) {
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
        return args.concat(newArgs)
    }


}





export default new ArgsCCWrapper()