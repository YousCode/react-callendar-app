import React from 'react'
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    event: {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(2),
    },
    personal: {
      backgroundColor: '#E1E1FF',
    },
    meeting: {
      backgroundColor: '#B3E5FC',
    },
    workshop: {
      backgroundColor: '#FFEBE0',
    },
  }));

function Schedule(props) {

    const classes = useStyles();
    
    return (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography variant="body1">09:00</Typography>
            </Grid>
            <Grid item xs={10}>
              <Paper className={`${classes.event} ${classes.personal}`}>
                <Typography>Coutts personal appointment</Typography>
              </Paper>
            </Grid>
            {/* ... Другие события аналогичным образом ... */}
          </Grid>
        </Container>
      );
    }

export default Schedule