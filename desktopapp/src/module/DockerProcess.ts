var Docker = require("dockerode");
var docker = new Docker({ socketPath: "//./pipe/docker_engine" });
import logger from "../module/Logger";
var stream = require('stream');

class DockerProcess {
  constructor() { }
  listContainer() {
    return new Promise((resolve, reject) => {
      docker.listContainers(function (err: any, containers: any) {
        if (containers != null) {
          resolve(containers);
        }
        else {
          logger.log("error", "Docker: " + err)
          resolve(err);
        }
      });
    });
  }

  filterData(container: Object) {

  }

  testCall(containerID: string) {
   
    let container = docker.getContainer(containerID)
    console.log(container)
    return  container
    //console.log(container)

  }

  callback(container: any) {
    var logStream = new stream.PassThrough();
    logStream.on('data', function(chunk){
      console.log(chunk.toString('utf8'));
    });
    container.logs({
      follow: true,
      stdout: true,
      stderr: true
    }, function(err, stream){
      if(err) {
        return logger.error(err.message);
      }
      container.modem.demuxStream(stream, logStream, logStream);
      // stream.on('end', function(){
      //   logStream.end('!stop!');
      // });
    
  })
  }
  getLog(container: any) {
    container.attach(
      {
        stream: true,
        stdout: true,
        stderr: true,
      },
      function handler(err: any, stream: any) {
        console.log( container.modem.demuxStream(stream, process.stdout, process.stderr));
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
