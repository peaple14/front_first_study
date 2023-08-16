import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseApi";
import { Button, Modal, Form } from 'react-bootstrap';

function UserList() {
    const [userList, setUserList] = useState([]);
    const [showModal, setShowModal] = useState(false);//기본적으로 모달은 안보이도록
    const [editedUser, setEditedUser] = useState({});//수정용
    const [newFirstName, setNewFirstName] = useState("");//수
    const [newLastName, setNewLastName] = useState("");//정
    const [newBorn, setNewBorn] = useState("");//용
    

    //처음 띄워줄때
    useEffect(function() {
        async function getUserArr() {
            const unsubscribe = onSnapshot(query ( collection (db, "users")), (querySnapshot)=>{
                let newArr = [];
                querySnapshot.forEach((doc) => {
                    let user = doc.data();
                    user.id = doc.id;
                    newArr.push(user);
                });
                setUserList(newArr);
            });
            return () => unsubscribe();
        }
        getUserArr();
    }, []);


    
    //삭제버튼 누를시
    async function handleDelete(id) {
            await deleteDoc(doc(db, "users", id));
    }

    //수정버튼 누를시
    async function handleEdit(id) {
        const userToEdit = userList.find(user => user.id === id); //id를기준으로 정보검색
        setEditedUser(userToEdit);//수정할정보 입력됨
        setNewFirstName(userToEdit.first);//수
        setNewLastName(userToEdit.last);//정
        setNewBorn(userToEdit.born);//용
        setShowModal(true);//모달창 열림
    }

    //모달창에서 save누를시
    async function saveChanges() {

            const userRef = doc(db, "users", editedUser.id);
            await updateDoc(userRef, {
                first: newFirstName,
                last: newLastName,
                born: newBorn
            });
            setShowModal(false);
    }

    //이미지 버튼 누를시
    async function imageOpen(url) {
        if (url == "ss"){//만약 이미지가 없을시
            alert("이미지가 없습니다.");
        }
        else{  
            window.open(url, '_blank');
        }
    }
    
    
    return (<>
        <h2>유저 목록</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Born</th>
                    <th>이미지&수정&삭제</th>
                </tr>
            </thead>
            <tbody>
            {
                userList.map((user)=>{
                    return (<tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first}</td>
                        <td>{user.last}</td>
                        <td>{user.born}</td>
                        <td>
                            <Button variant="info" onClick={() => imageOpen(user.imageUrl)}>Image</Button>{' '}
                            <Button variant="success" onClick={() => handleEdit(user.id)}>Edit</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>{' '}
                            
                        </td>
                    </tr>);
                })
            }
            </tbody>
        </table>


        {/* 모달창 */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>정보수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBorn">
                        <Form.Label>Born</Form.Label>
                        <Form.Control type="number" value={newBorn} onChange={(e) => setNewBorn(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>{' '}
                <Button variant="primary" onClick={saveChanges}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default UserList;
