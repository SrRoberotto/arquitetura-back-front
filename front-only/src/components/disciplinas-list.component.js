import React, { Component } from "react";
import DisciplinaDataService from "../services/disciplinas.service";
import { Link } from "react-router-dom";

export default class DisciplinasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveDisciplinas = this.retrieveDisciplinas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDisciplina = this.setActiveDisciplina.bind(this);
    this.removeAllDisciplinas = this.removeAllDisciplinas.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      disciplinas: [],
      currentDisciplina: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveDisciplinas();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveDisciplinas() {
    console.log("Retrieving all...");
    DisciplinaDataService.getAll()
      .then(response => {
        this.setState({
          disciplinas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDisciplinas();
    this.setState({
      currentDisciplina: null,
      currentIndex: -1
    });
  }

  setActiveDisciplina(disciplina, index) {
    this.setState({
      currentDisciplina: disciplina,
      currentIndex: index
    });
  }

  removeAllDisciplinas() {
    DisciplinaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentDisciplina: null,
      currentIndex: -1
    });

    DisciplinaDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          disciplinas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, disciplinas, currentDisciplina, currentIndex } = this.state;
    console.log(DisciplinaDataService.getURL());

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Disciplinas List</h4>

          <ul className="list-group">
            {disciplinas &&
              disciplinas.map((disciplina, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDisciplina(disciplina, index)}
                  key={index}
                > {index} - 
                  {disciplina.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDisciplinas}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentDisciplina ? (
            <div>
              <h4>Disciplina</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentDisciplina.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentDisciplina.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentDisciplina.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/Disciplinas/" + currentDisciplina.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Disciplina...</p>

            </div>
          )}
        </div>
      </div>
    );
  }

  // renderItem(){
  //   <li
  //   className={
  //     "list-group-item " +
  //     (index === currentIndex ? "active" : "")
  //   }
  //   onClick={() => this.setActiveDisciplina(disciplina, index)}
  //   key={index}
  // >
  //   {disciplina.title}
  // </li>

  // }
}
