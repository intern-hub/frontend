import React from 'react';

import "./ResetPasswordPage.css";

import {toast} from "react-toastify";
import {withRouter} from "react-router";
import SimpleReactValidator from 'simple-react-validator';

import {Button} from "../../utils/button/Button";
import {MyInput} from "../../utils/input/MyInput";

class ResetPasswordPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            password: ''
        };
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
            return;
        }

        fetch("https://internhub.us.to/api/auth/password/reset", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: this.props.token,
            newPassword: this.state.password
          })
        }).then(response => {
          const status = response.status;
          const data = status === 200 ? {} : response.json();
          return Promise.all([status, data]);
        }).then(([status, data]) => {
          if (status === 200) {
            toast.success("Your password has been changed! Use it to log in.");
            this.props.history.push('/login');
          }
          else {
            toast.error(data.error);
            this.setState({password: ''});
          }
        });
    }

    handlePasswordChange(evt) {
        this.setState({password: evt.target.value});
    }

    render() {
        return (
            <div className="reset-container">
              <div className="reset-display">
                  <h1 className="reset-title">Enter A New Password</h1><br/>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className="reset-password">
                        <MyInput type="password" className="reset-input" value={this.state.password}
                                onChange={this.handlePasswordChange.bind(this)}/>
                          {this.validator.message('password', this.state.password, 'required')}
                      </div>
                      <div class="reset-button-container">
                          <Button className="reset-button" label={"Submit"}/>
                      </div>
                  </form>

              </div>
            </div>
        );
    }
}

export default withRouter(ResetPasswordPage);
