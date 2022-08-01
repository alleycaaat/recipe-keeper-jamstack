import React from 'react';
import '../style.css';
import '../index.js';

const Home = () => {
    return (
        <div className='editor'>
            <div className='header'>
                <h1>Recipe Keeper</h1>
            </div>
            <div className='blue'>
                <p className='welcome'>
                    Welcome to Recipe Keeper! I developed this web-app because I
                    wanted a better option for saving recipes, as previously I
                    was just pasting links into a note on my phone. It was the
                    perfect excuse to work on my programming and learn new
                    skills, and so, Recipe Keeper was born.
                    <br />
                    <br />
                    Recipe Keeper was created using ReactJS, the useState and
                    useEffect hooks, HTML and SCSS.
                </p>
            </div>
        </div>
    );
};

export default Home;
