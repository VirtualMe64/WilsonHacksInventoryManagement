import React from 'react'

const SignIn = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    
    const setters = {
        email: setEmail,
        password: setPassword,
    }

    var textChange = event => {
        var index = Object.keys(setters).findIndex((x) => x == event.target.name)
        Object.values(setters)[index](event.target.value);
    };

    var submitLogin = event => {
        console.log("Email: " + email);
        console.log("Password: " + password);
    };


    return(
        <div>
            <input
                name="email"
                id="email"
                value={email}
                onChange={textChange}
                type="text"
                placeholder="Email Address"
            /><br></br>
            
            <input
                name="password"
                id="password"
                value={password}
                onChange={textChange}
                type="text"
                placeholder="Password"
            /><br></br>
            <button type = "submit" onClick = {submitLogin}>
                Sign In
            </button>
        </div>
    );
}

export default SignIn