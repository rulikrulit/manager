import { compose } from 'ramda';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Button from 'src/components/Button';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import Grid from 'src/components/Grid';

import Mobile from 'src/assets/icons/mobile.svg';
import Resource from 'src/assets/icons/resource.svg';
import Streamline from 'src/assets/icons/streamline.svg';
import { storage } from 'src/utilities/storage';

type ClassNames = 'dialog'
  | 'content'
  | 'item'
  | 'itemTitle'
  | 'itemDesc'
  | 'icon'
  | 'actions';

const styles: StyleRulesCallback<ClassNames> = (theme) => ({
  dialog: {
    '& [role="document"]': {
      maxWidth: 960,
      maxHeight: '100%',
      overflowY: 'auto',
    },
    '& .dialog-title': {
      border: 0,
      textAlign: 'center',
      marginBottom: 0,
      '& h2': {
        fontSize: '1.5rem',
      },
    },
  },
  content: {
    padding: `0 ${theme.spacing.unit * 4}px`,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  item: {
    margin: '0 auto',
    maxWidth: 220,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  itemTitle: {
    marginBottom: theme.spacing.unit,
  },
  itemDesc: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 400,
    },
  },
  icon: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 75,
    },
    '& .imp': {
      fill: theme.bg.pureWhite,
    },
  },
  actions: {
    marginTop: theme.spacing.unit * 2,
  },
});

interface Props {
  open: boolean;
  onClose: () => void;
}

type CombinedProps = Props & RouteComponentProps<any> & WithStyles<ClassNames>;

class WelcomeBanner extends React.Component<CombinedProps, {}> {
  actions = () => <Button onClick={this.props.onClose} type="primary">Let's go!</Button>;

  redirectToClassic = () => {
    if( storage.loginCloudManager.get() ){
      storage.loginCloudManager.set('-1');
    }

    storage.notifications.welcome.set('closed')
  };

  render() {
    const { classes } = this.props;

    return (
      <ConfirmationDialog
        open={this.props.open}
        title="Welcome to the New Cloud Manager!"
        className={classes.dialog}
        onClose={this.props.onClose}
      >
        <Grid container className={classes.content}>
          <Grid item xs={12}>
            <Typography>We've added new features to help improve your experience and create a fresh new look. Help us build a better product for Linode customers like you. Share your feedback in the footer below.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={4} className={classes.item}>
                <Streamline className={classes.icon} />
                <Typography variant="subheading" className={classes.itemTitle}>Streamline Deployments</Typography>
                <Typography variant="caption" className={classes.itemDesc}>Deploy a Linode, NodeBalancers, Block Storage Volume, or Domain easily with step-by-step guidance.</Typography>
              </Grid>
              <Grid item xs={12} md={4} className={classes.item}>
                <Resource className={classes.icon} />
                <Typography variant="subheading" className={classes.itemTitle}>Find Resources</Typography>
                <Typography variant="caption" className={classes.itemDesc}>Our new predictive search gives you quick access to support documentation and community posts.</Typography>
              </Grid>
              <Grid item xs={12} md={4} className={classes.item}>
                <Mobile className={classes.icon} />
                <Typography variant="subheading" className={classes.itemTitle}>Access Anywhere</Typography>
                <Typography variant="caption" className={classes.itemDesc}>With support for all major devices and screen sizes, it's easy to stay connected.</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.actions}>
            {this.actions()}
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Go back to <a href="https://manager.linode.com" onClick={this.redirectToClassic}>Classic Manager</a>.
            </Typography>
          </Grid>
        </Grid>
      </ConfirmationDialog>
    );
  }
};

const styled = withStyles<ClassNames>(styles, { withTheme: true });

const enhanced = compose<any, any, any>(
  withRouter,
  styled,
);

export default enhanced(WelcomeBanner);
