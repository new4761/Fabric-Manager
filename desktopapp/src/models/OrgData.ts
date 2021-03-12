class OrgData {
  name: string;
  useCA: boolean;
  CAList: string[] = [];
  peerList: string[] = [];
  isOrderer: boolean;
  isDefault: boolean;
  constructor(name: string, isOrderer: boolean) {
    this.name = name;
    this.isOrderer = isOrderer;
    this.useCA = true;
    this.isDefault = false;
  }
  addCA() {
    if (!this.isOrderer && this.useCA) {
      this.CAList[0] = "ca" + 1 + "." + this.name;
    }
  }
  addPeer() {
    if (!this.isOrderer) {
      this.peerList.push("peer" + (this.peerList.length + 1) + "." + this.name);
    }
  }
  removeCA() {
    if (!this.isOrderer) {
      this.CAList.splice(-1, 1);
    }
  }
  removePeer() {
    if (!this.isOrderer) {
      this.peerList.splice(-1, 1);
    }
  }
  setToOrderer() {
    this.CAList = [];
    this.peerList = [];
    this.isOrderer = true;
  }
  setToPeer() {
    this.isOrderer = false;
  }

  setDefault() {
    this.isDefault = true;
  }
}
export default OrgData;
