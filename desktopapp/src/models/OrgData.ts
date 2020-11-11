 class OrgData {
    name: string;
    useCA:boolean;
    CAList: string[] = [];
    peerList: string[] = [];
    isOrderer: boolean;
    constructor(name: string, isOrderer: boolean) {
        this.name = name;
        this.isOrderer = isOrderer;
        this.useCA = false;
    }
    addCA() {
        if (!this.isOrderer&&this.useCA) {
            this.CAList.push("CA" + this.CAList.length + "." + this.name);
        }
    }
    addPeer() {
        if (!this.isOrderer) {
            this.peerList.push("peer" + this.peerList.length + "." + this.name);
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
}
export default OrgData;