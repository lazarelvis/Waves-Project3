import React, { Component } from "react";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: [],
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState,
      });
    }
  }

  //change the state for arrow button (up and down icon)
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  //if is open show icon up else icon down
  handleAngle = () =>
    this.state.open ? (
      <FontAwesomeIcon icon={faAngleUp} className="icon" />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className="icon" />
    );

  handleToogle = (value) => () => {
    //a var val name cheched = to state
    //same ass const checked = this.state.checked
    const { checked } = this.state; //short version
    const currentIndex = checked.indexOf(value); //search in array it gives the position for that value
    const newChecked = [...checked]; //same as this.state

    if (currentIndex === -1) {
      //not on the list
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1); //pass the position of the value we want to delete 1
    }

    //need to pass to parrent component
    // console.log(newChecked);
    this.setState(
      {
        checked: newChecked,
      },
      () => {
        this.props.handleFilters(newChecked);
      }
    );
  };

  renderList = () =>
    this.props.list
      ? this.props.list.map((value) => (
          <ListItem key={value._id} style={{ padding: "10xp 0" }}>
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={this.handleToogle(value._id)}
                checked={this.state.checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List
          style={{
            borderBottom: "1px solid #dbdbdb",
          }}
        >
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 23px 10x 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
