import React, { useState, useEffect } from "react";
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../Footer";
import Header from '../../Header';
import subjectApi from '../../../api/subjectApi';
import accountApi from "../../../api/accountApi";
import queryString from 'query-string';
import GetBooking from "./GetBooking";

export default function Booking(props) {

    const [postSubjectList, setpostSubjectList] = useState([]);
    const [postAccountList, setPostAccountList] = useState([]);
    const [mentorID, setMentorID] = useState("")
    // // // const [fromDate, setfromDate] = useState("")
    // // // const [toDate, setToDate] = useState("")
    // // // const [page, setPage] = useState("")
    // // // const [pageSize, setPageSize] = useState("")
    // // const [filtersSearch, setFiltersSearch] = useState([
    // //     mentorID: 1,
    // //     // fromDate  ,
    // //     // toDate ,
    // //     // page ,
    // //     // pageSize ,
    // // ])
    // console.log(filtersSearch)
    const [postList, setpostList] = useState([])
    useEffect(() => {
        featchSubjectList()
        featchAccountList()
    }, []);

    const [filters, setFilters] = useState({
        mentorID: mentorID,
      
        // title_like: '',
      })
    
   
        async function SearchBookingList() {
          try {
            console.log(filters)
            const paramsString =  queryString.stringify(filters);
            const requestURL = `http://118.69.123.51:5000/test/api/appointment/search_available_appointment?mentorID=${mentorID}`;
    
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
              });
            const responseJSON = await response.json();
            
            const { data, pagination } = responseJSON;
            setpostList(responseJSON?.data?.rows);
            console.log("search ket qua ne", responseJSON?.data);
           
          } catch (error) {
            console.log('Fail to fetch product list: ', error)
          }
        }
    
       
   
    

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
  

    const [startDate, setStartDate] = useState(new Date());

    console.log( "search thu ne", mentorID);
    console.log("filter", filters)
    return (



        <Header className="mt-14">
            <h2 className="ml-36  text-6xl mt-32 mb-10 clear-both ">Booking</h2>
            <div className="ml-40 mb-10">

                <select  onChange={e => setMentorID( e.target.value)} className="  border-2 border-gray-900 h-16 w-72 relative z-0 outline-none " value={props?.location?.state?.name?.fullName} >
                    {postAccountList?.map((mentor, index) => {
                       
                            return <option  value={mentor?.id} key={index}>{mentor.fullName}</option>
                        
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
                <button className="bg-red-500 text-white pl-4 text-left h-8 w-32" onClick={SearchBookingList}>Search</button>
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
              <GetBooking view={postList} mentor={postAccountList} />
                </tbody>
            </table>

            {/* <Pagination className=" mx-5" /> */}

            <Footer />
        </Header>

    );
}
