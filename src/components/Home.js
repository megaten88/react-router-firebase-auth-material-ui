import React, { Component } from 'react';
import { db, firebaseAuth } from '../config/constants';
import _ from 'lodash'
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import './protected/DashBoardComponents/CreatePost.css'
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';



export default class Home extends Component {
  classes = {};
  constructor(props){
    super(props)
    this.classes = props.classes;
    this.state = {
      list:[]
    }

  }

  componentDidMount() {
    db.ref('posts/').on('value', (snapshot) => {
        let list = []
        snapshot.forEach(doc => {
            if (doc.val().privacy=="1") {
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
                    
                };
                list.push(thisObject)
                this.setState({
                    list:  _.orderBy(list,['date'],['desc'])
                });
            }
        })
    });
}

addLikes = (key, likes1) =>{
    db.ref('posts/' + key).update({likes: (likes1+1)});
}

  render() {
    return (
      <div>
        <List className="List" subheader={<li />}>
                {this.state.list.map((doc,i) => (
                    <li key={`section-${i}`} className="Section">
                        <ul className="ul">
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
                                      <Button variant="fab"  mini color="primary" aria-label="Add">
                                        <FavoriteIcon />
                                        {doc.likes}
                                      </Button>
                                        <Button variant="fab" mini color="primary" aria-label="Add" >
                                            <PersonAddIcon />
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
