import { Stack, Text } from '@chakra-ui/react';
import React from 'react';

function HorizontalBar() {
    return (
        <Stack display={["block", "none"]} boxShadow={"md"} bgColor={"black"} position={"fixed"} zIndex={4} bottom={"0px"} direction={"row"} border={"0px solid blue"} width={"100%"} h={"65px"}>
             <Text>Amit</Text>
             <Text>Saini</Text>

        </Stack>
    );
}

export default HorizontalBar;