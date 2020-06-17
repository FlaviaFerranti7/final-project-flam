// module "Backpack.js"

class Backpack {
    constructor(numElem) {
        this.numElem = numElem;
        this.object = new Array(numElem);
        this.open = false;
    }

    getNumElem() {
        return this.numElem;
    }

    getObject() {
        return this.object;
    }

    getSingleObject(index) {
        return this.object[index];
    }

    getOpen() {
        return this.open;
    }

    setOpen(bool) {
        this.open = bool;
    }
}