import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../image/logo.png'



export default class MentorDashboard extends Component {
    render() {
        function handleLogoutClick() {
            localStorage.removeItem('user-token');
            localStorage.removeItem('user-name');
            localStorage.removeItem('user-avatar');
            localStorage.removeItem('user-role');
            localStorage.removeItem('user-email');
          }
         
        return (
            <div className="grid h-screen grid-cols-6 bg-layoutforadmin  ">

                <div className="  bg-fpt col-span-1 m-7  rounded-t-2xl   grid grid-rows-6 md:grid-rows-6   gap-4 ">
                    <div className=" row-span-1 h-0 w-full p-7 ">
                        <Link to="/"><img  src={Logo} alt="logo" className="" /></Link>
                    </div>
                    
                    <div className="w-full font-bold      text-center ">
                    
                       
                    <NavLink activeStyle={{ backgroundColor: 'white', fontWeight: "bold" }} exact to="/mentordashboard" className=" m-4" >  
                      <p className="">Dashboard</p> 
                      </NavLink>
                      </div>
                   
                    <div className="mb-16  ">
                    <NavLink activeStyle={{ backgroundColor: 'white', fontWeight: "bold" }} exact to="/mentordashboard/viewhistory" >
                       
                            <p className="ml-60">View History</p>
                      
                    </NavLink>
                    </div>
                    <div className="mb-16  ">
                    <NavLink activeStyle={{ backgroundColor: 'white', fontWeight: "bold" }} exact to="/mentordashboard/scheduling" >
                        
                            <p className="ml-60 ">Scheduling</p>
                        
                    </NavLink>
                    </div>
                    <div className="row-span-3">
                    <NavLink activeStyle={{ backgroundColor: 'white', fontWeight: "bold" }} exact to="/mentordashboard/request" >
                       
                            <p className="ml-60 ">Request</p>
                        
                    </NavLink>
                    
                    </div>

                    <div className="bg-gray-700 h-60 leading-60 rounded-2xl cursor-pointer  text-white ">
                    <Link to="/" className=" " onClick={handleLogoutClick}> <p className="ml-60  " >Logout</p></Link>
                    </div>
                </div>


                <div className="col-span-5   my-7 grid grid-rows-1 md:grid-rows-100   ">
                    <div className="h-14 bg-white row-span-1   relative rounded-2xl mr-7    "  >
                       
                        <img src='https://st.quantrimang.com/photos/image/072015/22/avatar.jpg'
                            className="rounded-full w-12 h-12 mr-8 mt-1  float-right"  />
                            
                            <div  className="  relative  z-0 rounded-full    w-14 h-14 mr-3 float-right"> 
                                <div className="rounded-full absolute z-10  border-gray-700-  border-2  w-12 h-12 mt-1 ml-3000  "> </div>
                              <img src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/243497341_574081197163528_7833045324151776348_n.png?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=P_ckEQOp1IcAX_zHyhG&_nc_ht=scontent.fsgn5-9.fna&oh=f442e4874d6cb348acedd9d4417c7e29&oe=618719A8'
                              className=" ml-2  h-12  mt-1 relative z-0 slashed-zero b  "
                              ></img>
                                </div>
                            
                           
                            
                    </div>
                    <div className="  " >
                        {this.props.children}

                    </div>
                </div>

            </div>
        )
    }
}