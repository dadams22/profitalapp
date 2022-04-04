import {useState} from "react";


interface HookResult {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}


function useModal(initialState: boolean = false): HookResult {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
    }
}

export default useModal;