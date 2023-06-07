import React from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import axios from 'axios';
import { produce } from 'immer';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isEditing: false,
        checkedPeople: []
    };

    onDeleteAllClick = () => {
        const { checkedPeople } = this.state;
        axios.post('/api/people/deleteall', {
            ids: [...checkedPeople]
        }).then(() => {
            this.getAllPeople();
        });
    };


    getAllPeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data });
        });
    }

    componentDidMount = () => {
        this.getAllPeople();
    }

    onTextChange = e => {
        const newState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(newState);
    }

    onAddClick = () => {
        const { firstName, lastName, age } = this.state.person;
        axios.post('/api/people/addperson', { firstName, lastName, age }).then(() => {
            this.getAllPeople();
            const newState = produce(this.state, draftState => {
                draftState.person = {
                    firstName: '',
                    lastName: '',
                    age: '',
                    id: ''
                };
            });
            this.setState(newState)
        });
    }

    onDeleteClick = p => {
        axios.post('/api/people/deleteperson', p).then(() => {
            this.getAllPeople();
        });
    }

    onEditClick = p => {
        const newState = produce(this.state, draftState => {
            draftState.person = p;
            draftState.isEditing = true;
        });
        this.setState(newState);
    }

    onCancelClick = () => {
        const newState = produce(this.state, draftState => {
            draftState.isEditing = false;
            draftState.person = {
                firstName: '',
                lastName: '',
                age: '',
                id: ''
            };
        });
        this.setState(newState);
    }

    onUpdateClick = () => {
        const { person } = this.state;
        axios.post('/api/people/updateperson', person).then(() => {
            this.getAllPeople();
            const newState = produce(this.state, draftState => {
                draftState.isEditing = false;
                draftState.person = {
                    firstName: '',
                    lastName: '',
                    age: '',
                    id: ''
                };
            });
            this.setState(newState)
        });
    }

    onCheck = id => {
        const { checkedPeople } = this.state;
        const updatedCheckedPeople = checkedPeople.includes(id)
            ? checkedPeople.filter(checkedId => checkedId !== id)
            : [...checkedPeople, id];
        this.setState({ checkedPeople: updatedCheckedPeople });
    };


    onCheckAllClick = () => {
        const { people, checkedPeople } = this.state;
        const newState = produce(this.state, draftState => {
            people.forEach((p) => {
                if (!checkedPeople.includes(p.id)) {
                    draftState.checkedPeople = [...draftState.checkedPeople, p.id];
                }
            })
        })
        this.setState(newState);
    }

    onUncheckAllClick = () => {
        const newState = produce(this.state, draftState => {
            draftState.checkedPeople = [];
        })
        this.setState(newState);
    }

    //onDeleteAllClick = () => {
    //    const { checkedPeople } = this.state;
    //    axios.post('/api/people/deleteall', {
    //            ids: [...checkedPeople]
    //        }).then(() => {
    //            this.getAllPeople();
    //        });
    //};



    render() {
        const { people, checkedPeople, person, isEditing } = this.state;
        return (
            <>
                <div className='container' style={{ marginTop: 60 }}>
                    <PersonForm
                        isEditing={isEditing}
                        onTextChange={this.onTextChange}
                        onCancelClick={this.onCancelClick}
                        onUpdateClick={this.onUpdateClick}
                        onAddClick={this.onAddClick}
                        person={person} />
                    <table className='table table-hover table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th style={{ width: '15%' }}>
                                    <button onClick={this.onDeleteAllClick} className="btn btn-danger w-100">Delete All</button>
                                    <button onClick={this.onCheckAllClick} className="btn btn-outline-danger w-100 mt-2">Check All</button>
                                    <button onClick={this.onUncheckAllClick} className="btn btn-outline-danger w-100 mt-2">Uncheck All</button>
                                </th>

                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(p => {
                                return (
                                    <PersonRow
                                        onEditClick={() => this.onEditClick(p)}
                                        onDeleteClick={() => this.onDeleteClick(p)}
                                        onCheck={this.onCheck}
                                        isChecked={checkedPeople.includes(p.id)}
                                        key={p.id}
                                        person={p}
                                    />
                                );
                            })}

                        </tbody>
                    </table>
                </div>
            </>
        );

    }
}

export default PeopleTable;