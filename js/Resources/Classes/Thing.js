class Thing {
    constructor(object, animation, reverseAnimation, conditionedAnimated, isElemOfBackpack, subjectAction, subjectMerge, valueMerge = false) {
        this.object = object;
        this.animation = animation;
        this.reverseAnimation = reverseAnimation;
        this.flagDoubleAction = false;
        this.isElemOfBackpack = isElemOfBackpack;
        this.conditionedAnimated = conditionedAnimated;
        if (!conditionedAnimated) this.actionButton = (isElemOfBackpack) ? "Q" : "SPACE";
        else this.actionButton = "";
        this.subjectAction = subjectAction;
        this.subjectMerge = subjectMerge;
        this.valueMerge = valueMerge;
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

    getIsElemOfBackpack() {
        return this.isElemOfBackpack;
    }

    getFlagDoubleAction() {
        return this.flagDoubleAction;
    }

    getValueMerge() {
        return this.valueMerge;
    }

    setSubjectAction(subjectAction) {
        this.subjectAction = subjectAction;
    }

    setSubjectMerge(subjectMerge) {
        this.subjectMerge = subjectMerge;
    }

    setFlagDoubleAction(bool) {
        this.flagDoubleAction = bool;
    }

    setIsElemOfBackpack(isElemOfBackpack) {
        this.isElemOfBackpack = isElemOfBackpack;
    }

    executeAnimation(t = null, move = null) {
        console.log(this.flagDoubleAction);
        if (this.isElemOfBackpack) scene.remove(this.object);
        else if (this.flagDoubleAction) {
            var ret = this.reverseAnimation(t, move);
            // if (!ret) {
            //     console.log("ciao");
            //     this.flagDoubleAction = false;
            // }
            return ret;
        }
        else {
            var ret = false;
            if (t == null && move == null) ret = this.animation();
            else ret = this.animation(t, move);
            // if (!ret && this.getReverseAnimation() != null) this.flagDoubleAction = true;
            return ret;
        }
        return false;
    }
}