import NavBar from "./NavBar";

export const PageLayout = (props) => {
    return (
        <>
            <NavBar />
            <br/>
            <br/>
            {props.children}
        </>
    );
};