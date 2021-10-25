import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import CustomSelect from "../../CustomSelect";

function SubjectForMentor(props) {

    const [postList, setpostList] = useState([]);
    useEffect(() => {
        featchPostList()
    }, []);

    async function featchPostList() {
        try {
            const requestURL = `http://118.69.123.51:5000/test/api/subject/get_list`;

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

            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    console.log("props mentor", postList);

    const filterd = postList.filter(cc => {



        return { label: cc.name, value: cc.id }


    })

    const options = filterd?.map(option => {
        return { label: option.name, value: option.id }
    })

    console.log(filterd)
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
            <CustomSelect
                options={options}
                // defaultValue={options[0]}
                isMulti={true}
                onChange={onChangeInput} />
        </div>
        </div>
        </Profile>
    )
}
export default SubjectForMentor;