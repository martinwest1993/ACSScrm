import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import ProjectSummary from "./projectSummary";
import ProjectComments from "./projectComments";

//styles
import "./project.css";

export default function Project() {
  const { id } = useParams();
  const { error, document } = useDocument("projects", id);
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">loading...</div>;
  }
  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments document={document} />
    </div>
  );
}
