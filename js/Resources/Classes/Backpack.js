// module "Backpack.js"

class Backpack {
    constructor(numElem) {
        this.objects = new Array(numElem);
        this.numElem = 0;
        this.open = false;

        document.getElementById("backpack").style.display = "block";
    }

    getNumElem() {
        return this.numElem;
    }

    getObject() {
        return this.objects;
    }

    getSingleObject(index) {
        return this.objects[index];
    }

    getOpen() {
        return this.open;
    }

    setOpen(bool) {
        this.open = bool;
    }

    insert(object) {
        this.objects.push(object);
        this.numElem += 1;
        document.getElementById("item" + this.numElem).innerHTML = 
            "<img src='images/" + object.root.name.toLowerCase() + ".png' />";
    }
}