import {useState} from 'react';

function UserDetail() {
    let [userDisplay, setUserDisplay] = useState("");

    fetch("http://localhost:5001/api/profile")
    .then(data => {
        if(data.user) {
            console.log(data.user);
            setUserDisplay(data.user);
        }else{
            console.log("not logged in");
            setUserDisplay("not logged in")
        }
    })
    .catch()
    


    return (
        <div>
            <div><span>{userDisplay}</span></div>
            <div></div>
        </div>
    )

}

export default UserDetail