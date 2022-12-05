function Alert({acceptCollback,cancelCollback,text}) {

  const acceptFunc = acceptCollback
  const cancelFunc = cancelCollback


  function accept(){
    acceptFunc()
  }
  function cancel(){
    cancelFunc()
  }

  return (
    <section className="alert">
      <div className="alert-info">
        {text}
      </div>
      <div className="alert-options">
        <button onClick={accept} className="alert-options-accept">Accept</button>
        <button onClick={cancel} className="alert-options-cancel">Cancel</button>
      </div>
    </section>
  );
}

export default Alert;