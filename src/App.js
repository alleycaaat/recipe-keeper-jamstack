import './style.css';
import React, { useState, useEffect } from 'react';
import New from './components/New';
import Home from './components/Home';
import Saved from './components/Saved';
import api from './api';
import Loading from './components/loading';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const App = () => {
    const [active, setActive] = useState('Home');
    const [loading, setLoading] = useState(false);
    const [entry, setEntry] = useState([]);
    const [cats, setCats] = useState([]);

    //gets the recipes
    const startUp = async () => {
        await api.readall().then((recipes) => {
            //initialize categories array with two default values
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
        })
        .catch((err) => {
            console.log('error', err);
        });
    };

    //hook to load recipes on initial render
    useEffect(() => {
        startUp();
    }, []);


    //handles the categories state if a recipe is removed
    //and it was the only one in the category
    const listCats = (kitty) => {
        setCats(kitty);
    };

    //remove a recipe
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

    //edit a recipe
    const handleEdit = async (edits) => {
        //get the id from the recipe
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

    //add a recipe
    const addRec = async (input) => {
        let format = ({name:input.nname, link:input.nlink, cat:input.ncat})
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
            {/*  when a tab is clicked, it's set to active so that component shows */}
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
                        Created by {' '}
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
                            See my pens
                        </a>
                    </p>
                    <p>
                        <a
                            href='https://github.com/alleycaaat/recipe-keeper-jamstack'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            View this project on GitHub
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
