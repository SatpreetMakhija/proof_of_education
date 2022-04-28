export default function ErrorMessage({ message }) {
	if (!message) return null;

	return (
		<div className="alert alert-danger">
		<div className="flex-1">
		  <label>{message}</label>
		</div>
	  </div>
	);
  }
  