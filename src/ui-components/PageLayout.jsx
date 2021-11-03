import NavBar from "./NavBar";
import {Box} from "@mui/material";
import MadeWithLove from "./MadeWithLove";
import ForkOnGithub from "./ForkOnGithub";



export const PageLayout = (props) => {
    return (
        <>
            <NavBar />
            <br/>
            <br/>
            {props.children}
            <Box pt={4}>
                <MadeWithLove/>
            </Box>
            <ForkOnGithub repoUrl="https://github.com/SocialFinanceDigitalLabs/book-a-booth" />
        </>
    );
};