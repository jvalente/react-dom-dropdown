'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Body = exports.Trigger = exports.Dropdown = undefined;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

require('../style.css');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SCROLL_LIMIT = 100;

var Dropdown = (function (_React$Component) {
    _inherits(Dropdown, _React$Component);

    function Dropdown(props, context) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props, context));

        _this.state = {
            show_body: false,
            top: _this.props.top || false,
            right: _this.props.right || false,
            scrolling_parent: _this.props.scrolling_parent || null
        };

        _this._toggleShowBody = _this._toggleShowBody.bind(_this);
        _this._handleClickOutside = _this._handleClickOutside.bind(_this);

        _this._timeout = null;
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this._handleClickOutside, true);
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
        }
    }, {
        key: '_handleClickOutside',
        value: function _handleClickOutside(event) {
            var _this2 = this;

            var dropdown_dom_node = _reactDom2.default.findDOMNode(this);
            if (!dropdown_dom_node.contains(event.target)) this._toggleShowBody();else {
                this._timeout = setTimeout(function () {
                    if (_this2.state.show_body) {
                        _this2._toggleShowBody();
                    }
                }, 100);
            }
        }
    }, {
        key: '_toggleShowBody',
        value: function _toggleShowBody(event) {
            var top = this.state.top;

            if (event) {
                // NOTE: for this to work, offsetParent has to be relatively positioned
                var dropdown_offset = _reactDom2.default.findDOMNode(this).offsetTop;
                var scrolling_parent = document.getElementById(this.state.scrolling_parent);

                if (scrolling_parent) {
                    var scroll_offset = scrolling_parent.scrollTop;
                    var total_offset = dropdown_offset - scroll_offset;
                    var height = scrolling_parent.clientHeight;

                    top = height - total_offset < SCROLL_LIMIT;
                }
            }

            if (!this.state.show_body) {
                // will show
                if (this.props.onShowBody) this.props.onShowBody();
                document.addEventListener('click', this._handleClickOutside, true);
            } else {
                // will hide
                if (this.props.onHideBody) this.props.onHideBody();
                document.removeEventListener('click', this._handleClickOutside, true);
            }

            this.setState({
                show_body: !this.state.show_body,
                top: top
            });
        }
    }, {
        key: '_getTriggerComponent',
        value: function _getTriggerComponent() {
            var _trigger = this.props.children[0];
            return _react2.default.cloneElement(_trigger, { onClick: this._toggleShowBody });
        }
    }, {
        key: '_getBodyComponent',
        value: function _getBodyComponent() {
            var _body = this.props.children[1];
            var style = { position: 'relative' };
            var _state = this.state;
            var right = _state.right;
            var top = _state.top;

            var props = { top: top, right: right };

            var class_name = (0, _classnames2.default)({
                body_wrapper: true,
                with_arrow: true,
                top: top,
                bottom: !top
            });

            if (this.state.show_body) {
                return _react2.default.createElement(
                    'div',
                    { className: class_name, style: style },
                    _react2.default.cloneElement(_body, props)
                );
            }

            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var class_name = 'dropdown';
            var style = { display: 'inline-block' };
            if (this.props.className) class_name += ' ' + this.props.className;

            return _react2.default.createElement(
                'div',
                { style: style, className: class_name },
                this.state.top && this._getBodyComponent(),
                this._getTriggerComponent(),
                !this.state.top && this._getBodyComponent()
            );
        }
    }]);

    return Dropdown;
})(_react2.default.Component);

var Trigger = (function (_React$Component2) {
    _inherits(Trigger, _React$Component2);

    function Trigger(props, context) {
        _classCallCheck(this, Trigger);

        var _this3 = _possibleConstructorReturn(this, (Trigger.__proto__ || Object.getPrototypeOf(Trigger)).call(this, props, context));

        _this3._onClick = _this3._onClick.bind(_this3);
        return _this3;
    }

    _createClass(Trigger, [{
        key: '_onClick',
        value: function _onClick(event) {
            event.preventDefault();
            event.stopPropagation();
            this.props.onClick(event);
        }
    }, {
        key: 'render',
        value: function render() {
            var style = {
                display: 'block'
            };

            return _react2.default.createElement(
                'div',
                { style: style, className: 'trigger', onClick: this._onClick },
                this.props.children
            );
        }
    }]);

    return Trigger;
})(_react2.default.Component);

var Body = (function (_React$Component3) {
    _inherits(Body, _React$Component3);

    function Body() {
        _classCallCheck(this, Body);

        return _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).apply(this, arguments));
    }

    _createClass(Body, [{
        key: 'render',
        value: function render() {
            var style = {
                position: 'absolute',
                right: 0,
                top: 0
            };

            if (this.props.top) {
                style.top = 'auto';
                style.bottom = 0;
            }

            if (this.props.right) {
                style.right = 'auto';
                style.left = 0;
            }

            return _react2.default.createElement(
                'div',
                { style: style, className: 'body' },
                this.props.children
            );
        }
    }]);

    return Body;
})(_react2.default.Component);

exports.Dropdown = Dropdown;
exports.Trigger = Trigger;
exports.Body = Body;