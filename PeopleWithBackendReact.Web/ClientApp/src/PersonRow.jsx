import React from 'react';

function PersonRow({ person }) {
    const { firstName, lastName, age } = person;
    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className='btn btn-warning' onClick={onEditClick}> Edit </button>
                <button className='btn btn-danger' onClick={onDeleteClick} style={{ marginLeft: 10 }}>Delete</button>
            </td>
        </tr>
    )
}

export default PersonRow;