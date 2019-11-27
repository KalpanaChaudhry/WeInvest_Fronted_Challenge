import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 560,
  },
});
export default function InvestmentCard({ investment }) {
  const history = useHistory();
  return (
    <Grid
      item
      lg={4}
      sm={6}
      xs={12}
      onClick={() => history.push(`/${investment.id}`)}
      style={{
        cursor: 'pointer',
      }}
    >
      <Card>
        <CardMedia
          image={investment.image_url}
          title="Investment Strategies"
          style={{ height: 165, width: '100%' }}
        />
        <CardContent>
          <List dense>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ variant: 'caption' }}
                primary="Volatility"
              />
              <ListItemSecondaryAction>
                <ListItemText
                  primaryTypographyProps={{ variant: 'caption' }}
                  primary={`${investment.volatility || ''}%`}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ variant: 'caption' }}
                primary="1 month return"
              />
              <ListItemSecondaryAction>
                <ListItemText
                  primaryTypographyProps={{ variant: 'caption' }}
                  primary={`${investment.one_month_return || ''}`}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ variant: 'caption' }}
                primary="Mean Return"
              />
              <ListItemSecondaryAction>
                <ListItemText
                  primaryTypographyProps={{ variant: 'caption' }}
                  primary={`${investment.mean_return || ''}`}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ variant: 'caption' }}
                primary="Minimum Investment"
              />
              <ListItemSecondaryAction>
                <ListItemText
                  primaryTypographyProps={{ variant: 'caption' }}
                  primary={`HKD ${investment.min_investment || ''}`}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ variant: 'caption' }}
                primary="Eligibility"
              />
              <ListItemSecondaryAction>
                <ListItemText
                  primaryTypographyProps={{ variant: 'caption' }}
                  primary={`HKD ${investment.eligibility || ''}`}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </List>
        </CardContent>

        <CardActions>
          <Button fullWidth color="secondary" variant="contained">
            Explore Investment Idea
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
