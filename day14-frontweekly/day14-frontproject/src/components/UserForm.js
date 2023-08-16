import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Button, Form, InputGroup } from 'react-bootstrap';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseApi";
import axios from 'axios';

function UserForm() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
    };

    const handleImageUpload = async () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('key', 'cf7ec0d749f53841b1630dc250e5110e'); //api키값은 1주일후 삭제합니다.
            formData.append('image', selectedImage);
            formData.append('expiration', 1800); // 30분후 자동 삭제
            const response = await axios.post('https://api.imgbb.com/1/upload', formData);
            const imageUrl = response.data.data.url;
            return imageUrl;
        }
    };
    

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        let imageUrl = await handleImageUpload();
        if (imageUrl == null){ //이미지 추가 안했을시
            imageUrl = "ss"; 
        }
        // 정보,이미지주소 firebase에저장
        const newUser = {
            first: event.target.first.value,
            last: event.target.last.value,
            born: event.target.born.value,
            imageUrl: imageUrl
        };
            await addDoc(collection(db, "users"), newUser);

    };

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <fieldset>
                    <legend>회원 정보 입력</legend>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="first">First</InputGroup.Text>
                        <Form.Control
                            placeholder="first"
                            aria-label="first"
                            aria-describedby="first"
                            name="first"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="last">Last</InputGroup.Text>
                        <Form.Control
                            placeholder="last"
                            aria-label="last"
                            aria-describedby="last"
                            name="last"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="born">Born</InputGroup.Text>
                        <Form.Control
                            placeholder="born"
                            aria-label="born"
                            aria-describedby="born"
                            name="born"
                        />
                    </InputGroup>
                    <label className="btn btn-info">
                        Select Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageSelect}
                        />
                    </label>
                    {' '}
                    <Button type="submit">Submit form</Button>
                </fieldset>
                <hr />
            </form>
        </>
    );
}

export default UserForm;
