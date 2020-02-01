import React from 'react';
import api from '../api/index';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    handleShowUsers = async ()=> {
        await api.showUsers().then(res => {
          console.log("users are ...",res)
        });
    }
} 