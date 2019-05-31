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
            applicationNotes: '',
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.state.applicationNotes.length === 0 && nextProps.application) {
            this.setState({applicationNotes: nextProps.application.notes});
        }
    }

    openModal() {
        this.setState({modalOpen: true});
    }

    closeModal() {
        this.setState({modalOpen: false});
        this.createOrUpdateApplicationNotes();
    }

    createOrUpdateApplicationNotes() {
        if(this.props.application) {
            updateIfExists(this.props.application.id, this.state.applicationNotes);
        } else {
            console.log("Posting");
            updateIfNotExists(this.props.id, this.state.applicationNotes);
        }
        this.props.onApplicationUpdate();
    }

    onChangeApplicationNotes(e) {
        this.setState({applicationNotes: e.target.value});
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
                        <button className="is-button"><AppliedIcon/></button>
                        <button className="is-button"><BrokenIcon/></button>
                    </div>


                    <Modal isOpen={this.state.modalOpen}
                           style={modalStyles}
                           onRequestClose={this.closeModal.bind(this)}>
                        <div className="app-note-modal">
                            <div> Application Notes</div>
                            <textarea value={this.state.applicationNotes}
                                      style={{border: "1px solid gray"}}
                                      cols={50}
                                      rows={20}
                                      onChange={this.onChangeApplicationNotes.bind(this)}/>

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
    id: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    application: PropTypes.object,
    active: PropTypes.bool,
    onApplicationUpdate: PropTypes.func.isRequired,
};

InternshipCard.defaultProps = {
    name: "No internships found",
    active: true
};
