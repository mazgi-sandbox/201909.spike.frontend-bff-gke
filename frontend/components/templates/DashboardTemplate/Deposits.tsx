/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles('');
  return (
    <React.Fragment>
      <Title>Recent</Title>
      <Typography component="p" variant="h4">
        $1,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 September, 2019
      </Typography>
      <div>
        <Link color="primary" href="#">
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
