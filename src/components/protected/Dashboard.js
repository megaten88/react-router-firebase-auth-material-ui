import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import './Dashboard.css';
import FormDialog from './DashBoardComponents/CreatePost';
import { db, firebaseAuth } from '../../config/constants';
import _ from 'lodash'
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const styles ={
  
};


class Dashboard extends Component {
  
  classes = {};
  constructor(props){
    super(props)
    this.classes = props.classes;
    this.state = {
      list:[],
      user: []
    }
  }

  componentDidMount() {
    db.ref('/posts').orderByChild('date').on('value', (snapshot) => {
        let list = []
        snapshot.forEach(doc => {
            if (doc.val().user === (firebaseAuth().currentUser).uid) {
                var thisObject = {
                    key: doc.key,
                    title: doc.val().title,
                    content: doc.val().content,
                    date: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(doc.val().date),
                    likes: doc.val().likes,
                    privacy: doc.val().privacy,
                    avatar: doc.val().avatar,
                    user: doc.val().user,
                    liked: doc.val().liked,
                    comments: doc.val().comments
                };
                list.push(thisObject)
                this.setState({
                    list:  _.orderBy(list,['date'],['desc'])
                });
            }
        })
    });
}

  render() {
    const { classes } = this.props;
    return (
      <div>
        {renderIcons()}
        <List className="List" subheader={<li />}>
                {this.state.list.map((doc,i) => (
                    <li key={`section-${i}`} className="Section">
                        <ul className={classes.ul}>
                            <div>
                                <Card className="Card">
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="user" className="avatar">
                                               {doc.avatar}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton>
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title = {doc.title} 
                                        subheader= {doc.date}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            {doc.title}
                                        </Typography>
                                            <Typography component="p">
                                            {doc.content}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="fab" mini color="primary" aria-label="Add" className={this.classes.button}>
                                            <FavoriteIcon />
                                            {doc.likes}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                        </ul>
                    </li>
                ))}
            </List>
      </div>
    );
  }
}

function renderIcons(){
  return(
    <div className = "buttons">
     <FormDialog/>
      <Button variant="fab" size = "small"  color="secondary" aria-label="Delete">
        <DeleteIcon />
      </Button>
      </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);