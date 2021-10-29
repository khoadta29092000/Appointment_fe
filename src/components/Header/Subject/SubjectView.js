import React, { Component, useState, useEffect } from "react";
import Header from '../../Header'
import Footer from "../../Footer";
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


export default function SubjectView(props) {

    const [postSpecList, setPostSpecList] = useState([]);

    

    async function featchSpecList() {
        try {
            const requestURL = `http://118.69.123.51:5000/test/api/specialize/get_list?`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            const { data, pagination } = responseJSON;

            setPostSpecList(data);

            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    useEffect(() => {

        featchSpecList()

    }, []);


const mentorForSubject = props?.location?.state?.name?.mentorList?.map((mentor, index) =>{return mentor.fullName})
console.log("cc",mentorForSubject)
    return (
        <div className="mt-20 ">
            <Header >
                <div className="">
                    <h2 className="text-center h-20 leading-80 my-auto le text-5xl bg-xanhla text-white  font-serif uppercase  clear-both  "> Subject Detail</h2>
                    <div className=" w-2/4 mx-auto text-center">
                        <table>
                            <tbody>
                                <tr className="m-20 text-xl ">
                                    <td className="float-right  py-5">Course:</td>
                                    <td className="text-left pl-10 py-5 text-xanhnhat ">{props.location.state.name.name} ({props.location.state.name.code})</td>
                                </tr>
                                <tr className="m-20 text-xl">
                                    <td className="float-right py-5">Specialization:</td>
                                    <td className="text-left pl-10 py-5 text-xanhnhat">{postSpecList.map(postSpec => {

                                        if (props.location.state.name.specializeID == postSpec?.id) {

                                            return (
                                                <p
                                                    value={postSpec?.id}
                                                    key={postSpec?.id}> {postSpec?.name}  </p>)

                                        }

                                    })}</td>
                                </tr>
                                <tr className="m-20 text-xl">
                                    <td className="float-right py-5">Teacher:</td>
                                    <td className="text-left pl-10 py- text-xanhnhat">{mentorForSubject.join(", ")}</td>
                                </tr>
                                <tr className="m-20 text-xl">
                                    <td className="float-right py-5">Description:</td>
                                    <td className="text-left pl-10 py-5 text-xanhnhat">{props.location.state.name.description}</td>
                                </tr>
                            </tbody>
                        </table>

                     
                        <Link
                        exact to={{
                            pathname: "/booking",
                            state: {
                                subject: props.location.state.name
                            }
                        }} className="bg-xanhla mt-5 rounded-xl px-10 text-white  py-3"> Choose mentor </Link>
                    </div>


                </div>



            </Header>
            <Footer />
        </div>
    );
}
