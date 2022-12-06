import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

//styles
import "./customerBugLog.css";

export default function CustomerBugLog() {
  const { id } = useParams();
  const { error, document } = useDocument("customers", id);
  const { updateDocument, response } = useFirestore("customers");

  const [displayForm, setDisplayForm] = useState(false);
  const [formError, setFormError] = useState(null);

  //form field values
  const [reporter, setReporter] = useState("");
  const [detail, setDetail] = useState("");
  const [resolution, setResolution] = useState("");
  const [location, setLocation] = useState("");

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">loading...</div>;
  }

  const handleClick = () => {
    displayForm ? setDisplayForm(false) : setDisplayForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    // use library to generate uuid math.random is temp
    const bugToAdd = {
      reporter,
      detail,
      resolution,
      location,
      id: Math.random(),
    };

    await updateDocument(document.id, {
      customerBugs: [...document.customerBugs, bugToAdd],
    });
    if (response.error) {
      setFormError(response.error);
      setReporter("");
      setDetail("");
      setLocation("");
      setResolution("");
    }
    if (!response.error) {
      setReporter("");
      setDetail("");
      setLocation("");
      setResolution("");
    }
  };

  return (
    <div>
      <div className={displayForm ? "form-module-open" : "form-display-close"}>
        {!displayForm && <button onClick={handleClick}> + </button>}
        {displayForm && (
          <form onSubmit={handleSubmit}>
            <button onClick={handleClick}> x </button>
            <label>
              <span>Reporter:</span>
              <input
                required
                type="text"
                onChange={(e) => setReporter(e.target.value)}
                value={reporter}
              />
            </label>
            <label>
              <span>Bug Detail:</span>
              <textarea
                required
                type="text"
                onChange={(e) => setDetail(e.target.value)}
                value={detail}
              ></textarea>
            </label>
            <label>
              <span>Resolution Detail:</span>
              <textarea
                required
                type="text"
                onChange={(e) => setResolution(e.target.value)}
                value={resolution}
              ></textarea>
            </label>
            <label>
              <span>File Location:</span>
              <input
                required
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </label>
            <button className="btn">Add Bug</button>
            {formError && <p className="error">{formError}</p>}
          </form>
        )}
      </div>
      {document.customerBugs.length === 0 && <h4> No Bugs Logged</h4>}
      {document.customerBugs.length > 0 &&
        document.customerBugs.map((bug) => (
          <div key={bug.id}>
            <h4>{bug.reporter}</h4>
            <p>{bug.detail}</p>
            <p>{bug.resolution}</p>
            <p>{bug.location}</p>
          </div>
        ))}
    </div>
  );
}
