import React from 'react';
import { Dimmer, Grid, GridColumn} from 'semantic-ui-react';

// import Loader from 'react-loaders';


import RiseLoader from '@bit/davidhu2000.react-spinners.rise-loader';



class Spinner extends React.Component {

    render () {
        return (
            <Grid textAlign = "center" verticalAlign = "middle" padded = "horizontally">
                <GridColumn style = {{'padding': '20%'}}>
                    <RiseLoader color = "green" size = "50"/>     
                </GridColumn>
            </Grid>
        )
    }
    
}

export default Spinner;