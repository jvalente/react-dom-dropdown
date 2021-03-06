import '../style.css';
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

const SCROLL_LIMIT = 100;

class Dropdown extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show_body: false,
            top: this.props.top || false,
            right: this.props.right || false,
            scrolling_parent: this.props.scrolling_parent || null
        };

        this._toggleShowBody = this._toggleShowBody.bind(this);
        this._handleClickOutside = this._handleClickOutside.bind(this);

        this._timeout = null;
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleClickOutside, true);
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
    }

    _handleClickOutside(event) {
        const dropdown_dom_node = ReactDOM.findDOMNode(this);
        if(!dropdown_dom_node.contains(event.target))
            this._toggleShowBody();
        else {
            this._timeout = setTimeout(() => {
                if(this.state.show_body) {
                    this._toggleShowBody();
                }
            }, 100);
        }
    }

    _toggleShowBody(event) {
        let top = this.state.top;

        if (event) {
            // NOTE: for this to work, offsetParent has to be relatively positioned
            const dropdown_offset = ReactDOM.findDOMNode(this).offsetTop;
            const scrolling_parent = document.getElementById(this.state.scrolling_parent);

            if (scrolling_parent) {
                const scroll_offset = scrolling_parent.scrollTop;
                const total_offset = dropdown_offset - scroll_offset;
                const height = scrolling_parent.clientHeight;

                top = (height - total_offset < SCROLL_LIMIT);
            }
        }

        if (!this.state.show_body) { // will show
            if (this.props.onShowBody) this.props.onShowBody();
            document.addEventListener('click', this._handleClickOutside, true);
        } else { // will hide
            if (this.props.onHideBody) this.props.onHideBody();
            document.removeEventListener('click', this._handleClickOutside, true);
        }

        this.setState({
            show_body: !this.state.show_body,
            top: top
        });
    }

    _getTriggerComponent() {
        let _trigger = this.props.children[0];
        return React.cloneElement(_trigger, { onClick: this._toggleShowBody });
    }

    _getBodyComponent() {
        const _body = this.props.children[1];
        const style = { position:'relative' };
        const { right, top } = this.state;
        const props = { top, right };

        const class_name = classNames({
            body_wrapper: true,
            with_arrow: true,
            top: top,
            bottom: !top
        })

        if (this.state.show_body) {
            return (
                <div className={ class_name } style={ style }>
                    { React.cloneElement(_body, props) }
                </div>
            );
        }

        return false;
    }

    render() {
        let class_name = 'dropdown';
        let style = { display: 'inline-block' };
        if (this.props.className) class_name += ` ${this.props.className}`;

        return (
            <div style={ style } className={ class_name }>
                { this.state.top && this._getBodyComponent() }
                { this._getTriggerComponent() }
                { !this.state.top && this._getBodyComponent() }
            </div>
        );
    }
}

class Trigger extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onClick = this._onClick.bind(this);
    }

    _onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onClick(event);
    }

    render() {
        const style = {
            display: 'block'
        }

        return (
            <div style={ style } className='trigger' onClick={ this._onClick } >
                { this.props.children }
            </div>
        );
    }
}

class Body extends React.Component {
    render() {
        let style = {
            position: 'absolute',
            right: 0,
            top: 0
        }

        if (this.props.top) {
            style.top = 'auto';
            style.bottom = 0;
        }

        if (this.props.right) {
            style.right = 'auto';
            style.left = 0;
        }

        return (
            <div style={ style } className='body'>
                { this.props.children }
            </div>
        );
    }
}

export { Dropdown, Trigger, Body };
