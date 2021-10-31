import './App.css';
import 'antd/dist/antd.css';
import { API, PATH } from './const.js';
import React, { Component } from 'react';
import { Button, Divider, Tag, Col, Input, Row, Space, message } from 'antd';
import axios from 'axios';
import {
  SyncOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSpin: true,
      foodName: 'Rooooooooooll！',
      foodList: [],
      fa: '',
      fb: '',
      fc: '',
      fd: '',
    };
  }

  roll = (e) => {
    axios.get(API + PATH.ROLL, {})
      .then(response => {
        if (response) {
          this.setState({
            foodName: response.data,
            isSpin: false
          })
        }
      })
      .catch(error => {
        console.log(error);
      });

  }

  getList = (e) => {
    axios.get(API + PATH.LIST, {})
      .then(response => {
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

  setFa = (e) => {
    this.setState({
      fa: e.target.value.trim()
    })
  }

  setFb = (e) => {
    this.setState({
      fb: e.target.value.trim()
    })
  }

  setFc = (e) => {
    this.setState({
      fc: e.target.value.trim()
    })
  }

  setFd = (e) => {
    this.setState({
      fd: e.target.value.trim()
    })
  }

  submit = (e) => {
    // console.log('submit fa:', this.state.fa)
    // console.log('submit fb:', this.state.fb)
    // console.log('submit fc:', this.state.fc)
    // console.log('submit fd:', this.state.fd)

    let arr = new Array(0);
    if (this.state.fa.length > 0) {
      arr.push(this.state.fa);
    }

    if (this.state.fb.length > 0) {
      arr.push(this.state.fb);
    }

    if (this.state.fc.length > 0) {
      arr.push(this.state.fc);
    }


    if (this.state.fd.length > 0) {
      arr.push(this.state.fd);
    }

    if (arr.length === 0) {
      console.log('arr is empty', arr)
      return;
    }

    console.log('arr', arr)

    axios.post(API + PATH.ADD, {
      list: arr
    }).then(response => {
      if (response && response.status === 200) {
        message.success('添加成功!', 2);
      }

      console.log('rsp', response)
    })
      .catch(error => {
        console.log(error);
      });
  }

  clear = (e) => {
    this.setState({
      fa: '',
      fb: '',
      fc: '',
      fd: '',
    })
  }

  render() {
    const outSideCSS = {
      textAlign: 'center',
      marginTop: '100px'
    }

    const boxCSS = {
      display: 'inline-block',
      with: '100px',
      marginRight: '25px'
    }

    const marginRightConst = {
      marginRight: '25px'
    }

    const w = {
      textAlign: 'center',
      margin: '0 auto',
      width: '800px'
    }

    const colourList = ["magenta", "red", "volcano", "orange", "gold",
      "lime", "green", "cyan", "blue", "geekblue", "purple"];
    var count = 0;

    var foodList = null;
    if (this.state.foodList.length > 0) {
      foodList = this.state.foodList.map((food) =>
        <Tag key={food.toString()} color={colourList[(count++) % colourList.length]}>
          {food}
        </Tag>
      );
    }

    return (
      // <div className="App">
      <div >


        <div style={outSideCSS}>
          <div>
            <span style={boxCSS}>{this.state.foodName}</span>

            <SyncOutlined spin={this.state.isSpin} onClick={this.roll} style={marginRightConst} />
            <span style={marginRightConst}>
              <UnorderedListOutlined onClick={this.getList} >list</UnorderedListOutlined>
            </span>
          </div>

          <div style={w}>
            <Divider orientation="left"></Divider>

            <Row>
              <Space>
                <Col >
                  <Input value={this.state.fa} onChange={this.setFa}></Input>
                </Col>

                <Col >
                  <Input value={this.state.fb} onChange={this.setFb}></Input>
                </Col>

                <Col >
                  <Input value={this.state.fc} onChange={this.setFc}></Input>
                </Col>

                <Col >
                  <Input value={this.state.fd} onChange={this.setFd}></Input>
                </Col>

                {/* <PlusCircleOutlined onClick={this.addFood} /> */}


                <Button type="primary" onClick={this.submit}>Submit</Button>
                <Button onClick={this.clear}>Clear</Button>


              </Space>
            </Row>

            <Divider ></Divider>

            <div>
              {foodList}
            </div>

          </div>




        </div>
      </div>
    );
  }
}

export default App;
