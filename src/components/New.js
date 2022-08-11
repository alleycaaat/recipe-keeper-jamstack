import React, { useState } from 'react';
import '../style.css';
import { GoPencil } from 'react-icons/go';
import isURL from 'validator/lib/isURL';

const New = ({ setLoading, addRec }) => {
    const [input, setInput] = useState({
        name: '',
        link: '',
        cat: '',
    });
    const { link, name, cat } = input;

    const [validl, setValidl] = useState(false);
    const [validn, setValidn] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    //clear error message
    const empty = () => {
        if (errorMsg !== '') {
            setTimeout(() => {
                setErrorMsg();
            }, 2100);
        }
    };
    //validate the input: make sure URL is valid, that there is one,  and check for name.
    //if any of the above aren't true, valid state is false. also works so that an input can revert back to false if it previously passed
    //this section is pretty ugly
    const validate = (e) => {
        const { name, value } = e.currentTarget;
        if (name === 'link') {
            if (!isURL(value)) {
                setErrorMsg('Please enter a valid URL ');
                empty();
                setValidl(false);
                return;
            } else if (value === '') {
                setErrorMsg('Please enter a URL to the recipe');
                empty();
                setValidl(false);
                return;
            } else setValidl(true);
        } else if (name === 'name') {
            if (value === '') {
                setErrorMsg('Please enter a recipe name');
                empty();
                setValidn(false);
                return;
            } else setValidn(true);
        }
    };
    //submit button
    const handleSubmit = (e) => {
        e.preventDefault();
        //gives error message to indicate why the submission failed
        if (link === '' || name === '') {
            return setErrorMsg(
                'Recipes cannot be saved without a name and URL'
            );
        }
        //check for a valid name and link, format the inputs before sending
        if (validn) {
            if (validl) {
                let ncat;
                let nlink = link;
                let nname = name.trim();
                let newItem;

                cat === ''
                    ? (ncat = 'uncategorized')
                    : (ncat = cat.toLocaleLowerCase().trim());

                setLoading(true);
                newItem = { nname, nlink, ncat };
                addRec(newItem);

                setInput({
                    name: '',
                    link: '',
                    cat: '',
                });
            }
        } else {
            console.log('invalid submission');
            empty();
            return setErrorMsg('Unable to save recipe');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInput({ ...input, [name]: value });
    };

    return (
        <div className='editor'>
            <div className='header'>
                <h1>Add a new recipe</h1>
            </div>
            <div className='blue'>
                <form onSubmit={handleSubmit}>
                    <div className='input'>
                        <span className='ins'>
                            <label hidden htmlFor='link'>
                                Web address:
                            </label>
                            <input
                                type='url'
                                name='link'
                                value={link}
                                onChange={handleChange}
                                onBlur={validate}
                                placeholder='insert recipe url'
                                aria-required='true'
                                required
                            />
                            <GoPencil className='icon' />
                        </span>
                        <span className='ins'>
                            <label hidden htmlFor='name'>
                                Recipe name:
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={name}
                                onChange={handleChange}
                                onBlur={validate}
                                placeholder='insert recipe title'
                                required
                            />
                            <GoPencil className='icon' />
                        </span>
                        <span className='ins'>
                            <label hidden htmlFor='cat'>
                                Recipe category:
                            </label>
                            <input
                                type='text'
                                name='cat'
                                value={cat}
                                onChange={handleChange}
                                placeholder='recipe category'
                            />
                            <GoPencil className='icon' />
                        </span>
                    </div>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className='buttons submit'
                    >
                        Save to Recipe Box
                    </button>
                    <h4 role='alert' aria-live='assertive' className='error'>
                        {errorMsg}
                    </h4>
                </form>
            </div>
        </div>
    );
};

export default New;
