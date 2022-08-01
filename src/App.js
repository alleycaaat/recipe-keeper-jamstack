import './style.css';
import React, { useState, useEffect } from 'react';
import New from './components/New';
import Home from './components/Home';
import Saved from './components/Saved';
import api from './api';
import Loading from './components/loading';

const App = () => {
    const [active, setActive] = useState('Home');
    const [loading, setLoading] = useState(false);
    const [entry, setEntry] = useState([]);
    const [cats, setCats] = useState([]);

    const startUp = async () => {
        await api.readall().then((recipes) => {
            //initialize categories array with two values
            let catList = ['select a category', 'view all'];
            recipes.map((kitty) => {
                if (!catList.includes(kitty.data.cat)) {
                    catList.push(kitty.data.cat);
                }
                return catList;
            });

            let newList = [];
            recipes.map((rec) => {
                //map the recipes to get the id given by fauna
                const key = getId(rec);
                newList.push({
                    data: {
                        name: rec.data.name,
                        link: rec.data.link,
                        cat: rec.data.cat,
                        id: key,
                    },
                });
                return newList;
            });
            setCats(catList);
            setEntry(newList);
            //end the loading screen
            setLoading(false);
        });
    };

    useEffect(() => {
        startUp();
    }, []);

    //handles the categories state
    const listCats = (kitty) => {
        let newcats = [];
        if (!cats.includes(kitty.data.cat)) {
            newcats.push(kitty.data.cat);
        }
        setCats(newcats);
    };

    const handlerem = async (title) => {
        //get the id from the recipe
        let id = title.data.id;

        await api
            .erase(id)
            .then((res) => {
                console.log(res);
                startUp();
                
            })
            .catch((err) => {
                console.log('API error', err);
            });
    };

    const handleEdit = async (edits) => {
        let id = edits.data.id;

        await api
            .edit(id, edits)
            .then((res) => {
                console.log(res);
                setLoading(false);
            })
            .catch((err) => {
                console.log('API error', err);
            });
    };

    const addRec = async (input) => {
        console.log(input,' addred input')
        let format = ({name:input._name, link:input._link, cat:input._cat})
        await api
            .create(format)
            .then((res) => {
                console.log(res);
                startUp();
            })
            .catch((err) => {
                console.log('API error', err);
            });
    };

    return (
        <div className='wrapper'>
            <div className='tabs'>
                <button
                    className={
                        'tab' + (active === 'Home' ? ' active' : ' inactive')
                    }
                    onClick={() => setActive('Home')}
                >
                    Home
                </button>
                <button
                    className={
                        'tab' + (active === 'Saved' ? ' active' : ' inactive')
                    }
                    onClick={() => setActive('Saved')}
                >
                    Saved
                </button>
                <button
                    className={
                        'tab' + (active === 'New' ? ' active' : ' inactive')
                    }
                    onClick={() => setActive('New')}
                >
                    New
                </button>
            </div>
            <div className='notepad'>
                {loading && <Loading />}
                {active === 'New' && (
                    <New addRec={addRec} setLoading={setLoading} />
                )}
                {active === 'Home' && <Home />}
                {active === 'Saved' && (
                    <Saved
                        list={entry}
                        cat={cats}
                        handleEdit={handleEdit}
                        catList={listCats}
                        addRec={addRec}
                        setLoading={setLoading}
                        handlerem={handlerem}
                    />
                )}
            </div>
            {active === 'Home' && (
                <div className='credit'>
                    <p>
                        See my portfolio at{' '}
                        <a
                            href='https://achulslander.com/'
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            AC Hulslander
                        </a>
                    </p>
                    <p>
                        <a
                            href='https://codepen.io/alleycaaat/pens/public'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            See my other pens
                        </a>
                    </p>
                    <p>
                        <a
                            href='https://github.com/alleycaaat/recipe-keeper-web-app'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            See this project on GitHub
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

function getId(rec) {
    //if note doesn't have a ref
    if (rec.ref === undefined) {
        console.log('ID not retrieved');
        return null;
    }
    //otherwise, return the id
    return rec.ref['@ref'].id;
}

export default App;
