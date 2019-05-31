import React from 'react';

import "./ResetPasswordPage.css";

import {toast} from "react-toastify";
import {withRouter} from "react-router";

class ResetPasswordPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { 
            title: 'Verifying token ...',
            countdown: -1
        };
    }

    componentDidMount() {
        fetch("https://internhub.us.to/api/auth/password/reset", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({token: this.props.token})
        }).then(response => {
          const status = response.status;
          const data = status === 200 ? {} : response.json();
          return Promise.all([status, data]);
        }).then(([status, data]) => {
          if (status === 200) {
            this.setState({ 
              title: 'Your password has been reset!', 
              countdown: 3,
              redirectPage: 'login',
              redirectRoute: '/login',
            });
          }
          else {
            this.setState({ 
              title: 'Token verification failed.', 
              countdown: 3,
              redirectPage: 'home',
              redirectRoute: '/',
            });
            toast.error(data.error);
          }

          let self = this;
          let countdown_task = setInterval(() => {
            if (self.state.countdown > 0) {
              self.setState({ 
                countdown: self.state.countdown - 1 
              });
            }
            else {
              clearInterval(countdown_task);
              self.props.history.push(this.state.redirectRoute);
            }
          }, 1000);
        });
    }

    render() {
        return (
            <div className="reset-container">
              <div className="reset-display">
                  <h1 className="reset-title">{this.state.title}</h1><br/>
                  <h2 className="reset-subtitle">{this.state.countdown >= 0 ? `You will be redirected to the ${this.state.redirectPage} page in ${this.state.countdown} seconds.` : "This will only be a minute."}</h2>
              </div>
            </div>
        );
    }
}

export default withRouter(ResetPasswordPage);
