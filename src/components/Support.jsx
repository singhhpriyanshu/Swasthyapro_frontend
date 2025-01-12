
import msgimg from '../assets/message_4129700.png'
import headphnimg from '../assets/headphone_18080416.png'
import supportimg from '../assets/customer-service_11826683.png'
const Support =()=>{
 return(
    
    <div style={{backgroundColor:"orange",width:"100%",height:"75px",marginBottom:"-12%",display:"flex"}}>
        <div style={{width:"40%" ,textAlign:"center"}}>
            <p style={{marginTop: "12px", color: "white",fontSize: "31px",fontWeight: "600"}}> 24/7 Support</p>
            </div>
        <div style={{width:"20%",display:"flex"}}>
            <img src={msgimg}alt="message img" style={{width:"15%",height:"100%",objectFit:"contain",marginLeft:"67px"}}/>
            <p style={{objectFit:"contain",marginTop:"15px",marginLeft:"20px"}}>Live Chat
            <p>Anytime</p>
            </p>
           
        </div>
        <div  style={{width:"20%",display:"flex"}}>
        <img src={headphnimg}alt="message img" style={{width:"15%",height:"100%",objectFit:"contain",marginLeft:"67px"}}/>
            <p style={{objectFit:"contain",marginTop:"15px",marginLeft:"20px"}}>Call Us
            <p>9am-8pm</p>
            </p>
        </div>
        <div style={{width:"20%",display:"flex"}} >
        <img src={supportimg}alt="message img" style={{width:"15%",height:"100%",objectFit:"contain",marginLeft:"67px"}}/>
            <p style={{objectFit:"contain",marginTop:"15px",marginLeft:"20px"}}>Sales Team
            <p>1800-3365-5566</p>
            </p>
        </div>
       

    </div>

  

 )



}
export default Support ;