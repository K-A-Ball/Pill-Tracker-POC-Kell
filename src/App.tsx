import React from 'react';

import { Box, Grid } from '@mui/material'
import DaySection from './components/DaySection'
import styles from './styles/Home.module.css'
import './styles/globals.css'
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <div className={styles.trackerContainer}>
          <div className={styles.trackerHeader}>
            <button className={styles.liveButton}>
              LIVE
            </button>
          </div>
          <Box className={styles.timeOfDayContainer} sx={{ width: '100%' }}>
            <Grid container rowSpacing={4} columnSpacing={0.5}>
              <DaySection timeOfDay={'Morning'} className={'wb_sunny'} />
              <DaySection timeOfDay={'Noon'} className={'brightness_medium'} />
              <DaySection timeOfDay={'Evening'} className={'dark_mode'} />
            </Grid>
          </Box>
        </div >
      </div>
    </ApolloProvider>
  )
}

export default App;
