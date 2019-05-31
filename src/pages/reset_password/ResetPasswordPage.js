import React from 'react';

import "./ResetPasswordPage.css";

import {toast} from "react-toastify";
import {withRouter} from "react-router";

class ResetPasswordPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { 
            title: 'Verifying token ...',
            subtitle: 'This will take a minute.',
            countdown: 3 
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
              subtitle: `You will be redirected to the home page in ${this.state.countdown} seconds.`
            });
          }
          else {
            this.setState({ 
              title: 'Token verification failed.', 
              subtitle: `You will be redirected to the home page in ${this.state.countdown} seconds.`
            });
            toast.error(data.error);
          }

          let self = this;
          setInterval(() => {
            if (self.state.countdown > 0) {
              self.setState({ 
                subtitle: `You will be redirected to the home page in ${self.state.countdown - 1} seconds.`, 
                countdown: self.state.countdown - 1 
              });
            }
            else {
              self.props.history.push('/');
            }
          }, 1000);
        });
    }

    render() {
        return (
            <div className="reset-container">
              <div className="reset-display">
                  <h1 className="reset-title">{this.state.title}</h1><br/>
                  <h2 className="reset-subtitle">{this.state.subtitle}</h2>
              </div>
            </div>
        );
    }
}

export default withRouter(ResetPasswordPage);
