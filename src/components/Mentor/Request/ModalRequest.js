import React, { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom'

import Logo from '../../image/logo.png'


export default function ModalRequest(props) {
   
    return (
        <div className="clear-both mb-0 ">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> Request Detail </h2>
                    <p className="text-gray-500 pb-8 pl-2 pr-24">Student can booking and question for Mentor</p>
                </div>
            </div>
            
            <div className=" m- h-5/6 w-5/6 mx-14 text-black  text-3xl">
                                <p className=" font-bold pb-2">Subject: <a className="font-normal " >{props.nameSubject}</a>  </p>
                                <p className=" font-bold pb-2">Date: <a className="font-normal " >{props.date}</a>  </p>
                                <p className=" font-bold pb-2">Time: <a className="font-normal " >{props.time}</a>  </p>
                                <p className=" font-bold pb-2">Individual of group: <a className="font-normal " >{props.group}</a>  </p>
                                <p className=" font-bold pb-2">Question: <a className="font-normal " >{props.question}</a>  </p>
                                <div className="text-center">
                                    <button className="h-12 w-32 m-4 bg-red-700 border-2">Accept</button>
                                    <button className="h-12 w-32 m-4 bg-red-700 border-2">Cancel</button>
                                </div>
             
            </div>
          
        </div>
    )
}

