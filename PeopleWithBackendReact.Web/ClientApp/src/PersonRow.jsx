import React from 'react';

function PersonRow({ person, onEditClick, onDeleteClick, onCheck, isChecked }) {
    const { firstName, lastName, age } = person;
    return <>
        <tr>
            <td>
                <div className="d-flex justify-content-center align-items-center">
                    <input
                        checked={isChecked}
                        onChange={() => onCheck(person.id)}
                        type="checkbox"
                        className="form-check-input mt-2"
                        style={{ transform: 'scale(1.5)' }}
                    />
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className='btn btn-warning' onClick={onEditClick}>Edit</button>
                <button className='btn btn-danger' onClick={onDeleteClick} style={{ marginLeft: 10 }}>Delete</button>
            </td>
        </tr>
    </>

};

export default PersonRow;