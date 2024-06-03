import "./style.css";

export default function EventForm() {
  return (
    <>
      <form className="forms form-option">
        <section className="left">
          <img src="/textures/invalid_images.svg" alt="Selected"/>
          <span className="validation"></span>
          <label className="buttons file-button">
            Choose file
            <input type="file" accept="image/*" style={{ display: 'none' }}/>
          </label>
        </section>
        <section className="right">
          <div className="for-input">
            <span>title</span>
            <input className="inputs" type="text"/>
            <span className="validation"></span>
          </div>
          <div className="for-input second">
            <span>description</span>
            <textarea className="inputs sec-input"/>
            <span className="validation"></span>
          </div>
          <div className="for-input">
            <span>datetime</span>
            <input className="inputs" type="datetime-local"/>
            <span className="validation"></span>
          </div>
          <div className="for-input">
            <span>location</span>
            <input className="inputs" type="text"/>
            <span className="validation"></span>
          </div>
          <button className='buttons'>apply</button>
        </section>
      </form>
    </>
  );
}