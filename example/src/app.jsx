import React from 'react';
import ReactDOM from 'react-dom';
import {Dropdown, Trigger, Body} from 'react-dropdown-menu';

class DummyTrigger extends React.Component {
    render() {
        return (
            <div className='dummy_trigger'>
            </div>
        );
    }
}

class DummyBody extends React.Component {
    render() {
        return (
            <div className='dummy_body'>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                </ul>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h3>Bottom right dropdown</h3>
                <Dropdown right>
                    <Trigger>
                        <DummyTrigger />
                    </Trigger>
                    <Body>
                        <DummyBody />
                    </Body>
                </Dropdown>
                <h3>Top left dropdown</h3>
                <Dropdown top>
                    <Trigger>
                        <DummyTrigger />
                    </Trigger>
                    <Body>
                        <DummyBody />
                    </Body>
                </Dropdown>
                <h3>Auto vertical position based on scroll state</h3>
                <div id='scroll'>
                    <Dropdown scrolling_parent='scroll'>
                        <Trigger>
                            <DummyTrigger />
                        </Trigger>
                        <Body>
                            <DummyBody />
                        </Body>
                    </Dropdown>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <Dropdown scrolling_parent='scroll'>
                        <Trigger>
                            <DummyTrigger />
                        </Trigger>
                        <Body>
                            <DummyBody />
                        </Body>
                    </Dropdown>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <Dropdown scrolling_parent='scroll'>
                        <Trigger>
                            <DummyTrigger />
                        </Trigger>
                        <Body>
                            <DummyBody />
                        </Body>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
