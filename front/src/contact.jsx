import "./contact.css"
import { useNavigate } from "react-router-dom";


export default function Contact (){
    const navigate = useNavigate();
    return(
        

        <div className="all" id="contact">
            <nav>
            <ul className="navi"> 
                <li className="logo">BioCheck</li>
               
                
            </ul>
        </nav>
            
            <div className="main" id="contact">
                <h1 className="titleContact">contact us</h1>
                <h2 className="sous-titre"> 📍 Rue des Sciences, Centre Biotech, Tunis, Tunisie</h2>
                <h2 className="sous-titre">☎️ +216 71 000 000 </h2>
                <h2 className="sous-titre">📷  @biotech.tn</h2>
                <h2 className="sous-titre">🕘 Lundi - Vendredi : 08h00 - 17h00 </h2>
                 <button onClick={() => navigate("/")}>return</button>
            </div>
        </div>
    )
}