interface ErrorMessageProps {
    message?: string;
  }
  
  const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;
  
    return (
      <p className="text-red-400 text-sm  mt-1">
        {/* <AlertCircle className="w-4 h-4 mr-1" /> */}
        {message}
      </p>
    );
  };
  
  export default ErrorMessage;
  