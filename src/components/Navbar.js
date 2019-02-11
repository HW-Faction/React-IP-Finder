import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import IPDetails from './IPDetails';
import Spinner from './Spinner/Spinner';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  button: {
    marginLeft: 10,
    margin: theme.spacing.unit,
    backgroundColor: '#f1f1f1'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Navbar extends React.Component  {
  state = {
    searchIP: '',
    apiUrl: 'https://ipvigilante.com/json',
    isLoading: false,
    isNull: false,
    status: "",
    ipv4:  "",
    country_name: "",
    continent_name: "",
    subdivision_1_name: "",
    subdivision_2_name:  "",
    city_name: "",
    latitude: "",
    longitude:  ""
  };

  getIPLocation = (e) => {
    const val = e.target.value;
    this.setState(
      { [e.target.name]: val }  
    )
  //  if(val){ this.setState({isLoading: true})} else {this.setState({isLoading: false})}
    let axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
       }
    };
    this.setState({isLoading: true});
    axios.get(`${this.state.apiUrl}/${this.state.searchIP}`, axiosConfig).then((result) => {
      /* this.setState({status: result.data.status})
      if(this.state.status === "error"){
        this.setState({isNull: true})
      } */
        this.setState({
          ipv4 : result.data.data.ipv4,
          country_name : result.data.data.country_name,
          continent_name : result.data.data.continent_name,
          subdivision_1_name : result.data.data.subdivision_1_name,
          city_name : result.data.data.city_name,
          latitude : result.data.data.latitude,
          longitude : result.data.data.longitude,
          isLoading : false
        });  
    }).catch((err) => {
      console.log(err);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              React IP Address Locator
            </Typography>   
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                name="searchIP"
                value={this.state.searchIP}
                onChange={this.getIPLocation}
                placeholder="Enter IP Address"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
           
            <div>
                <Button variant="outlined" className={classes.button} onClick={this.getIPLocation}>
                  Find Location
                </Button>
            </div>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        {this.state.isLoading ? <Spinner/> :  <IPDetails 
        ipv4={this.state.ipv4} 
        country_name={this.state.country_name} 
        continent_name={this.state.continent_name}
        city_name={this.state.city_name}
        latitude={this.state.latitude}
        longitude={this.state.longitude}
        subdivision_1_name={this.state.subdivision_1_name}
        subdivision_2_name={this.state.subdivision_2_name}  />}
       
      </div>
    );
  }
}



export default withStyles(styles)(Navbar);