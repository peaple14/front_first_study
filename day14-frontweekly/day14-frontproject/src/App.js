import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseApi";
import { addRowData } from "./firebaseAction";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";


function App() {

  return (<div>
    <UserForm />
    <UserList />
  </div>);
}
  
export default App;
