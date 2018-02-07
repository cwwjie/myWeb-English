import * as React from 'react';
import config from './../config';

export default class English extends React.Component {
  access_token

  constructor(props) {
    super(props);

    this.state = {
      AudioSrc: null,
      markNumber: null, // 记录数字
      isShowValue: true,
      isShowTranslate: true,
      data: []
    };

    this.toMark.bind(this);
    this.text2audio.bind(this);
  }

  componentDidMount() {
    fetch(`${config.basicUrl}/english/get`)
    .then(response => response.json())
    .then(val => {
      if (val.result === 1) {
        this.setState({'data': val.data});
      } else {
        alert(val.message);
      }
    })
    .catch(error => alert(error));
    
    fetch(`${config.basicUrl}/baidu/getAccessToken`)
    .then(response => response.json())
    .then(val => {
      if (val.result === 1) {
        this.access_token = val.data.access_token;
      } else {
        alert(val.message);
      }
    })
    .catch(error => alert(error));
  }

  text2audio(value) {
    let vid = document.getElementById('myVideo');
    vid.innerHTML = `<audio type="audio/mp3" src="http://tsn.baidu.com/text2audio?tex=${value}&lan=zh&cuid=15976713287&ctp=1&tok=${this.access_token}" controls="controls" autoplay="autoplay"></audio>`;
  }

  renderEnglish() {
    return this.state.data.map((val, key) => (
      <div 
        key={key}
        onClick={() => this.text2audio(val.value)}
        className={this.state.markNumber === (key + 1) ? 'row eng-item eng-Mark' : 'row eng-item'}
      >
        <div className='col-1'>{key + 1}</div>
        <div className='col-2'>{this.state.isShowValue ? val.value : '--- 隐藏 ---' }</div>
        <div className='col-7'>{this.state.isShowTranslate ? val.translate : '--- 隐藏 ---' }</div>
        <div className='col-1'>{val.page}</div>
        <div className='col-1' onClick={() => this.toMark(key + 1)}>Mark</div>
      </div>
    ));
  }

  toMark(key) {
    this.setState({'markNumber': key});
  }

  SwitchValueShow() {
    this.setState({
      isShowValue: !this.state.isShowValue
    });
  }

  SwitchTranslateShow() {
    this.setState({
      isShowTranslate: !this.state.isShowTranslate
    });
  }

  render() {
    return (
      <div className='English'>
        <div id='myVideo' className='English-audio'>
          {/* <audio type="audio/mp3" src="http://tsn.baidu.com/text2audio?tex=value&lan=zh&cuid=15976713287&ctp=1&tok=24.b53eed642f92ed8bc4c21d61969ecf8e.2592000.1520344527.282335-10792466"  autoPlay={true} id='myVideo' controls="controls" autoPlay={true}></audio> */}
        </div>

        <div className='row eng-operat'>
          <div className='col-2'>进度: {this.state.markNumber}</div>
          <div className='col-2' onClick={this.SwitchValueShow.bind(this)}>
            单词: {this.state.isShowValue ? '隐藏' : '显示'}
          </div>
          <div className='col-2' onClick={this.SwitchTranslateShow.bind(this)}>
            翻译: {this.state.isShowTranslate ? '隐藏' : '显示'}
          </div>
        </div>
        <div className='eng-content'>
          {this.renderEnglish.call(this)}
        </div>
      </div>
    );
  }
};
