import React, { Component } from "react";
import DisciplinaDataService from "../services/disciplinas.service";
//import { withRouter } from '../common/with-router';

// export default 
class Disciplina extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getDisciplina = this.getDisciplina.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateDisciplina = this.updateDisciplina.bind(this);
    this.deleteDisciplina = this.deleteDisciplina.bind(this);

    this.state = {
      currentDisciplina: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDisciplina(this.props.match.params.id);
    // this.getDisciplina(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDisciplina: {
          ...prevState.currentDisciplina,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentDisciplina: {
        ...prevState.currentDisciplina,
        description: description
      }
    }));
  }

  getDisciplina(id) {
    DisciplinaDataService.get(id)
      .then(response => {
        this.setState({
          currentDisciplina: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentDisciplina.id,
      title: this.state.currentDisciplina.title,
      description: this.state.currentDisciplina.description,
      published: status
    };

    DisciplinaDataService.update(this.state.currentDisciplina.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentDisciplina: {
            ...prevState.currentDisciplina,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDisciplina() {
    DisciplinaDataService.update(
      this.state.currentDisciplina.id,
      this.state.currentDisciplina
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Disciplina was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDisciplina() {    
    DisciplinaDataService.delete(this.state.currentDisciplina.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Disciplinas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDisciplina } = this.state;
    console.log(DisciplinaDataService.getURL());
    return (
      <div>
        {currentDisciplina ? (
          <div className="edit-form">
            <h4>Disciplina</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentDisciplina.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentDisciplina.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentDisciplina.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentDisciplina.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDisciplina}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDisciplina}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Disciplina...</p>
          </div>
        )}
      </div>
    );
  }
}

export default Disciplina; //withRouter(Disciplina);