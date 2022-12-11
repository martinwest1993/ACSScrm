import Avatar from "../../components/avatar/avatar";
import { useFirestore, deleteDocument } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProjectSummary({ project }) {
  const { updateDocument, response } = useFirestore("projects");
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    // deleteDocument(project.id);
    await updateDocument(project.id, {
      complete: true,
    });
    if (response.error) {
      return <div className="error">{response.error}</div>;
    } else navigate("/");
  };

  const handleClickDelete = (e) => {
    deleteDocument(project.id);
    navigate("/archivedProjects");
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && !project.complete && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
      {user.uid === project.createdBy.id && project.complete && (
        <button className="btn" onClick={handleClickDelete}>
          Delete From Archive
        </button>
      )}
    </div>
  );
}
