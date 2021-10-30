import './App.css';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Button, List } from 'antd';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foodName: '',
      foodList: []
    };
  }

  roll = (e) => {
    axios.post('/roll', {})
      .then(response => {
        console.log(response);
        if (response) {
          this.setState({
            foodName: response.data
          })
        }
      })
      .catch(error => {
        console.log(error);
      });

  }

  getList = (e) => {
    axios.post('/list', {})
      .then(response => {
        console.log(response);
        if (response) {
          this.setState({
            foodList: response.data.list
          })
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div>{this.state.foodName}</div>
        <Button type="primary" onClick={this.roll}>roll</Button>
        <Button type="primary" onClick={this.getList}>list</Button>
        <List
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={this.state.foodList}
          renderItem={item => (
            <List.Item>
              {/* <Typography.Text mark>[ITEM]</Typography.Text> {item} */}
              {item}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default App;
