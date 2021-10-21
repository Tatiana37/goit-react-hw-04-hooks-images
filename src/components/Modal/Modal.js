import { Component } from "react";
import { createPortal } from "react-dom";
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component{
    state={}
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.addEventListener('keydown', this.handleKeyDown);
        
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            console.log('ESC')
            this.props.onClose();
        }
    }

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <div className={s.backdrop} onClick={this.handleBackdropClick}>
                <div className={s.content}>{this.props.children}</div>
            </div>,
            modalRoot,
        );
        
    }
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
}
