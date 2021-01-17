import {useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserDetailsContext} from "../App"
import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css'
toast.configure();

function SignIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [load,setLoad] = useState("");
    const history = useHistory();
    //destructure the state and dispatch function from context provider's value
    const {state,dispatch} = useContext(UserDetailsContext)

    function onChangeHandler(event) {
        if(event.target.name === "username"){
            setUsername(event.target.value);
        }else if(event.target.name === 'password'){
            setPassword(event.target.value);
        }
    }

    function onClickHandler(event){
        //prevent default action of reloading
        event.preventDefault()
        //debugger;
        //make a post request to server sign in
        const reqOptions = {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                username,
                password
            })
        };
        console.log("Trying to fetch...")
        //debugger;
        fetch("/login",reqOptions).then(res=>{return res.json()}).then((data)=>{
            console.log("Made fetch req and recieved res")
            //debugger;
            //loading
            setLoad(<div className="progress">
                        <div className="indeterminate"></div>
                    </div>)
            console.log(data);
            if(data.success){
                //make a toast with success massage
                toast.success(data.message);

                //store token and user info present in response in local storage
                localStorage.setItem("jwt",data.token);
                console.log(data.user);
                localStorage.setItem("user",JSON.stringify(data.user));
                console.log("Successfull login.....")

                //only dispatch is allowed to change state by dispatching action
                //store user data in redux state
                dispatch({type:"SET_USER_DETAILS",payload:data.user})
                
                //navigate user to menu
                setTimeout(()=>{
                    history.push('/menu');
                },1000)
            }else{
                //make toast with failure message
                toast.error(data.message);
                console.log(data.error + " : " + data.message);
            }
        });
    }

    return(
        <div className="container-login">
            {load}
            <h2>Login</h2>
            <form className="login-form">
                &nbsp;
                <div className="input-field">
                    <input type="text" value ={username} onChange={(event)=>{onChangeHandler(event)}} name="username" placeholder="Username"/>
                </div>
                <div className="input-field">
                    <input type="password" value={password} onChange={(event)=>{onChangeHandler(event)}} name="password" placeholder="Password"/>
                </div>
                <div className="input-field">
                    <button className="btn" onClick={(event)=>onClickHandler(event)}>SignIn</button>
                </div>
                <Link to="/signup">Dont have an account?</Link>
            </form>
        </div> 
    )
}

export default SignIn;


/*
,'Authorization': `Bearer ${localStorage.getItem("jwt")}`
*/

/*
1610385286469
1235
*/