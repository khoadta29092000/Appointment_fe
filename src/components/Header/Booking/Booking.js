import React, { useState, useEffect } from "react";
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../Footer";
import Header from '../../Header';
import subjectApi from '../../../api/subjectApi';
import accountApi from "../../../api/accountApi";

export default function Booking(props) {

    const [postSubjectList, setpostSubjectList] = useState([]);
    const [postAccountList, setPostAccountList] = useState([]);
    useEffect(() => {
        featchSubjectList()
        featchAccountList()
    }, []);

    const featchAccountList = async () => {

        let response = await accountApi.getListUser({

        })
        if (response === undefined) {
            alert('Error')
        } else if (response?.resultCode === -1) {
            alert(response.message)
        } else {

            setPostAccountList(response?.rows)
        }

    }

    const featchSubjectList = async () => {

        let response = await subjectApi.featchSubjectList({

        })
        if (response === undefined) {
            alert('Error')
        } else if (response?.resultCode === -1) {
            alert(response.message)
        } else {

            setpostSubjectList(response?.rows)
        }

    }
    console.log("props booking", postSubjectList)

    const [startDate, setStartDate] = useState(new Date());




    console.log(postAccountList, "day la postAccountList");
    return (



        <Header className="mt-14">
            <h2 className="ml-36  text-6xl mt-32 mb-10 clear-both ">Booking</h2>
            <div className="ml-40 mb-10">

                <select className="  border-2 border-gray-900 h-16 w-72 relative z-0 outline-none " value={props?.location?.state?.name?.fullName} >
                    {postAccountList?.map((mentor, index) => {
                        if (mentor.roleID == 3) {
                            return <option key={index}>{mentor.fullName}</option>
                        }
                    })}
                </select>
            </div>
            <div className="ml-40 mb-10">


                <select className="  border-2 border-gray-900 h-16 w-72 relative z-0 outline-none " value={props?.location?.state?.subject?.name} >

                    {postSubjectList?.map((subject, index) => {
                       
                        return <option key={index}>{subject.name}</option>
                        
                    })}
              
                </select>
            </div>
            <div className="ml-40 mb-10">

                <DatePicker className="  border-2 border-gray-900 h-16 w-72 relative z-0 outline-none " selected={startDate} onChange={(date) => setStartDate(date)} />



            </div>
            <div className="ml-40 mb-10">
                <button className="bg-red-500 text-white pl-4 text-left h-8 w-32">Search</button>
            </div>
            <table className="table-auto mx-auto mb-8 ">
                <thead className=" mx-32 h-20">
                    <tr className="mx-32  text-left ">
                        <th className="   w-32 mx-32"> <button className="font-bold bg-fpt pl-4 w-24 text-left h-12">No. </button></th>

                        <th className="   w-72 mx-32"> <button className="font-bold bg-fpt w-64 pl-4 text-left h-12">mentor</button></th>
                        <th className="  w-72 mx-32"><button className="font-bold bg-fpt  w-64  text-left h-12  pl-4">subject</button></th>
                        <th className="   w-72 mx-32"><button className="font-bold bg-fpt w-64 pl-4 text-left h-12">Date</button></th>
                        <th className="   w-72 mx-32"><button className="font-bold bg-fpt w-64 pl-4 text-left h-12">Slot</button></th>
                        <th className="  w-52 mx-32"><button className="font-bold bg-fpt w-40  pl-4 text-left h-12">Edit</button></th>
                    </tr>
                </thead>
                <tbody className=" h-16 ">
                    <tr className="h-16 ">
                        <td className="pl-4 text-left">1</td>
                        <td className="pl-4 text-left">anh khoa</td>
                        <td className="text-left  pl-4  ">SWT301</td>
                        <td className="pl-4 text-left  ">      29/09/2021 </td>
                        <td className="pl-4 text-left"> 12:30 - 14:00 </td>
                        {/* <td className="pl-4 text-left text-xanh"> <Modal show={this.state.show} handleClose={this.hideModal}>
                                <div className="clear-both mb-5">
                                    <h2 className="text-center text-4xl font-bold text-black mb-4"> Registration Form </h2>
                                    <div className=" m- h-5/6 w-5/6 mx-14 text-black  text-3xl">
                                        <p className=" font-bold pb-2">Mentor: <a className="font-normal"> Nguyễn Thế Hoàng</a> </p>
                                        <p className=" font-bold pb-2">Subject: <a className="font-normal">  Software Testing</a></p>
                                        <p className=" font-bold pb-2">Date: <a className="font-normal">  29/09/2021</a></p>
                                        <p className=" font-bold pb-2">Slot: <a className="font-normal">  12:30-14:30 </a></p>
                                        <p className=" font-bold pb-2">Name student:</p>

                                        <textarea className=" rounded-2xl w-5/6 pb-24 border-2  text-lg text-left outline-none  " type="" placeholder="Input mail all student for Group" />
                                        <p className=" font-bold pb-2"> Question:</p>
                                        <input className=" rounded-2xl w-5/6 pb-24 border-2  text-lg text-left outline-none  " /> <br />
                                        <button className="w-40 h-12 bg-red-500 text-white float-right mt-10 mb-10">Register</button>
                                    </div>

                                </div>
                            </Modal>
                                <button type="button" title="checkModal" onClick={this.showModal}>
                                    request
                                </button></td> */}
                    </tr>
                    <tr className="h-16 ">
                        <td className="pl-4 text-left">1</td>
                        <td className="pl-4 text-left">anh khoa</td>
                        <td className="text-left  pl-4  ">SWT301</td>
                        <td className="pl-4 text-left  ">      29/09/2021 </td>
                        <td className="pl-4 text-left"> 12:30 - 14:00 </td>
                        <td className="pl-4 text-left text-xanh"> request</td>
                    </tr>
                    <tr className="h-16 ">
                        <td className="pl-4 text-left">1</td>
                        <td className="pl-4 text-left">anh khoa</td>
                        <td className="text-left  pl-4  ">SWT301</td>
                        <td className="pl-4 text-left  ">      29/09/2021 </td>
                        <td className="pl-4 text-left"> 12:30 - 14:00 </td>
                        <td className="pl-4 text-left text-xanh"> request</td>
                    </tr>
                    <tr className="h-16 ">
                        <td className="pl-4 text-left">1</td>
                        <td className="pl-4 text-left">anh khoa</td>
                        <td className="text-left  pl-4  ">SWT301</td>
                        <td className="pl-4 text-left  ">      29/09/2021 </td>
                        <td className="pl-4 text-left"> 12:30 - 14:00 </td>
                        <td className="pl-4 text-left text-xanh"> request</td>
                    </tr>
                    <tr className="h-16 ">
                        <td className="pl-4 text-left">1</td>
                        <td className="pl-4 text-left">anh khoa</td>
                        <td className="text-left  pl-4  ">SWT301</td>
                        <td className="pl-4 text-left  ">      29/09/2021 </td>
                        <td className="pl-4 text-left"> 12:30 - 14:00 </td>
                        <td className="pl-4 text-left text-xanh"> request</td>
                    </tr>
                </tbody>
            </table>

            {/* <Pagination className=" mx-5" /> */}

            <Footer />
        </Header>

    );
}
