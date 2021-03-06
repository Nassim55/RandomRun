import saveData from '../authentication/saveData';
import { setUserAuthenticated } from '../../store/actions';


const registerAccount = async (first_name, last_name, username, email, password, password2, dispatch, history) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/account/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                username,
                first_name,
                last_name,
                password,
                password2,
            }), 
        });
        const data = await response.json();
        console.log(data)
        if (data.token) {
            saveData(data.token);
            dispatch(setUserAuthenticated(true));
            history.push('/usermap');
        } else {
            history.push('/');
        }
    } catch (err) { if (console) console.error(err) }
};

export default registerAccount;