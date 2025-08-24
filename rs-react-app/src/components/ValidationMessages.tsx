import type { ValidationMessagesProps } from '../types/types';

const ValidationMessages = ({ errors }: ValidationMessagesProps) => {
  if (!errors) return null;

  const errorArray = Array.isArray(errors) ? errors : [errors];

  return (
    <div className="validation-messages">
      {errorArray.map((error, index) => (
        <div key={index} className="error-message">
          {error}
        </div>
      ))}
    </div>
  );
};

export default ValidationMessages;
