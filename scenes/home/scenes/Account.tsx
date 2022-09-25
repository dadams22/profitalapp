import React from "react";
import {useAppDispatch} from "../../../state/hooks";
import {signOut} from "../../../state/userSlice";
import {Button, Center} from "native-base";
import PageLayout from "../../../components/PageLayout";

function Account() {
    const dispatch = useAppDispatch();

    const onLogoutPress = () => dispatch(signOut());

    return (
        <PageLayout headerText="Account">
            <Center>
                <Button bgColor="red.500" onPress={onLogoutPress}>
                    Sign Out
                </Button>
            </Center>
        </PageLayout>
    );
}

export default Account;
