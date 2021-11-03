import React from "react";
import Footer from "../../Footer";
import Header from '../../Header';
import "../../css/about_us.css";


export default function AboutUs() {
  
    return (
        <div className="mt-20">
            <Header >
               
            
          <header id="masthead">
            
              <p id="masthead-intro">Hi, welcom to </p> 
              <h1 id="masthead-heading">Appointment mentor scheduling applications</h1>
          </header>
        
    
      
      <section id="introduction">
        <div id="starcontainer">
          <h2>About us</h2>
        
          <i id="fa fa-star fa-2x"></i>
          <hr id="star"></hr>
        </div>
          <p>Our application development team is from FPT University. </p>
      
          <p>In the process of studying and experiencing at the school, we realize that many students have difficulties in studying and orienting their future jobs. Mentor is someone who can answer students' problems but it is difficult to meet a mentor outside of id time. So we created this website with the purpose of creating a connection between students and mentors quickly, easily and saving time. </p>
      </section>
      
      <section id="location">
          <h1>Where I’m From</h1>
          <p>....</p>
      </section>
      <div id="services">
   <div id="service_content">
     <div id="services__items">
      <img src="https://png.pngtree.com/png-vector/20190711/ourlarge/pngtree-house-icon-real-estate-graphic-design-template-vector-png-image_1542067.jpg" className="img" alt=""/>
      <h2>Dịch vụ tư vấn</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis temporibus nesciunt asperiores a, maxime excepturi, incidunt, dolores nam harum voluptate dignissimos pariatur dolorum. Repellat odio maxime nostrum corrupti natus beatae.</p>
     </div>
    
     <div id="services__items">
      {/* <i class="fa fa-user-alt"></i> */}
      <img src="https://www.pngitem.com/pimgs/m/256-2560208_person-icon-black-png-transparent-png.png" className="img" alt=""/>
      <h2>Đội ngũ nhân lực</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis temporibus nesciunt asperiores a, maxime excepturi, incidunt, dolores nam harum voluptate dignissimos pariatur dolorum. Repellat odio maxime nostrum corrupti natus beatae.</p>
     </div>
   </div>
  
 </div>
      
      


                <Footer />
            </Header>
        </div>
    );
}
