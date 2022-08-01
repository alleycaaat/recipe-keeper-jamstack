import React from 'react';
import ShowModal from './Modal';

const Container = ({ isOpen, data, closeModal, setLoading, handleEdit }) => {
    return (
        <>
            <ShowModal
                isOpen={isOpen}
                item={data}
                closeModal={closeModal}
                setLoading={setLoading}
                handleEdit={handleEdit}
            />
        </>
    );
};

export default Container;
