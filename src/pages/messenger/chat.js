//images
import Video from "../../assets/cam.png";

export default function Chat() {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>name</span>
        <div className="chat-icons">
          <img src={Video} alt="video chat icon" />
          <button className="chat-extra-btn">...</button>
        </div>
      </div>
    </div>
  );
}
