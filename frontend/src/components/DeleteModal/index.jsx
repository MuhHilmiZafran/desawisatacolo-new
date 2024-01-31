import React from 'react'
import ModalConfirm from '../ModalConfirm'


const DeleteModal = ({modalState, closeModal}) => {
  return (
    <ModalConfirm isConfirm={modalState} onClose={closeModal} messages={'Are you sure you want to delete this item?'} />
    
  )
}

export default DeleteModal
