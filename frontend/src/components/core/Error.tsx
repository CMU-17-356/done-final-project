import React from 'react';
import { ErrorText } from './Text';

function ErrorMessage(props: any) {
  const { message } = props;
  return (
    <ErrorText>
      {message}
    </ErrorText>
  );
}

export default ErrorMessage;