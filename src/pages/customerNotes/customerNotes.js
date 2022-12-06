import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import Avatar from "../../components/avatar/avatar";

//styles
import "./customerNotes.css";

export default function CustomerNotes() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { error, document } = useDocument("customers", id);
  const { updateDocument, response } = useFirestore("customers");

  const [displayForm, setDisplayForm] = useState(false);
  const [formError, setFormError] = useState(null);

  //form field values
  const [regarding, setRegarding] = useState("");
  const [detail, setDetail] = useState("");

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
    const noteToAdd = {
      regarding,
      detail,
      createdBy: user.displayName,
      avatar: user.photoURL,
      id: Math.random(),
    };

    await updateDocument(document.id, {
      notes: [...document.notes, noteToAdd],
    });
    if (response.error) {
      setFormError(response.error);
      setRegarding("");
      setDetail("");
    }
    if (!response.error) {
      setRegarding("");
      setDetail("");
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
              <span>Note Header:</span>
              <input
                required
                type="text"
                onChange={(e) => setRegarding(e.target.value)}
                value={regarding}
              />
            </label>
            <label>
              <span>Note:</span>
              <textarea
                required
                type="text"
                onChange={(e) => setDetail(e.target.value)}
                value={detail}
              ></textarea>
            </label>
            <button className="btn">Add Note</button>
            {formError && <p className="error">{formError}</p>}
          </form>
        )}
      </div>
      {document.notes.length === 0 && <h4> No Customer Notes</h4>}
      {document.notes.length > 0 &&
        document.notes.map((note) => (
          <div key={note.id}>
            <h4>{note.regarding}</h4>
            <p>{note.detail}</p>
            {note.avatar && <Avatar src={note.avatar} />}
            <p>{note.createdBy}</p>
          </div>
        ))}
    </div>
  );
}
