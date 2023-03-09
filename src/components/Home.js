const Home = () => {
    return (
        <div className='editor'>
            <div className='header'>
                <h1>Recipe Keeper</h1>
            </div>
            <div className='blue'>
                <p className='welcome'>
                    Welcome to Recipe Keeper! This version is read-only, so not
                    all features will work properly.
                    <br />
                    <br />I developed this web-app because I wanted a better option for saving recipes, as previously I was just pasting links into a note on my phone. It started as a front-end
                    project (
                    <a
                        href='https://codepen.io/alleycaaat/pen/YzeRQPM'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        that can be seen here
                    </a>
                    ) and turned into a{' '}
                    <a
                        href='https://jamstack.org/'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Jamstack
                    </a>{' '}
                    web-app as I wanted to actually be able to use it.  Next step is to turn it add a log-in option and turn it into a mobile app.
                    <br />
                    <br />
                    Recipe Keeper's front-end uses ReactJS, including the useState and useEffect hooks, and SCSS. It's hosted on Netlify and useses a serverless database, Fauna.
                </p>
            </div>
        </div>
    );
};

export default Home;
