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
        this.objects.splice(this.numElem, 0, object);
        this.numElem += 1;
        document.getElementById("item" + this.numElem).innerHTML = 
            "<img src='images/" + object.getObjectName().toLowerCase() + ".png' />";
    }

    remove(index) {
        this.objects.splice(index, 1, null);
        document.getElementById("item" + (index + 1)).innerHTML = "";
    }

    removeObj(object) {
        this.remove(this.objects.indexOf(object));
    }

    useObject(num, currentObject) {
        var objectOfBackpack = this.objects[num];
        if(objectOfBackpack == null) {
            alert("no selectable object");
        } else {
            console.log(objectOfBackpack);
            if(objectOfBackpack.getSubjectAction() != null) {
                if(currentObject == null || objectOfBackpack.getSubjectAction() != currentObject.getObjectName())
                    alert("you can't use " + objectOfBackpack.getObjectName());
                else{
                    objectOfBackpack.setIsElemOfBackpack(false);
                    objectOfBackpack.executeAnimation();
                    this.removeObj(objectOfBackpack);
                }    
            }
            else {
                objectOfBackpack.setIsElemOfBackpack(false);
                objectOfBackpack.executeAnimation();
            }
            /*
            else if(objectOfBackpack.getSubjectMerge() != null) {
                alert(objectOfBackpack.getObjectName() + " needs " + objectOfBackpack.getSubjectMerge());
            }*/
        }
    }
}