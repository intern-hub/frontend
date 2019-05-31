import React from 'react';
import Header from "./header/Header";
import {Body} from "./body/Body";
import {bindActionCreators} from "redux";
import {fetchUserData} from "../../actions/Account";
import {connect} from "react-redux";

class LandingPage extends React.PureComponent {

    componentDidMount() {
        this.props.fetchUserData();
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Body/>
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserData: fetchUserData,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(LandingPage);
