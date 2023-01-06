class ModalManager{ 
    constructor() { 
        this.modal = this.createModal()
        this.modalContentBox = this.createModalContentBox()
        this.appendToModal(this.modalContentBox)
        this.appendModal(document.body)
    }

    createModalContentBox() {
        let modalContentBox = document.createElement('div')
        modalContentBox.style = `
        background-color: #fefefe;
        margin-top:1%; 
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        width: 80%;
        mid-height: 15%
        `
        return modalContentBox
    }

    getModalContentBox() { 
        return this.modalContentBox
    }

    appendModal(targetParent) {
        targetParent.appendChild(this.modal)
    }

    appendToModal(targetElement) { 
        this.modal.appendChild(targetElement)
    } 
    
    appendToContainer(targetElement) { 
        this.modalContentBox.appendChild(targetElement)
    }

    createCloseButton() { 
        let closeButton = document.createElement('span')
        closeButton.style = ` 
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        `

        closeButton.innerText = "x"
        closeButton.addEventListener('click', resetModal)
        return closeButton
    }

    createModal() { 
        let modal = document.createElement('div')
        modal.style = ` 
        display: none; 
        position: fixed; 
        z-index: 32;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        `
        window.addEventListener('click', this.onModalClicked)
        modal.id = "CompanyModal"
        return modal
    }

    openModal() { 
        this.modal.style.display = ""
    }

    closeModal() { 
        this.modal.style.display = "none"
    }

    clearModalContent() { 
        while(this.modalContentBox.firstChild != undefined) { 
            this.modalContentBox.firstChild.remove()
        }
    }

    onModalClicked = (event) =>  { 
        if (event.target == this.modal) {
            this.resetModal()
        }
    } 

    resetModal = () => {  
        this.closeModal()
        this.clearModalContent()
    }
}


class ContainerManager{ 

}


export {ModalManager}