var Docker = require("dockerode");
var docker = new Docker({ socketPath: "//./pipe/docker_engine" });
import logger from "../module/Logger";

class DockerProcess {
  constructor() {}
  listContainer() {
    return new Promise((resolve, reject) => {
      docker.listContainers(function(err: any, containers: any) {
        if(containers!=null){
          resolve(containers);
        }
        else{
          logger.log("error","Docker: " + err)
          resolve(err);
        }
      });
    });
  }

  filterData(container:Object){

  }



  getLog(container: any) {
    container.attach(
      {
        stream: true,
        stdout: true,
        stderr: true,
      },
      function handler(err: any, stream: any) {
        container.modem.demuxStream(stream, process.stdout, process.stderr);
      }
    );
  }

  executeContainer(container: any, args: string[]) {
    container.exec({
      id: container.name,
      cmd: args,
      AttachStdout: true,
      AttachStderr: true,
    });
  }
}
export default new DockerProcess();
