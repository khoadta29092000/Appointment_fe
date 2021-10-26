import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import CustomSelect from "../../CustomSelect";
import accountApi from "../../../api/accountApi";
import Select from "react-select";
function SubjectForMentor(props) {

    const [postList, setpostList] = useState([]);
    const [mentorList, setMentorList] = useState([]);

    useEffect(() => {
        featchPostList(id);
        featchAccountList();
    }, []);

    const featchAccountList = async () => {

        let response = await accountApi.getListUser({

        })
        if (response === undefined) {
            alert('Error')
        } else if (response?.resultCode === -1) {
            alert(response.message)
        } else {

            setMentorList(response?.rows)
        }

    }

    const mentorID = mentorList?.filter(mentor => {
        if (mentor?.email == props?.location?.state?.name?.email) {
            return mentor.id
        }
    })
    const id = mentorID?.map(mentorid => { return mentorid.id })

    async function featchPostList(id) {

        try {
            const requestURL = `http://118.69.123.51:5000/test/api/subject/get_list?mentorID=${id}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            console.log({ responseJSON });
            const { data, pagination } = responseJSON;

            setpostList(data?.rows);
            console.log(data)
            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }


    const options = postList?.map(option => {
        return { label: option.name, value: option.id }
    })

    console.log(12321, options);

    function onChangeInput(value) {
        console.log(value);
    }

    return (
        <Profile >
            <div className="col-span-4 h-621 ">
                <h2 className=" mb-4 ml-5 text-5xl">Subject</h2>
                <div>
                    <hr className=" mx-5"></hr>
                </div>
                <div className="mt-10 mx-auto w-10/12 ">
                    <Select
                        options={options}
                        value={options}
                        isMulti={true}
                        onChange={onChangeInput} />
                </div>
            </div>
        </Profile>
    )
}
export default SubjectForMentor;