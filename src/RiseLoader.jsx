import React from 'react';
import PropTypes from 'prop-types';
import { keyframes, css, jsx } from '@emotion/core';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const riseAmount = 30;

const even = keyframes`
  0% {transform: scale(1.1)}
  25% {translateY(-___CSS_0___px)}
  50% {transform: scale(0.4)}
  75% {transform: translateY(___CSS_1___px)}
  100% {transform: translateY(0) scale(1.0)}
`;

const odd = keyframes`
  0% {transform: scale(0.4)}
  25% {translateY(___CSS_0___px)}
  50% {transform: scale(1.1)}
  75% {transform: translateY(___CSS_1___px)}
  100% {transform: translateY(0) scale(0.75)}
`;

class Loader extends React.Component {
    style = i => {
      const {
        color, size, sizeUnit, margin
      } = this.props;

      return css`{
            background-color: ___CSS_0___;
            width: ___CSS_1___;
            height: ___CSS_2___;
            margin: ___CSS_3___;
            border-radius: 100%;
            display: inline-block;
            animation: ___CSS_4___ 1s 0s infinite cubic-bezier(.15,.46,.9,.6);
            animation-fill-mode: both;
        }`;
    };

    wrapper = () => this.props.css || '';

    render() {
      const { loading } = this.props;

      return loading ?
        <div css={this.wrapper()}>
          <div css={this.style(1)} />
          <div css={this.style(2)} />
          <div css={this.style(3)} />
          <div css={this.style(4)} />
          <div css={this.style(5)} />
        </div> : null;
    }
}

Loader.propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
  margin: PropTypes.string,
  sizeUnit: PropTypes.string,
  css: PropTypes.string
};

Loader.defaultProps = {
  loading: true,
  color: '#000000',
  size: 15,
  margin: '2px',
  sizeUnit: 'px',
  css: ''
};

const Component = onlyUpdateForKeys(['loading', 'color', 'size', 'margin', 'sizeUnit', 'css'])(Loader);
Component.defaultProps = Loader.defaultProps;
export default Component;