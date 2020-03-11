import React from "react";
import {Link, Route} from "react-router-dom";
import {useCookies, withCookies} from 'react-cookie';

function AddQuiz()  {
    const [cookies, removeCookie] = useCookies(['login']);

    function disconnect() {
        removeCookie('login');
    }

    if (cookies.login && cookies.login.username){
        return (
            <div className={"log"}>
                <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
                <h2> Add quizz</h2>
                <form action="#">
                    <div className={"infosLog"}>
                        <input type={"text"} placeholder={"Name of the quiz"} name={"name"}/>
                        <input type={"file"} id="avatar" name="image" />
                        <input type={"text"} placeholder={"Keywords about the theme of your quiz"} name={"keywork"}/>
                    </div>
                    <input type={"submit"} value={"Next"} className={"buttonLog"}/>
                </form>
                <nav className="nav">
                    <div className="trophee"></div>
                    <Link to={'/addQuiz'}><div className="ajouter2"></div></Link>
                    <Link to={'/'}><div className="logo_home2"></div></Link>
                    <Link to={'/profil'}><div className="profil"></div></Link>
                    <div className="deconnexion" id="disconnect" onClick={disconnect}></div>
                </nav>
            </div>

        );
    } else {
        return (
            <div className={"log"}>
                <div align="center"><img src="images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>

                <h2> Add a quizz </h2>
                <p> If you want to create a quizz, you have to be connect.</p>
                <p> Click on this icone.</p>
                <Link to={'/login'}><div className="connexioncouleur"></div></Link>

                <nav className="nav">
                    <Link to={'/addQuiz'}><div className="ajouter"></div></Link>
                    <Link to={'/'}><div className="logo_home"></div></Link>
                    <Link to={'/login'}><div className="login"></div></Link>
                </nav>
            </div>
        );
    }

}

function LocalProtectedRoute({component: Component, ...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return (
            <Route
                {...rest}
                render={routeProps => (
                    <Component {...routeProps} username={rest.allCookies.login.username}
                               token={rest.allCookies.login.token}/>
                )}
            />
        );
    }
    return <p>!!</p>;
}

function LocalProtectedLink({...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return <Link className={rest.className} to={rest.to}>cities</Link>
    }else{
        return null;
    }
}

const ProtectedRoute = withCookies(LocalProtectedRoute);
const ProtectedLink = withCookies(LocalProtectedLink);

export {ProtectedRoute, ProtectedLink};

export default AddQuiz;
