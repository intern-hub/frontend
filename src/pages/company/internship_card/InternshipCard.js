import React from 'react';

import "./InternshipCard.css";
import PropTypes from 'prop-types';
import ExternalLinkWrapper from "../../../utils/button/ExternalLinkWrapper";

import {ReactComponent as NotesIcon} from "../../../img/heroicons/icon-edit.svg"
import {ReactComponent as AppliedIcon} from "../../../img/heroicons/icon-star.svg"
import {ReactComponent as BrokenIcon} from "../../../img/heroicons/icon-flag.svg"
import Modal from 'react-modal';
import {Button} from "../../../utils/button/Button";
import {updateIfExists, updateIfNotExists} from "../../../actions/Auth";

Modal.setAppElement('#root');

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export class InternshipCard extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            hasLoadedApplicationData: false,

            application: {
                applied: false,
                broken: false,
                created: false,
                notes: "",
            },
        };

        if (props.application) {
            this.state.application = Object.assign({}, props.application, {created: true});
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        // keep props synchronized with state - Yes I know this is an antipattern, but we need it
        // to keep notes synchronized - this component cannot be controlled and if we already have
        // to do get requests continuously to get new application ids, why not just keep state nad props synchronized
        if (JSON.stringify(this.props.application) !== JSON.stringify(nextProps.application)) {
            this.setState({
                application: Object.assign({}, nextProps.application, {created: true}),
            });
        }
    }

    openModal() {
        this.setState({modalOpen: true});
    }

    closeModal() {
        this.setState({modalOpen: false});
        this.createOrUpdateOnServer({notes: this.state.application.notes});
    }

    onApplyButtonClick(evt) {
        evt.preventDefault();
        let newApplied = !this.state.application.applied;
        this.setState({application: Object.assign({}, this.state.application, {applied: newApplied})});
        this.createOrUpdateOnServer({applied: newApplied});
    }

    onFlagButtonClick(evt) {
        evt.preventDefault();
        let newBroken = !this.state.application.broken;
        this.setState({application: Object.assign({}, this.state.application, {broken: newBroken})});
        this.createOrUpdateOnServer({broken: newBroken});
    }

    createOrUpdateOnServer(update) {
        if (this.state.application.created) {
            if(!this.props.application) {
                console.error("User has created an application client side but somehow that did not get created server side, exting.");
                return;
            }
            updateIfExists(this.props.application.id, update);
        } else {
            updateIfNotExists(this.props.id, update).then((success) => {
                if (success) {
                    this.setState({application: Object.assign({}, this.state.application, {created: true})});
                    // need this so that whenever we have an application that already exists, we can use
                    // the application id above
                    this.props.onApplicationUpdate();
                }
            });
        }
    }

    onChangeNotes(e) {
        this.setState({
            application: Object.assign({}, this.state.application, {notes: e.target.value})
        });
    }

    render() {
        if (this.props.active) {
            return (
                <div className="is-wrapper">
                    <ExternalLinkWrapper to={this.props.link}>
                        <div className="is-name">
                            {this.props.name}
                        </div>
                    </ExternalLinkWrapper>
                    <div className="is-buttons">
                        <button onClick={this.openModal.bind(this)} className="is-button"><NotesIcon/></button>
                        <button className="is-button" style={{fill: this.state.application.applied ? "green" : "black"}}
                                onClick={this.onApplyButtonClick.bind(this)}><AppliedIcon/></button>
                        <button className="is-button" style={{fill: this.state.application.broken ? "red" : "black"}}
                                onClick={this.onFlagButtonClick.bind(this)}>
                            <BrokenIcon/></button>
                    </div>


                    <Modal isOpen={this.state.modalOpen}
                           style={modalStyles}
                           onRequestClose={this.closeModal.bind(this)}>
                        <div className="app-note-modal">
                            <div> Application Notes</div>
                            <textarea value={this.state.application.notes}
                                      style={{border: "1px solid gray"}}
                                      cols={50}
                                      rows={20}
                                      onChange={this.onChangeNotes.bind(this)}/>

                            <div className="app-note-btns">
                                <div/>
                                <Button onClick={this.closeModal.bind(this)} label={"Close"}/>
                                <Button label={"Save"}/>
                            </div>
                        </div>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div className="is-wrapper">
                    <div className="is-name">
                        {this.props.name}
                    </div>
                </div>
            )
        }
    }
}

InternshipCard.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    application: PropTypes.object,
    active: PropTypes.bool,
    onApplicationUpdate: PropTypes.func,
};

InternshipCard.defaultProps = {
    name: "No internships found",
    active: true,
};
