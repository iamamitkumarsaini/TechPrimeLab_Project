import React from 'react';
import { Stack } from '@chakra-ui/react';


function VerticalBar() {
    return (
        <Stack display={["none", "block"]} border={"1px solid red"} bgColor={"white"} minWidth={["10px", "60px", "80px"]} maxH={"110vh"}>
            
        </Stack>
    );
}

export default VerticalBar;