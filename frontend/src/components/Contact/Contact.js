import React, { Fragment, useEffect, useState } from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import axios from 'axios'
import backendUrl from '../../const'
import ReadOnlyRow from './ReadOnlyRow'
import EditableRow from './EditableRow'

function Contact() {
    const [contacts, setContacts] = useState([])
    const [searchKey, setSearchKey] = useState('')

    // used to store form values initially 
    const [addFormData, setAddFormData] = useState({
        name: '',
        email: '',
        phone: '',
    })
    // used to store form values while editing contact informations
    const [editedFormData, setEditedFormData] = useState({
        name: '',
        email: '',
        phone: '',
    })
    const [editRowId, setEditRowId] = useState(null)


    // api call to backend and store to contact state
    useEffect(() => {
        async function fetchData() {
            await axios.get(`${backendUrl}/contacts`)
                .then(resp => {
                    setContacts(resp.data)
                })
                .catch(err => console.log(err))

        }
        fetchData()
    }, [contacts])

    // function for handling input change and storing new contact to state(addFormData)
    const handleAddFormChange = (event) => {
        event.preventDefault()

        const fieldName = event.target.getAttribute('name')
        const fieldValue = event.target.value

        // create new object and new key-value
        const newFormData = { ...addFormData }
        newFormData[fieldName] = fieldValue

        setAddFormData(newFormData)
    }

    // onSubmiting form newContact object created and store all contacts (new + old)
    // then store to database also
    const handleAddFormSubmit = (event) => {
        event.preventDefault()

        const newContact = {
            name: addFormData.name,
            email: addFormData.email,
            phone: addFormData.phone,
        }

        const newContacts = [...contacts, newContact]

        // store new contact to database
        const storeToDb = async () => {
            await axios.post(`${backendUrl}/create`, newContact)
                .then(resp => {
                    // alert('contact saved')
                    setContacts(newContacts)
                    // clearing input fields on submit
                    var form = document.getElementById("myForm");
                    form.reset();
                })
                .catch(err => alert('Duplicate contact not allowed!'))
        }
        storeToDb()
    }

    // function handle delete contact 
    const handleDelete = (id) => {
        const isDelete = window.confirm("Do you want to delete")
        if (isDelete) {
            async function deleteContact() {
                await axios.delete(`${backendUrl}/contact/${id}`)
                    .then(resp => {
                        setContacts(contacts.filter(contact => contact._id !== id))
                    })
                    .catch(err => console.log(err))
            }
            deleteContact()
        }
    }

    // this function set editRowId if edit button cliked
    const handleEditRowId = (event, id, contact) => {
        event.preventDefault()
        setEditRowId(id)
        const formValues = {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
        }
        setEditedFormData(formValues)
    }

    // edited form data storing to new state
    const handleEditFormChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        setEditedFormData((prevs) => (
            {
                ...prevs,
                [name]: value,
            }
        ))
    }

    // save or update contact into db onclick save button and also updated contact(state) so it is immediately visible to UI 
    const saveEditedContact = (event) => {
        event.preventDefault()
        const editedNewContact = {
            _id: editRowId,
            name: editedFormData.name,
            email: editedFormData.email,
            phone: editedFormData.phone,
        }

        const newContacts = { ...contacts }
        const index = contacts.findIndex((contact) => contact._id === editRowId)

        newContacts[index] = editedNewContact
        setEditRowId(null)

        // updating database
        axios.put(`${backendUrl}/contact/${editRowId}`, editedFormData)
            .then(resp => console.log('contact updated'))
            .catch(err => alert(err))
    }

    // store filtered values based on searchKey
    const searchedElements = contacts.filter(contact => contact.name.includes(searchKey))

    return (
        <section>
            <div className="container">
                <div className="contact-list-outer-box">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3 className="title">Contact List</h3>
                        </div>
                        <div className="search-box col-4">
                            <div className="col-lg-12">
                                <input
                                    type="text"
                                    placeholder='Search...'
                                    value={searchKey}
                                    onChange={(event) => setSearchKey(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <h5>Add new contact</h5>
                            {/* form for creating new contacts */}
                            <form id="myForm" className='add-contact-form' onSubmit={handleAddFormSubmit}>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder='Name'
                                    required
                                    onChange={handleAddFormChange}
                                />
                                <input
                                    type="email"
                                    name='email'
                                    placeholder='Email'
                                    required
                                    onChange={handleAddFormChange}
                                />
                                <input
                                    type="tel"
                                    name='phone'
                                    placeholder='Phone'
                                    pattern="{10}-[0-9]"
                                    required
                                    onChange={handleAddFormChange}
                                />
                                <button type="submit" className='add-new'>Add new contact</button>
                            </form>
                        </div>
                        <div className="col-12 p-2 table-responsive mt-4">
                            <form>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* map through contacts to display to ui */}
                                        {
                                            searchKey 
                                            ?
                                            searchedElements.map(eachContact=> (
                                                <ReadOnlyRow contact={eachContact} handleDelete={handleDelete} handleEditRowId={handleEditRowId}/>
                                            ))
                                            :
                                            contacts.map(contact => (
                                                <Fragment key={contact._id}>
                                                    {
                                                        editRowId === contact._id ?
                                                            <EditableRow
                                                                handleEditFormChange={handleEditFormChange}
                                                                editedFormData={editedFormData}
                                                                saveEditedContact={saveEditedContact}
                                                                setEditRowId={setEditRowId}
                                                            />
                                                            :
                                                            <ReadOnlyRow contact={contact} handleDelete={handleDelete} handleEditRowId={handleEditRowId} />
                                                    }
                                                </Fragment>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Contact
