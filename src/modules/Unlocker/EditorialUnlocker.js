import { EditorialPageElementModifier } from "../ElementModifier/EditorialPageElementModifier"

EditorialPageElementModifier

class EditorialUnlocker{
    constructor() {
        this.elementModifier = new EditorialPageElementModifier()

    }

    unlock(){
        this.elementModifier.modifyElement()
    }
}


export {EditorialUnlocker}