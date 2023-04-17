import React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

function ReadOnlyRow({contact, handleDelete, handleEditRowId}) {
    return (
        <tr key={contact._id}>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td>
                <CreateOutlinedIcon onClick={(event)=>handleEditRowId(event, contact._id, contact)} style={{ color: "#028ae9", cursor: "pointer" }} />
                <DeleteOutlineOutlinedIcon onClick={() => handleDelete(contact._id)} style={{ color: "red", cursor: "pointer", }} />
            </td>
        </tr>
    )
}

export default ReadOnlyRow