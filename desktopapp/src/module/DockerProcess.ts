var Docker = require("dockerode");
var docker = new Docker({ socketPath: "//./pipe/docker_engine" });

class DockerProcess {
  constructor() {}
  ListContainer() {
    docker.listContainers(function(err: any, containers: any) {
      console.log(containers);
      return containers;
    });
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
    container.exec({ id: container.name, cmd: args,AttachStdout:true,AttachStderr:true });
  }
}
export default new DockerProcess();
