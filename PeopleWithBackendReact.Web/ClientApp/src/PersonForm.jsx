import React from 'react';

function PersonForm({ person, onTextChange, onAddClick, isEditing, onUpdateClick, onCancelClick }) {
    const { firstName, lastName, age } = person;
    return <>
        <div className="row p-5 rounded" style={{ backgroundColor: '#E9ECEF' }}>
            <div className="col-md-3" >
                <input type="text" value={firstName} onChange={onTextChange} className="form-control" placeholder="First Name" name="firstName" />
            </div>
            <div className="col-md-3" >
                <input type="text" value={lastName} onChange={onTextChange} className="form-control" placeholder="Last Name" name="lastName" />
            </div>
            <div className="col-md-3" >
                <input type="text" value={age} onChange={onTextChange} className="form-control" placeholder="Age" name="age" />
            </div>
            <div className="col-md-3" >
                {!isEditing ?
                    <button onClick={onAddClick} className='btn btn-primary w-100'>Add</button> :
                    <div>
                        <button onClick={onUpdateClick} className='btn btn-warning w-100'>Update</button>
                        <button onClick={onCancelClick} className='btn btn-dark w-100'>Cancel</button>
                    </div>

                }
            </div>
        </div>
    </>

};

export default PersonForm;