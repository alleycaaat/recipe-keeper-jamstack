import { useState } from 'react';
import { GoTrashcan, GoPencil } from 'react-icons/go';
import Container from './Container';

const Saved = ({ list, cat, catList, handlerem, setLoading, handleEdit }) => {
    const [results] = useState([...list]);
    const [searchterm, setSearchterm] = useState();
    const [disp, setDisp] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [edit, setEdit] = useState('');
    const [expanded, setExpanded] = useState(false)

    const handleSearch = (e) => {
        let sea = e.target.value;
        setExpanded(false)
        setSearchterm(sea);
        if (sea === cat[0]) {
            setDisp([]);
        } else if (sea === cat[1]) {
            setDisp(list);
        } else {
            const filt = results.filter((title) => {
                return title.data.cat.includes(sea);
            });
            setSearchterm(sea);
            setDisp(filt);
        }
    };

    //view all button
    const viewAll = async () => {
        setDisp(list);
        setSearchterm('view all');
    };

    //handles edit button
    const handleedit = (data) => {
        let changed = false;
        let id = data.data.id;
        //check to see that a change actually occured
        const updated = disp.map((item, i) => {
            if (item.data.id === id && item !== data) {
                item = data;
                changed = true;
            }
            return item;
        });
        if (changed) {
            handleEdit(data);
            setDisp(updated);
        }
    }
    //close the modal
    const closeModal = () => {
        setIsOpen(false);
    };

    //remove button
    const remove = (card, idx, kitty) => {
        setLoading(true);
        const newList = [...list];
        const newCats = [...cat];
        var catIdx = cat.indexOf(kitty); //get index of category from cat array
        let results = filterCats(newList, kitty);
        function filterCats(arr, el) {
            return arr.filter(o => {
                return o.data.cat.includes(el)
            })
        }
        //if viewing all recipes, remove selected item
        if (searchterm === 'view all') {
            newList.splice(idx, 1);
            setDisp(newList);
            //if it's the only item in its category, remove the category
            if (results.length <= 1) {
                newCats.splice(catIdx, 1);
                //send cats to parent
                catList(newCats);
                let zero = newCats[0];
                setSearchterm(zero);
            }
        } else {
            results.splice(idx, 1);
            //if it's the only item in its category, remove the category
            if (results.length === 0) {
                newCats.splice(catIdx, 1);
                setDisp([]);
                catList(newCats);
            } else {
                setDisp(results);
            }
        }
        //send the recipe to be removed
        handlerem(card);
    };

    //toggle modal visiblity
    const Toggle = (key) => {
        setEdit(key);
        setIsOpen(true);
    };
    return (
        <div className='editor'>
            <div className='header'>
                <h1>Categories</h1>
            </div>
            <div className='blue'>
                <div className='ddown'>
                    <select
                        name='categories'
                        id='categories'
                        onChange={handleSearch}
                        onFocus={()=>setExpanded(true)}
                        aria-expanded={expanded}
                        onBlur={()=>setExpanded(false)}
                    >
                        {cat.map((kitten, index) => (
                            <option
                                key={index}
                                index={index}
                                category={kitten}
                                value={kitten}
                            >
                                {kitten}
                            </option>
                        ))}
                    </select>
                    <button id='viewAll' onClick={viewAll} className='viewall'>
                        View All
                    </button>
                </div>
                {isOpen && (
                    <Container
                        setLoading={setLoading}
                        isOpen={isOpen}
                        data={edit}
                        closeModal={closeModal}
                        handleedit={handleedit}
                    />
                )}
                <div
                    className='entrylist'
                    aria-hidden={isOpen ? 'true' : 'false'}
                >
                    {disp.map((title, index) => (
                        <span className='span' key={index}>
                            <span>
                                <a
                                    href={title.data.link}
                                    value={title.data.name}
                                    index={index}
                                    category={title.data.cat}
                                    id={title.key}
                                >
                                    {title.data.name}
                                </a>
                            </span>
                            <span className='buttoned'>
                                <button
                                    onClick={() => {
                                        Toggle(title);
                                    }}
                                    className='x'
                                    alt='pencil icon to edit an entry'
                                >
                                    <GoPencil
                                        className='icon trash'
                                        size='1.2rem'
                                    />
                                </button>{' '}
                                <button
                                    id='close'
                                    onClick={() => {
                                        remove(
                                            title,
                                            index,
                                            title.data.cat,
                                            title.data.name
                                        );
                                    }}
                                    className='x'
                                    alt='trashcan icon to delete an entry'
                                >
                                    <GoTrashcan
                                        className='icon trash'
                                        size='1.1rem'
                                    />
                                </button>
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Saved;
