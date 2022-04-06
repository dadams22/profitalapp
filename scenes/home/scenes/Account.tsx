import React from "react";
import {useAppDispatch} from "../../../state/hooks";
import {signOut} from "../../../state/userSlice";
import {Box, Button, Center} from "native-base";

function Account() {
    const dispatch = useAppDispatch();

    const onLogoutPress = () => dispatch(signOut());

    return (
        <Box safeAreaTop bgColor="dark.50" w="100%" minH="100%" p={4}>
            <Center>
                <Button bgColor="red.500" onPress={onLogoutPress}>
                    Sign Out
                </Button>
            </Center>
        </Box>
    );
}

export default Account;
