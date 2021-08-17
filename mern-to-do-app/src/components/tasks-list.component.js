import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
    <tr>
      <td>{props.task.username}</td>
      <td>{props.task.description}</td>
      <td>{props.task.due_date.substring(0,10)}</td>
      <td>{props.task.date_created.substring(0,10)}</td>
      <td>
        <Link to={"/update/"+props.task._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>delete</a>
      </td>
    </tr>
  )

export default class TasksList extends Component {
    constructor(props) {
        super(props);

        this.deleteTask = this.deleteTask.bind(this)
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tasks/')
        .then(res => {
            if (res.data.length > 0) {
                this.setState({
                    tasks: res.data
                })
                console.log(this.state.tasks);
            }
        })
    }

    deleteTask(id) {
        axios.delete('http://localhost:5000/tasks/' + id)
            .then(response => { console.log(response.data)});

        this.setState({
            tasks: this.state.tasks.filter(el => el._id !== id)
        })
    }

    taskList() {
        return this.state.tasks.map(current_task => {
            return <Task task={current_task} deleteTask={this.deleteTask} key={current_task._id}/>;
        })
    }

    render() {
        return (
            <div>
              <h3>Logged Exercises</h3>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { this.taskList() }
                </tbody>
              </table>
            </div>
          )
    }
}