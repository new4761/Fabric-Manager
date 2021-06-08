<h1 align="center">
  <img src="https://raw.githubusercontent.com/new4761/Fabric-Manager/master/.github/images/ver1.png" width="112px"/>
  <br/>
  Fabric-Manager
</h1>
<p align="center">Create a new <b>Hyperledger fabric environment</b>
and <b>Deploy smart contract (chaincode) </b> by using GUI with <b>Minifabric</b>
<br/>Help you focus on <b>writing</b> code and <b>testing</b> 
of business-logic! with your smart contract</p>
<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/new4761/Fabric-Manager)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/new4761/Fabric-Manager)

</div>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project"> ➤ About Fabric-Manager</a></li>
    <li><a href="#prerequisites"> ➤ Prerequisites</a></li>
    <li><a href="#installation"> ➤ Installation</a></li>
    <!-- <li><a href="#project-files-description"> ➤ Project Files Description</a></li>
    <li><a href="#getting-started"> ➤ Getting Started</a></li> -->
    <li><a href="#example"> ➤ App Screenshots</a></li>
    <li><a href="#team"> ➤ Team</a></li>
  </ol>
</details>
<hr>
<h2 id="about-the-project"> :notebook: About Fabric-Manager</h2>

<p align="justify"> 
Fabric-Manager is GUI application for helping developer who want to start learning or developing with <a href="https://www.hyperledger.org/use/fabric"><b>Hyperledger fabric</b></a> 
to have a tools to help setup environment and testing you application or smart contract .
<br>
<h3><b>How is work</b></h3>
Fabric-Manager is desktop application who communication with os and
<a href="tps://www.hyperledger.or[g/use/fabricht](https://github.com/hyperledger-labs/minifabric)"><b>Minifabric</b></a> through the config file to setup and interactive with Hyperledger fabric that run on your docker environment.
<br>

<h3><b>Feature Highlight</b></h3>
<ol>
<li>Custom Fabric network setup </li>
<li>Channel query, create, join, channel update</li>
<li>Chaincode install, approve, instantiation, invoke, query, upgrade</li>
<li>Create new identity for organizations</li>
<li>Export network template (docker-compose file with crypto material)</li>
<li>Export connection profile and gateway template (only node.js right now)</li>
</ol>
<br>

 <img src="https://raw.githubusercontent.com/new4761/Fabric-Manager/master/.github/images/arch.png" />
<br>
<br>

| Platform          | Status        |
| ----------------- | ------------- |
| Microsoft Windows | Supported     |
| Linux             | Not Supported |
| Mac os            | Not Supported |

<br>

> This project is graduate project for Bachelor's degree of computer science 2021 KMITL (King Mongkut's Institute of Technology Ladkrabang)

</p>
<hr>
<h2 id="prerequisites"> :wrench: Prerequisites</h2>
<ul>
<li> docker (18.03 or newer) environment </li>
<li> node.js (optional) if you want to install with node package</li>
</ul>
<hr>

> Currently support only window platform
<h2 id="installation"> :floppy_disk: Installation</h2>

<h3><b>Method 1: Installer</b></h3>
<p align="justify"> 
Download zip file from <a href=https://github.com/new4761/Fabric-Manager/releases/tag/v0.1-alpha>release page</a> extract and run Installer
<h3><b>Method 2: Install with node package</b></h3>

> We used <a href=https://www.electronjs.org/>Electorn</a> and <a href=https://nklayman.github.io/vue-cli-plugin-electron-builder/>Vue CLI Plugin</a> you can go read for more details

go to folder you want to install
Clone Project
```dotnetcli
git clone https://github.com/new4761/Fabric-Manager
```
After cloned
```dotnetcli
cd Fabric-Manager/desktopapp

npm install
```
To run program after installed 
```dotnetcli
vue-cli-service electron:serve
```
To build program for window platform
```dotnetcli
vue-cli-service electron:build --win
```

</p>
<hr>
<h2 id="example"> :camera: App Screenshots</h2>

<div align="center">
<h3  align="left"><b>Create project</b></h3>
<img src="https://raw.githubusercontent.com/new4761/Fabric-Manager/master/.github/images/ex1.PNG"/> 
<h3  align="left"><b>App panel</b></h3>
<img src="https://raw.githubusercontent.com/new4761/Fabric-Manager/master/.github/images/ex2.PNG"/> 
<h3  align="left"><b>Deploy new Chaincode</b></h3>
<img src="https://raw.githubusercontent.com/new4761/Fabric-Manager/master/.github/images/ex3.PNG"/> 
<h3  align="left"><b>Create new identity</b></h3>
<img src="https://raw.githubusercontent.com/new4761/Fabric-Manager/master/.github/images/ex4.PNG"/> 
</div>
<hr>
<h2 id="team"> :construction_worker: Team</h2>

[new4761](https://github.com/new4761) and [pisichi](https://github.com/pisichi)