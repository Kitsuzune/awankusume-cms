import React from 'react';
import { Button as AntButton } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(AntButton)`
  &.ant-btn-primary {
    background-color: #007893;
  }
`;

const Button = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
