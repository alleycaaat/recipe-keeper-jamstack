import { useState, useEffect } from 'react';
import '../style.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ShowModal = ({ isOpen, item, closeModal, setLoading, handleEdit }) => {
    const [data, setData] = useState({
        name: '',
        link: '',
        cat: '',
        id: '',
    });

    const { link, name, cat, id } = data;
    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
        startup();
    }, []);
    const startup = () => {
        setData({
            name: item.data.name,
            link: item.data.link,
            cat: item.data.cat,
            id: item.data.id,
        });
    };
    const handleClose = () => {
        console.log(' inside handle close ', data);
        closeModal({ data });
    };

    const editor = (e) => {
        e.preventDefault();
        //gives error message to indicate why the submission failed
        if (link === '' || name === '') {
            setErrorMsg('Recipes cannot be saved without a name and URL');
        }
        let nlink = link;
        let nname = name.trim();
        let newData;
        let ncat;

        //if no category given, mark it uncategorized otherwise remove whitespace and convert to lowercase
        cat === ''
            ? (ncat = 'uncategorized')
            : (ncat = cat.toLocaleLowerCase().trim());
        console.log(ncat, ' cat ');

        newData = { nname, nlink, ncat, id };
        setData({ name: nname, link: nlink, cat: ncat, id });
        console.log(newData, ' showing new ');
        setLoading(true);
        handleClose(newData);
        //handleEdit(newData);
        //automatically close the modal after changes are saved
        setTimeout(() => {
            handleClose();
        }, 700);
    };

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setData({ ...data, [name]: value });
    };

    return (
        <>
            <Modal
                className='modal'
                isOpen={isOpen}
                aria={{ labelledby: 'heading' }}
            >
                <div className='blue'>
                    <button className='close' onClick={handleClose}>
                        close
                    </button>
                    <form onSubmit={editor}>
                        <h3 id='heading'>Edit Recipe Entry</h3>
                        <div className='input'>
                            <span className='mod'>
                                <label hidden htmlFor='link'>
                                    Web address:
                                </label>
                                <input
                                    className='addy'
                                    type='url'
                                    name='link'
                                    value={link}
                                    onChange={handleChange}
                                    required
                                />
                            </span>
                            <span className='mod'>
                                <label hidden htmlFor='name'>
                                    Recipe name:
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    value={name}
                                    onChange={handleChange}
                                    required
                                />
                            </span>
                            <span className='mod'>
                                <label hidden htmlFor='cat'>
                                    Recipe category:
                                </label>
                                <input
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
            </Modal>
        </>
    );
};

export default ShowModal;
