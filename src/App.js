import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./App.scss";
import View from "./View";
import Add from "./Add";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postId: undefined,
    };
  }

  componentDidMount() {
    const listContents = localStorage.getItem("posts");
    let postValue = 0;
    if (listContents) {
      postValue = JSON.parse(listContents)[JSON.parse(listContents).length - 1]
        .postid;
    }

    this.setState({ posts: JSON.parse(listContents) || [], postId: postValue });
  }

  updateListItems(postid, id, text, img, likes, loves) {
    const postItem = { postid, id, text, img, likes, loves };
    this.setState(
      (state) => ({
        posts: state.posts.concat(postItem),
      }),
      () => localStorage.setItem("posts", JSON.stringify(this.state.posts))
    );
  }

  addLike(id) {
    this.setState(
      (state) => ({
        posts: state.posts.map((post) =>
          post.postid === id ? { ...post, likes: post.likes + 1 } : post
        ),
      }),
      () => localStorage.setItem("posts", JSON.stringify(this.state.posts))
    );
  }

  addLove(id) {
    this.setState(
      (state) => ({
        posts: state.posts.map((post) =>
          post.postid === id ? { ...post, loves: post.loves + 1 } : post
        ),
      }),
      () => localStorage.setItem("posts", JSON.stringify(this.state.posts))
    );
  }

  render() {
    return (
      <Router>
             <Navbar expand="md">
          <Navbar.Brand>
            <img src={logo} alt="social network logo" className="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">
                View bubbles
              </Link>
              <Link className="nav-link" to="/add">
                Blow a bubble
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container>
          <Switch>
            <Route path="/add">
              <Add
                onsubmit={(postid, id, text, img, likes, loves) =>
                  this.updateListItems(postid, id, text, img, likes, loves)
                }
                lastid={this.state.postId}
              />
            </Route>
            <Route exact path="/">
              <View
                posts={this.state.posts}
                likeaction={(id) => this.addLike(id)}
                loveaction={(id) => this.addLove(id)}
              />
            </Route>
            <Route path="/">Error: 404 not found</Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}
export default App;
