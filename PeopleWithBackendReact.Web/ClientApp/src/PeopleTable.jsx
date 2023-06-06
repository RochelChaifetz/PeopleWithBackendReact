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
        isEditing: false
    }

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
                    lastNmae: '',
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
                lastNmae: '',
                age: '',
                id: ''
            };
        });
        this.setState(newState);
    }

    onUpdateClick = () => {
        const { person } = this.state;
        axios.post('/api/people/updateperson', { person }).then(() => {
            this.getAllPeople();
            const newState = produce(this.state, draftState => {
                draftState.isEditing = false;
                draftState.person = {
                    firstName: '',
                    lastNmae: '',
                    age: '',
                    id: ''
                };
            });
            this.setState(newState)
        });
    }



    render() {
        const { people, person, isEditing } = this.state;
        return (<>
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(p => {
                                return <PersonRow
                                    onEditClick={() => this.onEditClick(p)}
                                    onDeleteClick={() => this.onDeleteClick(p)}
                                    key={p.id}
                                    person={p} />
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );

    }
}

export default PeopleTable;