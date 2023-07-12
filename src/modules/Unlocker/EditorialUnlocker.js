import { EditorialPageElementModifier } from "../ElementModifier/EditorialPageElementModifier"

EditorialPageElementModifier

class EditorialUnlocker{
    constructor() {
        this.elementModifier = new EditorialPageElementModifier()

    }

    unlock(){
        console.log("here")
        this.elementModifier.modifyElement()
    }
}


export {EditorialUnlocker}