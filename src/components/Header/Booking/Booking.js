import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import accountApi from "../../../api/accountApi";
import subjectApi from '../../../api/subjectApi';
import Footer from "../../Footer";
import Header from '../../Header';
import { useHistory } from 'react-router-dom';
import GetBooking from "./GetBooking";
import "../../css/celendarPick.css"
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars"


export default function Booking(props) {
    const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
    const endValue = new Date(new Date().getFullYear, new Date().getMonth() + 1, 1);
    const history = useHistory();

    const [postSubjectList, setpostSubjectList] = useState([]);
    const [postAccountList, setPostAccountList] = useState([]);
    const [postStudentList, setPostStudentList] = useState([]);
    const [mentorID, setMentorID] = useState("")
    const [subjectID, setSubjectID] = useState("")
    const [mentorName, setMentorName] = useState(0)
    const [subjectName, setSubjectName] = useState(0)
    const [postList, setpostList] = useState([])
    useEffect(() => {
        featchSubjectList()
        featchAccountList()
        featchStudentList()
    }, []);
    useEffect(() => {
        if (props?.location?.state?.name?.id) {
            chooseMentor(props?.location?.state?.name?.id)
            setMentorID(props?.location?.state?.name?.id)
        } else if (props?.location?.state?.subject?.id) {
            chooseSubject(props?.location?.state?.subject?.id)
            setSubjectID(props?.location?.state?.subject?.id)
        }

    }, [props?.location?.state?.name?.id, props?.location?.state?.subject?.id]);

    useEffect(() => {
        if (mentorID !== "") {
            chooseMentor(mentorID)

            //featchSubjectList()
            //featchAccountList()
        }

    }, [mentorID]);

    const [filters, setFilters] = useState({
        mentorID: mentorID,

        // title_like: '',
    })


    async function SearchBookingList() {
        if (!localStorage.getItem(`user-token`)) {
            history.push("/login")
        } else {
            try {

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


            } catch (error) {
                console.log('Fail to fetch product list: ', error)
            }
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
    const featchStudentList = async () => {

        let response = await accountApi.getListStudent({

        })
        if (response === undefined) {
            alert('Error')
        } else if (response?.resultCode === -1) {
            alert(response.message)
        } else {
            setPostStudentList(response?.rows)
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

    async function chooseMentor(e) {
        try {


            const requestURL = `http://118.69.123.51:5000/test/api/subject/get_list?mentorID=${e}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            setpostSubjectList(responseJSON?.data?.rows);

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function chooseSubject(e) {
        try {

            console.log(123123, e)
            const requestURL = `http://118.69.123.51:5000/test/api/subject/get_list?subjectID=${e}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            responseJSON?.data?.rows.map(mentorList => {
                return setPostAccountList(mentorList.mentorList)
            })


        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    console.log(123, mentorID);
    return (
        <div className="mt-20">
            <Header >
                <h2 className="text-center h-20 leading-80 my-auto le text-5xl bg-xanhla text-white  font-serif uppercase  clear-both  "> Booking</h2>
                <div className="w-full text-center" >
                    <div className="mb-10  mt-8">
                        <p className=" -ml-570 font-semibold text-xanhla mb-2 tracking-widest ">Mentor:</p>
                        <select
                            // onClick={e =>  chooseMentor(e.target.value)}

                            onChange={e => setMentorID(e.target.value)}
                            className="tracking-widest font-semibold text-xl w-2/6 rounded-3xl pl-4 text-black   focus:text-gray-900 border-2 border-xanhnhat bg-fpt h-16  relative z-0 outline-none "
                            value={mentorID} >
                            <option className="text-black hidden text-xl" value={0} >- Choose your mentor -</option>
                            {postAccountList?.map((mentor, index) => {

                                return <option value={mentor?.id} key={index}>{mentor.fullName}</option>

                            })}
                        </select>
                    </div>
                    <div className=" mb-10">

                        <p className=" -ml-570 font-semibold text-xanhla mb-2 tracking-widest ">Subject:</p>
                        <select
                            onClick={e => chooseSubject(e.target.value)}
                            onChange={e => setSubjectID(e.target.value)}
                            className="tracking-widest font-semibold text-xl w-2/6 rounded-3xl pl-4 text-black   focus:text-gray-900 border-2 border-xanhnhat bg-fpt h-16  relative z-0 outline-none "
                            value={subjectID}>
                            <option className="text-black hidden text-xl" value={0} >- Choose your subjet -</option>
                            {postSubjectList?.map((subject, index) => {
                                return <option value={subject?.id} key={index}>{subject.name}</option>
                            })}

                        </select>
                    </div>
                    <div className=" mb-10" >
                        <p className=" -ml-570 font-semibold text-xanhla mb-2 tracking-widest ">Day:</p>
                        <button className="tracking-widest font-semibold  text-xl w-2/6 rounded-3xl h-9 pl-4 text-black focus:text-gray-900  border-xanhnhat bg-fpt   relative z-0 outline-none">

                            <DateRangePickerComponent placeholder="- enter Day -" startDate={startValue}

                                endDate={endValue}
                            ></DateRangePickerComponent>
                        </button>
                    </div>

                    <div className="ml-450 mb-10">
                        <button className="bg-xanhla tracking-widest h-12 text-center text-white text-xl rounded-3xl w-44" onClick={SearchBookingList}>Search</button>
                    </div>
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
                        <GetBooking view={postList} student={postStudentList} subjectName={subjectID} subject={postSubjectList} mentor={postAccountList} />
                    </tbody>
                </table>

                {/* <Pagination className=" mx-5" /> */}

                <Footer />
            </Header>
        </div>
    );
}
