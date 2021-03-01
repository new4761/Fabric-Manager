import { stdoutPayLoad } from "@/lib/payload-data"
import { removeColorCode } from "../StringBuilder";

class StdoutCapture {

    checkStatus(stdout: string) {

        let outPut: stdoutPayLoad = {
            status: false,
            message: ""
        }
        let failedRegex = /failed=(\d*)/;
        let failedCount = stdout.match(failedRegex);
        //failedCount = stdout.match(/\d*/g);
        if (failedCount == null) {
            // console.log(failedCount[1]+":from capture")
            outPut.status = false
            outPut.message = "Failed to check std output"
            return outPut
        }
        else {
            if (parseInt(failedCount[1]) == 0) {

                outPut.status = true
                // outPut.message = "Success work with MiniFabric"
                outPut.message = this.captureMinifabricResult(stdout);
                return outPut
            }
            else {

                //  console.log(stdout.match(runningOutputRegex))
                outPut.status = false
                //let message = this.captureMinifabricResult(stdout);
                outPut.message = this.captureMinifabricResult(stdout);

                return outPut
            }

        }



    }
    checkStatusCC(stdout: string) {

        let outPut: stdoutPayLoad = {
            status: false,
            message: ""
        }
        let failedRegex = /failed=(\d*)/;
        let failedCount = stdout.match(failedRegex);
        //failedCount = stdout.match(/\d*/g);
        if (failedCount == null) {
            // console.log(failedCount[1]+":from capture")
            outPut.status = false
            outPut.message = "Failed to check std output"
            return outPut
        }
        else {
            if (parseInt(failedCount[1]) == 0) {

                outPut.status = true
                // outPut.message = "Success work with MiniFabric"
                outPut.message = this.captureDefaultResult(stdout);
                return outPut
            }
            else {

                //  console.log(stdout.match(runningOutputRegex))
                outPut.status = false
                //let message = this.captureMinifabricResult(stdout);
                outPut.message = this.captureDefaultResult(stdout);

                return outPut
            }

        }



    }
     //TODO:Override  for CC
    captureMinifabricResult(stdout: string) {
        //get line above STATUS
        let captureMinifabricResultRegex = /Running operation.*#.*\*(.*)#/s
        let message = stdout.match(captureMinifabricResultRegex);
        if (message != null) {
            return removeColorCode(message[1].toString())
        }
        else {

            return "Unknown Error from  Minifabric"
        }
    }
     //TODO:Override  for CC
    captureDefaultResult(stdout: string) {
        //get line above STATUS
        let captureMinifabricResultRegex = /Running operation.*#.*\*(.*)#/s
        let message = stdout.match(captureMinifabricResultRegex);
        if (message != null) {
            return removeColorCode(message[1].toString())
        }
        else {

            return "Unknown Error from  Minifabric"
        }
    }

}
export default new StdoutCapture()