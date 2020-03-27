import { Component } from 'react';

/**
 * 错误边界
 */
export default class PotentialError extends Component {
  componentDidCatch(error: any, info: any) {
    console.log(`
      error: ${error},
      info: ${info},
    `);
  }

  render() {
    return this.props.children;   
  } 
}