import React, { useState } from 'react'

function Operator({ operator }) {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [deleteSuccess, setDeleteSuccess] = useState('')

  const handleOpDelete = async ()=> {
    setDeleteLoading(true)
  }
  return (
    <div>
      <img src={operator.op_logo} width={120} /><br />
      <h2>{operator.op_name}</h2>
      <p>{operator.op_username}</p>
      <p>{operator.op_email}</p>
      <button onClick={handleOpDelete}>Delete Operator</button>
    </div>
  )
}

export default Operator
