import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

export default class CreateTask extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateCreated = this.onChangeDateCreated.bind(this);
        this.onChangeDueDate = this.onChangeDueDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            date_created: new Date(),
            due_date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0]
                })
            }
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDateCreated(e) {
        this.setState({
            date_created: e.target.value
        });
    }

    onChangeDueDate(e) {
        this.setState({
            due_date: this.due_date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const task = {
            username: this.state.username,
            description: this.state.description,
            date_created: this.state.date_created,
            due_date: this.due_date
        }

        console.log(task)

        window.location = '/';
    }

    render() {
        return (
            // Basic HTTP submission form
            <div>
                <h3>Create New Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option
                                            key ={user}
                                            value = {user}>{user}
                                        </option>;
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Due Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.due_date}
                                onChange={this.onChangeDueDate}
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Create Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}