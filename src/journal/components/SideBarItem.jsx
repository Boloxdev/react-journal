import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"


const SideBarItem = ({ title,body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch();
    const onActiveNote = () => {
        dispatch( setActiveNote({id, title, body, date, imageUrls}));
    }
    
    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    }, [title])
    return (
        <ListItem onClick={ onActiveNote } disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>

    )
}

export default SideBarItem