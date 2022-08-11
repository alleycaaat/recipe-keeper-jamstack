import { useState } from 'react';
import '../style.css';
import ReactModal from 'react-modal';

const ShowModal = ({ isOpen, item, closeModal, setLoading, handleedit }) => {
    const [data, setData] = useState({
        name: item.data.name,
        link: item.data.link,
        cat: item.data.cat,
        id: item.data.id,
    });

    const rootsight = document.getElementById('root');
    const { link, name, cat, id } = data;

    const [errorMsg, setErrorMsg] = useState();

    const handleClose = () => {
        rootsight.setAttribute('aria-hidden', 'false');
        closeModal();
    };

    const editor = (e) => {
        e.preventDefault();
        //gives error message to indicate why the submission failed
        if (data.link === '' || data.name === '') {
            setErrorMsg('Recipes cannot be saved without a name and URL');
        }
        //n before variable name indicates a duplicate as to not edit state improperly
        let nlink = data.link;
        let nname = data.name.trim();
        let newData;
        let ncat;

        //if no category given, mark it uncategorized otherwise remove whitespace and convert to lowercase
        cat === ''
            ? (ncat = 'uncategorized')
            : (ncat = data.cat.toLocaleLowerCase().trim());

        newData = {
            data: { name: nname, link: nlink, cat: ncat, id: data.id },
        };

        setLoading(true);
        handleedit(newData);
    };

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setData({ ...data, [name]: value });
    };

    return (
        <>
            <ReactModal
                parentSelector={() => document.querySelector('#root')}
                closeTimeoutMS={200}
                className='modal'
                isOpen={isOpen}
                aria={{ labelledby: 'heading' }}
                onRequestClose={handleClose}
            >
                <div className='blue'>
                    <button
                        className='close'
                        aria-label='close edit window'
                        onClick={handleClose}
                    >
                        close
                    </button>
                    <form onSubmit={editor}>
                        <h3 id='heading'>Edit Recipe Entry</h3>
                        <div className='input'>
                            <span className='mod'>
                                <input
                                    aria-label='edit recipe web address'
                                    className='addy'
                                    type='url'
                                    name='link'
                                    value={link}
                                    onChange={handleChange}
                                    required
                                />
                            </span>
                            <span className='mod'>
                                <input
                                    aria-label='edit recipe name'
                                    type='text'
                                    name='name'
                                    value={name}
                                    onChange={handleChange}
                                    required
                                />
                            </span>
                            <span className='mod'>
                                <input
                                    aria-label='edit recipe category'
                                    type='text'
                                    name='cat'
                                    value={cat}
                                    onChange={handleChange}
                                    placeholder='uncategorized'
                                />
                            </span>
                        </div>
                        <button
                            type='submit'
                            onClick={editor}
                            className='buttons submit'
                        >
                            Save edits
                        </button>
                        <h4
                            role='alert'
                            aria-live='assertive'
                            className='error'
                        >
                            {errorMsg}
                        </h4>
                    </form>
                </div>
            </ReactModal>
        </>
    );
};

export default ShowModal;
