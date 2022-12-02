import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddDisciplina from "./components/add-disciplina.component";
import Disciplina from "./components/disciplina.component";
import DisciplinasList from "./components/disciplinas-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/disciplinas"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/disciplinas"} className="nav-link">
                Disciplinas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/disciplinas"]} component={DisciplinasList} />
            <Route exact path="/add" component={AddDisciplina} />
            <Route path="/disciplinas/:id" component={Disciplina} />
          </Switch>
        </div>
      </div>
    );
  }
}

{/*
<Route exact path={["/", "/disciplinas"]} component={DisciplinasList} />
<Route exact path="/add" component={AddDisciplina} />
<Route path="/disciplinas/:id" component={Disciplina} />

<Route path={["/", "/disciplinas"]} element={<DisciplinasList/>} />
<Route path="/add" component={<AddDisciplina/>} />
<Route path="/disciplinas/:id" component={<Disciplina/>} />
*/}

export default App;
