// module "Backpack.js"

class Backpack {
    constructor(numElem) {
        this.objects = new Array();
        for(var i = 0; i < numElem; i ++) this.objects.push(null);
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
        if(this.numElem == numElementOfBackpack) return; 
        if(object.getSubjectMerge() != null && this.numElem > 0) {
            var tmp = this.objects.find(elem => {
                if(elem == undefined) return undefined;
                return elem.getObjectName() == object.getSubjectMerge()
            });
            if(tmp != undefined) {
                object.setSubjectMerge(null);
                var index = this.objects.indexOf(tmp);
                this.objects[index].setSubjectMerge(null);
                if(object.getValueMerge()) {
                    this.updateObject(index, object);
                    alert("You can use " + object.getObjectName());
                } else {
                    alert("You can use " + tmp.getObjectName());
                }
            }
            else {
                if(object.getValueMerge()) {
                }
                this.insertObject(object);
            }
        }
        else{
            this.insertObject(object);
        }
    }

    insertObject(object) {
        var index = this.findFreePosition(); 
        this.objects.splice(index, 1, object);
        document.getElementById("item" + (index + 1)).innerHTML = 
            "<img src='images/" + object.getObjectName().toLowerCase() + ".png' />";
        this.numElem ++;
    }

    updateObject(index, object) {
        this.objects.splice(index, 1, object);
        document.getElementById("item" + (index + 1)).innerHTML = 
            "<img src='images/" + object.getObjectName().toLowerCase() + ".png' />";
    }

    remove(index) {
        this.objects.splice(index, 1, null);
        document.getElementById("item" + (index + 1)).innerHTML = "";
    }

    removeObj(object) {
        this.remove(this.objects.indexOf(object));
    }

    findFreePosition() {
        return this.objects.indexOf(this.objects.find(x => x == null));
    }

    useObject(num, currentObject) {
        var objectOfBackpack = this.objects[num];
        if(objectOfBackpack == null) {
            alert("no selectable object");
        } else {
            if(objectOfBackpack.getSubjectAction() != null) {
                if(currentObject == null || objectOfBackpack.getSubjectAction() != currentObject.getObjectName()) {
                    alert("you can't use " + objectOfBackpack.getObjectName());
                }  
                else{
                    objectOfBackpack.setIsElemOfBackpack(false);
                    objectOfBackpack.executeAnimation();
                    this.removeObj(objectOfBackpack);
                    this.numElem -= 1;
                }    
            }
            else if(objectOfBackpack.getSubjectMerge() != null) {
                alert(objectOfBackpack.getObjectName() + " needs " + objectOfBackpack.getSubjectMerge());
            }
            else {
                objectOfBackpack.setIsElemOfBackpack(false);
                objectOfBackpack.executeAnimation();
                if(objectOfBackpack.getObjectName() == "GUN") this.objects[num].setSubjectMerge("BULLET");
            } 
        }
    }

    discardObject(num, currentObject) {
        var objectOfBackpack = this.objects[num];
        if(objectOfBackpack == null) {
            alert("no selectable object");
        } else {
            this.removeObj(objectOfBackpack);
            scene.add(objectOfBackpack.getObject());
            objectsAnimated.push(objectOfBackpack);
            objectsRaycaster.push(objectOfBackpack.getObject());
            this.numElem -= 1;
        }
    }
}