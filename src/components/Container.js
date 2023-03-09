import ShowModal from './Modal';

const Container = ({ isOpen, data, closeModal, setLoading, handleedit }) => {
    return (
        <>
            <ShowModal
                isOpen={isOpen}
                item={data}
                closeModal={closeModal}
                setLoading={setLoading}
                handleedit={handleedit}
            />
        </>
    );
};

export default Container;
