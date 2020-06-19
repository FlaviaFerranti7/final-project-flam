class Thing {
    constructor(object, animation, reverseAnimation, conditionedAnimated, isElemOfBackpack, subjectAction, subjectMerge) {
        this.object = object;
        this.animation = animation;
        this.reverseAnimation = reverseAnimation;
        this.flagDoubleAction = false;
        this.isElemOfBackpack = isElemOfBackpack;
        this.conditionedAnimated = conditionedAnimated;
        if(!conditionedAnimated) this.actionButton = (isElemOfBackpack) ? "Q" : "SPACE";
        else this.actionButton = "";
        this.subjectAction = subjectAction;
        this.subjectMerge = subjectMerge;
    }

    getObject() {
        return this.object;
    }

    getSubjectAction() {
        return this.subjectAction;
    }

    getSubjectMerge() {
        return this.subjectMerge;
    }

    getObjectName() {
        return this.object.name;
    }

    getActionButton() {
        return this.actionButton;
    }

    getAnimation() {
        return this.animation;
    }

    getReverseAnimation() {
        return this.reverseAnimation;
    }

    getConditionedAnimated() {
        return this.conditionedAnimated;
    }

    getFlagDoubleAction() {
        return this.flagDoubleAction;
    }

    setFlagDoubleAnimation(bool) {
        this.flagDoubleAction = bool;
    }

    setIsElemOfBackpack(isElemOfBackpack) {
        this.isElemOfBackpack = isElemOfBackpack;
    }

    executeAnimation(t = null, move = null) {
        if(this.isElemOfBackpack) scene.remove(this.object);
        else if(this.flagDoubleAction) return this.reverseAnimation(t, move);
        else {
            if(t == null && move == null) return this.animation();
            return this.animation(t, move);
        }
        return false;
    }
}