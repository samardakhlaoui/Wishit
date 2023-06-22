import Tuto from "../../../components/Tuto/Tuto"
import Posts from "../../../components/posts/Posts"
import "./home.scss"

export default function Home() {
  return (
    <div className="home">
      <Tuto />
      <br/>
      <br/>
     <Posts />
     
    </div>
  )
}
