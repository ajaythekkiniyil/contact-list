import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
function EditableRow({ handleEditFormChange, editedFormData, saveEditedContact, setEditRowId }) {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    name='name'
                    placeholder='Name'
                    required
                    value={editedFormData.name}
                    onChange={(event) => handleEditFormChange(event)}
                />
            </td>
            <td>
                <input
                    type="email"
                    name='email'
                    placeholder='Email'
                    required
                    value={editedFormData.email}
                    onChange={(event) => handleEditFormChange(event)}
                />
            </td>
            <td>
                <input
                    type="text"
                    name='phone'
                    placeholder='Phone'
                    required
                    value={editedFormData.phone}
                    onChange={(event) => handleEditFormChange(event)}
                />
            </td>
            <td>
                <CheckCircleOutlineOutlinedIcon
                    onClick={(event) => saveEditedContact(event)}
                    style={{ color: 'green', cursor: 'pointer' }}
                />
                <HighlightOffOutlinedIcon
                    onClick={(event) => setEditRowId(null)}
                    style={{ color: '#ff5e00', cursor: 'pointer' }}
                />
            </td>
        </tr>
    )
}
export default EditableRow