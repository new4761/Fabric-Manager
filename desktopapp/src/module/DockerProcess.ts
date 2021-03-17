var Docker = require("dockerode");
var docker = new Docker({ socketPath: "//./pipe/docker_engine" });
import logger from "../module/Logger";
import { removeColorCode } from "./StringBuilder";
var stream = require('stream');
import store from "../store/modules/project";
class DockerProcess {
  constructor() { }
  listContainer() {
    return new Promise((resolve, reject) => {
      docker.listContainers(function (err: any, containers: any) {
        if (containers != null) {
          resolve(containers);
        }
        else {
          resolve(err);
        }
      });
    });
  }
  async findFirstContainerByName(name: string) {
    //console.log(name)
    name = "/" + name;
    let container: any = 'Error no container name:' + name
    await this.listContainer().then((res: any) => {

      res.forEach(function (containerInfo: any) {
        if (name == containerInfo.Names) {
          //  console.log(containerInfo)
          container = containerInfo
        }
      })

    });
    return this.getContainerByID(container.Id)
  }

  //TODO:Override  for CC
  async findFirstContainerByRegex(name: string, flags: string) {
  //  console.log(name)
    // name = "/"+name;
    let regex = new RegExp(name, flags)
    let container: any = 'Error no container name:' + name
    await this.listContainer().then((res: any) => {

      res.forEach(function (containerInfo: any) {
        if (regex.test(containerInfo.Names)) {

          container = containerInfo
        }
      })

    });
    return this.getContainerByID(container.Id)
  }

  getContainerByID(containerID: string) {
    let container = docker.getContainer(containerID)
    return container

  }
  callbackLogs(container: any) {
    var logStream = new stream.PassThrough();
    container = this.getContainerByID(container.Id)
    container.logs({
      follow: true,
      stdout: true,
      stderr: true
    }, (err: any, stream: any) => {
      if (err) {
        ///return logger.error(err.message);
      }
      container.modem.demuxStream(stream, logStream, logStream);

    })
    let message = this.destroyStream(logStream).then((res) => {
      //console.log(res.search(/\n/))
      return res
    })
    return message
  }



  async destroyStream(target: any) {
    //  console.log(Date.now())
    //  console.log(new Date(Date.now()).toISOString())
    let stdoutData = ''

    target.on('data', function (chunk: any) {
      console.log(chunk.toString('utf8'))
      stdoutData += (removeColorCode(chunk.toString('utf8')))
    });

    target.on('end', function () {
      // console.log("end")
      //return stdoutData
      //logStream.end('!stop!');
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        target.end()
        // console.log(stdoutData)
        resolve(stdoutData);
      }, 2000);
    });

  }
  
  async callbackAttach(container: any,pipePayload:any[]) {
   // let pipePayload:any =[];
  // console.log(container)
   let  streamPipe;
    var logStream = new stream.PassThrough();
    // let target:any;
    logStream.on('data', function(chunk:any){
     pipePayload.push(removeColorCode(chunk.toString('utf8')))
      // console.log(removeColorCode(chunk.toString('utf8')));
    });
    streamPipe = await container.attach({ stream: true, stdout: true, stderr: true, tty: false }).then((res: any) => { return res })
       container.modem.demuxStream(streamPipe, logStream, logStream);
       //streamPipe[1]=pipePayload;
    // streamPipe.on('data', function (chunk) {
    //   console.log("from streamPipe " + removeColorCode(chunk.toString('utf8')));
    // });
    streamPipe.on('end', function () {
      logStream.end()
    });
    //console.log(streamPipe);
    return streamPipe
  }

  killStreamPipe(target: any) {
    target.destroy();
  }

  getLog(container: any) {
    container.attach(
      {
        stream: true,
        stdout: true,
        stderr: true,
      },
      function handler(err: any, stream: any) {
        console.log(container.modem.demuxStream(stream, process.stdout, process.stderr));
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
