// UserForm.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { addRowData } from "../firebaseAction";
import { Button, Form, InputGroup } from 'react-bootstrap';

function UserForm() {
    const [first, setFirst] = useState("길동");
    const [last, setLast] = useState("HONG");
    const [born, setBorn] = useState(1988);

    function onSubmitHandler(event) {
        event.preventDefault();
        addRowData ("users",{
          first: event.target.first.value,
          last: event.target.last.value,
          born: event.target.born.value
        });
    }

    return (<>
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
                <Button type="submit">Submit form</Button>
            </fieldset>
            <hr/>
        </form>
    </>);
}

export default UserForm;