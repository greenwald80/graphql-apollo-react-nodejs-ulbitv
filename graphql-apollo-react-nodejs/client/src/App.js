import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from 'react';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from "./mutations/user";
import './App.css';

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS,
    //{ pollInterval: 500 }
  );
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })
  if (error) {
    console.log(error);
    throw error;
  }

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);
  const [newUser] = useMutation(CREATE_USER);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    //console.log("addUser: ", e);
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({ data }) => {
      //console.log("data: ", data)
      setUsername('')
      setAge(0)
    })
  }

  const getAll = e => {
    //console.log("getAll");
    e.preventDefault();
    refetch();
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div >
      <form>
        <span>Name:</span>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        <span>Age:</span>
        <input value={age} onChange={e => setAge(e.target.value)} type="number" />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>addUser</button>
          <button onClick={e => getAll(e)}>getAll</button>
        </div>
      </form>
      <div>
        {users.map(user =>
          <div className="user">{user.id}. {user.username} {user.age}</div>
        )}
      </div>
    </div>
  );
}

export default App;
