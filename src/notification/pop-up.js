import React from 'react';

export default class PopUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  handleClick(e){
    if(e.target.className == "backdrop") {
      this.props.onClose();
    }
  }
  render() {
    return (
      <div className="backdrop" onClick={this.handleClick.bind(this)}>
        <div className="modal-addgroup">
        <p>Notifications</p>
          {this.props.children}
          <div className="message">If you want to add notification - press ACCEPT button</div>
          <div className="footer">
            <button onClick={this.props.onClose}>
              cancel
            </button>
            <button onClick={() => {this.props.onClose(); window.open("https://stackoverflow.com/questions/45046030/maintaining-href-open-in-new-tab-with-an-onclick-handler-in-react", "_blank")}}>
              accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}