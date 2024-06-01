import "./style.css";

export default function EventForm() {
  return (
    <>
      <form className="forms form-option">
        <div className="for-input">
          <span>title</span>
          <input className="inputs" type="text"></input>
          <span className="validation">error!</span>
        </div>
      </form>
    </>
  );
}