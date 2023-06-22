import "./tuto.scss"
import videoFile from "./tuto.mp4";
export default function Tuto() {
  return (
    <div className="tuto">
    <div className="tutoWrapper">
      <div className="tutoTitle">
        Hey make a wish !
      </div>
      <div className="vid">
        <video autoPlay muted loop width="100%" src={videoFile}/>
      </div>

      
    </div>
  </div>
    
  )
}
