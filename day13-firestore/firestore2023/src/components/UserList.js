// UserList.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebaseApi";

function UserList() {
    const [userList, setUserList] = useState([]);

    useEffect(function() {
        async function getUserArr() {
            onSnapshot(query ( collection (db, "users")), (querySnapshot)=>{
                let newArr = [];
                querySnapshot.forEach((doc) => {
                    let user = doc.data();
                    user.id = doc.id;
                    newArr.push(user);
                });
                setUserList(newArr);
            });
        }
        getUserArr();
    }, []);
    
    return (<>
        <h2>유저 목록</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Laset Name</th>
                    <th>Born</th>
                </tr>
            </thead>
            <tbody>
            {
                userList.map((user)=>{
                    return (<tr key={user.id}>
                        <th>{user.id}</th>
                        <th>{user.first}</th>
                        <th>{user.last}</th>
                        <th>{user.born}</th>
                    </tr>);
                })
            }
            </tbody>
        </table>
    </>);
}

export default UserList;